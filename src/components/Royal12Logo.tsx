import Image from "next/image";
import Link from "next/link";

interface Royal12LogoProps {
  className?: string;
  variant?: "full" | "icon" | "footer";
  size?: "sm" | "md" | "lg";
}

export default function Royal12Logo({
  className = "",
  variant = "full",
  size = "md",
}: Royal12LogoProps) {
  const sizeClasses = {
    sm: "w-9 h-9",
    md: "w-11 h-11 sm:w-12 sm:h-12",
    lg: "w-16 h-16 sm:w-20 sm:h-20",
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] rounded-xl ${className}`}
      aria-label="Royal Twelve Limo Home"
    >
      {/* Official Metallic Gold Circular Emblem */}
      <div
        className={`relative ${sizeClasses} flex-shrink-0 rounded-full transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_16px_rgba(212,175,99,0.45)]`}
      >
        <Image
          src="/images/royal12/royal12-logo.png"
          alt="Royal Twelve Limo - Official Emblem"
          fill
          priority
          sizes="(max-width: 768px) 48px, 80px"
          className="object-contain filter brightness-[1.03] contrast-[1.05]"
        />
      </div>

      {variant !== "icon" && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-black text-lg md:text-xl tracking-wider text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
              ROYAL TWELVE
            </span>
            <span className="text-xs md:text-sm font-bold tracking-widest text-[var(--accent-gold)] uppercase border-l border-[var(--accent-gold)]/40 pl-1.5">
              Limo
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-[0.22em] text-[var(--text-secondary)] font-medium group-hover:text-[var(--accent-gold)] transition-colors -mt-0.5">
            Mississauga • GTA
          </span>
        </div>
      )}
    </Link>
  );
}
