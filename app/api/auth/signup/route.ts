import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    console.log("[v0] Signup API called")
    const { email, password, name, user_type } = await request.json()
    console.log("[v0] Received signup request for:", email, "type:", user_type)

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      )
    }

    console.log("[v0] Creating Supabase client...")
    const supabase = await createClient()
    console.log("[v0] Supabase client created successfully")

    // Check if email already exists
    console.log("[v0] Checking if email exists:", email.toLowerCase())
    const { data: existing, error: checkError } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", email.toLowerCase())
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      console.error("[v0] Error checking email:", checkError)
      return NextResponse.json(
        { error: "Database error", details: checkError.message },
        { status: 500 }
      )
    }

    if (existing) {
      console.log("[v0] Email already exists")
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      )
    }

    // Create new user profile
    console.log("[v0] Creating new profile...")
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        email: email.toLowerCase(),
        name,
        password_hash: password,
        user_type: user_type || "shiller",
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating profile:", error)
      return NextResponse.json(
        { error: "Failed to create account", details: error.message },
        { status: 500 }
      )
    }

    console.log("[v0] Profile created successfully:", data.id)

    return NextResponse.json({
      success: true,
      user: {
        id: data.id,
        email: data.email,
        name: data.name,
        user_type: data.user_type,
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { 
        error: "Database unavailable. Please ensure Supabase is active.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}
