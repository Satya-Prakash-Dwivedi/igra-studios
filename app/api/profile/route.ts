import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/admin";

export const dynamic = "force-dynamic";

// GET profile
export async function GET() {
    console.log("➡️ [API] GET /api/profile called");

    const supabase = await createClient();

    // Step 1: Check auth
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    console.log("👤 [DEBUG] Auth result:", { user, authError });

    if (authError || !user) {
        console.error("❌ [DEBUG] Unauthorized: user not found or auth error");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Step 2: Check if user_id in profiles matches
    console.log("➡️ [DEBUG] Attempting to fetch profile for user_id:", user.id);

    // Step 3: Fetch profile
    const { data, error } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

    // Step 4: Log raw response
    console.log("📦 [DEBUG] Profile fetch raw response:", { data, error });

    // Step 5: Debug permissions / visibility
    if (!data && !error) {
        console.warn("⚠️ [DEBUG] No profile found. Row might exist but is invisible due to RLS.");
    }
    if (error) {
        console.error("❌ [DEBUG] Supabase select error:", error);
    }

    return NextResponse.json({ profile: data });
}

// UPDATE profile
export async function PUT(req: Request) {
    console.log("➡️ [API] PUT /api/profile called");

    const supabase = await createClient();
    const body = await req.json();

    console.log("📥 [DEBUG] Update payload:", body);

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    console.log("👤 [DEBUG] Auth result:", { user, authError });

    if (authError || !user) {
        console.error("❌ [DEBUG] Unauthorized update attempt");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updates = {
        first_name: body.first_name,
        last_name: body.last_name,
        company_name: body.company_name,
        photo_url: body.photo_url,
        wants_email: body.wants_email,
        updated_at: new Date().toISOString(),
    };

    console.log("📝 [DEBUG] Profile updates to apply:", updates);

    const { data, error } = await supabaseAdmin
        .from("profiles")
        .update(updates)
        .eq("user_id", user.id)
        .select()
        .maybeSingle();

    console.log("📦 [DEBUG] Profile update raw response:", { data, error });

    if (error) {
        console.error("❌ [DEBUG] Update failed:", error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ profile: data });
}
