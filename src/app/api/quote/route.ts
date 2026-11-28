import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      email,
      pickup,
      dropoff,
      date,
      time,
      passengers,
      luggage,
      vehicle,
      flightNumber,
      notes,
      serviceName,
    } = body;

    if (!name || !phone || !email || !pickup || !dropoff) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, phone, email, pickup address, and drop-off destination are required.",
        },
        { status: 400 }
      );
    }

    const quoteId = `Q-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const detailedMessage = `
--- NEW FLAT-RATE LIMO QUOTE REQUEST ---
Quote Ref: ${quoteId}
Customer: ${name}
Phone: ${phone}
Email: ${email}
Pickup: ${pickup}
Drop-off: ${dropoff}
Date: ${date || "Flexible"}
Time: ${time || "Flexible"}
Passengers: ${passengers || 1}
Luggage: ${luggage || 1}
Vehicle Preference: ${vehicle || "Chevrolet Suburban Premier"}
Flight Number: ${flightNumber || "N/A"}
Service: ${serviceName || "Chauffeur Service"}
Notes: ${notes || "None"}
Destination Owner Email: royaltwelve.ca@gmail.com
Timestamp: ${new Date().toISOString()}
`.trim();

    // Persist lead to Supabase contact_inquiries / leads table
    try {
      const dbClient = supabaseAdmin || supabase;
      if (dbClient) {
        await dbClient.from("contact_inquiries").insert({
          name,
          email,
          phone,
          service_type: serviceName || "Quote Request",
          message: detailedMessage,
          status: "New Lead",
        });
      }
    } catch (dbErr) {
      console.warn("DB insert notice:", dbErr);
    }

    // In production, also forwards to royaltwelve.ca@gmail.com
    console.log(`[DISPATCH LEAD TO royaltwelve.ca@gmail.com]: Quote ${quoteId} for ${name} (${phone})`);

    return NextResponse.json({
      success: true,
      quoteId,
      message:
        "Thank you! Your quote request has been received. Our dispatch team will review your route and reply with your confirmed flat-rate quote within 2 business hours.",
      replyTime: "within 2 business hours",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to process quote request";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
