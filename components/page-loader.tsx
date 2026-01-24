"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function PageLoader() {
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timeout)
  }, [pathname])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black">
      <div className="animate-pulse-scale">
        <img src="/logo.png" alt="Loading" className="h-32 w-auto animate-fade-in" />
      </div>
    </div>
  )
}
