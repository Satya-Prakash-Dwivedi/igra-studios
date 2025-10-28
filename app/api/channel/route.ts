import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

// Helper function to get the user
async function getUserId(): Promise<string | null> {
    const supabase = await createClient();
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return null;
    }
    return user.id;
}

// GET all channels for the current user
export async function GET(req: Request) {
    try {
        const userId = await getUserId();

        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const channels = await prisma.channel.findMany({
            where: { profileId: userId },
        });

        return NextResponse.json({ channels });
    } catch (error: any) {
        console.error("❌ [API] GET /channel error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST a new channel
export async function POST(req: Request) {
    try {
        const userId = await getUserId();
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { name, link, pace, tone, logo, description } = body;

        const channel = await prisma.channel.create({
            data: {
                name,
                link,
                pace,
                tone,
                logo,
                description,
                profileId: userId,
            },
        });

        return NextResponse.json({ channel });
    } catch (error: any) {
        console.error("❌ [API] POST /channel error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT (update) channel
export async function PUT(req: Request) {
    try {
        const userId = await getUserId();
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { id, name, link, pace, tone, logo, description } = body;

        const channel = await prisma.channel.updateMany({
            where: { id, profileId: userId },
            data: { name, link, pace, tone, logo, description },
        });

        return NextResponse.json({ channel });
    } catch (error: any) {
        console.error("❌ [API] PUT /channel error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE channel
export async function DELETE(req: Request) {
    try {
        const userId = await getUserId();
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "Channel ID required" }, { status: 400 });

        const deleted = await prisma.channel.deleteMany({
            where: { id, profileId: userId },
        });

        return NextResponse.json({ deleted });
    } catch (error: any) {
        console.error("❌ [API] DELETE /channel error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
