import type { Coordinates, RouteStop } from "../data/legacyPackages";
import { allRouteStops } from "../data/legacyPackages";

export interface LocationLabel {
  city: string;
  state: string;
  country?: string;
}

export interface RoadRouteResult {
  coordinates: Coordinates[];
  distanceKm: number;
  durationText: string;
  source: "osrm" | "fallback";
}

export const knownOrigins: RouteStop[] = [
  ...allRouteStops,
  {
    name: "Ludhiana",
    state: "Punjab",
    coords: { lat: 30.901, lng: 75.8573 },
    description: "Major Punjab pickup city for Manali, Shimla, and Himachal circuits.",
    attractions: ["Punjab pickup", "NH44 access", "Family travel hub"],
  },
  {
    name: "Jalandhar",
    state: "Punjab",
    coords: { lat: 31.326, lng: 75.5762 },
    description: "Punjab road hub with easy access toward Pathankot and Himachal.",
    attractions: ["Punjab pickup", "Pathankot corridor", "Family travel hub"],
  },
  {
    name: "Amritsar",
    state: "Punjab",
    coords: { lat: 31.634, lng: 74.8723 },
    description: "Golden Temple city and common pickup/drop point for Himachal circuits.",
    attractions: ["Golden Temple", "Airport pickup", "Wagah Border"],
  },
  {
    name: "Kalka",
    state: "Haryana",
    coords: { lat: 30.8398, lng: 76.9407 },
    description: "Railway gateway for Shimla and Solan side routes.",
    attractions: ["Railway pickup", "Shimla route", "Solan access"],
  },
].filter((stop, index, allStops) => allStops.findIndex((item) => item.name === stop.name) === index);

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

export const calculateAirDistanceKm = (start: Coordinates, end: Coordinates) => {
  const earthRadiusKm = 6371;
  const dLat = toRadians(end.lat - start.lat);
  const dLng = toRadians(end.lng - start.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(start.lat)) *
      Math.cos(toRadians(end.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
};

export const estimateRoadDistanceKm = (start: Coordinates, end: Coordinates) =>
  Math.round(calculateAirDistanceKm(start, end) * 1.32);

export const formatDurationFromHours = (hours: number) => {
  if (hours < 1) {
    return `${Math.max(15, Math.round(hours * 60))} min`;
  }

  const rounded = Math.round(hours * 10) / 10;
  return `${rounded} hours`;
};

export const estimateMountainDriveTime = (distanceKm: number) => {
  const averageSpeed = distanceKm > 350 ? 48 : 38;
  const baseHours = distanceKm / averageSpeed;
  const lower = Math.max(1, Math.round(baseHours));
  const upper = Math.max(lower + 1, Math.round(baseHours + 1.8));

  return `${lower} - ${upper} hours`;
};

export const findNearestKnownOrigin = (coords: Coordinates) =>
  knownOrigins.reduce(
    (nearest, candidate) => {
      const distance = calculateAirDistanceKm(coords, candidate.coords);
      if (!nearest || distance < nearest.distanceKm) {
        return { stop: candidate, distanceKm: distance };
      }

      return nearest;
    },
    null as null | { stop: RouteStop; distanceKm: number },
  );

export const reverseGeocode = async (coords: Coordinates): Promise<LocationLabel | null> => {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("lat", String(coords.lat));
  url.searchParams.set("lon", String(coords.lng));
  url.searchParams.set("zoom", "10");

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    address?: {
      city?: string;
      town?: string;
      village?: string;
      state?: string;
      country?: string;
    };
  };

  const address = payload.address;
  if (!address) {
    return null;
  }

  return {
    city: address.city || address.town || address.village || "Your location",
    state: address.state || "Detected region",
    country: address.country,
  };
};

export const fetchRoadRoute = async (points: Coordinates[]): Promise<RoadRouteResult> => {
  if (points.length < 2) {
    return {
      coordinates: points,
      distanceKm: 0,
      durationText: "0 min",
      source: "fallback",
    };
  }

  const coordinateList = points.map((point) => `${point.lng},${point.lat}`).join(";");
  const url = `https://router.project-osrm.org/route/v1/driving/${coordinateList}?overview=full&geometries=geojson`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Route service failed");
    }

    const payload = (await response.json()) as {
      routes?: {
        distance: number;
        duration: number;
        geometry?: {
          coordinates: [number, number][];
        };
      }[];
    };
    const route = payload.routes?.[0];

    if (!route?.geometry?.coordinates?.length) {
      throw new Error("Route geometry missing");
    }

    return {
      coordinates: route.geometry.coordinates.map(([lng, lat]) => ({ lat, lng })),
      distanceKm: Math.round(route.distance / 1000),
      durationText: formatDurationFromHours(route.duration / 3600),
      source: "osrm",
    };
  } catch {
    const fallbackDistance = points.slice(1).reduce((total, point, index) => {
      const previous = points[index];
      return total + estimateRoadDistanceKm(previous, point);
    }, 0);

    return {
      coordinates: points,
      distanceKm: fallbackDistance,
      durationText: estimateMountainDriveTime(fallbackDistance),
      source: "fallback",
    };
  }
};

