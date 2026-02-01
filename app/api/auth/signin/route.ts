import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Find user by email and password
    const { data: user, error } = await supabase
      .from("profiles")
      .select("id, email, name, user_type, balance")
      .eq("email", email.toLowerCase())
      .eq("password_hash", password)
      .single()

    if (error || !user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        user_type: user.user_type,
        balance: user.balance || 0,
      },
    })
  } catch (error) {
    console.error("Signin error:", error)
    return NextResponse.json(
      { 
        error: "Database unavailable. Please ensure Supabase is active.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}
