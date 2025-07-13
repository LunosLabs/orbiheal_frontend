import Logo from "../Logo";
import BannerActions from "./BannerActions";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 sm:px-6 py-4">
        {/* Left: Text + Actions */}
        <div className="w-full lg:w-3/5 flex flex-col items-start gap-6">
          {/* Trust Badge */}
          <Badge
            className="
              flex items-center gap-2 px-3 py-1 rounded-full
              bg-zinc-900/70 text-emerald-300 border-none
              drop-shadow-[0_0_8px_#34d399]
            "
            style={{
              filter: "drop-shadow(0 0 8px #34d399)",
            }}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" fill="#34d399" opacity="0.2" />
              <path
                d="M7 13l3 3 7-7"
                stroke="#34d399"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Trusted Platform
          </Badge>

          {/* Heading */}
          <h1 className="font-black text-white leading-tight tracking-tight text-3xl sm:text-5xl lg:text-6xl">
            Search <span className="text-blue-400">Trusted Medicines</span>
            <br className="hidden sm:block" />
            Instantly with{" "}
            <span className="text-blue-400">
              <Logo size="xl" />
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-zinc-300 font-medium max-w-xl">
            Reliable, up-to-date info on medicines, prices, brands, and
            manufacturers — always from{" "}
            <span className="text-blue-400 font-semibold">
              verified sources
            </span>
            .
          </p>

          {/* Last Updated */}
          <span className="text-xs text-zinc-500 font-medium select-none mt-1 mb-2">
            <svg
              className="w-3 h-3 inline-block mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l2 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Updated: <span className="text-white">June 28, 2025</span>
          </span>

          {/* CTA */}
          <div className="w-full max-w-xs">
            <BannerActions />
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="w-full max-w-[340px] flex-shrink-0">
          <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[340px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/login.jpg"
              alt="Medicine Search Banner"
              fill
              sizes="(max-width: 1024px) 100vw, 340px"
              className="object-cover rounded-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
