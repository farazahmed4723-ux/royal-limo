import Link from "next/link";

interface Royal12LogoProps {
  className?: string;
  variant?: "full" | "icon" | "footer";
}

export default function Royal12Logo({ className = "", variant = "full" }: Royal12LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF63] rounded-lg ${className}`}
      aria-label="Royal 12 Limo Home"
    >
      {/* Crown & Shield Wings Emblem */}
      <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_2px_10px_rgba(212,175,99,0.35)] transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDEFC8" />
              <stop offset="50%" stopColor="#D4AF63" />
              <stop offset="100%" stopColor="#997A35" />
            </linearGradient>
            <linearGradient id="darkShield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#131B2A" />
              <stop offset="100%" stopColor="#08090B" />
            </linearGradient>
          </defs>

          {/* Majestic Wings Left */}
          <path
            d="M20 54 C12 44 4 48 2 40 C0 32 10 32 16 36 C8 24 16 22 22 28 C26 34 26 44 26 50 Z"
            fill="url(#goldGrad)"
            opacity="0.9"
          />
          <path
            d="M24 60 C16 54 8 58 6 52 C5 46 14 46 18 50 C12 40 20 38 24 44 Z"
            fill="url(#goldGrad)"
            opacity="0.75"
          />

          {/* Majestic Wings Right */}
          <path
            d="M80 54 C88 44 96 48 98 40 C100 32 90 32 84 36 C92 24 84 22 78 28 C74 34 74 44 74 50 Z"
            fill="url(#goldGrad)"
            opacity="0.9"
          />
          <path
            d="M76 60 C84 54 92 58 94 52 C95 46 86 46 82 50 C88 40 80 38 76 44 Z"
            fill="url(#goldGrad)"
            opacity="0.75"
          />

          {/* Central Shield */}
          <path
            d="M50 18 L70 30 C70 56 50 78 50 78 C50 78 30 56 30 30 Z"
            fill="url(#darkShield)"
            stroke="url(#goldGrad)"
            strokeWidth="2.5"
          />

          {/* Royal 5-Point Crown */}
          <path
            d="M37 26 L42 20 L50 24 L58 20 L63 26 L60 30 L40 30 Z"
            fill="url(#goldGrad)"
          />
          <circle cx="42" cy="19" r="1.5" fill="#FFF" />
          <circle cx="50" cy="23" r="1.8" fill="#FFF" />
          <circle cx="58" cy="19" r="1.5" fill="#FFF" />

          {/* Emblem 12 */}
          <text
            x="50"
            y="54"
            textAnchor="middle"
            fill="url(#goldGrad)"
            fontSize="21"
            fontWeight="bold"
            fontFamily="Georgia, serif"
            letterSpacing="-0.5"
          >
            12
          </text>

          {/* Star at bottom */}
          <polygon
            points="50,60 52,64 56,64 53,67 54,71 50,68 46,71 47,67 44,64 48,64"
            fill="url(#goldGrad)"
          />
        </svg>
      </div>

      {variant !== "icon" && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-lg md:text-xl tracking-wider text-[#F5F3EF] group-hover:text-white transition-colors">
              ROYAL 12
            </span>
            <span className="text-xs md:text-sm font-semibold tracking-widest text-[#D4AF63] uppercase border-l border-[#D4AF63]/40 pl-1.5">
              Limo
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#A1A1AA] group-hover:text-[#D4AF63] transition-colors -mt-0.5">
            Mississauga • GTA
          </span>
        </div>
      )}
    </Link>
  );
}
