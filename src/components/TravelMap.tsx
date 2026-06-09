import { useEffect, useId, useState } from "react";
import { Car, Clock, LocateFixed, Minus, Plus, Route, ShieldCheck } from "lucide-react";
import type { Coordinates } from "../data/legacyPackages";
import { fetchRoadRoute, type RoadRouteResult } from "../utils/geo";

export interface TravelMapPoint {
  id: string;
  label: string;
  state?: string;
  coords: Coordinates;
  description?: string;
  type?: "origin" | "destination" | "stop";
}

interface TravelMapProps {
  title: string;
  subtitle?: string;
  points: TravelMapPoint[];
  compact?: boolean;
  className?: string;
  onRouteCalculated?: (route: RoadRouteResult) => void;
}

const tileSize = 256;
const viewWidth = 900;
const viewHeight = 520;
const padding = 86;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const project = ({ lat, lng }: Coordinates, zoom: number) => {
  const sinLat = Math.sin((clamp(lat, -85.0511, 85.0511) * Math.PI) / 180);
  const scale = tileSize * 2 ** zoom;

  return {
    x: ((lng + 180) / 360) * scale,
    y: (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * scale,
  };
};

const getAutoZoom = (points: Coordinates[]) => {
  if (points.length < 2) {
    return 9;
  }

  for (let zoom = 12; zoom >= 5; zoom -= 1) {
    const projected = points.map((point) => project(point, zoom));
    const xs = projected.map((point) => point.x);
    const ys = projected.map((point) => point.y);
    const routeWidth = Math.max(...xs) - Math.min(...xs);
    const routeHeight = Math.max(...ys) - Math.min(...ys);

    if (routeWidth <= viewWidth - padding * 2 && routeHeight <= viewHeight - padding * 2) {
      return zoom;
    }
  }

  return 5;
};

const getBoundsCenter = (points: Coordinates[]) => {
  if (!points.length) {
    return { lat: 31.5, lng: 76.9 };
  }

  const lats = points.map((point) => point.lat);
  const lngs = points.map((point) => point.lng);

  return {
    lat: (Math.min(...lats) + Math.max(...lats)) / 2,
    lng: (Math.min(...lngs) + Math.max(...lngs)) / 2,
  };
};

const formatPriceLikeDistance = (distanceKm: number) => `${distanceKm.toLocaleString("en-IN")} km`;

const TravelMap = ({ title, subtitle, points, compact = false, className = "", onRouteCalculated }: TravelMapProps) => {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const routePathId = `guruRoute${rawId}`;
  const mapBaseId = `guruMapBase${rawId}`;
  const mapShadeId = `guruMapShade${rawId}`;
  const mapGridId = `guruMapGrid${rawId}`;
  const routeGlowId = `guruRouteGlow${rawId}`;
  const taxiBodyId = `guruTaxiBody${rawId}`;
  const taxiGlassId = `guruTaxiGlass${rawId}`;
  const [zoomOffset, setZoomOffset] = useState(0);
  const [route, setRoute] = useState<RoadRouteResult | null>(null);
  const pointSignature = points
    .map((point) => `${point.id}:${point.coords.lat.toFixed(5)},${point.coords.lng.toFixed(5)}`)
    .join("|");

  useEffect(() => {
    let isCurrent = true;

    if (points.length < 2) {
      return undefined;
    }

    fetchRoadRoute(points.map((point) => point.coords)).then((nextRoute) => {
      if (!isCurrent) {
        return;
      }

      setRoute(nextRoute);
      onRouteCalculated?.(nextRoute);
    });

    return () => {
      isCurrent = false;
    };
  }, [onRouteCalculated, pointSignature, points]);

  const routeCoordinates = route?.coordinates.length ? route.coordinates : points.map((point) => point.coords);
  const baseZoom = getAutoZoom([...routeCoordinates, ...points.map((point) => point.coords)]);
  const zoom = clamp(baseZoom + zoomOffset, 5, 13);
  const center = getBoundsCenter([...routeCoordinates, ...points.map((point) => point.coords)]);
  const centerWorld = project(center, zoom);

  const mapToScreen = (coords: Coordinates) => {
    const world = project(coords, zoom);

    return {
      x: world.x - centerWorld.x + viewWidth / 2,
      y: world.y - centerWorld.y + viewHeight / 2,
    };
  };

  const routeScreenPoints = routeCoordinates.map(mapToScreen);
  const routePath = routeScreenPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" ");
  const compactStops = points.length > 3;

  const tiles = (() => {
    const minTileX = Math.floor((centerWorld.x - viewWidth / 2) / tileSize) - 2;
    const maxTileX = Math.floor((centerWorld.x + viewWidth / 2) / tileSize) + 2;
    const minTileY = Math.floor((centerWorld.y - viewHeight / 2) / tileSize) - 2;
    const maxTileY = Math.floor((centerWorld.y + viewHeight / 2) / tileSize) + 2;
    const tileCount = 2 ** zoom;
    const nextTiles: { id: string; x: number; y: number; url: string }[] = [];

    for (let tileX = minTileX; tileX <= maxTileX; tileX += 1) {
      for (let tileY = minTileY; tileY <= maxTileY; tileY += 1) {
        if (tileY < 0 || tileY >= tileCount) {
          continue;
        }

        const wrappedX = ((tileX % tileCount) + tileCount) % tileCount;
        nextTiles.push({
          id: `${zoom}-${tileX}-${tileY}`,
          x: tileX * tileSize - centerWorld.x + viewWidth / 2,
          y: tileY * tileSize - centerWorld.y + viewHeight / 2,
          url: `https://tile.openstreetmap.org/${zoom}/${wrappedX}/${tileY}.png`,
        });
      }
    }

    return nextTiles;
  })();

  const routeStatus = route
    ? {
        distance: formatPriceLikeDistance(route.distanceKm),
        duration: route.durationText,
        source: route.source === "osrm" ? "OpenStreetMap road route" : "Estimated mountain route",
      }
    : {
        distance: "Calculating",
        duration: "Live ETA",
        source: "Route engine warming up",
      };

  return (
    <div className={`overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/5 ${className}`}>
      <div className="grid lg:grid-cols-[1fr_320px]">
        <div className="relative min-h-[420px] overflow-hidden bg-gradient-to-br from-sky-100 via-emerald-50 to-slate-100 md:min-h-[520px]">
          <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/15 bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-800 shadow-xl">
            <Route className="h-4 w-4 text-primary-accent" />
            {routeStatus.source}
          </div>

          <div className="absolute right-4 top-4 z-20 flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/90 shadow-xl">
            <button
              type="button"
              aria-label="Zoom in"
              onClick={() => setZoomOffset((value) => clamp(value + 1, -2, 3))}
              className="flex h-10 w-10 items-center justify-center text-slate-800 transition-colors hover:bg-slate-100"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => setZoomOffset((value) => clamp(value - 1, -2, 3))}
              className="flex h-10 w-10 items-center justify-center border-t border-slate-200 text-slate-800 transition-colors hover:bg-slate-100"
            >
              <Minus className="h-4 w-4" />
            </button>
          </div>

          <svg
            className={compact ? "block h-full min-h-[360px] w-full" : "block h-full min-h-[420px] w-full md:min-h-[520px]"}
            viewBox={`0 0 ${viewWidth} ${viewHeight}`}
            preserveAspectRatio="xMidYMid slice"
            role="img"
            aria-label={title}
          >
            <defs>
              <linearGradient id={mapBaseId} x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#dff5ff" />
                <stop offset="45%" stopColor="#eaf7ee" />
                <stop offset="100%" stopColor="#f8fafc" />
              </linearGradient>
              <linearGradient id={mapShadeId} x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#0f766e" />
              </linearGradient>
              <pattern id={mapGridId} width="72" height="72" patternUnits="userSpaceOnUse">
                <path d="M 72 0 L 0 0 0 72" fill="none" stroke="#64748b" strokeWidth="1" opacity="0.16" />
              </pattern>
              <filter id={routeGlowId} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id={taxiBodyId} x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="54%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <linearGradient id={taxiGlassId} x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#bae6fd" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>

            <rect width={viewWidth} height={viewHeight} fill={`url(#${mapBaseId})`} />
            <path
              d="M -80 430 C 110 320 210 410 350 270 C 520 100 690 170 990 30"
              fill="none"
              stroke="#16a34a"
              strokeWidth="64"
              strokeLinecap="round"
              opacity="0.12"
            />
            <path
              d="M -60 150 C 120 220 240 80 380 155 C 555 250 665 95 960 190"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="18"
              strokeLinecap="round"
              opacity="0.12"
            />
            <rect width={viewWidth} height={viewHeight} fill={`url(#${mapGridId})`} />

            {tiles.map((tile) => (
              <image
                key={tile.id}
                href={tile.url}
                x={tile.x}
                y={tile.y}
                width={tileSize}
                height={tileSize}
                preserveAspectRatio="none"
                opacity="0.96"
              />
            ))}

            <rect width={viewWidth} height={viewHeight} fill={`url(#${mapShadeId})`} opacity="0.14" />

            {routePath && (
              <>
                <path d={routePath} fill="none" stroke="#0f172a" strokeWidth={compactStops ? "8" : "10"} strokeLinecap="round" opacity="0.16" />
                <path
                  id={routePathId}
                  className="travel-route-line"
                  d={routePath}
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth={compactStops ? "4.2" : "4.8"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter={`url(#${routeGlowId})`}
                />
                <path
                  className="travel-route-flow"
                  d={routePath}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={compactStops ? "1.4" : "1.8"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.45"
                />
                <g className="travel-car" aria-hidden="true">
                  <animateMotion dur={compactStops ? "14s" : "10s"} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#${routePathId}`} />
                  </animateMotion>
                  <g transform="translate(0 -1) scale(0.34)">
                    <ellipse cx="0" cy="14" rx="25" ry="6" fill="#0f172a" opacity="0.18" />
                    <path
                      d="M-30 2 C-27 -10 -17 -17 -4 -18 L12 -17 C23 -15 31 -7 33 2 C32 10 24 16 12 17 L-11 17 C-22 16 -29 10 -30 2 Z"
                      fill={`url(#${taxiBodyId})`}
                      stroke="#0f172a"
                      strokeWidth="2.8"
                      strokeLinejoin="round"
                    />
                    <path d="M-11 -13 H9 C15 -11 20 -6 22 0 H-22 C-19 -7 -16 -11 -11 -13Z" fill={`url(#${taxiGlassId})`} opacity="0.94" />
                    <path d="M-13 -11 L-19 0 M9 -11 L15 0" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
                    <path d="M-24 5 H27" stroke="#f43f5e" strokeWidth="3.4" strokeLinecap="round" />
                    <circle cx="-18" cy="18" r="4.8" fill="#0f172a" />
                    <circle cx="18" cy="18" r="4.8" fill="#0f172a" />
                    <circle cx="-18" cy="18" r="1.8" fill="#e2e8f0" />
                    <circle cx="18" cy="18" r="1.8" fill="#e2e8f0" />
                    <circle cx="32" cy="2" r="2.7" fill="#fde68a" />
                    <circle cx="-29" cy="4" r="2.2" fill="#fb7185" />
                  </g>
                </g>
              </>
            )}

            {points.map((point, index) => {
              const screen = mapToScreen(point.coords);
              const isOrigin = point.type === "origin" || index === 0;
              const isDestination = point.type === "destination" || index === points.length - 1;
              const markerColor = isDestination ? "#f43f5e" : "#0f172a";
              const showLabel = !compactStops;
              const labelY = isOrigin ? -24 : isDestination ? 26 : index % 2 === 0 ? -24 : 26;
              const labelWidth = clamp(point.label.length * 6 + 22, 58, 116);
              const outerRadius = compactStops ? (isOrigin || isDestination ? 11 : 9) : isOrigin ? 13 : 10;
              const innerRadius = compactStops ? (isOrigin || isDestination ? 6.2 : 5.2) : isOrigin ? 7.4 : 6.2;

              return (
                <g key={point.id} transform={`translate(${screen.x}, ${screen.y})`}>
                  <title>{`${index + 1}. ${point.label}`}</title>
                  <circle r={outerRadius} fill={markerColor} opacity="0.16" />
                  <circle r={innerRadius} fill={markerColor} stroke="#ffffff" strokeWidth={compactStops ? "3" : "3.2"} />
                  {compactStops && (
                    <text x="0" y="2.7" textAnchor="middle" fill="#ffffff" fontSize="5.6" fontWeight="900">
                      {index + 1}
                    </text>
                  )}
                  {showLabel && (
                    <g transform={`translate(0 ${labelY})`}>
                      <rect
                        x={-labelWidth / 2}
                        y="-11"
                        width={labelWidth}
                        height="20"
                        rx="10"
                        fill="#ffffff"
                        opacity="0.94"
                        stroke="#cbd5e1"
                        strokeWidth="0.8"
                      />
                      <text x="0" y="2.8" textAnchor="middle" fill="#0f172a" fontSize="8.8" fontWeight="900">
                        {point.label}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-3 left-4 z-20 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Map data OpenStreetMap contributors
          </div>
        </div>

        <aside className="flex flex-col justify-between gap-8 p-6 md:p-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-accent/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-primary-accent">
              <LocateFixed className="h-4 w-4" />
              Live route studio
            </div>
            <h3 className="text-2xl font-black leading-tight text-secondary-dark">{title}</h3>
            {subtitle && <p className="mt-3 text-sm font-medium leading-relaxed text-muted-slate">{subtitle}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-100 bg-surface-bg p-4">
              <Car className="mb-3 h-5 w-5 text-primary-accent" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-slate">Distance</p>
              <p className="mt-1 text-lg font-black text-secondary-dark">{routeStatus.distance}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-surface-bg p-4">
              <Clock className="mb-3 h-5 w-5 text-primary-accent" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-slate">ETA</p>
              <p className="mt-1 text-lg font-black text-secondary-dark">{routeStatus.duration}</p>
            </div>
          </div>

          <div className="space-y-4">
            {points.map((point, index) => (
              <div key={point.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-dark text-xs font-black text-white">
                    {index + 1}
                  </span>
                  {index !== points.length - 1 && <span className="h-full min-h-8 w-px bg-slate-200" />}
                </div>
                <div className="pb-3">
                  <p className="text-sm font-black text-secondary-dark">{point.label}</p>
                  <p className="text-xs font-semibold text-muted-slate">{point.state}</p>
                  {point.description && <p className="mt-1 text-xs leading-relaxed text-slate-500">{point.description}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-secondary-dark p-4 text-white">
            <ShieldCheck className="h-5 w-5 shrink-0 text-green-400" />
            <p className="text-xs font-medium text-slate-300">
              Road routes are powered by OpenStreetMap data with safe fallback estimates for mountain conditions.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TravelMap;
