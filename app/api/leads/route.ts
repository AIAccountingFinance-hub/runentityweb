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

    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      return NextResponse.json(
        { error: "Phone must be 10 digits" },
        { status: 400 }
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }
    const domain = email.split("@")[1].toLowerCase();
    const disposable = ["mailinator.com", "guerrillamail.com", "tempmail.com", "throwaway.email", "yopmail.com", "sharklasers.com", "guerrillamailblock.com", "grr.la", "dispostable.com", "trashmail.com", "10minutemail.com", "temp-mail.org", "fakeinbox.com", "maildrop.cc", "getairmail.com"];
    if (disposable.includes(domain)) {
      return NextResponse.json(
        { error: "Please use a permanent email address" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    if (!supabase) {
      console.error("[Lead] No Supabase client - env vars missing");
      return NextResponse.json({ success: true, note: "no-db" });
    }

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      country_code: country_code || "",
      phone,
      variant: variant || "demo",
    });

    if (error) {
      console.error("[Lead] Supabase insert error:", JSON.stringify(error));
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Lead] Unexpected error:", err);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
