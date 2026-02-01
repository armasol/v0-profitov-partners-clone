import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    name: "Shiller API",
    version: "1.0.0",
    description: "API for the Shiller crypto promotion platform",
    documentation: "/skill.md",
    endpoints: {
      authentication: {
        signup: {
          method: "POST",
          path: "/api/auth/signup",
          description: "Create a new account",
          body: {
            email: "string (required)",
            password: "string (required, min 6 chars)",
            name: "string (required)",
            user_type: "string (required: 'shiller' or 'project')"
          }
        },
        signin: {
          method: "POST",
          path: "/api/auth/signin",
          description: "Sign in to existing account",
          body: {
            email: "string (required)",
            password: "string (required)"
          }
        }
      },
      campaigns: {
        list: {
          method: "GET",
          path: "/api/campaigns",
          description: "Get all available campaigns"
        },
        apply: {
          method: "POST",
          path: "/api/campaigns/apply",
          description: "Apply to a campaign",
          body: {
            user_id: "string (required)",
            campaign_id: "string (required)",
            platform: "string (required: 'tiktok', 'instagram', 'twitter', 'youtube')",
            username: "string (required)"
          }
        },
        getApplications: {
          method: "GET",
          path: "/api/campaigns/apply?user_id={user_id}",
          description: "Get all applications for a user"
        }
      },
      user: {
        get: {
          method: "GET",
          path: "/api/user?id={user_id}",
          description: "Get user profile and stats"
        },
        update: {
          method: "PATCH",
          path: "/api/user",
          description: "Update user profile",
          body: {
            id: "string (required)",
            name: "string (optional)",
            wallet_address: "string (optional, valid Solana address)"
          }
        }
      }
    },
    status: "operational"
  })
}
