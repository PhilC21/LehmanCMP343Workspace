"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { styles } from "@/lib/styles";

// small card for displaying one saved project
export default function ProjectCard({ project }) {
    const router = useRouter();

    async function handleDelete() {
        const confirmDelete = window.confirm(
            `Delete "${project.title}" project? This action CANNOT be undone.`
        );

        if (!confirmDelete) return;

        const response = await fetch(`/api/projects/${project.id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            router.refresh();
        } else {
            alert("Failed to delete project");
        }
    }

    return (
        <article className={styles.card.project}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-slate-800">
                        {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 capitalize">{project.category}</p>
                </div>

                <span
                    className={`${styles.badge.base} ${styles.badge.status[project.status] || "bg-slate-100 text-slate-700"}`}
                >
                    {project.status}
                </span>
            </div>

            <p className="mt-4 text-sm text-slate-600">
                {project.description || "No description provided."}
            </p>

            <div className="mt-5 space-y-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-600">
                    <span
                        className={`${styles.badge.base} ${styles.badge.priority[project.priority] || "bg-slate-100 text-slate-700"}`}
                    >
                        Priority: {project.priority}
                    </span>                    
                    <span>Progress: {project.progress}%</span>
                </div>

                {/* progress bar */}
                <div className="h-2 w-full rounded-full bg-slate-200">
                    <div
                        className="h-2 rounded-full bg-emerald-500"
                        style={{ width: `${project.progress}%` }}
                    />
                </div>
            </div>

            <div className="mt-5 flex gap-3">
                <Link
                    href={`/projects/${project.id}/edit`}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                    Edit
                </Link>

                <button
                    type="button"
                    onClick={handleDelete}
                    className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                    Delete
                </button>
            </div>
        </article>
    );
}