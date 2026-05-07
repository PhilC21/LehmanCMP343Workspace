"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ProjectForm from "@/components/ProjectForm";
import { styles } from "@/lib/styles";

export default function EditProjectPage() {
    const { id } = useParams();
    const router = useRouter();

    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const searchParams = useSearchParams();
    const returnTo = searchParams.get("returnTo");

    useEffect(() => {
        async function fetchProject() {
            try {
                const response = await fetch(`/api/projects/${id}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch project");
                }

                const data = await response.json();
                setProject(data);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProject();
    }, [id]);

    return (
        <main className={styles.layout.page}>
            <section className={styles.layout.section}>
                <div className="mb-4">
                    <h1 className={styles.header.title}>Edit Project</h1>
                    <p className={styles.header.subtitle}>
                        Update project details and progress.
                    </p>
                </div>

                {isLoading && <p className="text-slate-600">Loading project...</p>}

                {errorMessage && <div className={styles.form.error}>{errorMessage}</div>}

                {project && (
                    <ProjectForm
                        mode="edit"
                        projectId={id}
                        initialData={project}
                        onSuccess={() => router.push(returnTo || "/projects")}
                    />
                )}
            </section>
        </main>
    );
}