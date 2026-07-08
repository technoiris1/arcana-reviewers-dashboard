import { NextRequest, NextResponse } from "next/server";
import { base_auth } from "@/lib/airtable";
import { getSession } from "@/lib/session";
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

const slackId = user.identity.slack_id;

const records = await base_auth("arcana_R_admins")
  .select({
    filterByFormula: `{Admin_ID} = "${slackId}"`,
  })
  .firstPage();

const allowed = records.length > 0;

const session = await getSession();

session.user = {
  isLoggedIn: true,
  allowed,
  slackId,
  name: `${user.identity.first_name} ${user.identity.last_name}`,
  email: user.identity.primary_email,
};

await session.save();

return NextResponse.redirect(new URL("/", req.url));
}