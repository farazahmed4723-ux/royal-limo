import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { origin, destination } = await req.json();

    if (!origin || !destination) {
      return NextResponse.json(
        { error: "Origin and Destination addresses are required." },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.GOOGLE_MAPS_SERVER_KEY ||
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Google Maps API key not configured." },
        { status: 500 }
      );
    }

    // Call Google Routes API
    const response = await fetch(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.description",
        },
        body: JSON.stringify({
          origin: { address: origin.trim() },
          destination: { address: destination.trim() },
          travelMode: "DRIVE",
          routingPreference: "TRAFFIC_AWARE",
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Google Routes API Error:", errText);
      return NextResponse.json(
        {
          success: false,
          error: "Could not calculate driving route between specified locations.",
          requiresCustomQuote: true,
        },
        { status: 400 }
      );
    }

    const data = await response.json();
    const route = data.routes?.[0];

    if (!route || !route.distanceMeters) {
      return NextResponse.json({
        success: false,
        requiresCustomQuote: true,
        error: "No driving route found. Please contact dispatch for a custom quote.",
      });
    }

    const distanceMeters = route.distanceMeters;
    const distanceKm = Number((distanceMeters / 1000).toFixed(1));
    const durationSeconds = parseInt(route.duration.replace("s", ""), 10) || 1800;
    const durationMin = Math.round(durationSeconds / 60);
    const polyline = route.polyline?.encodedPolyline || "";

    // Approved Royal 12 Pricing Engine Logic (Integer cents for precision)
    // Minimum Journey Fare: $110.00 (Includes first 10 km)
    // Additional km rate: $3.25 / km after 10 km
    const baseCents = 11000;
    const extraKm = Math.max(0, distanceKm - 10);
    const distanceCents = Math.round(extraKm * 325);
    const baseFareCents = baseCents + distanceCents;
    const hstCents = Math.round(baseFareCents * 0.13); // Ontario 13% HST
    const totalCents = baseFareCents + hstCents;

    return NextResponse.json({
      success: true,
      origin,
      destination,
      distanceKm,
      durationMin,
      polyline,
      baseFare: baseFareCents / 100,
      hst: hstCents / 100,
      totalFare: totalCents / 100,
      description: route.description || "Direct Highway Route",
    });
  } catch (err: unknown) {
    console.error("Route calculation error:", err);
    // Graceful offline/timeout fallback: standard GTA estimate (approx 28 km)
    const fallbackKm = 28.5;
    const fallbackMin = 35;
    const baseCents = 11000;
    const extraKm = Math.max(0, fallbackKm - 10);
    const distanceCents = Math.round(extraKm * 325);
    const baseFareCents = baseCents + distanceCents;
    const hstCents = Math.round(baseFareCents * 0.13);
    const totalCents = baseFareCents + hstCents;

    return NextResponse.json({
      success: true,
      origin: "Toronto / GTA Pickup",
      destination: "Destination",
      distanceKm: fallbackKm,
      durationMin: fallbackMin,
      polyline: "",
      baseFare: baseFareCents / 100,
      hst: hstCents / 100,
      totalFare: totalCents / 100,
      description: "GTA Highway Executive Route (Estimated)",
      isFallback: true,
    });
  }
}
