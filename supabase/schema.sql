-- ==============================================================================
-- ROYAL 12 LIMO - SUPABASE DATABASE SCHEMA INITIALIZATION
-- Project Ref: lmnjwujnpdajitevctgt
-- Description: Creates bookings, profiles, contact inquiries, RLS policies, 
--              and automatic auth triggers.
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 2. TABLE: public.profiles
-- Linked to Supabase Auth users for verified passenger accounts
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(50),
    is_verified BOOLEAN DEFAULT FALSE,
    role VARCHAR(50) DEFAULT 'passenger', -- 'passenger' | 'admin'
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index for fast user lookup
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- ------------------------------------------------------------------------------
-- 3. TABLE: public.bookings
-- Stores all executive reservations, flight details, pricing and statuses
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_ref VARCHAR(50) NOT NULL UNIQUE,
    user_id VARCHAR(100), -- References passenger account ID or auth.users ID
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    pickup_address TEXT NOT NULL,
    dropoff_address TEXT NOT NULL,
    pickup_date VARCHAR(50) NOT NULL,
    pickup_time VARCHAR(50) NOT NULL,
    vehicle_model VARCHAR(100) NOT NULL DEFAULT 'Chevrolet Suburban Premier',
    passenger_count INTEGER DEFAULT 1,
    luggage_count INTEGER DEFAULT 1,
    flight_number VARCHAR(50),
    special_requests TEXT,
    trip_distance_km NUMERIC(8, 2),
    trip_duration_min INTEGER,
    base_fare NUMERIC(10, 2),
    tax_amount NUMERIC(10, 2),
    tip_amount NUMERIC(10, 2),
    total_fare NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    payment_method VARCHAR(50) NOT NULL DEFAULT 'Interac e-Transfer',
    payment_status VARCHAR(50) NOT NULL DEFAULT 'Pending Verification',
    booking_status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    policy_agreed BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_ref ON public.bookings(booking_ref);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_email ON public.bookings(customer_email);

-- ------------------------------------------------------------------------------
-- 4. TABLE: public.contact_inquiries
-- Stores contact form submissions and bespoke corporate charter inquiries
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    service_type VARCHAR(100) DEFAULT 'Airport Transfer',
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'New', -- 'New' | 'In Review' | 'Responded' | 'Archived'
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.contact_inquiries(created_at DESC);

-- ------------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Clean existing policies if re-running
DROP POLICY IF EXISTS "Public can insert bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can read own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Service role full access on bookings" ON public.bookings;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Service role full access on profiles" ON public.profiles;

DROP POLICY IF EXISTS "Public can insert inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Service role full access on inquiries" ON public.contact_inquiries;

-- Bookings Policies:
-- Allow website passengers & guests to insert new bookings
CREATE POLICY "Public can insert bookings" 
    ON public.bookings 
    FOR INSERT 
    WITH CHECK (true);

-- Allow authenticated passengers to see their own bookings
CREATE POLICY "Users can read own bookings" 
    ON public.bookings 
    FOR SELECT 
    USING (
        auth.uid() IS NOT NULL AND (
            user_id = auth.uid()::text 
            OR customer_email = (SELECT email FROM auth.users WHERE id = auth.uid())
        )
    );

-- Allow backend service role (Next.js server API) full read/write access
CREATE POLICY "Service role full access on bookings" 
    ON public.bookings 
    FOR ALL 
    USING (auth.jwt()->>'role' = 'service_role');

-- Profiles Policies:
CREATE POLICY "Users can view own profile" 
    ON public.profiles 
    FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
    ON public.profiles 
    FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "Service role full access on profiles" 
    ON public.profiles 
    FOR ALL 
    USING (auth.jwt()->>'role' = 'service_role');

-- Inquiries Policies:
CREATE POLICY "Public can insert inquiries" 
    ON public.contact_inquiries 
    FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Service role full access on inquiries" 
    ON public.contact_inquiries 
    FOR ALL 
    USING (auth.jwt()->>'role' = 'service_role');

-- ------------------------------------------------------------------------------
-- 6. AUTOMATIC TRIGGER FOR AUTH.USERS -> PUBLIC.PROFILES
-- Automatically creates a profile record when a passenger signs up
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, first_name, last_name, phone, is_verified, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        COALESCE(NEW.email_confirmed_at IS NOT NULL, FALSE),
        'passenger'
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 7. AUTOMATIC UPDATED_AT TRIGGER
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_bookings_updated_at ON public.bookings;
CREATE TRIGGER set_bookings_updated_at
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
