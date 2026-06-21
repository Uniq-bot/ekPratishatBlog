import { checkUser } from "@/services/auth.services";
import { generateToken } from "@/libs/jwt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 },
            );
        }
        const user = await checkUser(email, password);
        if (!user) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 },
            );
        }

        // Generate token and set cookie
        const token = generateToken({ id: user.id });
        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30,
        });

        return NextResponse.json(
            {
                message: "Login successful",
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
                token,
            },
            { status: 200 },
        );
    } catch (err) {
        console.error("Login error:", err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 },
        );
    }
}