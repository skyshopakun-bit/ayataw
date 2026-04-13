"use client";

import { GeneratorInfo, GeneratorType } from "@/types";

interface GeneratorCardProps {
  generator: GeneratorInfo;
  onSelect: (id: GeneratorType) => void;
}

export function GeneratorCard({ generator, onSelect }: GeneratorCardProps) {
  return (
    <button
      onClick={() => onSelect(generator.id)}
      className="w-full text-left group"
      disabled={generator.status === "coming-soon"}
    >
      <div className="relative bg-white/5 rounded-2xl p-6 h-full border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <span className="text-2xl">{generator.icon}</span>
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22c55e]/20 text-[#22c55e] text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            Live
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-[#8b5cf6] transition-colors">
          {generator.name}
        </h3>

        <p className="text-white/40 text-sm mb-4 line-clamp-2">
          {generator.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {generator.features.slice(0, 3).map((feature, index) => (
            <span 
              key={index}
              className="px-2.5 py-1 rounded-full bg-white/5 text-white/50 text-xs"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b5cf6] via-[#06b6d4] to-[#f472b6] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </button>
  );
}