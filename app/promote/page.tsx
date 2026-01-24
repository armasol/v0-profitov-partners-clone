"use client"

import { useState } from "react"

export default function PromotePage() {
  const [showFaq, setShowFaq] = useState(false)

  return (
    <div className="fixed inset-0 h-screen w-full overflow-hidden bg-[#0a0a0a]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://profitov.partners/static/img/advertisers-bg-desktop.jpg')",
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
                href="/shillers"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-medium uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:bg-white/10"
              >
                Shillers
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
            {/* Subtitle */}
            <p className="mb-2 text-center font-serif text-2xl italic text-white/70">for</p>

            {/* Main Heading */}
            <h1
              className="mb-8 text-center text-[5.5vw] font-black leading-[0.9] tracking-[0.05em] text-white"
              style={{
                fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif",
              }}
            >
              PROMOTE YOUR PROJECT
            </h1>

            {/* Content Box with Corner Decorations */}
            <div className="relative mx-auto mb-8 max-w-4xl">
              {/* Corner decorations */}
              <div className="absolute left-0 top-0 h-12 w-12 border-l-2 border-t-2 border-white/30" />
              <div className="absolute right-0 top-0 h-12 w-12 border-r-2 border-t-2 border-white/30" />
              <div className="absolute bottom-0 left-0 h-12 w-12 border-b-2 border-l-2 border-white/30" />
              <div className="absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-white/30" />

              {/* Content */}
              <div className="px-16 py-8 text-center">
                <p className="mb-2 text-sm font-medium uppercase leading-relaxed tracking-[0.12em] text-white">
                  Get your crypto token in front of thousands of engaged viewers across social platforms.
                  <br />
                  Our verified content creators produce high-quality promotional content for your project.
                </p>
                <p className="border-t border-white pt-2 text-sm font-bold uppercase leading-relaxed tracking-[0.12em] text-white">
                  0.50 SOL listing fee • Free for first hour after launch
                </p>
              </div>
            </div>

            {/* Sign Up Button */}
            <div className="mb-8 flex justify-center gap-6">
              <a
                href="/signup?type=project"
                className="rounded-full border-2 border-white/30 bg-white/10 px-16 py-4 text-base font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                List Your Project
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
                <h3 className="mb-2 text-sm font-bold uppercase text-white">How does the listing work?</h3>
                <p className="text-xs text-white/80">
                  Pay 0.50 SOL to list your project. Shillers can then apply to promote your token across platforms.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="mb-2 text-sm font-bold uppercase text-white">What about the free hour?</h3>
                <p className="text-xs text-white/80">
                  Projects listed within the first hour of platform launch pay zero fees.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="mb-2 text-sm font-bold uppercase text-white">How do I track results?</h3>
                <p className="text-xs text-white/80">
                  You'll have access to a dashboard showing all content created and their view counts.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
