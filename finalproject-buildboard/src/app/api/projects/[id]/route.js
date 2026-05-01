import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// GET one project by id
export async function GET(request, { params }) {
    const { id } = await params;

    const { data, error } = await supabaseServer
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        return NextResponse.json(
            { error: "Failed to fetch project", details: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json(data, { status: 200 });
}

// PUT update project by id
export async function PUT(request, { params }) {
    const { id } = await params;
    const body = await request.json();

    const normalizedProgress =
        body.status === "completed" ? 100 : Number(body.progress ?? 0);

    const updatedProject = {
        title: body.title,
        description: body.description,
        category: body.category,
        status: body.status,
        priority: body.priority,
        progress: normalizedProgress,
        updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseServer
        .from("projects")
        .update(updatedProject)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return NextResponse.json(
            { error: "Failed to update project", details: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json(data, { status: 200 });
}

// DELETE project by id
export async function DELETE(request, { params }) {
    const { id } = await params;

    const { error } = await supabaseServer
        .from("projects")
        .delete()
        .eq("id", id);

    if (error) {
        return NextResponse.json(
            { error: "Failed to delete project", details: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json(
        { message: "Project deleted successfully" },
        { status: 200 }
    );
}