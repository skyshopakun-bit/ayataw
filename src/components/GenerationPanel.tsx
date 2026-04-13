"use client";

import { useState, useEffect } from "react";
import { GeneratorInfo, GenerationOptions, GenerationResult } from "@/types";

interface GenerationPanelProps {
  generator: GeneratorInfo | null;
  onClose: () => void;
  onGenerate: (options: GenerationOptions) => Promise<GenerationResult>;
}

const stylePresets = {
  veo3: ["Cinematic", "Realistic", "Animated", "Artistic", "Abstract"],
  sora2: ["Natural", "Creative", "Fantasy", "Sci-Fi", "Documentary"],
  seedance2: ["Dynamic", "Smooth", "Energetic", "Moody", "Experimental"],
  grok: ["Photo", "Illustration", "3D Render", "Art", "Anime"],
  imagegen: ["Realistic", "Artistic", "Abstract", "Anime", "Concept Art"],
};

const durations = [3, 5, 8];
const aspectRatios = ["16:9", "9:16", "1:1"];
const resolutions = ["512x512", "768x768", "1024x1024", "1024x1792", "1792x1024"];

export function GenerationPanel({ generator, onClose, onGenerate }: GenerationPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [duration, setDuration] = useState(5);
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16" | "1:1">("16:9");
  const [resolution, setResolution] = useState("1024x1024");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);

  useEffect(() => {
    if (generator) {
      const presets = stylePresets[generator.id] || [];
      if (presets.length > 0) {
        setStyle(presets[0]);
      }
    }
  }, [generator]);

  if (!generator) return null;

  const isVideo = generator.contentType === "video";

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setResult(null);

    try {
      const options: GenerationOptions = {
        prompt,
        ...(isVideo && { duration, aspectRatio, style }),
        ...(!isVideo && { resolution, style, negativePrompt }),
      };
      
      const res = await onGenerate(options);
      setResult(res);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#050508] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 via-transparent to-[#06b6d4]/5" />
        
        <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20 flex items-center justify-center">
              <span className="text-3xl">{generator.icon}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{generator.name}</h2>
              <p className="text-white/40 text-sm">{isVideo ? "Video Generation" : "Image Generation"}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative z-10 p-6 space-y-6 overflow-y-auto max-h-[60vh]">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-3">
              Describe what you want to create
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Enter your prompt for ${generator.name}...`}
              maxLength={500}
              className="w-full min-h-[140px] bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#8b5cf6]/50 focus:ring-1 focus:ring-[#8b5cf6]/20 transition-all resize-none"
            />
            <div className="flex justify-between mt-3 text-sm">
              <span className="text-white/40">Be specific for better results</span>
              <span className={`${prompt.length > 450 ? "text-red-400" : "text-white/30"}`}>
                {prompt.length}/500
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-3">Style</label>
              <div className="relative">
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white appearance-none cursor-pointer focus:outline-none focus:border-[#8b5cf6]/50"
                >
                  {stylePresets[generator.id]?.map((preset) => (
                    <option key={preset} value={preset} className="bg-[#050508]">{preset}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {isVideo ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-3">Duration</label>
                  <div className="relative">
                    <select
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white appearance-none cursor-pointer focus:outline-none focus:border-[#8b5cf6]/50"
                    >
                      {durations.map((d) => (
                        <option key={d} value={d} className="bg-[#050508]">{d} seconds</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-white/70 mb-3">Aspect Ratio</label>
                  <div className="flex gap-2">
                    {aspectRatios.map((ratio) => (
                      <button
                        key={ratio}
                        onClick={() => setAspectRatio(ratio as "16:9" | "9:16" | "1:1")}
                        className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${
                          aspectRatio === ratio
                            ? "border-[#8b5cf6] bg-[#8b5cf6]/10 text-[#8b5cf6]"
                            : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
                        }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-3">Resolution</label>
                  <div className="relative">
                    <select
                      value={resolution}
                      onChange={(e) => setResolution(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white appearance-none cursor-pointer focus:outline-none focus:border-[#8b5cf6]/50"
                    >
                      {resolutions.map((res) => (
                        <option key={res} value={res} className="bg-[#050508]">{res}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-3">Negative Prompt</label>
                  <input
                    type="text"
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    placeholder="What to avoid..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#8b5cf6]/50"
                  />
                </div>
              </>
            )}
          </div>

          {result && (
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <div className="aspect-video relative bg-black/50">
                {result.contentType === "video" ? (
                  <video 
                    src={result.url} 
                    controls 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img 
                    src={result.url} 
                    alt={result.prompt} 
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              <div className="p-4 flex gap-3 bg-white/5">
                <a
                  href={result.url}
                  download
                  className="flex-1 py-3 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-xl text-center font-medium text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
                <button
                  onClick={() => setResult(null)}
                  className="px-4 py-3 rounded-xl border border-white/10 text-white/60 hover:bg-white/5 transition-colors"
                >
                  Create Another
                </button>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="rounded-2xl p-10 bg-white/5 border border-white/10">
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-white/10" />
                  <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-[#8b5cf6] border-t-transparent animate-spin" />
                  <div className="absolute inset-2 w-16 h-16 rounded-full border-4 border-[#06b6d4] border-b-transparent animate-spin" style={{ animationDirection: "reverse", animationDuration: "1s" }} />
                </div>
                <div className="text-center">
                  <p className="text-white font-medium mb-1">Generating your content...</p>
                  <p className="text-white/40 text-sm">This may take a minute</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-10 p-6 border-t border-white/5">
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full py-4 bg-gradient-to-r from-[#8b5cf6] via-[#a78bfa] to-[#06b6d4] rounded-2xl text-white font-semibold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate with {generator.name}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}