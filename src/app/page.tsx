"use client";

import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { GeneratorCard } from "@/components/GeneratorCard";
import { GenerationPanel } from "@/components/GenerationPanel";
import { GeneratorInfo, GeneratorType, GenerationOptions, GenerationResult } from "@/types";

const generators: GeneratorInfo[] = [
  {
    id: "veo3",
    name: "Veo 3",
    description: "Google's next-gen video generation with stunning realism",
    contentType: "video",
    icon: "🎬",
    status: "available",
    features: ["8K Quality", "10s Duration", "Physics Accurate"],
  },
  {
    id: "sora2",
    name: "Sora 2",
    description: "OpenAI's revolutionary world simulation engine",
    contentType: "video",
    icon: "🌊",
    status: "available",
    features: ["World Building", "Complex Scenes", "Creative AI"],
  },
  {
    id: "seedance2",
    name: "Seedance 2",
    description: "AI-powered motion and dance generation",
    contentType: "video",
    icon: "💃",
    status: "available",
    features: ["Character Motion", "Smooth Transitions", "Style Transfer"],
  },
  {
    id: "grok",
    name: "Grok Vision",
    description: "xAI's imaginative image generation",
    contentType: "image",
    icon: "✨",
    status: "available",
    features: ["Creative Freedom", "High Detail", "Fast Render"],
  },
  {
    id: "imagegen",
    name: "AI Images",
    description: "Universal image generation with multiple models",
    contentType: "image",
    icon: "🎨",
    status: "available",
    features: ["Multiple Engines", "Style Diversity", "4K Output"],
  },
];

export default function Home() {
  const [selectedGenerator, setSelectedGenerator] = useState<GeneratorInfo | null>(null);
  const [gallery, setGallery] = useState<GenerationResult[]>([]);
  const [activeFilter, setActiveFilter] = useState<GeneratorType | "all">("all");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove);
      return () => hero.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

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
    <main className="min-h-screen bg-[#030307]">
      <Header />

      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(139, 92, 246, 0.15), transparent 40%)`,
            }}
          />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiMyRjJFMyIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#8b5cf6] animate-pulse" />
            <span className="text-sm text-white/60">Powered by AI • Free to Use</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <span className="block text-white/90">Create with</span>
            <span className="block gradient-text mt-2">AI Magic</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
            Generate stunning videos and images using the world's most advanced AI models. 
            Veo 3, Sora, Seedance, Grok — all in one beautiful interface.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#generators"
              className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-lg overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Creating
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <button 
              onClick={() => {
                const el = document.getElementById('gallery');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-full border border-white/20 text-white/80 hover:bg-white/5 transition-colors font-medium"
            >
              View Gallery
            </button>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 text-white/30 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Fast Generation</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>No Credit Card</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <section id="generators" className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="gradient-text">AI Generators</span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              Choose from the world's most advanced AI models for video and image creation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {generators.map((generator, index) => (
              <div 
                key={generator.id}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8b5cf6] via-[#06b6d4] to-[#f472b6] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <div className="relative">
                  <GeneratorCard
                    generator={generator}
                    onSelect={(id) => {
                      const gen = generators.find((g) => g.id === id);
                      if (gen && gen.status !== "coming-soon") {
                        setSelectedGenerator(gen);
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-32 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-2">Your Creations</h2>
              <p className="text-white/40">Browse and manage your generated content</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeFilter === "all"
                    ? "bg-white text-black"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                All
              </button>
              {generators.map((gen) => (
                <button
                  key={gen.id}
                  onClick={() => setActiveFilter(gen.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeFilter === gen.id
                      ? "bg-white text-black"
                      : "bg-white/5 text-white/60 hover:bg-white/10"
                  }`}
                >
                  {gen.name}
                </button>
              ))}
            </div>
          </div>

          {filteredGallery.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]"
                >
                  <div className="aspect-square relative bg-black/50">
                    {item.contentType === "video" ? (
                      <video
                        src={item.url}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.prompt}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                      <div className="flex gap-2">
                        <a
                          href={item.url}
                          download
                          className="flex-1 py-2 bg-white/20 backdrop-blur rounded-lg text-center text-sm font-medium hover:bg-white/30 transition-colors"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-white/60 line-clamp-2 mb-3">
                      {item.prompt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/60">
                        {generators.find((g) => g.id === item.generator)?.name}
                      </span>
                      <span className="text-xs text-white/30">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/5">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                <svg className="w-10 h-10 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No creations yet</h3>
              <p className="text-white/40 mb-6">Start generating to see your creations here</p>
              <a 
                href="#generators"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors"
              >
                Choose a Generator
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>

      <section id="about" className="py-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#8b5cf6]/20 to-[#06b6d4]/20 rounded-full border border-[#8b5cf6]/20 mb-8">
            <span className="text-[#8b5cf6]">◆</span>
            <span className="text-white/60">About AI Generator Hub</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            The Future of
            <span className="gradient-text block mt-2">AI Creation</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed mb-8">
            We believe AI generation should be accessible to everyone. Our platform connects you to the world's most powerful AI models 
            through a beautiful, intuitive interface. No credit card required, no complicated setup.
          </p>
          <div className="grid grid-cols-3 gap-8 py-8 border-t border-b border-white/10">
            <div>
              <div className="text-3xl font-bold gradient-text mb-1">5+</div>
              <div className="text-sm text-white/40">AI Models</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-1">∞</div>
              <div className="text-sm text-white/40">Free Generations</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-1">0</div>
              <div className="text-sm text-white/40">Credit Card</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-semibold">AI Generator Hub</span>
          </div>
          <p className="text-sm text-white/30">
            Built with Next.js & AI • Free Forever
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