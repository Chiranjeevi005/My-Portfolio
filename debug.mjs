import { chromium } from '@playwright/test';

async function debugWebsite() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Navigate to the website
  await page.goto('http://localhost:3003');
  
  // Wait for the page to load
  await page.waitForTimeout(3000);
  
  // Check if we're in light mode
  const isLightMode = await page.evaluate(() => {
    return !document.documentElement.classList.contains('dark');
  });
  
  console.log('Light mode:', isLightMode);
  
  // Take a screenshot
  await page.screenshot({ path: 'interests-section.png' });
  
  // Get the background color of the capsules
  const capsuleBackgroundColor = await page.evaluate(() => {
    const capsule = document.querySelector('.absolute.transform.-translate-x-1/2.-translate-y-1/2.backdrop-blur-md.rounded-full');
    if (capsule) {
      const bgColor = window.getComputedStyle(capsule).backgroundColor;
      return bgColor;
    }
    return null;
  });
  
  console.log('Capsule background color:', capsuleBackgroundColor);
  
  await browser.close();
}

debugWebsite().catch(console.error);