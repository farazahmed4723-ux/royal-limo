import { NextRequest, NextResponse } from "next/server";

interface PlacePrediction {
  placeId: string;
  text?: { text?: string };
  structuredFormat?: {
    mainText?: { text?: string };
    secondaryText?: { text?: string };
  };
}

interface AutocompleteSuggestionItem {
  placePrediction?: PlacePrediction;
}

interface AutocompleteApiResponse {
  suggestions?: AutocompleteSuggestionItem[];
}

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();

    if (!input || typeof input !== "string" || input.trim().length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    const apiKey =
      process.env.GOOGLE_MAPS_SERVER_KEY ||
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Google Maps API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://places.googleapis.com/v1/places:autocomplete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
        },
        body: JSON.stringify({
          input: input.trim(),
          includedRegionCodes: ["ca"],
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Google Places API error:", errText);
      return NextResponse.json({ suggestions: [] });
    }

    const data = (await response.json()) as AutocompleteApiResponse;
    const suggestions = (data.suggestions || [])
      .filter(
        (s): s is { placePrediction: PlacePrediction } => Boolean(s.placePrediction)
      )
      .map((s) => {
        const p = s.placePrediction;
        return {
          placeId: p.placeId,
          mainText: p.structuredFormat?.mainText?.text || p.text?.text || "",
          secondaryText: p.structuredFormat?.secondaryText?.text || "",
          fullText: p.text?.text || p.structuredFormat?.mainText?.text || "",
        };
      });

    return NextResponse.json({ suggestions });
  } catch (err: unknown) {
    console.error("Error in autocomplete handler:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
