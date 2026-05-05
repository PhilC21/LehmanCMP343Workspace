import Link from "next/link";
import { styles } from "@/lib/styles";

export default function ProjectActivityList({ projects }) {
    return (
        <div className={styles.layout.section}>
            <h3 className={styles.text.sectionTitle}>Project Activity</h3>

            <div className="max-h-90 overflow-y-auto pr-1">
                {projects.length === 0 ? (
                    <p className="text-slate-600">No project activity yet</p>
                ) : (
                    <ul className="w-full min-w-0 space-y-3">
                        {projects.map((project) => (
                            <li key={project.id}>
                                <Link
                                    className="block min-w-0 overflow-hidden p-3 transition hover:bg-zinc-100 hover:shadow-md"
                                    href={`/projects/${project.id}`}
                                >
                                    <div className="mb-2 flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                                            <span className="break-words font-semibold text-slate-800 whitespace-normal">
                                                {project.title}
                                            </span>

                                            <span
                                                className={`${styles.badge.base} ${styles.badge.priority[project.priority] ||
                                                    "bg-slate-100 text-slate-700"
                                                    }`}
                                            >
                                                {project.priority} Priority
                                            </span>
                                        </div>

                                        <span className="text-sm text-slate-600">
                                            {project.progress}%
                                        </span>
                                    </div>

                                    <div className={styles.progress.track}>
                                        <div
                                            className={styles.progress.fill}
                                            style={{ width: `${project.progress}%` }}
                                        />
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}