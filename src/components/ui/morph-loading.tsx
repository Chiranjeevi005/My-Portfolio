"use client"

import { cn } from "@/lib/utils"

interface UniqueLoadingProps {
  variant?: "morph"
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function UniqueLoading({
  variant = "morph",
  size = "md",
  className,
}: UniqueLoadingProps) {
  const containerSizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  if (variant === "morph") {
    return (
      <div className={cn("relative", containerSizes[size], className)}>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Four different colored elements with distinct animations */}
          <div 
            className="absolute w-4 h-4 bg-[#E85D45] dark:bg-[#FF8A5C]"
            style={{
              animation: `morph-0 2s infinite ease-in-out`,
              animationDelay: `0s`,
            }} 
          />
          <div 
            className="absolute w-4 h-4 bg-[#D7745B] dark:bg-[#FFC48A]"
            style={{
              animation: `morph-1 2s infinite ease-in-out`,
              animationDelay: `0.2s`,
            }} 
          />
          <div 
            className="absolute w-4 h-4 bg-[#FF6F61] dark:bg-[#FF9D6E]"
            style={{
              animation: `morph-2 2s infinite ease-in-out`,
              animationDelay: `0.4s`,
            }} 
          />
          <div 
            className="absolute w-4 h-4 bg-[#FF9D6E] dark:bg-[#FFB185]"
            style={{
              animation: `morph-3 2s infinite ease-in-out`,
              animationDelay: `0.6s`,
            }} 
          />
        </div>
      </div>
    )
  }

  return null
}