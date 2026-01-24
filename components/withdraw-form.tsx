"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function WithdrawForm({ userId, availableBalance }: { userId: string; availableBalance: number }) {
  const [amount, setAmount] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const validateSolanaAddress = (address: string) => {
    // Basic Solana address validation (base58, 32-44 chars)
    const solanaRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
    return solanaRegex.test(address)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const withdrawAmount = Number.parseFloat(amount)

    // Validation
    if (withdrawAmount < 10) {
      setError("Minimum withdrawal amount is $10.00")
      return
    }

    if (withdrawAmount > availableBalance) {
      setError("Insufficient balance")
      return
    }

    if (!validateSolanaAddress(walletAddress)) {
      setError("Invalid Solana wallet address")
      return
    }

    setIsSubmitting(true)

    try {
      const supabase = createClient()

      const { error: insertError } = await supabase.from("withdrawals").insert({
        user_id: userId,
        amount: withdrawAmount,
        wallet_address: walletAddress,
        status: "pending",
      })

      if (insertError) throw insertError

      setSuccess(true)
      setAmount("")
      setWalletAddress("")

      // Refresh the page to show updated data
      setTimeout(() => {
        router.refresh()
      }, 1500)
    } catch (error) {
      console.error("[v0] Withdrawal error:", error)
      setError("Failed to process withdrawal request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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
            max={availableBalance}
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
          disabled={isSubmitting || availableBalance < 10}
          className="w-full rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:bg-white/20 disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : "Request Withdrawal"}
        </button>
      </form>
    </div>
  )
}
