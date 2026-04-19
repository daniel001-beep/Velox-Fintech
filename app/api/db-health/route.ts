import { db } from "@/src/db";
import { products } from "@/src/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Try to count products in the database
    const result = await db.select().from(products).limit(1);
    
    return NextResponse.json({
      status: "connected",
      message: "Database connection successful",
      productsExist: result.length > 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Database connection test failed:", error.message);
    
    return NextResponse.json(
      {
        status: "failed",
        message: "Database connection failed",
        error: error.message || "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
