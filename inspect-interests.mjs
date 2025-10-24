import { chromium } from '@playwright/test';
import fs from 'fs';

async function inspectInterestsSection() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Navigate to the website
  await page.goto('http://localhost:3003');
  
  // Wait for the page to load
  await page.waitForTimeout(3000);
  
  // Scroll to the Interests section
  await page.evaluate(() => {
    const interestsSection = document.getElementById('interests');
    if (interestsSection) {
      interestsSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  // Wait for scrolling
  await page.waitForTimeout(2000);
  
  // Take a screenshot of the Interests section
  const interestsSection = await page.$('#interests');
  if (interestsSection) {
    await interestsSection.screenshot({ path: 'interests-section-current.png' });
    console.log('Screenshot of Interests section saved as interests-section-current.png');
  }
  
  // Get the background color of a capsule
  const capsuleBackgroundColor = await page.evaluate(() => {
    // Target the capsule container specifically
    const capsule = document.querySelector('.rounded-full.flex.flex-col.items-center.justify-center');
    if (capsule) {
      const bgColor = window.getComputedStyle(capsule).backgroundColor;
      const borderColor = window.getComputedStyle(capsule).borderColor;
      return { backgroundColor: bgColor, borderColor: borderColor };
    }
    return null;
  });
  
  console.log('Capsule background color:', capsuleBackgroundColor);
  
  // Get the section background color
  const sectionBackgroundColor = await page.evaluate(() => {
    const section = document.getElementById('interests');
    if (section) {
      const bgColor = window.getComputedStyle(section).backgroundColor;
      return bgColor;
    }
    return null;
  });
  
  console.log('Section background color:', sectionBackgroundColor);
  
  await browser.close();
}

inspectInterestsSection().catch(console.error);