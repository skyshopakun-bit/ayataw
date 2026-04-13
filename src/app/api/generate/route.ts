import { NextRequest, NextResponse } from "next/server";
import { GeneratorType, GenerationOptions } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { generator, ...options } = body as {
      generator: GeneratorType;
    } & GenerationOptions;

    if (!generator) {
      return NextResponse.json(
        { error: "Generator is required" },
        { status: 400 }
      );
    }

    const mockUrls: Record<GeneratorType, string> = {
      veo3: "https://storage.googleapis.com/creators_DR/ai-gen/asset/6c2f57b3-6f50-4e34-a7a6-cb2fc469b3bb/1.mp4",
      sora2: "https://cdn.openai.com/sora/v1-rc/sora.mp4",
      seedance2: "https://storage.googleapis.com/seedance/demo.mp4",
      grok: "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=1024",
      imagegen: "https://images.unsplash.com/photo-1707345512638-997d31a10cee?w=1024",
    };

    const mockResult = {
      id: `gen_${Date.now()}`,
      generator,
      contentType: ["veo3", "sora2", "seedance2"].includes(generator) ? "video" : "image",
      url: mockUrls[generator],
      prompt: options.prompt || "Sample generated content",
      createdAt: new Date().toISOString(),
      status: "completed" as const,
    };

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return NextResponse.json(mockResult);
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}
