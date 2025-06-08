import { NextResponse } from "next/server";
import pool from "@/database/db.js";

export async function POST(request) {
  try {
    const body = await request.json();
    const { phone } = body;

    const userRes = await pool.query(`SELECT * FROM users WHERE phone = $1`, [phone]);

    return NextResponse.json({ exists: userRes.rows.length > 0 });
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
