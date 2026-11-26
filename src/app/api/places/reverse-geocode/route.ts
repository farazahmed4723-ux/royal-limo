import { NextRequest, NextResponse } from "next/server";

interface GeocodingResult {
  formatted_address?: string;
}

interface GeocodingResponse {
  status?: string;
  results?: GeocodingResult[];
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const latStr = searchParams.get("lat");
  const lngStr = searchParams.get("lng");

  const lat = latStr ? Number(latStr) : NaN;
  const lng = lngStr ? Number(lngStr) : NaN;

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json(
      { error: "Valid latitude and longitude coordinates are required." },
      { status: 400 }
    );
  }

  const fallbackAddress = `GPS Location (${lat.toFixed(4)}, ${lng.toFixed(4)}) — Toronto / GTA`;
  const apiKey =
    process.env.GOOGLE_MAPS_SERVER_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ address: fallbackAddress, isFallback: true });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${encodeURIComponent(
      `${lat},${lng}`
    )}&key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      return NextResponse.json({ address: fallbackAddress, isFallback: true });
    }

    const data = (await response.json()) as GeocodingResponse;
    const formatted = data.results?.[0]?.formatted_address;

    return NextResponse.json({
      address: formatted || fallbackAddress,
      isFallback: !formatted,
    });
  } catch (err: unknown) {
    console.error("Reverse geocode error:", err);
    return NextResponse.json({ address: fallbackAddress, isFallback: true });
  }
}
