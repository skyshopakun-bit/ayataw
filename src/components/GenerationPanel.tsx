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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 glass z-10 flex items-center justify-between p-6 border-b border-[#2e2e3a]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20 flex items-center justify-center">
              <span className="text-2xl">{generator.icon}</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{generator.name}</h2>
              <p className="text-[#94a3b8] text-sm">{generator.description}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#1a1a24] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Describe what you want to create
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Enter your prompt for ${generator.name}...`}
              className="input-field min-h-[140px]"
            />
            <div className="flex justify-between mt-2 text-sm text-[#94a3b8]">
              <span>Be specific for better results</span>
              <span>{prompt.length} / 500 characters</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="input-field"
              >
                {stylePresets[generator.id]?.map((preset) => (
                  <option key={preset} value={preset}>{preset}</option>
                ))}
              </select>
            </div>

            {isVideo ? (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="input-field"
                  >
                    {durations.map((d) => (
                      <option key={d} value={d}>{d} seconds</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Aspect Ratio</label>
                  <div className="flex gap-2">
                    {aspectRatios.map((ratio) => (
                      <button
                        key={ratio}
                        onClick={() => setAspectRatio(ratio as "16:9" | "9:16" | "1:1")}
                        className={`flex-1 py-3 rounded-xl border transition-all ${
                          aspectRatio === ratio
                            ? "border-[#8b5cf6] bg-[#8b5cf6]/10 text-[#8b5cf6]"
                            : "border-[#2e2e3a] hover:border-[#8b5cf6]/50"
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
                  <label className="block text-sm font-medium mb-2">Resolution</label>
                  <select
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    className="input-field"
                  >
                    {resolutions.map((res) => (
                      <option key={res} value={res}>{res}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Negative Prompt</label>
                  <input
                    type="text"
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    placeholder="What to avoid..."
                    className="input-field"
                  />
                </div>
              </>
            )}
          </div>

          {result && (
            <div className="rounded-xl overflow-hidden bg-[#0a0a0f] border border-[#2e2e3a]">
              <div className="aspect-video relative">
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
              <div className="p-4 flex gap-2">
                <a
                  href={result.url}
                  download
                  className="btn-primary flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
                <button
                  onClick={() => setResult(null)}
                  className="px-4 py-3 rounded-xl border border-[#2e2e3a] hover:bg-[#1a1a24] transition-colors"
                >
                  Create Another
                </button>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="rounded-xl p-8 bg-[#0a0a0f] border border-[#2e2e3a]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-[#8b5cf6]/30 border-[#8b5cf6] animate-spin" />
                <p className="text-[#94a3b8]">Generating your content...</p>
                <p className="text-sm text-[#64748b]">This may take a minute</p>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 glass p-6 border-t border-[#2e2e3a]">
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
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
