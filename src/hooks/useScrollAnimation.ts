import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollAnimationOptions {
  trigger?: Element | string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  toggleActions?: string;
  markers?: boolean;
  immediateRender?: boolean;
}

/**
 * Custom hook for handling scroll animations with proper viewport checking
 * @param elementRef - Ref to the element to animate
 * @param animationFn - Function that returns the GSAP animation
 * @param options - ScrollTrigger options
 * @param dependencies - Dependencies to re-run the effect
 */
export const useScrollAnimation = (
  elementRef: React.RefObject<Element>,
  animationFn: () => gsap.core.Tween | gsap.core.Timeline,
  options: Omit<ScrollAnimationOptions, 'animation'>,
  dependencies: any[] = []
) => {
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if element is already in viewport
    const isInViewport = () => {
      const rect = element.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom >= 0;
    };

    // Kill previous trigger if exists
    if (triggerRef.current) {
      triggerRef.current.kill();
      triggerRef.current = null;
    }

    // If element is already in viewport, set initial state immediately
    if (isInViewport()) {
      // Set the final state of the animation immediately
      const anim = animationFn();
      if (anim) {
        anim.progress(1);
      }
    } else {
      // Otherwise, create ScrollTrigger animation
      const scrollTriggerOptions: ScrollTrigger.Vars = {
        start: options.start || 'top 85%',
        toggleActions: options.toggleActions || 'play none none reverse',
        scrub: options.scrub !== undefined ? options.scrub : false,
        markers: options.markers || false,
        ...options,
        trigger: element
      };

      triggerRef.current = ScrollTrigger.create({
        ...scrollTriggerOptions,
        animation: animationFn()
      });
    }

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
    };
  }, [elementRef, animationFn, options, ...dependencies]);

  return triggerRef;
};

/**
 * Custom hook for handling multiple scroll animations with viewport checking
 * @param animations - Array of animation configurations
 * @param dependencies - Dependencies to re-run the effect
 */
export const useMultipleScrollAnimations = (
  animations: {
    ref: React.RefObject<Element>;
    animationFn: () => gsap.core.Tween | gsap.core.Timeline;
    options: Omit<ScrollAnimationOptions, 'animation'>;
  }[],
  dependencies: any[] = []
) => {
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    // Clean up previous triggers
    triggersRef.current.forEach(trigger => trigger.kill());
    triggersRef.current = [];

    animations.forEach(({ ref, animationFn, options }) => {
      const element = ref.current;
      if (!element) return;

      // Check if element is already in viewport
      const isInViewport = () => {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
      };

      // If element is already in viewport, set initial state immediately
      if (isInViewport()) {
        // Set the final state of the animation immediately
        const anim = animationFn();
        if (anim) {
          anim.progress(1);
        }
      } else {
        // Otherwise, create ScrollTrigger animation
        const scrollTriggerOptions: ScrollTrigger.Vars = {
          start: options.start || 'top 85%',
          toggleActions: options.toggleActions || 'play none none reverse',
          scrub: options.scrub !== undefined ? options.scrub : false,
          markers: options.markers || false,
          ...options,
          trigger: element
        };

        const trigger = ScrollTrigger.create({
          ...scrollTriggerOptions,
          animation: animationFn()
        });
        
        if (trigger) {
          triggersRef.current.push(trigger);
        }
      }
    });

    // Force refresh ScrollTrigger to ensure proper initialization
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, [...dependencies]);

  return triggersRef;
};