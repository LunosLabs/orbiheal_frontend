import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Bot,
  Star,
  BookOpenCheck,
  Verified,
  SearchCheck,
} from "lucide-react";

// Enhanced Features array with icon components
const Features = [
  {
    badge: "AI Quality",
    title: "AI-Powered Accuracy",
    description:
      "Every medicine result is checked by advanced AI and verified by medical experts, ensuring you always get accurate, up-to-date information.",
    icon: Bot,
    color: "text-blue-400 bg-blue-900/30",
  },
  {
    badge: "Safety First",
    title: "Safe & Secure",
    description:
      "Your health and privacy are protected with end-to-end encryption and strict data security standards. We never share your data.",
    icon: ShieldCheck,
    color: "text-green-400 bg-green-900/30",
  },
  {
    badge: "Premium Experience",
    title: "Premium User Experience",
    description:
      "Enjoy a seamless, ad-free interface designed for clarity and ease. Fast, reliable, and always available—so you can focus on your health.",
    icon: Star,
    color: "text-yellow-400 bg-yellow-900/30",
  },
  {
    badge: "Comprehensive",
    title: "All Brands, All Details",
    description:
      "Access verified details on medicines, including brands, prices, and manufacturers. Our database is updated daily from trusted sources.",
    icon: BookOpenCheck,
    color: "text-purple-400 bg-purple-900/30",
  },
  {
    badge: "Trusted",
    title: "Verified Sources",
    description:
      "All data is sourced from licensed pharmacy partners and official databases, ensuring accuracy and reliability you can count on.",
    icon: Verified,
    color: "text-sky-400 bg-sky-900/30",
  },
  {
    badge: "Smart Search",
    title: "Intelligent Search",
    description:
      "Find medicines quickly by name, brand, or manufacturer. Our smart search tool helps you discover the right medicine in seconds.",
    icon: SearchCheck,
    color: "text-pink-400 bg-pink-900/30",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black mb-4 text-center text-white">
          Why <span className="text-blue-400">OrbiHeal</span>?
        </h2>
        <p className="text-lg sm:text-xl text-zinc-300 font-medium text-center max-w-3xl mx-auto mb-10">
          OrbiHeal is built for trust, safety, and reliability. Our platform uses advanced AI and strict security practices to ensure you receive only the most accurate, up-to-date medicine information—always from verified sources. Your privacy, safety, and experience are our top priorities.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {Features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start bg-zinc-900/70 rounded-2xl p-6 shadow-lg border border-zinc-800/60 hover:shadow-xl transition-all min-h-[220px] group"
            >
              <div className={`mb-4 p-3 rounded-full shadow ${feature.color} group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7`} />
              </div>
              <Badge
                className="
                  mb-3 px-3 py-1 rounded-full text-xs font-semibold
                  bg-blue-950/70 text-blue-300 border-none
                  tracking-wide
                "
              >
                {feature.badge}
              </Badge>
              <div className="text-lg font-bold text-white mb-2">{feature.title}</div>
              <div className="text-sm text-zinc-400">{feature.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
