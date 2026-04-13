import { test, expect } from '@playwright/test';

test.describe('Synthesia Automation', () => {
  test('login to Synthesia', async ({ page }) => {
    await page.goto('https://app.synthesia.io/#/welcome');
    
    // Click sign up / login button
    await page.click('text=Sign Up');
    
    // Enter email - update with your email
    await page.fill('input[type="email"]', process.env.SYNTHESIA_EMAIL || 'your-email@example.com');
    await page.click('button:has-text("Continue")');
    
    // Wait for password field or OTP
    await page.waitForTimeout(2000);
  });

  test('create video with Sora 2', async ({ page }) => {
    await page.goto('https://app.synthesia.io/#/videos/create');
    
    // Wait for video creation interface
    await page.waitForTimeout(3000);
    
    // Select Sora 2 model if available
    const sora2Option = page.locator('text=Sora 2');
    if (await sora2Option.isVisible()) {
      await sora2Option.click();
    }
    
    // Enter prompt for video generation
    await page.fill('textarea[placeholder*="script"]', 'Your video script here');
    
    // Generate video
    await page.click('button:has-text("Generate Video")');
    
    // Wait for generation
    await page.waitForTimeout(10000);
  });
});