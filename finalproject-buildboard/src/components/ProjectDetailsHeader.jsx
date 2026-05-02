import Link from "next/link";
import DeleteProjectButton from "@/components/DeleteProjectButton";
import { styles } from "@/lib/styles";

export default function ProjectDetailsHeader({ project }) {
    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
                <h1 className={styles.header.title}>{project.title}</h1>
                <p className={`${styles.header.subtitle} capitalize`}>{project.category}</p>

                <div className="mt-2 flex flex-wrap gap-3">
                    <span
                        className={`${styles.badge.base} ${styles.badge.status[project.status] ||
                            "bg-slate-100 text-slate-700"
                            }`}
                    >
                        {project.status}
                    </span>

                    <span
                        className={`${styles.badge.base} ${styles.badge.priority[project.priority] ||
                            "bg-slate-100 text-slate-700"
                            }`}
                    >
                        Priority: {project.priority}
                    </span>
                </div>
            </div>

            <div className="flex gap-3">
                <Link
                    href={`/projects/${project.id}/edit`}
                    className={styles.button.primary}
                >
                    Edit
                </Link>

                <DeleteProjectButton
                    projectId={project.id}
                    projectTitle={project.title}
                />
            </div>
        </div>
    );
}