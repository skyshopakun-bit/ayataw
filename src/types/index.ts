export type GeneratorType = 'veo3' | 'sora2' | 'seedance2' | 'grok' | 'imagegen';

export type ContentType = 'video' | 'image';

export type GenerationStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface GenerationRequest {
  generator: GeneratorType;
  prompt: string;
  options: GenerationOptions;
}

export interface GenerationOptions {
  prompt?: string;
  duration?: number;
  aspectRatio?: '16:9' | '9:16' | '1:1';
  style?: string;
  resolution?: string;
  negativePrompt?: string;
}

export interface GenerationResult {
  id: string;
  generator: GeneratorType;
  contentType: ContentType;
  url: string;
  thumbnailUrl?: string;
  prompt: string;
  createdAt: string;
  status: GenerationStatus;
}

export interface GalleryItem extends GenerationResult {
  title?: string;
  description?: string;
}

export interface GeneratorInfo {
  id: GeneratorType;
  name: string;
  description: string;
  contentType: ContentType;
  icon: string;
  status: 'available' | 'busy' | 'coming-soon';
  features: string[];
}
