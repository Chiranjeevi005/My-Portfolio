import { useLoaderStore } from "@/store/useLoaderStore"

export const useApiWithLoader = () => {
  const { startLoading, stopLoading } = useLoaderStore()

  const fetchWithLoader = async (url: string, options: RequestInit = {}) => {
    // Record start time
    const startTime = Date.now()
    
    try {
      startLoading()
      
      const res = await fetch(url, options)
      const data = await res.json()
      
      // Ensure loader displays for at least 3 seconds
      const elapsed = Date.now() - startTime
      const minDisplayTime = 3000 // 3 seconds
      
      if (elapsed < minDisplayTime) {
        await new Promise(resolve => setTimeout(resolve, minDisplayTime - elapsed))
      }
      
      return data
    } catch (error) {
      // Even if there's an error, still respect the minimum display time
      const elapsed = Date.now() - startTime
      const minDisplayTime = 3000 // 3 seconds
      
      if (elapsed < minDisplayTime) {
        await new Promise(resolve => setTimeout(resolve, minDisplayTime - elapsed))
      }
      
      throw error
    } finally {
      stopLoading()
    }
  }

  return { fetchWithLoader }
}