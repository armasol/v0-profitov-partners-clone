"use client"

import { useState } from "react"

export default function ShillersPage() {
  const [showFaq, setShowFaq] = useState(false)

  return (
    <div className="fixed inset-0 h-screen w-full overflow-hidden bg-[#0a0a0a]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://profitov.partners/static/img/partners-bg-desktop.jpg')",
          backgroundPosition: "center center",
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <header className="flex items-center justify-between px-12 py-8">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center">
              <img src="/logo.png" alt="SHILLER" className="h-12 w-auto" />
            </a>
            <nav className="flex gap-4">
              <a
                href="/"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-medium uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:bg-white/10"
              >
                Home
              </a>
              <a
                href="/promote"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-medium uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:bg-white/10"
              >
                Promote Your Project
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/signup"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:bg-white/10"
            >
              Sign&nbsp;Up
            </a>
            <a
              href="/signin"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:bg-white/10"
            >
              Sign&nbsp;In
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col items-center justify-center px-12 pb-8">
          <div className="w-full max-w-6xl">
            <p className="mb-2 text-center font-serif text-2xl italic text-white/70">for</p>

            <h1
              className="mb-8 text-center text-[6vw] font-black leading-[0.9] tracking-[0.05em] text-white"
              style={{
                fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif",
              }}
            >
              SHILLERS
            </h1>

            <div className="relative mx-auto mb-8 max-w-4xl">
              <div className="absolute left-0 top-0 h-12 w-12 border-l-2 border-t-2 border-white/30" />
              <div className="absolute right-0 top-0 h-12 w-12 border-r-2 border-t-2 border-white/30" />
              <div className="absolute bottom-0 left-0 h-12 w-12 border-b-2 border-l-2 border-white/30" />
              <div className="absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-white/30" />

              <div className="px-16 py-8 text-center">
                <p className="mb-2 text-sm font-medium uppercase leading-relaxed tracking-[0.12em] text-white">
                  Create engaging content on TikTok, Instagram Reels, and Twitter to promote crypto tokens.
                  <br />
                  Earn money for every 1,000 views your content generates.
                </p>
                <p className="border-t border-white pt-2 text-sm font-bold uppercase leading-relaxed tracking-[0.12em] text-white">
                  Free to sign up • Minimum $10 withdrawal
                </p>
              </div>
            </div>

            <div className="mb-8 flex justify-center gap-6">
              <a
                href="/signup?type=shiller"
                className="rounded-full border-2 border-white/30 bg-white/10 px-16 py-4 text-base font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                Sign Up as a Shiller
              </a>
              <button
                onClick={() => setShowFaq(true)}
                className="rounded-full border border-white/20 bg-white/5 px-16 py-4 text-base font-medium uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:bg-white/10"
              >
                FAQ
              </button>
            </div>
          </div>
        </main>
      </div>

      {showFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-3xl border border-white/20 bg-[#1a1a1a]/95 p-10 backdrop-blur-xl">
            <button
              onClick={() => setShowFaq(false)}
              className="absolute right-6 top-6 text-white/70 transition-colors hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="mb-8 text-2xl font-bold uppercase tracking-[0.2em] text-white">FAQ</h2>

            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="mb-2 text-sm font-bold uppercase text-white">How do I get paid?</h3>
                <p className="text-xs text-white/80">
                  Payments are processed weekly via your preferred method once you reach the $10 minimum threshold.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="mb-2 text-sm font-bold uppercase text-white">What platforms can I use?</h3>
                <p className="text-xs text-white/80">You can create content on TikTok, Instagram Reels, and Twitter.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="mb-2 text-sm font-bold uppercase text-white">How are views counted?</h3>
                <p className="text-xs text-white/80">
                  We track authentic views from each platform's analytics. Only real engagement counts.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
