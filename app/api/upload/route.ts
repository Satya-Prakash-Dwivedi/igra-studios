import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
    const supabase = await createClient();

    // Get current user
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    console.log("👤 [UPLOAD] Auth:", { user, authError });

    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
        console.error("❌ [UPLOAD] No file provided");
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Use the user.id directly in the path (matches RLS)
    const ext = file.name.split(".").pop();
    const filePath = `${user.id}/${randomUUID()}.${ext}`;

    console.log("📤 [UPLOAD] Uploading file:", {
        bucket: "avatars",
        filePath,
        type: file.type,
        size: buffer.length,
        userId: user.id,
    });

    const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, buffer, {
            contentType: file.type,
            upsert: true,
        });

    if (uploadError) {
        console.error("❌ [UPLOAD] Upload error:", uploadError);
        return NextResponse.json(
            { error: uploadError.message, details: uploadError },
            { status: 400 }
        );
    }

    const {
        data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    console.log("✅ [UPLOAD] File uploaded successfully:", publicUrl);

    return NextResponse.json({ url: publicUrl });
}
