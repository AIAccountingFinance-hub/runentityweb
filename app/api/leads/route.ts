import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, country_code, phone, email, variant } = body;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone, and email are required" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    if (!supabase) {
      console.log("[Lead - no DB]", { name, country_code, phone, email, variant });
      return NextResponse.json({ success: true });
    }

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      country_code: country_code || "",
      phone,
      variant: variant || "demo",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
