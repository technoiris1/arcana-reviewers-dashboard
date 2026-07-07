import { NextRequest, NextResponse } from "next/server";
import { base } from "@/lib/airtable";
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

  if (!response.ok) {
    return NextResponse.json(tokens, {
      status: response.status,
    });
  }

  const meResponse = await fetch(
    "https://auth.hackclub.com/api/v1/me",
    {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    }
  );

  const user = await meResponse.json();

  const records = await base("arcana_R_admins")
    .select({
      filterByFormula: `{Admin_ID} = "${user.identity.slack_id}"`,
    })
    .firstPage();

const allowed = records.length > 0;
if (!allowed) {
  console.log(`access denied, go away you scallywag`);
  }
else{
  console.log("du bist gut genug")
}
  console.log(user);

  return NextResponse.json(user);
}