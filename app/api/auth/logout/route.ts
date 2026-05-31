import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    (await cookies()).set("token", "", {
        httpOnly: true,
      secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
    });
    return NextResponse.json(
      { message: "Logout successful" },
      { status: 200 },
    );
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}