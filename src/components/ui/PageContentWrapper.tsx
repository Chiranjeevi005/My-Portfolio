"use client"

import { useLoaderStore } from "@/store/useLoaderStore"
import { useEffect, useState } from "react"

export default function PageContentWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading } = useLoaderStore()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't render anything on the server when loading
  if (!isClient) {
    return <div>{children}</div>
  }

  return (
    <div 
      id="page-content"
      style={{ 
        opacity: isLoading ? 0 : 1,
        transition: 'opacity 0.7s ease-in-out',
        pointerEvents: isLoading ? 'none' : 'auto'
      }}
    >
      {children}
    </div>
  )
}