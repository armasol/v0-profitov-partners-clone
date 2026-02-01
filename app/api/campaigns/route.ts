import { NextResponse } from "next/server"

// Campaigns list - same as what's shown in the dashboard
const campaigns = [
  {
    id: "fanatics",
    name: "Fanatics Sportsbook Campaign",
    description: "Post the provided content, add a caption and your own unique twist.",
    rate: 3.0,
    budget: 4000,
    platforms: ["instagram", "youtube"],
  },
  {
    id: "rio",
    name: "Rio Da Yung OG - Stupid Shit (A.T. mixxx)",
    description: "Post videos using Rio Da Yung OG's newly remixed track.",
    rate: 0.3,
    budget: 3000,
    platforms: ["tiktok"],
  },
  {
    id: "vd",
    name: "VD - Embrasse moi",
    description: "Post videos using VD's track: A chill house beat, very nonchalant vibes.",
    rate: 0.2,
    budget: 1600,
    platforms: ["instagram"],
  },
  {
    id: "spartans",
    name: "Spartans Logo Campaign",
    description: "Post videos with the Spartans logo, get paid. Pages must have 40% USA audience.",
    rate: 0.06,
    budget: 10000,
    platforms: ["instagram"],
  },
  {
    id: "monkeytilt",
    name: "MonkeyTilt Casino Campaign",
    description: "Create rainbet style videos for MonkeyTilt. Film your face/POV and create viral content. $15 per video bonus. Must be from: NZ, Ireland, Australia, Italy, France, Germany, Canada, Mexico, Philippines, Japan, South Korea, South Africa, Sweden, Norway, Finland.",
    rate: 3.0,
    budget: 5000,
    platforms: ["tiktok", "instagram", "youtube"],
  },
  {
    id: "cs2dle",
    name: "CS2DLE Campaign",
    description: "Post clips of streamers playing on cs2dle.net, the interactive CS2 quiz site.",
    rate: 0.15,
    budget: 2000,
    platforms: ["tiktok", "instagram", "youtube"],
  },
  {
    id: "tunefm",
    name: "Tune.FM Logo Campaign",
    description: "Post videos featuring the Tune.FM logo.",
    rate: 0.15,
    budget: 1500,
    platforms: ["instagram", "tiktok"],
  },
  {
    id: "cabrzy",
    name: "Cabrzy Fan Page Campaign",
    description: "Start a Cabrzy fan page or post his clips on Streamer/Gambling niche pages.",
    rate: 1.5,
    budget: 10000,
    platforms: ["tiktok", "instagram", "youtube"],
  },
  {
    id: "superform",
    name: "Superform Logo Campaign",
    description: "Post videos featuring the Superform logo.",
    rate: 0.15,
    budget: 3000,
    platforms: ["instagram", "tiktok"],
  },
  {
    id: "sinparty",
    name: "Sinparty Logo Campaign",
    description: "Post videos with the Sinparty logo, get paid.",
    rate: 0.04,
    budget: 5000,
    platforms: ["instagram", "tiktok", "twitter"],
  },
]

export async function GET() {
  return NextResponse.json({
    success: true,
    campaigns,
  })
}
