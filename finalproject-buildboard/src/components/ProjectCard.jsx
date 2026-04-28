import { styles } from "@/lib/styles";

// small card for displaying one saved project
export default function ProjectCard({ project }) {
    return (
        <article className={styles.card.project}>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                        {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 capitalize">{project.category}</p>
                </div>

                <span className={styles.badge.status}>
                    {project.status}
                </span>
            </div>

            <p className="mt-4 text-sm text-slate-600">
                {project.description || "No description provided."}
            </p>

            <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between text-sm text-slate-600">
                    <span className="capitalize">Priority: {project.priority}</span>
                    <span>{project.progress}%</span>
                </div>

                {/* progress bar */}
                <div className="h-2 w-full rounded-full bg-slate-200">
                    <div
                        className="h-2 rounded-full bg-emerald-500"
                        style={{ width: `${project.progress}%` }}
                    />
                </div>
            </div>
        </article>
    );
}