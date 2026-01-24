"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function WithdrawPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [balance] = useState(0)
  const [amount, setAmount] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [withdrawals, setWithdrawals] = useState<any[]>([])

  useEffect(() => {
    const sessionData = localStorage.getItem("shiller_session")
    if (!sessionData) {
      router.push("/signin")
      return
    }

    // Load withdrawals from localStorage
    const savedWithdrawals = localStorage.getItem("withdrawals")
    if (savedWithdrawals) {
      setWithdrawals(JSON.parse(savedWithdrawals))
    }

    setLoading(false)
  }, [router])

  const validateSolanaAddress = (address: string) => {
    const solanaRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
    return solanaRegex.test(address)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const withdrawAmount = Number.parseFloat(amount)

    if (withdrawAmount < 10) {
      setError("Minimum withdrawal amount is $10.00")
      return
    }

    if (withdrawAmount > balance) {
      setError("Insufficient balance")
      return
    }

    if (!validateSolanaAddress(walletAddress)) {
      setError("Invalid Solana wallet address")
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newWithdrawal = {
      id: Date.now().toString(),
      amount: withdrawAmount,
      wallet_address: walletAddress,
      status: "pending",
      created_at: new Date().toISOString(),
    }

    const updatedWithdrawals = [newWithdrawal, ...withdrawals]
    setWithdrawals(updatedWithdrawals)
    localStorage.setItem("withdrawals", JSON.stringify(updatedWithdrawals))

    setSuccess(true)
    setAmount("")
    setWalletAddress("")
    setIsSubmitting(false)
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
          <div className="mx-auto max-w-3xl space-y-8">
            <h1 className="text-4xl font-black uppercase tracking-wider text-white">Withdraw Funds</h1>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <div className="mb-2 text-sm font-medium uppercase tracking-wider text-white/60">Available Balance</div>
              <div className="text-5xl font-black text-white">${balance.toFixed(2)}</div>
              <div className="mt-2 text-sm text-white/60">Minimum withdrawal: $10.00</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <h2 className="mb-6 text-2xl font-bold uppercase tracking-wider text-white">Request Withdrawal</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-white/80">
                    Withdrawal Amount (USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="10"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm focus:border-white/40 focus:outline-none"
                    placeholder="10.00"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-white/80">
                    Solana Wallet Address
                  </label>
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    required
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 font-mono text-sm text-white placeholder-white/40 backdrop-blur-sm focus:border-white/40 focus:outline-none"
                    placeholder="Enter your Solana wallet address"
                  />
                  <p className="mt-2 text-xs text-white/50">
                    Make sure your wallet address is correct. Transactions cannot be reversed.
                  </p>
                </div>

                {error && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                    Withdrawal request submitted successfully! It will be processed within 24-48 hours.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || balance < 10}
                  className="w-full rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:bg-white/20 disabled:opacity-50"
                >
                  {isSubmitting ? "Processing..." : "Request Withdrawal"}
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <h2 className="mb-6 text-2xl font-bold uppercase tracking-wider text-white">Withdrawal History</h2>

              {withdrawals.length === 0 ? (
                <p className="text-center text-white/60">No withdrawal history yet.</p>
              ) : (
                <div className="space-y-4">
                  {withdrawals.map((withdrawal) => (
                    <div
                      key={withdrawal.id}
                      className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-4"
                    >
                      <div>
                        <div className="font-medium text-white">${Number(withdrawal.amount).toFixed(2)}</div>
                        <div className="text-sm text-white/60">
                          {new Date(withdrawal.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div
                        className={`rounded-full px-4 py-1 text-sm font-medium uppercase tracking-wider ${
                          withdrawal.status === "completed"
                            ? "bg-green-500/10 text-green-400"
                            : withdrawal.status === "pending"
                              ? "bg-yellow-500/10 text-yellow-400"
                              : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {withdrawal.status}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
