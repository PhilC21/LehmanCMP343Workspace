import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import ProjectCard from "@/components/ProjectCard";
import { styles } from "@/lib/styles";

// get projects from the local API route
async function getProjects() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch projects");
    }

    return response.json();
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <main className={styles.layout.page}>
            <section className={styles.layout.section}>
                <div className="mb-6">
                    <h1 className={styles.header.title}>Projects</h1>
                    <p className={styles.header.subtitle}>
                        View and manage all saved projects in BuildBoard.
                    </p>
                    <Link
                    href="/projects/new"
                    className={`${styles.button.primary} inline-flex items-center gap-2`}
                >
                    <PlusIcon className="w-4" />
                    <span>New Project</span>
                </Link>
                </div>

                {projects.length === 0 ? (
                    <div className={styles.card.empty}>
                        No projects found yet. Add your first project to get started.
                    </div>
                ) : (
                    <div className={styles.grid.projects}>
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}