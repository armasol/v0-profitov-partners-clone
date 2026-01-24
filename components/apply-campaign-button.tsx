"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function ApplyCampaignButton({ campaignId, userId }: { campaignId: string; userId: string }) {
  const [isApplying, setIsApplying] = useState(false)
  const [platform, setPlatform] = useState<"tiktok" | "instagram" | "twitter" | null>(null)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const handleApply = async () => {
    if (!platform) return

    setIsApplying(true)

    try {
      const supabase = createClient()

      const { error } = await supabase.from("applications").insert({
        campaign_id: campaignId,
        shiller_id: userId,
        platform: platform,
        status: "under_review",
      })

      if (error) throw error

      setShowModal(false)
      router.refresh()
    } catch (error) {
      console.error("[v0] Application error:", error)
      alert("Failed to apply. You may have already applied to this campaign.")
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-medium uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/20"
      >
        Apply Now
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a] p-8">
            <h3 className="mb-6 text-2xl font-bold uppercase tracking-wider text-white">Choose Platform</h3>

            <div className="space-y-3">
              {(["tiktok", "instagram", "twitter"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`w-full rounded-lg border p-4 text-left transition-all ${
                    platform === p ? "border-white/40 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <span className="font-medium uppercase tracking-wider text-white">{p}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-all hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={!platform || isApplying}
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-all hover:bg-white/20 disabled:opacity-50"
              >
                {isApplying ? "Applying..." : "Apply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
