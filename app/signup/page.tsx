"use client"

import type React from "react"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function SignUpPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const typeParam = searchParams.get("type")
  const [accountType, setAccountType] = useState<"shiller" | "project" | null>(
    typeParam === "shiller" ? "shiller" : typeParam === "project" ? "project" : null,
  )
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [telegram, setTelegram] = useState("")
  const [projectName, setProjectName] = useState("")
  const [tokenContract, setTokenContract] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!accountType) return

    setIsLoading(true)
    setError("")

    try {
      if (accountType === "shiller") {
        const supabase = createClient()

        const { data: existingUser } = await supabase.from("profiles").select("email").eq("email", email).single()

        if (existingUser) {
          setError("Email already in use.")
          setIsLoading(false)
          return
        }

        const { data, error: dbError } = await supabase
          .from("profiles")
          .insert([
            {
              email,
              name,
              password_hash: password,
              user_type: "shiller",
            },
          ])
          .select()
          .single()

        if (dbError) {
          setError("Failed to create account. Please try again.")
          setIsLoading(false)
          return
        }

        const session = {
          id: data.id,
          email,
          name,
          type: "shiller",
          timestamp: Date.now(),
        }
        localStorage.setItem("shiller_session", JSON.stringify(session))

        // Show success message
        setShowSuccess(true)
        setIsLoading(false)

        // Redirect after showing success
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 2000)
        return
      }

      if (accountType === "project") {
        const supabase = createClient()

        const { data: existingUser } = await supabase.from("profiles").select("email").eq("email", email).single()

        if (existingUser) {
          setError("Email already in use.")
          setIsLoading(false)
          return
        }

        const { error: dbError } = await supabase.from("profiles").insert([
          {
            email,
            name,
            telegram,
            project_name: projectName,
            token_contract: tokenContract,
            user_type: "project",
          },
        ])

        if (dbError) {
          setError("Failed to submit project. Please try again.")
          setIsLoading(false)
          return
        }

        setIsSubmitted(true)
        setIsLoading(false)
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  if (showSuccess && accountType === "shiller") {
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
          </header>

          <main className="flex flex-1 flex-col items-center justify-center px-12 py-16">
            <div className="w-full max-w-2xl animate-fade-in">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-md">
                <div className="mb-6 inline-block rounded-full bg-green-500/20 p-4 animate-scale-up">
                  <svg className="h-16 w-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="mb-4 text-5xl font-black uppercase tracking-wider text-white">Registration Complete!</h1>
                <p className="mb-2 text-xl text-white/90">Welcome to Shiller, {name}!</p>
                <p className="text-lg text-white/70">Redirecting to your dashboard...</p>
                <div className="mt-8 flex justify-center">
                  <div className="h-1 w-32 overflow-hidden rounded-full bg-white/20">
                    <div className="h-full w-full animate-progress bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (isSubmitted && accountType === "project") {
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
          </header>

          <main className="flex flex-1 flex-col items-center justify-center px-12 py-16">
            <div className="w-full max-w-2xl">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-md">
                <div className="mb-6 inline-block rounded-full bg-green-500/20 p-4">
                  <svg className="h-12 w-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="mb-4 text-4xl font-black uppercase tracking-wider text-white">Thank You!</h1>
                <p className="mb-2 text-xl text-white/90">We're reviewing your project submission</p>
                <p className="text-lg text-white/70">We'll get back to you within 60 minutes</p>
                <button
                  onClick={() => router.push("/")}
                  className="mt-8 rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:bg-white/20"
                >
                  Return Home
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
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
            <span className="text-sm text-white/70">Already have an account?</span>
            <a
              href="/signin"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:bg-white/10"
            >
              Sign&nbsp;In
            </a>
          </div>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center px-12 py-16">
          <div className="w-full max-w-md">
            <h1 className="mb-8 text-center text-4xl font-black uppercase tracking-wider text-white">Sign Up</h1>

            {!accountType ? (
              <div className="space-y-4">
                <p className="mb-8 text-center text-sm uppercase tracking-wide text-white/70">
                  Choose your account type
                </p>
                <button
                  onClick={() => setAccountType("shiller")}
                  className="w-full rounded-2xl border border-white/20 bg-white/5 p-8 backdrop-blur-md transition-all hover:bg-white/10"
                >
                  <h2 className="mb-3 text-2xl font-bold uppercase tracking-wider text-white">For Shillers</h2>
                  <p className="text-sm text-white/80">Create content and earn money for promoting crypto tokens</p>
                </button>
                <button
                  onClick={() => setAccountType("project")}
                  className="w-full rounded-2xl border border-white/20 bg-white/5 p-8 backdrop-blur-md transition-all hover:bg-white/10"
                >
                  <h2 className="mb-3 text-2xl font-bold uppercase tracking-wider text-white">For Projects</h2>
                  <p className="text-sm text-white/80">Get your crypto token promoted by verified content creators</p>
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold uppercase tracking-wider text-white">
                    {accountType === "shiller" ? "Shiller Account" : "Project Account"}
                  </h2>
                  <button onClick={() => setAccountType(null)} className="text-sm text-white/70 hover:text-white">
                    Change
                  </button>
                </div>

                <form className="space-y-4" onSubmit={handleSignUp}>
                  <div>
                    <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-white/80">
                      {accountType === "project" ? "Your Name" : "Display Name"}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm focus:border-white/40 focus:outline-none"
                      placeholder={accountType === "project" ? "John Doe" : "Your display name"}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-white/80">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm focus:border-white/40 focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>

                  {accountType === "shiller" && (
                    <div>
                      <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-white/80">
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm focus:border-white/40 focus:outline-none"
                        placeholder="Min 6 characters"
                      />
                    </div>
                  )}

                  {accountType === "project" && (
                    <div>
                      <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-white/80">
                        Telegram Username
                      </label>
                      <input
                        type="text"
                        value={telegram}
                        onChange={(e) => setTelegram(e.target.value)}
                        required
                        className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm focus:border-white/40 focus:outline-none"
                        placeholder="@username"
                      />
                    </div>
                  )}

                  {accountType === "project" && (
                    <>
                      <div>
                        <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-white/80">
                          Project/Token Name
                        </label>
                        <input
                          type="text"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          required
                          className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm focus:border-white/40 focus:outline-none"
                          placeholder="Your token name"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-white/80">
                          Token Contract Address
                        </label>
                        <input
                          type="text"
                          value={tokenContract}
                          onChange={(e) => setTokenContract(e.target.value)}
                          required
                          className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm focus:border-white/40 focus:outline-none"
                          placeholder="Solana contract address"
                        />
                      </div>
                    </>
                  )}

                  {error && <div className="mb-4 text-center text-sm text-red-500">{error}</div>}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-6 w-full rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:bg-white/20 disabled:opacity-50"
                  >
                    {isLoading ? "Submitting..." : accountType === "project" ? "Submit for Review" : "Get Started"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
