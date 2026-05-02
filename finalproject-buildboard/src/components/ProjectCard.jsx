"use client";

import Link from "next/link";
import { styles } from "@/lib/styles";
import DeleteProjectButton from "@/components/DeleteProjectButton";
import { useRouter } from "next/navigation";

// small card for displaying one saved project
export default function ProjectCard({ project }) {
    const router = useRouter();

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
                <div className={styles.progress.track}>
                    <div
                        className={styles.progress.fill}
                        style={{ width: `${project.progress}%` }}
                    />
                </div>
            </div>

            <div className="mt-5 flex gap-3">
                <Link
                    href={`/projects/${project.id}`}
                    className={styles.button.secondary}
                >
                    View
                </Link>

                <Link
                    href={`/projects/${project.id}/edit`}
                    className={styles.button.primary}
                >
                    Edit
                </Link>

                <DeleteProjectButton
                    projectId={project.id}
                    projectTitle={project.title}
                    onDeleteSuccess={() => router.refresh()}
                />
            </div>
        </article>
    );
}