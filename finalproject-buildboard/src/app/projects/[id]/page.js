import Link from "next/link";
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { styles } from "@/lib/styles";
import ProjectDetailsHeader from "@/components/ProjectDetailsHeader";
import ProjectDetailsBody from "@/components/ProjectDetailsBody";

async function getProject(id) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/projects/${id}`,
        { cache: "no-store" }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch project");
    }

    return response.json();
}

export default async function ProjectDetailsPage({ params }) {
    const { id } = await params;
    const project = await getProject(id);

    return (
        <main className={styles.layout.page}>
            <section className={styles.layout.section}>
                <Link
                    href="/projects"
                    className="inline-flex items-center px-4 py-2 gap-2 mb-4 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                    <ArrowLeftIcon className="w-4" />
                    Back to Projects
                </Link>

                <ProjectDetailsHeader project={project} />
                <ProjectDetailsBody project={project} />
            </section>
        </main>
    );
}