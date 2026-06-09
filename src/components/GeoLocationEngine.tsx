import { useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, LocateFixed, MapPin, Navigation, RefreshCcw, ShieldCheck } from "lucide-react";
import { allRouteStops, type Coordinates, type RouteStop } from "../data/legacyPackages";
import { findNearestKnownOrigin, knownOrigins, reverseGeocode, type LocationLabel } from "../utils/geo";
import TravelMap, { type TravelMapPoint } from "./TravelMap";

interface LocationState {
  coords: Coordinates;
  accuracy?: number;
  label: LocationLabel;
  nearest?: RouteStop;
}

const defaultDestination = allRouteStops.find((stop) => stop.name === "Manali") || allRouteStops[0];
const fallbackOrigin = knownOrigins.find((stop) => stop.name === "Chandigarh") || knownOrigins[0];

const getFallbackLabel = (coords: Coordinates, accuracy?: number): LocationState => {
  const nearest = findNearestKnownOrigin(coords);

  return {
    coords,
    accuracy,
    nearest: nearest?.stop,
    label: {
      city: "Your GPS location",
      state: nearest ? `Near ${nearest.stop.name}, ${nearest.stop.state}` : "Detected from browser",
      country: "India",
    },
  };
};

const formatCoordinate = (value: number) => value.toFixed(5);

const GeoLocationEngine = () => {
  const [status, setStatus] = useState<"idle" | "detecting" | "ready" | "denied" | "unsupported" | "error">("idle");
  const [userLocation, setUserLocation] = useState<LocationState | null>(null);
  const [manualOriginName, setManualOriginName] = useState(fallbackOrigin.name);
  const [destinationName, setDestinationName] = useState(defaultDestination.name);

  const manualOrigin = knownOrigins.find((origin) => origin.name === manualOriginName) || fallbackOrigin;
  const destination = allRouteStops.find((stop) => stop.name === destinationName) || defaultDestination;
  const needsFallbackOrigin = status === "denied" || status === "unsupported" || status === "error";

  const mapPoints = useMemo<TravelMapPoint[]>(() => {
    const origin: TravelMapPoint | null = userLocation
      ? {
          id: "actual-gps-origin",
          label: userLocation.label.city,
          state: userLocation.label.state,
          coords: userLocation.coords,
          description: `Actual browser GPS: ${formatCoordinate(userLocation.coords.lat)}, ${formatCoordinate(
            userLocation.coords.lng,
          )}${userLocation.accuracy ? ` within ${Math.round(userLocation.accuracy)} m` : ""}`,
          type: "origin",
        }
      : needsFallbackOrigin
        ? {
            id: `manual-${manualOrigin.name}`,
            label: manualOrigin.name,
            state: manualOrigin.state,
            coords: manualOrigin.coords,
            description: "Manual fallback is used only because browser GPS is unavailable or blocked.",
            type: "origin",
          }
        : null;

    if (!origin) {
      return [];
    }

    return [
      origin,
      {
        id: `destination-${destination.name}`,
        label: destination.name,
        state: destination.state,
        coords: destination.coords,
        description: destination.description,
        type: "destination",
      },
    ];
  }, [destination, manualOrigin, needsFallbackOrigin, userLocation]);

  const detectLocation = () => {
    if (!("geolocation" in navigator)) {
      setStatus("unsupported");
      setUserLocation(null);
      return;
    }

    setStatus("detecting");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const fallback = getFallbackLabel(coords, position.coords.accuracy);

        try {
          const label = await reverseGeocode(coords);
          setUserLocation({
            ...fallback,
            label: label || fallback.label,
          });
          setStatus("ready");
        } catch {
          setUserLocation(fallback);
          setStatus("ready");
        }
      },
      (error) => {
        setUserLocation(null);
        if (error.code === error.PERMISSION_DENIED) {
          setStatus("denied");
          return;
        }

        setStatus("error");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  };

  const statusCopy = {
    idle: {
      icon: Navigation,
      title: "Actual GPS route is waiting",
      text: "Click detect location and the route will start from the visitor's real browser coordinates, not from a preset city.",
      tone: "bg-primary-accent/10 text-primary-accent",
    },
    detecting: {
      icon: RefreshCcw,
      title: "Reading live GPS",
      text: "Your browser is asking for location permission and checking current coordinates.",
      tone: "bg-amber-100 text-amber-700",
    },
    ready: {
      icon: CheckCircle2,
      title: `${userLocation?.label.city || "Actual location"} detected`,
      text: `${userLocation?.label.state || "GPS coordinates"} is now the live route origin.`,
      tone: "bg-emerald-100 text-emerald-700",
    },
    denied: {
      icon: AlertCircle,
      title: "GPS permission was denied",
      text: "The map can still work with a manual pickup city, but live GPS needs permission.",
      tone: "bg-rose-100 text-rose-700",
    },
    unsupported: {
      icon: AlertCircle,
      title: "This browser cannot share GPS",
      text: "Manual pickup fallback is active because geolocation is unavailable.",
      tone: "bg-rose-100 text-rose-700",
    },
    error: {
      icon: AlertCircle,
      title: "GPS could not be detected",
      text: "Try again, check browser permission, or use the manual fallback.",
      tone: "bg-rose-100 text-rose-700",
    },
  }[status];

  const StatusIcon = statusCopy.icon;

  return (
    <section className="border-y border-slate-100 bg-surface-bg py-24">
      <div className="section-container">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-accent/15 bg-white px-5 py-2 text-xs font-black uppercase tracking-widest text-primary-accent shadow-sm">
              <LocateFixed className="h-4 w-4" />
              Real live GPS route planner
            </div>
            <h2 className="text-3xl font-black leading-tight text-secondary-dark md:text-5xl">
              Route from the visitor's actual location.
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-muted-slate">
              The map uses browser GPS coordinates for any visitor location, then draws a road route to the selected
              Himachal destination with distance and ETA.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${statusCopy.tone}`}>
                  <StatusIcon className={`h-6 w-6 ${status === "detecting" ? "animate-spin" : ""}`} />
                </div>
                <div>
                  <h3 className="font-black text-secondary-dark">{statusCopy.title}</h3>
                  <p className="mt-1 text-sm font-medium text-muted-slate">{statusCopy.text}</p>
                  {userLocation && (
                    <p className="mt-2 text-xs font-black uppercase tracking-widest text-primary-accent">
                      Lat {formatCoordinate(userLocation.coords.lat)} / Lng {formatCoordinate(userLocation.coords.lng)}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={detectLocation}
                disabled={status === "detecting"}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-accent px-6 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-primary-accent/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
              >
                <MapPin className="h-5 w-5" />
                Use My GPS
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {needsFallbackOrigin && (
                <label className="block">
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-muted-slate">
                    Manual pickup fallback
                  </span>
                  <select
                    value={manualOriginName}
                    onChange={(event) => setManualOriginName(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-surface-bg px-4 py-3 text-sm font-bold text-secondary-dark"
                  >
                    {knownOrigins.map((origin) => (
                      <option key={origin.name} value={origin.name}>
                        {origin.name}, {origin.state}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-muted-slate">Destination</span>
                <select
                  value={destinationName}
                  onChange={(event) => setDestinationName(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-surface-bg px-4 py-3 text-sm font-bold text-secondary-dark"
                >
                  {allRouteStops.map((stop) => (
                    <option key={stop.name} value={stop.name}>
                      {stop.name}, {stop.state}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>

        {mapPoints.length === 2 ? (
          <TravelMap
            title={`${mapPoints[0].label} to ${destination.name}`}
            subtitle="Actual GPS origin, destination marker, route drawing, road distance, estimated travel time, and animated cab movement."
            points={mapPoints}
          />
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center shadow-xl shadow-slate-950/5">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-accent/10 text-primary-accent">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-black text-secondary-dark">No fake pickup city is selected.</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-muted-slate">
              Press "Use My GPS" to build the route from your real current location. If permission is denied, the manual
              fallback will appear clearly as a fallback.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default GeoLocationEngine;

