import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// GET all updates for one project
export async function GET(request, { params }) {
    const { id } = await params;

    const { data, error } = await supabaseServer
        .from("updates")
        .select("*")
        .eq("project_id", id)
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json(
            { error: "Failed to fetch updates", details: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json(data, { status: 200 });
}

// POST a new update for one project
export async function POST(request, { params }) {
    const { id } = await params;

    try {
        const body = await request.json();

        const { data, error } = await supabaseServer
            .from("updates")
            .insert([
                {
                    project_id: id,
                    content: body.content,
                },
            ])
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { error: "Failed to create update", details: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(data, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: "Invalid request body" },
            { status: 400 }
        );
    }
}