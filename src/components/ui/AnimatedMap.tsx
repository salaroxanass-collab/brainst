"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function AnimatedMap({
  center = [11.34, 44.49] as [number, number],
  zoom = 9,
  className = "",
  interactive = false,
}: {
  center?: [number, number];
  zoom?: number;
  className?: string;
  interactive?: boolean;
}) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    if (!token) {
      return;
    }

    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center,
      zoom,
      interactive,
      attributionControl: true,
    });

    mapRef.current = map;

    map.on("load", () => {
      map.addSource("grid", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: center,
          },
        },
      });
      map.addLayer({
        id: "pulse",
        type: "circle",
        source: "grid",
        paint: {
          "circle-radius": 24,
          "circle-color": "#c4754a",
          "circle-opacity": 0.35,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#1b3d2f",
        },
      });

      let dir = 1;
      const animate = () => {
        const z = map.getZoom();
        if (z > zoom + 0.4) dir = -1;
        if (z < zoom - 0.2) dir = 1;
        map.setZoom(z + dir * 0.002);
        requestAnimationFrame(animate);
      };
      if (!interactive) animate();
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [center, zoom, interactive]);

  if (!token) {
    return (
      <div
        className={`relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-sand ${className}`}
        role="img"
        aria-label="Map placeholder — add NEXT_PUBLIC_MAPBOX_TOKEN"
      >
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="relative z-10 text-center">
          <div className="mx-auto h-32 w-32 rounded-full border-2 border-dashed border-forest/30" />
          <p className="mt-6 font-display text-[10px] tracking-[0.25em] text-charcoal-muted uppercase">
            GIS Atlas · Mapbox
          </p>
        </div>
        <MotionRing />
      </div>
    );
  }

  return (
    <div
      ref={mapContainer}
      className={`aspect-[16/9] w-full overflow-hidden rounded-sm ${className}`}
    />
  );
}

function MotionRing() {
  return (
    <svg
      className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 text-clay/50"
      viewBox="0 0 100 100"
      aria-hidden
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="4 6"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="24s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
