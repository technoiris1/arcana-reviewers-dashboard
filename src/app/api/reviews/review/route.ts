import { NextRequest, NextResponse } from "next/server";
import { base } from "@/lib/airtable";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = await getSession();

  if (!session.user?.isLoggedIn) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!session.user.allowed) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "Missing record id" },
      { status: 400 }
    );
  }

  await base("Arcana Priority Reviews").update([
    {
      id,
      fields: {
        "Review Status": "Reviewed",
      },
    },
  ]);

  return NextResponse.json({ success: true });
}