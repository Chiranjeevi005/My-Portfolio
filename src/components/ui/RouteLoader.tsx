"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useLoaderStore } from "@/store/useLoaderStore"

let routeChangeTimer: NodeJS.Timeout | null = null;

export default function RouteLoader() {
  const pathname = usePathname()
  const { startLoading, stopLoading } = useLoaderStore()
  
  // Track if this is the first load
  useEffect(() => {
    // Set a flag in sessionStorage to indicate initial load is complete
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('initialLoadComplete', 'true');
    }
  }, []);

  useEffect(() => {
    // Skip on initial load - check if this is the first load
    if (typeof window !== 'undefined') {
      const isInitialLoad = !sessionStorage.getItem('initialLoadComplete');
      if (isInitialLoad) {
        return;
      }
    }
    
    // Clear any existing timer
    if (routeChangeTimer) {
      clearTimeout(routeChangeTimer);
      routeChangeTimer = null;
    }
    
    // Start loading when route changes
    startLoading()
    
    // Ensure loader displays for at least 3 seconds
    routeChangeTimer = setTimeout(() => {
      stopLoading()
      routeChangeTimer = null;
    }, 3000)

    return () => {
      if (routeChangeTimer) {
        clearTimeout(routeChangeTimer)
        routeChangeTimer = null
      }
    }
  }, [pathname, startLoading, stopLoading])

  return null
}