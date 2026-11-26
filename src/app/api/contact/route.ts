import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, serviceType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const dbClient = supabaseAdmin || supabase;
    const { data, error } = await dbClient.from("contact_inquiries").insert({
      name,
      email,
      phone: phone || null,
      service_type: serviceType || "General Livery Inquiry",
      message,
      status: "New",
    }).select().single();

    if (error) {
      console.error("Supabase contact_inquiries insert error:", error);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you. Your message has been directly delivered to dispatch.",
      inquiry: data || null,
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Failed to submit inquiry.";
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 });
  }
}
