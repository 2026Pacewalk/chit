import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, checkCredentials, createSessionToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!checkCredentials(String(email || ""), String(password || ""))) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE, createSessionToken(String(email)), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 24 * 3600,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 400 });
  }
}
