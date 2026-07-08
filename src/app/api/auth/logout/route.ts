import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET(req: Request) {
  const session = await getSession();

  await session.destroy();

  return NextResponse.redirect(new URL("/", req.url));
}