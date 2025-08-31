import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
// GET profile
export async function GET() {
    console.log("➡️ [API] GET /api/profile called");

    const supabase = await createClient();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    console.log("👤 [API] Auth result:", { user, authError });

    if (authError || !user) {
        console.error("❌ [API] Unauthorized:", authError?.message);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch profile row
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id) // ✅ use user_id
        .single();

    console.log("📦 [API] Profile fetch result:", { data, error });

    if (error) {
        console.error("❌ [API] Profile fetch error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ profile: data });
}

// UPDATE profile
export async function PUT(req: Request) {
    console.log("➡️ [API] PUT /api/profile called");

    const supabase = await createClient();
    const body = await req.json();

    console.log("📥 [API] Update payload:", body);

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    console.log("👤 [API] Auth result:", { user, authError });

    if (authError || !user) {
        console.error("❌ [API] Unauthorized update attempt");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only update allowed fields
    const updates = {
        first_name: body.first_name,
        last_name: body.last_name,
        company_name: body.company_name,
        photo_url: body.photo_url,
        channel_link: body.channel_link, // ✅ add this
        wants_email: body.wants_email,
        updated_at: new Date().toISOString(),
    };

    console.log("📝 [API] Updating profile with:", updates);

    const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("user_id", user.id) // ✅ use user_id
        .select()
        .single();

    console.log("📦 [API] Profile update result:", { data, error });

    if (error) {
        console.error("❌ [API] Update error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ profile: data });
}

