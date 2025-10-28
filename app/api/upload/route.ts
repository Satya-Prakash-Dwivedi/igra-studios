import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
    const supabase = await createClient();

    // 1. Get current user
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    console.log("👤 [UPLOAD] Auth:", { user, authError });

    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const bucket = formData.get("bucket") as string;

    // 3. Validate the file and bucket
    if (!file) {
        console.error("❌ [UPLOAD] No file provided");
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!bucket || (bucket !== "avatars" && bucket !== "logos")) {
        console.error(`❌ [UPLOAD] Invalid or missing bucket: ${bucket}`);
        return NextResponse.json({ error: "Invalid bucket specified" }, { status: 400 });
    }

    // 4. Prepare the file path

    // Convert to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Use the user.id directly in the path (matches RLS)
    const ext = file.name.split(".").pop();
    const filePath = `${user.id}/${randomUUID()}.${ext}`;

    console.log("📤 [UPLOAD] Uploading file:", {
        bucket: bucket,
        filePath,
        type: file.type,
        size: buffer.length,
        userId: user.id,
    });

    const { error: uploadError } = await supabase.storage
        .from(bucket)
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
    } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

    console.log("✅ [UPLOAD] File uploaded successfully:", publicUrl);

    return NextResponse.json({ url: publicUrl });
}
