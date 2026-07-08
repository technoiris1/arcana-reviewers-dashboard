import { NextResponse } from "next/server";
import { base_auth } from "@/lib/airtable";

export async function GET() {
  const records = await base_auth("arcana_R_admins")
    .select()
    .firstPage();

  return NextResponse.json(records.map((r) => r.fields));
}