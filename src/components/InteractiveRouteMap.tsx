"use client";

import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { MapPin } from "lucide-react";

interface InteractiveRouteMapProps {
  origin?: string;
  destination?: string;
  polyline?: string;
  distanceKm?: number;
  durationMin?: number;
}

let isGoogleMapsConfigured = false;

export default function InteractiveRouteMap({
  origin,
  destination,
  polyline,
  distanceKm,
  durationMin,
}: InteractiveRouteMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(
    !apiKey ? "Google Maps API key not found" : null
  );

  useEffect(() => {
    if (!apiKey) {
      return;
    }

    let isMounted = true;

    async function initMap() {
      try {
        if (!isGoogleMapsConfigured) {
          setOptions({
            key: apiKey as string,
            v: "weekly",
          });
          isGoogleMapsConfigured = true;
        }

        const { Map } = (await importLibrary("maps")) as google.maps.MapsLibrary;
        const geometry = (await importLibrary("geometry")) as google.maps.GeometryLibrary;

        if (!mapRef.current || !isMounted) return;

        // Luxury Dark Map Palette
        const darkMapStyles: google.maps.MapTypeStyle[] = [
          { elementType: "geometry", stylers: [{ color: "#0D131F" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#08090B" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#A1A1AA" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#D4AF63" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#D4AF63" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#101826" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#1F2B3E" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#2E3F5B" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#F5F3EF" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#141C2A" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#080D15" }],
          },
        ];

        const gtaCenter = { lat: 43.6532, lng: -79.3832 };

        const map = new Map(mapRef.current, {
          center: gtaCenter,
          zoom: 11,
          styles: darkMapStyles,
          disableDefaultUI: true,
          zoomControl: true,
        });

        if (isMounted) setMapLoaded(true);

        // Render decoded polyline if present
        if (polyline && geometry.encoding) {
          const path = geometry.encoding.decodePath(polyline);
          const routeLine = new google.maps.Polyline({
            path,
            geodesic: true,
            strokeColor: "#D4AF63",
            strokeOpacity: 0.95,
            strokeWeight: 4,
          });
          routeLine.setMap(map);

          const bounds = new google.maps.LatLngBounds();
          path.forEach((p) => bounds.extend(p));
          map.fitBounds(bounds);

          if (path.length > 0) {
            // Custom OverlayView pins avoid deprecated google.maps.Marker warning while preserving darkMapStyles
            const createPinOverlay = (
              pos: google.maps.LatLng,
              color: string,
              title: string
            ) => {
              class PinOverlay extends google.maps.OverlayView {
                private div: HTMLDivElement | null = null;
                onAdd() {
                  const div = document.createElement("div");
                  div.title = title;
                  div.style.position = "absolute";
                  div.style.width = "14px";
                  div.style.height = "14px";
                  div.style.borderRadius = "9999px";
                  div.style.backgroundColor = color;
                  div.style.border = "2px solid #FFFFFF";
                  div.style.boxShadow = "0 2px 6px rgba(0,0,0,0.6)";
                  div.style.transform = "translate(-50%, -50%)";
                  this.div = div;
                  this.getPanes()?.overlayMouseTarget.appendChild(div);
                }
                draw() {
                  const proj = this.getProjection();
                  if (!proj || !this.div) return;
                  const pt = proj.fromLatLngToDivPixel(pos);
                  if (pt) {
                    this.div.style.left = `${pt.x}px`;
                    this.div.style.top = `${pt.y}px`;
                  }
                }
                onRemove() {
                  this.div?.parentNode?.removeChild(this.div);
                  this.div = null;
                }
              }
              const overlay = new PinOverlay();
              overlay.setMap(map);
            };

            createPinOverlay(path[0], "#10B981", "Pickup: " + (origin || "Pickup"));
            createPinOverlay(
              path[path.length - 1],
              "#D4AF63",
              "Dropoff: " + (destination || "Dropoff")
            );
          }
        }
      } catch (err: unknown) {
        console.error("Map initialization failed:", err);
        if (isMounted) setLoadError("Interactive Google Map initializing...");
      }
    }

    initMap();

    return () => {
      isMounted = false;
    };
  }, [apiKey, origin, destination, polyline]);

  return (
    <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#D4AF63]/30 bg-[#0A0F19] shadow-inner">
      <div ref={mapRef} className="w-full h-full" />

      {/* Floating Route Info Overlay */}
      {distanceKm && durationMin ? (
        <div className="absolute top-3 left-3 bg-[#08090B]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#D4AF63]/40 shadow-lg flex items-center gap-3 text-xs">
          <div>
            <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider block">
              Driving Distance
            </span>
            <strong className="text-[#D4AF63] font-bold">{distanceKm} km</strong>
          </div>
          <div className="h-6 w-px bg-white/20" />
          <div>
            <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider block">
              Est. Duration
            </span>
            <strong className="text-white font-bold">{durationMin} mins</strong>
          </div>
        </div>
      ) : null}

      {!mapLoaded && !loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#090D15]/80 backdrop-blur-sm text-xs text-[#A1A1AA]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF63] animate-ping" />
            <span>Loading Google Live GTA Map...</span>
          </div>
        </div>
      )}

      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#090D15] text-xs text-[#A1A1AA] p-4 text-center">
          <div>
            <MapPin className="w-6 h-6 text-[#D4AF63] mx-auto mb-2 opacity-60" />
            <p>{loadError}</p>
          </div>
        </div>
      )}
    </div>
  );
}
