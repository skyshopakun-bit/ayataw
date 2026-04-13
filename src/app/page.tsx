"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { GeneratorCard } from "@/components/GeneratorCard";
import { GenerationPanel } from "@/components/GenerationPanel";
import { GeneratorInfo, GeneratorType, GenerationOptions, GenerationResult } from "@/types";

const generators: GeneratorInfo[] = [
  {
    id: "veo3",
    name: "Veo 3",
    description: "Google's latest video generation model with high fidelity",
    contentType: "video",
    icon: "🎬",
    status: "available",
    features: ["High Quality", "8 Seconds", "Text-to-Video"],
  },
  {
    id: "sora2",
    name: "Sora 2",
    description: "OpenAI's advanced video generation model",
    contentType: "video",
    icon: "🌊",
    status: "available",
    features: ["Realistic Motion", "20 Seconds", "World Simulation"],
  },
  {
    id: "seedance2",
    name: "Seedance 2",
    description: "ByteDance's powerful dance and motion generation",
    contentType: "video",
    icon: "💃",
    status: "available",
    features: ["Dance Sequences", "Smooth Motion", "Character Animation"],
  },
  {
    id: "grok",
    name: "Grok Image",
    description: "xAI's image generation with unique style capabilities",
    contentType: "image",
    icon: "🤖",
    status: "available",
    features: ["Artistic Styles", "High Resolution", "Fast Generation"],
  },
  {
    id: "imagegen",
    name: "AI Image Gen",
    description: "Universal image generator using multiple AI models",
    contentType: "image",
    icon: "🎨",
    status: "available",
    features: ["Multiple Models", "Custom Styles", "High Quality"],
  },
];

export default function Home() {
  const [selectedGenerator, setSelectedGenerator] = useState<GeneratorInfo | null>(null);
  const [gallery, setGallery] = useState<GenerationResult[]>([]);
  const [activeFilter, setActiveFilter] = useState<GeneratorType | "all">("all");

  const handleGenerate = async (options: GenerationOptions): Promise<GenerationResult> => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        generator: selectedGenerator?.id,
        ...options,
      }),
    });

    if (!response.ok) {
      throw new Error("Generation failed");
    }

    const result = await response.json();
    setGallery((prev) => [result, ...prev]);
    return result;
  };

  const filteredGallery = activeFilter === "all" 
    ? gallery 
    : gallery.filter((item) => item.generator === activeFilter);

  return (
    <main className="min-h-screen bg-grid bg-radial">
      <Header />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">AI Generator Hub</span>
          </h1>
          <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">
            Create stunning videos and images using the latest AI models. 
            Veo 3, Sora 2, Seedance 2, Grok, and more — all in one place.
          </p>
        </div>

        <div id="generators" className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold">Generators</h2>
            <span className="text-[#94a3b8] text-sm">Select a generator to start</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {generators.map((generator) => (
              <GeneratorCard
                key={generator.id}
                generator={generator}
                onSelect={(id) => {
                  const gen = generators.find((g) => g.id === id);
                  if (gen && gen.status !== "coming-soon") {
                    setSelectedGenerator(gen);
                  }
                }}
              />
            ))}
          </div>
        </div>

        <div id="gallery" className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold">Gallery</h2>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  activeFilter === "all"
                    ? "bg-[#8b5cf6] text-white"
                    : "bg-[#1a1a24] text-[#94a3b8] hover:text-white"
                }`}
              >
                All
              </button>
              {generators.map((gen) => (
                <button
                  key={gen.id}
                  onClick={() => setActiveFilter(gen.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    activeFilter === gen.id
                      ? "bg-[#8b5cf6] text-white"
                      : "bg-[#1a1a24] text-[#94a3b8] hover:text-white"
                  }`}
                >
                  {gen.name}
                </button>
              ))}
            </div>
          </div>

          {filteredGallery.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  className="glass rounded-2xl overflow-hidden card-glow"
                >
                  <div className="aspect-video relative bg-[#0a0a0f]">
                    {item.contentType === "video" ? (
                      <video
                        src={item.url}
                        controls
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.prompt}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-[#94a3b8] line-clamp-2 mb-2">
                      {item.prompt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 rounded-md bg-[#1a1a24] text-xs">
                        {generators.find((g) => g.id === item.generator)?.name}
                      </span>
                      <a
                        href={item.url}
                        download
                        className="p-2 rounded-lg hover:bg-[#1a1a24] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 glass rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1a1a24] flex items-center justify-center">
                <svg className="w-8 h-8 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-[#94a3b8] mb-2">No generated content yet</p>
              <p className="text-sm text-[#64748b]">Select a generator above to create your first AI content</p>
            </div>
          )}
        </div>

        <div id="about" className="text-center py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">About AI Generator Hub</h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto mb-8">
            AI Generator Hub provides unified access to the latest AI video and image generation models. 
            Using browser automation, we connect to various AI services to bring you free generation capabilities.
          </p>
          <div className="flex justify-center gap-4 text-sm text-[#64748b]">
            <span>Note: Some services may require authentication</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#2e2e3a] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#64748b] text-sm">
            AI Generator Hub — Powered by AI
          </p>
        </div>
      </footer>

      {selectedGenerator && (
        <GenerationPanel
          generator={selectedGenerator}
          onClose={() => setSelectedGenerator(null)}
          onGenerate={handleGenerate}
        />
      )}
    </main>
  );
}
