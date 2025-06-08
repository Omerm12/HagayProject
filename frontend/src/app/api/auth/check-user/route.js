import { NextResponse } from "next/server";
import pool from "@/database/db.js";

export async function POST(request) {
  try {
    console.log("Received POST request to /api/auth/check-user");

    const body = await request.json();
    console.log("Request body:", body);

    const { phone } = body;
    console.log("Phone from request:", phone);

    const userRes = await pool.query(`SELECT * FROM users WHERE phone = $1`, [phone]);
    console.log("Database response rows:", userRes.rows);

    return NextResponse.json({ exists: userRes.rows.length > 0 });
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
