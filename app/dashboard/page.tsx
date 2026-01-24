"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function DashboardPage() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats] = useState({ earnings: 0, campaigns: 0, views: 0 })

  useEffect(() => {
    const sessionData = localStorage.getItem("shiller_session")

    if (sessionData) {
      try {
        const parsedSession = JSON.parse(sessionData)
        setSession(parsedSession)
        setLoading(false)
      } catch {
        window.location.href = "/signin"
      }
    } else {
      window.location.href = "/signin"
    }
  }, [])

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
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="SHILLER" className="h-10 w-auto" />
          </a>
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <a href="/dashboard" className="text-sm font-medium uppercase tracking-wider text-white">
                Dashboard
              </a>
              <a
                href="/dashboard/campaigns"
                className="text-sm font-medium uppercase tracking-wider text-white/60 hover:text-white"
              >
                Campaigns
              </a>
              <a
                href="/dashboard/withdraw"
                className="text-sm font-medium uppercase tracking-wider text-white/60 hover:text-white"
              >
                Withdraw
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1 px-12 py-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <div className="animate-fade-in">
              <h1 className="mb-2 text-4xl font-black uppercase tracking-wider text-white">Shiller Dashboard</h1>
              <p className="text-white/60">Welcome back, {session?.name}!</p>
            </div>

            <div className="grid animate-slide-up gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:bg-white/10">
                <div className="mb-2 text-sm font-medium uppercase tracking-wider text-white/60">Total Earnings</div>
                <div className="text-3xl font-black text-white">${stats.earnings.toFixed(2)}</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:bg-white/10">
                <div className="mb-2 text-sm font-medium uppercase tracking-wider text-white/60">Active Campaigns</div>
                <div className="text-3xl font-black text-white">{stats.campaigns}</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:bg-white/10">
                <div className="mb-2 text-sm font-medium uppercase tracking-wider text-white/60">Total Views</div>
                <div className="text-3xl font-black text-white">{stats.views.toLocaleString()}</div>
              </div>
            </div>

            <div className="grid animate-slide-up gap-6 md:grid-cols-2">
              <Link
                href="/dashboard/campaigns"
                className="block rounded-2xl border border-white/20 bg-white/5 p-8 text-left backdrop-blur-md transition-all hover:scale-105 hover:bg-white/10"
              >
                <div className="mb-3 text-2xl font-bold uppercase tracking-wider text-white">Browse Campaigns</div>
                <div className="text-white/70">Find new tokens to promote and start earning</div>
              </Link>

              <Link
                href="/dashboard/withdraw"
                className="block rounded-2xl border border-white/20 bg-white/5 p-8 text-left backdrop-blur-md transition-all hover:scale-105 hover:bg-white/10"
              >
                <div className="mb-3 text-2xl font-bold uppercase tracking-wider text-white">Withdraw Funds</div>
                <div className="text-white/70">Request payout of your earnings (min. $10)</div>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
