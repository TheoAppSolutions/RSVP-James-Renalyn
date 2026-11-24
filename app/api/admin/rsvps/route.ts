import { NextResponse } from "next/server";
import { RSVP_RECORDS } from "@/lib/rsvp-records";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const password = process.env.ADMIN_PASSWORD;
  const headers = { "Cache-Control": "no-store" };

  if (!password || request.headers.get("x-admin-password") !== password) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers });
  }

  return NextResponse.json({ rsvps: RSVP_RECORDS }, { headers });
}
