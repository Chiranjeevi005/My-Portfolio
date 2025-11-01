"use client"

import UniqueLoading from "@/components/ui/morph-loading"

export default function UniversalLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-light-bgSecondary/60 dark:bg-dark-bgSecondary/70 backdrop-blur-md z-[9999]">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <UniqueLoading variant="morph" size="lg" />
      </div>
    </div>
  )
}