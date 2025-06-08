import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const res = await fetch(`${process.env.API_URL}/api/auth/check-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy error to backend:", error);
    return NextResponse.json({ error: "Proxy failed" }, { status: 500 });
  }
}
