import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "No code provided" },
      { status: 400 }
    );
  }

  const response = await fetch(
    "https://auth.hackclub.com/oauth/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.HCA_CLIENT_ID,
        client_secret: process.env.HCA_CLIENT_SECRET,
        redirect_uri: process.env.HCA_REDIRECT_URI,
        code,
        grant_type: "authorization_code",
      }),
    }
  );

  const tokens = await response.json();

  console.log(tokens);

  return NextResponse.json(tokens);
}