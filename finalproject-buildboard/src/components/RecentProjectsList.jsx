import Link from "next/link";
import { styles } from "@/lib/styles";

export default function RecentProjectsList({ projects }) {
    return (
        <div className={styles.layout.section}>
            <h3 className={styles.text.sectionTitle}>Recent Projects</h3>

            <div className="max-h-90 overflow-y-auto pr-1">
                {projects.length === 0 ? (
                    <p className="text-slate-600">No projects yet</p>
                ) : (
                    <ul className="space-y-2">
                        {projects.map((project) => (
                            <li key={project.id}>
                                <Link
                                    href={`/projects/${project.id}`}
                                    className="flex min-w-0 flex-col gap-3 overflow-hidden rounded-lg border border-slate-200 p-3 transition hover:bg-zinc-200 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="min-w-0">
                                        <span className="break-words font-semibold text-slate-800 whitespace-normal">
                                            {project.title}
                                        </span>

                                        <p className="text-sm text-slate-500 capitalize">
                                            {project.category}
                                        </p>
                                    </div>

                                    <span
                                        className={`${styles.badge.base} ${styles.badge.status[project.status]}`}
                                    >
                                        {project.status}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}