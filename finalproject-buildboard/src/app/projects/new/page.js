"use client";

import { useRouter } from "next/navigation";
import { styles } from "@/lib/styles";
import ProjectForm from "@/components/ProjectForm";

export default function NewProjectPage() {
    const router = useRouter();

    return (
        <main className={styles.layout.page}>
            <section className={styles.layout.section}>
                <div className="mb-4">
                    <h1 className={styles.header.title}>Add Project</h1>
                    <p className={styles.header.subtitle}>
                        Start a new project.
                    </p>
                </div>

                <ProjectForm onSuccess={() => router.push("/projects")} />
            </section>
        </main>
    );
}