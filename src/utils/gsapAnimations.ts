import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const animateHeroSection = (elements: HTMLElement[]) => {
  const tl = gsap.timeline();
  
  elements.forEach((element, index) => {
    tl.fromTo(
      element,
      { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power2.out' },
      index * 0.2
    );
  });
  
  return tl;
};

export const animateFromBottom = (element: HTMLElement) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

export const animateFadeUp = (element: HTMLElement) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};