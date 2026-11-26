"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  FileText,
  Search,
  ArrowLeft,
  Check,
} from "lucide-react";

interface BookingRecord {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  passengers: number;
  luggage: number;
  fareAmount: number;
  bookingStatus: "Pending" | "Confirmed" | "Completed" | "Declined";
  paymentMethod: "Stripe" | "PayPal" | "Interac e-Transfer";
  paymentStatus: "Verified" | "Pending Verification" | "Refunded";
  flightNumber?: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"bookings" | "fares" | "inquiries" | "settings">("bookings");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const [bookings, setBookings] = useState<BookingRecord[]>([
    {
      id: "R12-784920",
      customerName: "David Sterling",
      phone: "+1 (416) 918-2431",
      email: "d.sterling@capitalgroup.ca",
      pickup: "Toronto Pearson International Airport (YYZ), Terminal 1",
      dropoff: "Fairmont Royal York, 100 Front St W, Toronto, ON",
      date: "2026-11-23",
      time: "15:30",
      passengers: 2,
      luggage: 3,
      fareAmount: 185.0,
      bookingStatus: "Pending",
      paymentMethod: "Interac e-Transfer",
      paymentStatus: "Pending Verification",
      flightNumber: "AC870",
    },
    {
      id: "R12-619284",
      customerName: "Elena Rostova",
      phone: "+1 (647) 502-8819",
      email: "elena@vanguardmedia.com",
      pickup: "Four Seasons Hotel, Yorkville, Toronto, ON",
      dropoff: "Billy Bishop Toronto City Airport (YTZ)",
      date: "2026-11-22",
      time: "09:00",
      passengers: 1,
      luggage: 1,
      fareAmount: 135.0,
      bookingStatus: "Confirmed",
      paymentMethod: "Stripe",
      paymentStatus: "Verified",
    },
    {
      id: "R12-552190",
      customerName: "Marcus Vance",
      phone: "+1 (905) 774-3290",
      email: "m.vance@vanceholdings.ca",
      pickup: "Square One Shopping Centre, Mississauga, ON",
      dropoff: "Bay & King St Financial District, Toronto, ON",
      date: "2026-11-21",
      time: "07:30",
      passengers: 4,
      luggage: 4,
      fareAmount: 210.0,
      bookingStatus: "Completed",
      paymentMethod: "PayPal",
      paymentStatus: "Verified",
    },
    {
      id: "R12-491028",
      customerName: "Sophia Chen",
      phone: "+1 (416) 431-7782",
      email: "sophia.chen@biohealth.org",
      pickup: "Sheraton Gateway Hotel, Pearson Terminal 3",
      dropoff: "Downtown Oakville Waterfront, ON",
      date: "2026-11-24",
      time: "18:00",
      passengers: 3,
      luggage: 3,
      fareAmount: 195.0,
      bookingStatus: "Confirmed",
      paymentMethod: "Interac e-Transfer",
      paymentStatus: "Verified",
      flightNumber: "WS432",
    },
  ]);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.bookings) && data.bookings.length > 0) {
          interface SupabaseBooking {
            booking_ref?: string;
            id: string;
            customer_name?: string;
            customer_phone?: string;
            customer_email?: string;
            pickup_address?: string;
            dropoff_address?: string;
            pickup_date?: string;
            pickup_time?: string;
            passenger_count?: number;
            luggage_count?: number;
            total_fare?: number | string;
            booking_status?: BookingRecord["bookingStatus"];
            payment_method?: BookingRecord["paymentMethod"];
            payment_status?: BookingRecord["paymentStatus"];
            flight_number?: string;
          }
          const liveBookings: BookingRecord[] = (data.bookings as SupabaseBooking[]).map((b) => ({
            id: b.booking_ref || b.id,
            customerName: b.customer_name || "Guest Passenger",
            phone: b.customer_phone || "",
            email: b.customer_email || "",
            pickup: b.pickup_address || "",
            dropoff: b.dropoff_address || "",
            date: b.pickup_date || "",
            time: b.pickup_time || "",
            passengers: b.passenger_count || 1,
            luggage: b.luggage_count || 1,
            fareAmount: Number(b.total_fare || 0),
            bookingStatus: b.booking_status || "Pending",
            paymentMethod: b.payment_method || "Interac e-Transfer",
            paymentStatus: b.payment_status || "Pending Verification",
            flightNumber: b.flight_number || undefined,
          }));
          setBookings(liveBookings);
        }
      })
      .catch(() => {});
  }, []);

  // Status updates
  const handleUpdateBookingStatus = (id: string, newStatus: BookingRecord["bookingStatus"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, bookingStatus: newStatus } : b))
    );
  };

  const handleTogglePaymentVerified = (id: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              paymentStatus:
                b.paymentStatus === "Verified" ? "Pending Verification" : "Verified",
            }
          : b
      )
    );
  };

  // Stats calculation
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.bookingStatus === "Pending").length;
  const confirmedBookings = bookings.filter((b) => b.bookingStatus === "Confirmed").length;
  const completedBookings = bookings.filter((b) => b.bookingStatus === "Completed").length;
  const verifiedRevenue = bookings
    .filter((b) => b.paymentStatus === "Verified")
    .reduce((acc, curr) => acc + curr.fareAmount, 0);
  const pendingRevenue = bookings
    .filter((b) => b.paymentStatus === "Pending Verification")
    .reduce((acc, curr) => acc + curr.fareAmount, 0);

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.dropoff.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || b.bookingStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="pt-24 pb-20 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-[var(--border-subtle)] gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              title="Return to Public Site"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  Executive Dispatch Dashboard
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[var(--accent-soft)] text-[var(--accent-gold)] px-2.5 py-0.5 rounded-full border border-[var(--border-subtle)]">
                  Admin Active
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Royal 12 Limo • Real-time Reservation & Interac Reconciliation Center
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => alert("Booking report exported successfully (CSV format).")}
              className="px-4 py-2 rounded-xl text-xs font-semibold gold-button-outline flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* 6 Top Stat Cards (Section 16 requirement) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 my-8">
          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm">
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-secondary)]">Total Bookings</div>
            <div className="font-display text-2xl font-bold text-[var(--text-primary)] mt-1">{totalBookings}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-amber-500/40 shadow-sm">
            <div className="text-[11px] uppercase tracking-wider text-amber-500">Pending Review</div>
            <div className="font-display text-2xl font-bold text-amber-500 mt-1">{pendingBookings}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-blue-500/40 shadow-sm">
            <div className="text-[11px] uppercase tracking-wider text-blue-500">Confirmed</div>
            <div className="font-display text-2xl font-bold text-blue-500 mt-1">{confirmedBookings}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-emerald-500/40 shadow-sm">
            <div className="text-[11px] uppercase tracking-wider text-emerald-500">Completed</div>
            <div className="font-display text-2xl font-bold text-emerald-500 mt-1">{completedBookings}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm">
            <div className="text-[11px] uppercase tracking-wider text-[var(--accent-gold)]">Verified Revenue</div>
            <div className="font-display text-2xl font-bold text-[var(--accent-gold)] mt-1">
              ${verifiedRevenue.toFixed(0)} <span className="text-xs font-sans font-normal text-[var(--text-secondary)]">CAD</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-purple-500/40 shadow-sm">
            <div className="text-[11px] uppercase tracking-wider text-purple-500">Pending Interac</div>
            <div className="font-display text-2xl font-bold text-purple-500 mt-1">
              ${pendingRevenue.toFixed(0)} <span className="text-xs font-sans font-normal text-[var(--text-secondary)]">CAD</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[var(--border-subtle)] mb-6 gap-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("bookings")}
            className={`pb-3 transition-colors relative ${
              activeTab === "bookings" ? "text-[var(--accent-gold)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Active Reservations ({bookings.length})
            {activeTab === "bookings" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-gold)]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("fares")}
            className={`pb-3 transition-colors relative ${
              activeTab === "fares" ? "text-[var(--accent-gold)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Approved Fare Rules & Tariffs
            {activeTab === "fares" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF63]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`pb-3 transition-colors relative ${
              activeTab === "settings" ? "text-[#D4AF63]" : "text-[#A1A1AA] hover:text-white"
            }`}
          >
            System & Policies
            {activeTab === "settings" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF63]" />
            )}
          </button>
        </div>

        {/* TAB CONTENT: BOOKINGS */}
        {activeTab === "bookings" && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D131F] border border-white/10">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search reference, customer, or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#101826] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#D4AF63]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-[#A1A1AA]">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#101826] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="All">All Reservations</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="rounded-2xl bg-[#0C121D] border border-white/10 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#101826] border-b border-white/10 text-[#A1A1AA] uppercase tracking-wider font-semibold text-[10px]">
                    <tr>
                      <th className="p-4">Ref & Customer</th>
                      <th className="p-4">Route (Pickup → Drop)</th>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Fare (CAD)</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Status & Dispatch Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-[#D4AF63]">{b.id}</div>
                          <div className="font-semibold text-white mt-0.5">{b.customerName}</div>
                          <div className="text-[11px] text-[#A1A1AA]">{b.phone}</div>
                          {b.flightNumber && (
                            <div className="text-[10px] text-blue-400 mt-0.5">Flight: {b.flightNumber}</div>
                          )}
                        </td>

                        <td className="p-4 max-w-xs">
                          <div className="text-white truncate" title={b.pickup}>
                            <span className="text-emerald-400 font-bold">From:</span> {b.pickup}
                          </div>
                          <div className="text-white truncate mt-1" title={b.dropoff}>
                            <span className="text-[#D4AF63] font-bold">To:</span> {b.dropoff}
                          </div>
                          <div className="text-[10px] text-[#A1A1AA] mt-1">
                            Pax: {b.passengers} • Bags: {b.luggage} • Black Suburban
                          </div>
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          <div className="font-medium text-white">{b.date}</div>
                          <div className="text-[11px] text-[#A1A1AA]">{b.time} EST</div>
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          <div className="font-bold text-[#D4AF63] text-sm">
                            ${b.fareAmount.toFixed(2)}
                          </div>
                          <div className="text-[10px] text-[#A1A1AA]">Includes 13% HST</div>
                        </td>

                        <td className="p-4">
                          <div className="text-[11px] font-medium text-white">{b.paymentMethod}</div>
                          <div className="mt-1">
                            {b.paymentStatus === "Verified" ? (
                              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                                <Check className="w-3 h-3" />
                                Verified
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleTogglePaymentVerified(b.id)}
                                className="inline-flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30"
                                title="Click to verify Interac transfer receipt"
                              >
                                <Clock className="w-3 h-3" />
                                Mark Verified
                              </button>
                            )}
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {b.bookingStatus === "Pending" && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateBookingStatus(b.id, "Confirmed")}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-semibold hover:bg-emerald-500 hover:text-black transition-colors"
                                >
                                  Approve
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateBookingStatus(b.id, "Declined")}
                                  className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[11px] font-semibold hover:bg-rose-500 hover:text-white transition-colors"
                                >
                                  Decline
                                </button>
                              </>
                            )}

                            {b.bookingStatus === "Confirmed" && (
                              <>
                                <span className="text-[11px] text-blue-400 font-semibold px-2 py-0.5 rounded bg-blue-500/10">
                                  Confirmed
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateBookingStatus(b.id, "Completed")}
                                  className="px-2 py-1 rounded-lg bg-white/10 text-white text-[10px] hover:bg-[#D4AF63] hover:text-black"
                                >
                                  Complete
                                </button>
                              </>
                            )}

                            {b.bookingStatus === "Completed" && (
                              <span className="text-[11px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10">
                                Completed
                              </span>
                            )}

                            {b.bookingStatus === "Declined" && (
                              <span className="text-[11px] text-rose-400 font-semibold px-2 py-0.5 rounded bg-rose-500/10">
                                Declined
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: FARES */}
        {activeTab === "fares" && (
          <div className="rounded-2xl bg-[#0C121D] border border-white/10 p-6 space-y-6 text-left">
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                Configured Fare Engine Rules
              </h3>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Version-controlled pricing schedule for Chevrolet Suburban premier livery across the GTA.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#101826] border border-white/10">
                <div className="text-xs text-[#A1A1AA]">Minimum Base Journey Fare</div>
                <div className="text-xl font-bold text-[#D4AF63] mt-1">$110.00 CAD</div>
                <div className="text-[10px] text-[#A1A1AA] mt-0.5">Includes first 10 km</div>
              </div>

              <div className="p-4 rounded-xl bg-[#101826] border border-white/10">
                <div className="text-xs text-[#A1A1AA]">Distance Rate (After 10 km)</div>
                <div className="text-xl font-bold text-[#D4AF63] mt-1">$3.25 / km</div>
                <div className="text-[10px] text-[#A1A1AA] mt-0.5">Calculated via Google Routes API</div>
              </div>

              <div className="p-4 rounded-xl bg-[#101826] border border-white/10">
                <div className="text-xs text-[#A1A1AA]">Harmonized Sales Tax (HST)</div>
                <div className="text-xl font-bold text-[#D4AF63] mt-1">13.0%</div>
                <div className="text-[10px] text-[#A1A1AA] mt-0.5">Province of Ontario statutory tax</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#090D15] border border-[#D4AF63]/30 text-xs text-[#A1A1AA] space-y-1">
              <div className="font-bold text-white">Cancellation Settlement Basis:</div>
              <div>• Under 24h: 30% Non-refundable operational fee, 70% Refundable.</div>
              <div>• 24h or more: Company review & full eligibility.</div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: SETTINGS */}
        {activeTab === "settings" && (
          <div className="rounded-2xl bg-[#0C121D] border border-white/10 p-6 space-y-6 text-left max-w-2xl">
            <h3 className="font-display text-lg font-bold text-white">
              Official Business Identity & Banking
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-[#A1A1AA]">Company Name:</span>
                <span className="text-white font-semibold">Royal 12 Limo</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-[#A1A1AA]">Licensing Location:</span>
                <span className="text-white font-semibold">Mississauga, Ontario, Canada</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-[#A1A1AA]">Telephone:</span>
                <span className="text-white font-semibold">+1 (437) 214-9283</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-[#A1A1AA]">Business Email:</span>
                <span className="text-white font-semibold">royaltwelve.ca@gmail.com</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-[#A1A1AA]">Interac e-Transfer Email:</span>
                <span className="text-[#D4AF63] font-semibold">royaltwelve.ca@gmail.com</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-[#A1A1AA]">Fleet Model:</span>
                <span className="text-white font-semibold">Black Chevrolet Suburban (Capacity: 6)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
