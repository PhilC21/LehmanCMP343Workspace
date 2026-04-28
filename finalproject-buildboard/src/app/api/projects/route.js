import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// GET all projects
export async function GET() {
    const { data, error } = await supabaseServer
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json(
            { error: "Failed to fetch projects", details: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json(data, { status: 200 });
}

// POST a new project
export async function POST(request) {
    try {
        const body = await request.json();

        const normalizedProgress = body.status === "completed" ? 100 : Number(body.progress ?? 0);

        const newProject = {
            title: body.title,
            description: body.description,
            category: body.category,
            status: body.status,
            priority: body.priority,
            progress: normalizedProgress,
        };

        const { data, error } = await supabaseServer
            .from("projects")
            .insert([newProject])
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { error: "Failed to create project", details: error.message },
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