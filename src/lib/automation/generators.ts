import { chromium, Browser, Page } from "playwright";

export interface AutomationConfig {
  headless?: boolean;
  timeout?: number;
}

let globalBrowser: Browser | null = null;

async function getPage(): Promise<Page> {
  if (!globalBrowser) {
    globalBrowser = await chromium.launch({ headless: true });
  }
  const page = await globalBrowser.newPage();
  return page;
}

export async function closeBrowser() {
  if (globalBrowser) {
    await globalBrowser.close();
    globalBrowser = null;
  }
}

export async function generateWithVeo3(
  prompt: string,
  options: { duration?: number; aspectRatio?: string } = {}
): Promise<string> {
  const page = await getPage();
  
  try {
    await page.goto("https://ai.google.dev/generative-ai/docs/video/create");
    await page.waitForLoadState("networkidle");
    
    const promptSelector = 'textarea[placeholder*="prompt"], textarea[name="prompt"], textarea';
    await page.waitForSelector(promptSelector, { timeout: 10000 });
    await page.fill(promptSelector, prompt);

    const submitButtons = ['button:has-text("Generate")', 'button:has-text("Create")', 'button[type="submit"]'];
    for (const btn of submitButtons) {
      try {
        await page.click(btn, { timeout: 5000 });
        break;
      } catch {
        continue;
      }
    }

    await page.waitForTimeout(10000);

    const videoSelectors = ['video', '[src*="video"], [src*=".mp4"]'];
    for (const selector of videoSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          const src = await element.getAttribute("src");
          if (src) return src;
        }
      } catch {
        continue;
      }
    }

    throw new Error("Could not find generated video");
  } finally {
    await page.close();
  }
}

export async function generateWithSora2(
  prompt: string,
  options: { duration?: number } = {}
): Promise<string> {
  const page = await getPage();
  
  try {
    await page.goto("https://sora.com");
    await page.waitForLoadState("networkidle");
    
    const promptSelector = 'textarea[placeholder*="prompt"], textarea[name="prompt"], textarea';
    await page.waitForSelector(promptSelector, { timeout: 10000 });
    await page.fill(promptSelector, prompt);

    const submitButtons = ['button:has-text("Generate")', 'button:has-text("Create")', 'button[type="submit"]'];
    for (const btn of submitButtons) {
      try {
        await page.click(btn, { timeout: 5000 });
        break;
      } catch {
        continue;
      }
    }

    await page.waitForTimeout(15000);

    const videoSelectors = ['video', '[src*="video"], [src*=".mp4"]'];
    for (const selector of videoSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          const src = await element.getAttribute("src");
          if (src) return src;
        }
      } catch {
        continue;
      }
    }

    throw new Error("Could not find generated video");
  } finally {
    await page.close();
  }
}

export async function generateWithSeedance2(
  prompt: string,
  options: { duration?: number } = {}
): Promise<string> {
  const page = await getPage();
  
  try {
    await page.goto("https://seedance.ai");
    await page.waitForLoadState("networkidle");
    
    const promptSelector = 'textarea[placeholder*="prompt"], textarea[name="prompt"], textarea';
    await page.waitForSelector(promptSelector, { timeout: 10000 });
    await page.fill(promptSelector, prompt);

    const submitButtons = ['button:has-text("Generate")', 'button:has-text("Create")', 'button[type="submit"]'];
    for (const btn of submitButtons) {
      try {
        await page.click(btn, { timeout: 5000 });
        break;
      } catch {
        continue;
      }
    }

    await page.waitForTimeout(12000);

    const videoSelectors = ['video', '[src*="video"], [src*=".mp4"]'];
    for (const selector of videoSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          const src = await element.getAttribute("src");
          if (src) return src;
        }
      } catch {
        continue;
      }
    }

    throw new Error("Could not find generated video");
  } finally {
    await page.close();
  }
}

export async function generateWithGrok(
  prompt: string,
  options: { resolution?: string } = {}
): Promise<string> {
  const page = await getPage();
  
  try {
    await page.goto("https://x.ai/grok");
    await page.waitForLoadState("networkidle");
    
    const promptSelector = 'textarea[placeholder*="prompt"], textarea[name="prompt"], textarea';
    await page.waitForSelector(promptSelector, { timeout: 10000 });
    await page.fill(promptSelector, prompt);

    const submitButtons = ['button:has-text("Generate")', 'button:has-text("Create")', 'button[type="submit"]'];
    for (const btn of submitButtons) {
      try {
        await page.click(btn, { timeout: 5000 });
        break;
      } catch {
        continue;
      }
    }

    await page.waitForTimeout(10000);

    const imageSelectors = ['img[src*="generated"], img[alt*="generated"], [src*=".png"], [src*=".jpg"]'];
    for (const selector of imageSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          const src = await element.getAttribute("src");
          if (src && src.startsWith("data:")) return src;
          if (src && (src.includes(".png") || src.includes(".jpg") || src.includes(".jpeg"))) return src;
        }
      } catch {
        continue;
      }
    }

    throw new Error("Could not find generated image");
  } finally {
    await page.close();
  }
}

export async function generateWithImageGen(
  prompt: string,
  options: { resolution?: string; style?: string } = {}
): Promise<string> {
  const page = await getPage();
  
  try {
    await page.goto("https://huggingface.co/draw-aug");
    await page.waitForLoadState("networkidle");
    
    const promptSelector = 'textarea[placeholder*="prompt"], textarea[name="prompt"], textarea';
    await page.waitForSelector(promptSelector, { timeout: 10000 });
    await page.fill(promptSelector, prompt);

    const submitButtons = ['button:has-text("Generate")', 'button:has-text("Run")', 'button[type="submit"]'];
    for (const btn of submitButtons) {
      try {
        await page.click(btn, { timeout: 5000 });
        break;
      } catch {
        continue;
      }
    }

    await page.waitForTimeout(8000);

    const imageSelectors = ['img[src*="huggingface"], img[src*="blob"], [src*=".png"], [src*=".jpg"]'];
    for (const selector of imageSelectors) {
      try {
        const elements = await page.$$(selector);
        for (const element of elements) {
          const src = await element.getAttribute("src");
          if (src && (src.includes(".png") || src.includes(".jpg") || src.includes(".jpeg") || src.includes("huggingface"))) {
            return src;
          }
        }
      } catch {
        continue;
      }
    }

    throw new Error("Could not find generated image");
  } finally {
    await page.close();
  }
}
