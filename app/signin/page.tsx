"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const supabase = createClient()

      const { data: profile, error: dbError } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email)
        .eq("password_hash", password)
        .eq("user_type", "shiller")
        .single()

      if (dbError || !profile) {
        setError("Invalid email or password")
        setIsLoading(false)
        return
      }

      const session = {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        type: "shiller",
        timestamp: Date.now(),
      }
      localStorage.setItem("shiller_session", JSON.stringify(session))

      // Redirect to dashboard
      window.location.href = "/dashboard"
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-[#0a0a0a]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('https://profitov.partners/static/img/home-bg-desktop.jpg')",
          backgroundPosition: "center center",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-12 py-8">
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="SHILLER" className="h-12 w-auto" />
          </a>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/70">Don't have an account?</span>
            <a
              href="/signup"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:bg-white/10"
            >
              Sign&nbsp;Up
            </a>
          </div>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center px-12 py-16">
          <div className="w-full max-w-md">
            <h1 className="mb-8 text-center text-4xl font-black uppercase tracking-wider text-white">Sign In</h1>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <form className="space-y-4" onSubmit={handleSignIn}>
                <div>
                  <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-white/80">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm focus:border-white/40 focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-white/80">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm focus:border-white/40 focus:outline-none"
                    placeholder="Your password"
                  />
                </div>

                {error && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-6 w-full rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:bg-white/20 disabled:opacity-50"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
