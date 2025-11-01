"use client"
import { motion } from "framer-motion"
import { useLoaderStore } from "@/store/useLoaderStore"
import UniversalLoader from "./UniversalLoader"

export default function LoadingOverlay() {
  const { isLoading } = useLoaderStore()

  // Always render the loader, but conditionally animate it
  return (
    <motion.div
      initial={{ opacity: 1, zIndex: 9999 }}
      animate={{ 
        opacity: isLoading ? 1 : 0,
        zIndex: isLoading ? 9999 : -1
      }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed inset-0"
    >
      <UniversalLoader />
    </motion.div>
  )
}