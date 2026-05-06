import ProjectsHeader from "@/components/ProjectsHeader";
import ProjectsGrid from "@/components/ProjectsGrid";
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
          <ProjectsHeader />
          
          <ProjectsGrid projects={projects} />
        </section>
      </main>
    );
  }