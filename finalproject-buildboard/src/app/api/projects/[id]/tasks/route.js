import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// GET all tasks
export async function GET(request, { params }) {
    const { id } = await params;

    const { data, error } = await supabaseServer
        .from("tasks")
        .select("*")
        .eq("project_id", id)
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}

// POST task
export async function POST(request, { params }) {
    const { id } = await params;
    const body = await request.json();

    if (!body.content || !body.content.trim()) {
        return NextResponse.json(
            { error: "Task content is required" },
            { status: 400 }
        );
    }

    const { data, error } = await supabaseServer
        .from("tasks")
        .insert([
            {
                project_id: id,
                content: body.content,
            },
        ])
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
}

// PATCH a task by id (is_complete: true/false)
export async function PATCH(request) {
    const body = await request.json();

    if (!body.id) {
        return NextResponse.json(
            { error: "Task ID is required" },
            { status: 400 }
        );
    }

    const { data, error } = await supabaseServer
        .from("tasks")
        .update({
            is_complete: body.is_complete,
            updated_at: new Date().toISOString(),
        })
        .eq("id", body.id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}

// DELETE a task
export async function DELETE(request) {
    const body = await request.json();

    if (!body.id) {
        return NextResponse.json(
            { error: "Task ID is required" },
            { status: 400 }
        );
    }

    const { error } = await supabaseServer
        .from("tasks")
        .delete()
        .eq("id", body.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
        { success: true },
        { status: 200 }
    );
}