// Utility function to coordinate scroll triggers between sections
export const coordinateScrollTriggers = () => {
  if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
    // Small delay to ensure all components are mounted
    setTimeout(() => {
      (window as any).ScrollTrigger.refresh();
      // Second refresh to ensure proper coordination
      setTimeout(() => {
        (window as any).ScrollTrigger.refresh();
      }, 200);
    }, 100);
  }
};

// Utility function to refresh scroll triggers with a delay
export const refreshScrollTriggers = (delay = 100) => {
  if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
    setTimeout(() => {
      (window as any).ScrollTrigger.refresh();
    }, delay);
  }
};

// Utility function to handle scroll trigger cleanup
export const cleanupScrollTriggers = () => {
  if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
    // Clean up all scroll triggers
    (window as any).ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    // Refresh to ensure clean state
    setTimeout(() => {
      (window as any).ScrollTrigger.refresh();
    }, 100);
  }
};

// Utility function to ensure all sections are visible
export const ensureSectionVisibility = () => {
  if (typeof window !== 'undefined') {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const sections = document.querySelectorAll('#about, #works, #skills, #contact');
      sections.forEach(section => {
        if (section) {
          (section as HTMLElement).style.visibility = 'visible';
          (section as HTMLElement).style.opacity = '1';
        }
      });
    }, 100);
  }
};