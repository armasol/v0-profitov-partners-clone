"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function CampaignsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [campaigns] = useState([
    {
      id: "1",
      name: "Fanatics Sportsbook Campaign",
      description: "Post the provided content, add a caption and your own unique twist.",
      rate_per_1k_views: 3.0,
      budget: 4000,
      platforms: ["Instagram", "YouTube"],
      status: "active",
    },
    {
      id: "2",
      name: "Rio Da Yung OG - Stupid Shit (A.T. mixxx)",
      description: 'Post videos using Rio Da Yung OG\'s newly remixed track "Stupid Shit (A.T. mixxx)"',
      rate_per_1k_views: 0.3,
      budget: 3000,
      platforms: ["TikTok"],
      status: "active",
    },
    {
      id: "3",
      name: "VD - Embrasse moi",
      description: 'Post videos using VD\'s track: "Embrasse moi" - A chill house beat, very nonchalant vibes.',
      rate_per_1k_views: 0.2,
      budget: 1600,
      platforms: ["Instagram"],
      status: "active",
    },
    {
      id: "4",
      name: "Spartans Logo Campaign",
      description: "Post videos with the Spartans logo, get paid. Pages must have 40% USA audience.",
      rate_per_1k_views: 0.06,
      budget: 10000,
      platforms: ["Instagram"],
      status: "active",
    },
    {
      id: "5",
      name: "MonkeyTilt Casino",
      description:
        "Create rainbet style videos for MonkeyTilt. Film your face/POV and create viral content that incorporates MonkeyTilt casino. $15 per video bonus. Must be from: New Zealand, Ireland, Australia, Italy, France, Germany, Canada, Mexico, Philippines, Japan, South Korea, South Africa, Sweden, Norway, Finland.",
      rate_per_1k_views: 3.0,
      budget: 10000,
      platforms: ["TikTok", "Instagram"],
      status: "active",
    },
    {
      id: "6",
      name: "cs2dle.net Clips Campaign",
      description: "Post clips of streamers playing on cs2dle.net, the interactive CS2 quiz site.",
      rate_per_1k_views: 0.15,
      budget: 2000,
      platforms: ["TikTok", "Instagram", "YouTube"],
      status: "active",
    },
    {
      id: "7",
      name: "Tune.FM Logo Campaign",
      description: "Post videos featuring the Tune.FM logo and branding.",
      rate_per_1k_views: 0.15,
      budget: 1500,
      platforms: ["Instagram", "TikTok"],
      status: "active",
    },
    {
      id: "8",
      name: "Cabrzy Fan Page Campaign",
      description:
        "Start a Cabrzy fan page or post his clips on Streamer/Gambling niche pages, get paid for every view.",
      rate_per_1k_views: 1.5,
      budget: 10000,
      platforms: ["TikTok", "Instagram", "YouTube"],
      status: "active",
    },
    {
      id: "9",
      name: "Superform Logo Campaign",
      description: "Post videos featuring the Superform logo and branding.",
      rate_per_1k_views: 0.15,
      budget: 3000,
      platforms: ["Instagram", "TikTok"],
      status: "active",
    },
    {
      id: "10",
      name: "Sinparty Logo Campaign",
      description: "Post videos with the Sinparty logo, get paid.",
      rate_per_1k_views: 0.04,
      budget: 5000,
      platforms: ["Instagram", "TikTok", "Twitter"],
      status: "active",
    },
  ])
  const [applications, setApplications] = useState<any[]>([])

  useEffect(() => {
    const sessionData = localStorage.getItem("shiller_session")
    if (!sessionData) {
      router.push("/signin")
      return
    }

    // Load applications from localStorage
    const savedApplications = localStorage.getItem("campaign_applications")
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications))
    }

    setLoading(false)
  }, [router])

  const handleApply = (campaignId: string, platform: string) => {
    const newApplication = {
      id: Date.now().toString(),
      campaign_id: campaignId,
      platform,
      status: "under_review",
      created_at: new Date().toISOString(),
    }

    const updatedApplications = [...applications, newApplication]
    setApplications(updatedApplications)
    localStorage.setItem("campaign_applications", JSON.stringify(updatedApplications))
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <img src="/logo.png" alt="Loading" className="h-32 w-auto animate-pulse" />
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-[#0a0a0a]">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('https://profitov.partners/static/img/home-bg-desktop.jpg')",
          backgroundPosition: "center center",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between border-b border-white/10 bg-black/40 px-12 py-6 backdrop-blur-md">
          <Link href="/dashboard" className="flex items-center">
            <img src="/logo.png" alt="SHILLER" className="h-10 w-auto" />
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm font-medium uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/10"
          >
            Back to Dashboard
          </Link>
        </header>

        <main className="flex-1 px-12 py-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <h1 className="text-4xl font-black uppercase tracking-wider text-white">Browse Campaigns</h1>

            {campaigns.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-md">
                <p className="text-white/60">No active campaigns available at the moment. Check back soon!</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {campaigns.map((campaign) => {
                  const hasApplied = applications.some((app) => app.campaign_id === campaign.id)
                  const application = applications.find((app) => app.campaign_id === campaign.id)

                  return (
                    <div
                      key={campaign.id}
                      className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all hover:bg-white/10"
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex-1 pr-6">
                          <h2 className="text-2xl font-bold uppercase tracking-wider text-white">{campaign.name}</h2>
                          <p className="mt-2 text-white/70">{campaign.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {campaign.platforms.map((platform) => (
                              <span
                                key={platform}
                                className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/80"
                              >
                                {platform}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-white/60">Rate per 1K views</div>
                          <div className="text-2xl font-bold text-green-400">
                            ${campaign.rate_per_1k_views.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-white/60">Budget: ${campaign.budget.toLocaleString()}</div>
                        {hasApplied ? (
                          <div className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-6 py-2 text-sm font-medium uppercase tracking-wider text-yellow-400">
                            UNDER REVIEW
                          </div>
                        ) : (
                          <ApplyButton campaignId={campaign.id} platforms={campaign.platforms} onApply={handleApply} />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

function ApplyButton({
  campaignId,
  platforms,
  onApply,
}: { campaignId: string; platforms: string[]; onApply: (id: string, platform: string) => void }) {
  const [showModal, setShowModal] = useState(false)
  const [platform, setPlatform] = useState<string | null>(null)
  const [step, setStep] = useState<"platform" | "username">("platform")
  const [username, setUsername] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePlatformSelect = (p: string) => {
    setPlatform(p)
    setStep("username")
  }

  const handleApply = () => {
    if (!platform || !username.trim()) return
    onApply(campaignId, platform)
    setShowModal(false)
    setStep("platform")
    setPlatform(null)
    setUsername("")
  }

  const handleClose = () => {
    setShowModal(false)
    setStep("platform")
    setPlatform(null)
    setUsername("")
  }

  const handleBack = () => {
    setStep("platform")
    setUsername("")
  }

  const modalContent = showModal ? (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a] p-8">
        {step === "platform" ? (
          <>
            <h3 className="mb-6 text-2xl font-bold uppercase tracking-wider text-white">Choose Platform</h3>

            <div className="space-y-3">
              {platforms.map((p) => (
                <button
                  key={p}
                  onClick={() => handlePlatformSelect(p)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-white/40 hover:bg-white/10"
                >
                  <span className="font-medium uppercase tracking-wider text-white">{p}</span>
                </button>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={handleClose}
                className="w-full rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-all hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="mb-2 text-2xl font-bold uppercase tracking-wider text-white">
              Enter Your {platform} Username
            </h3>
            <p className="mb-6 text-sm text-white/60">This will be used to track your content and views.</p>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-white/80">
                  {platform} Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={platform === "Twitter" ? "@username" : "username"}
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-all focus:border-white/40 focus:bg-white/10"
                />
              </div>

              <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
                <p className="text-sm text-yellow-400">
                  <span className="font-bold">Note:</span> Once approved, your {platform} account will be monitored by
                  our automated system for posts related to this campaign. Views and engagement will be tracked
                  automatically to calculate your earnings.
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleBack}
                className="flex-1 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-all hover:bg-white/10"
              >
                Back
              </button>
              <button
                onClick={handleApply}
                disabled={!username.trim()}
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-all hover:bg-white/20 disabled:opacity-50"
              >
                Submit Application
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  ) : null

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-medium uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/20"
      >
        Apply Now
      </button>

      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  )
}
