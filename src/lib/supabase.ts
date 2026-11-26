import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://lmnjwujnpdajitevctgt.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtbmp3dWpucGRhaml0ZXZjdGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU2NTUwMTYsImV4cCI6MjExMTIzMTAxNn0.NCOIxkkWAAGZqxki11Gq3GOhu1aTCLEZRq5WODBEonY";

// Client-side Supabase client instance (safe for browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Server-side administrative client (bypasses RLS using Service Role Key)
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const supabaseAdmin: SupabaseClient | null = serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  isVerified: boolean;
  role?: "passenger" | "admin";
  createdAt?: string;
}

export interface BookingSubmissionData {
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  vehicle: string;
  passengers: number;
  luggage: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  flightNumber?: string;
  specialRequests?: string;
  fareAmount: number;
  paymentMethod: "stripe" | "paypal" | "interac";
  bookingRef: string;
  userId: string;
}
