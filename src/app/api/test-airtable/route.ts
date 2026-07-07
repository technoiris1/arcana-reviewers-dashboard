import { NextResponse } from "next/server";
import { base } from "@/lib/airtable";

export async function GET() {
  const records = await base("arcana_R_admins")
    .select()
    .firstPage();

  return NextResponse.json(records.map((r) => r.fields));
}