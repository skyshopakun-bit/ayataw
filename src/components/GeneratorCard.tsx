"use client";

import { GeneratorInfo, GeneratorType } from "@/types";

interface GeneratorCardProps {
  generator: GeneratorInfo;
  onSelect: (id: GeneratorType) => void;
}

export function GeneratorCard({ generator, onSelect }: GeneratorCardProps) {
  const statusColors = {
    available: "bg-[#22c55e]",
    busy: "bg-[#f59e0b]",
    "coming-soon": "bg-[#94a3b8]",
  };

  const statusText = {
    available: "Available",
    busy: "Busy",
    "coming-soon": "Coming Soon",
  };

  return (
    <button
      onClick={() => onSelect(generator.id)}
      className="w-full text-left group"
      disabled={generator.status === "coming-soon"}
    >
      <div className="glass card-glow rounded-2xl p-6 h-full relative overflow-hidden gradient-border">
        <div className="absolute top-4 right-4">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-white ${statusColors[generator.status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${generator.status === "available" ? "animate-pulse" : ""} bg-white`} />
            {statusText[generator.status]}
          </span>
        </div>

        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <span className="text-3xl">{generator.icon}</span>
        </div>

        <h3 className="text-xl font-semibold mb-2 group-hover:text-[#8b5cf6] transition-colors">
          {generator.name}
        </h3>

        <p className="text-[#94a3b8] text-sm mb-4">
          {generator.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {generator.features.slice(0, 3).map((feature, index) => (
            <span 
              key={index}
              className="px-2 py-1 rounded-md bg-[#1a1a24] text-xs text-[#94a3b8]"
            >
              {feature}
            </span>
          ))}
        </div>

        {generator.contentType === "video" && (
          <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#8b5cf6]">
              <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm2 2l8 4-8 4V8z"/>
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}
