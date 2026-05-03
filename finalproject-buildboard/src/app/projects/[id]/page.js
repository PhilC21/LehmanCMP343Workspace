import BackButton from "@/components/BackButton";
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
                <BackButton />

                <ProjectDetailsHeader project={project} />
                <ProjectDetailsBody project={project} />
            </section>
        </main>
    );
}