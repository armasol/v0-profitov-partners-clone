import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { user_id, campaign_id, platform, username } = await request.json()

    if (!user_id || !campaign_id || !platform) {
      return NextResponse.json(
        { error: "User ID, campaign ID, and platform are required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Check if user already applied to this campaign
    const { data: existing } = await supabase
      .from("applications")
      .select("id")
      .eq("user_id", user_id)
      .eq("campaign_id", campaign_id)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: "Already applied to this campaign" },
        { status: 409 }
      )
    }

    // Create application
    const { data, error } = await supabase
      .from("applications")
      .insert({
        user_id,
        campaign_id,
        platform,
        platform_username: username || null,
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: "Failed to submit application" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      application: {
        id: data.id,
        campaign_id: data.campaign_id,
        platform: data.platform,
        status: "UNDER REVIEW",
      },
    })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get("user_id")

    if (!user_id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data: applications, error } = await supabase
      .from("applications")
      .select("*")
      .eq("user_id", user_id)

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch applications" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      applications: applications || [],
    })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
