import { NextRequest, NextResponse } from "next/server";
import { base } from "@/lib/airtable";

export async function POST(req: NextRequest) {
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