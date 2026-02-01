import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get("id")

    if (!user_id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data: user, error } = await supabase
      .from("profiles")
      .select("id, email, name, user_type, balance, total_views, total_earnings")
      .eq("id", user_id)
      .single()

    if (error || !user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user,
    })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, ...updates } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }

    // Only allow certain fields to be updated
    const allowedFields = ["name", "wallet_address"]
    const filteredUpdates: Record<string, string> = {}
    
    for (const key of allowedFields) {
      if (key in updates) {
        filteredUpdates[key] = updates[key]
      }
    }

    if (Object.keys(filteredUpdates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("profiles")
      .update(filteredUpdates)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      user: data,
    })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
