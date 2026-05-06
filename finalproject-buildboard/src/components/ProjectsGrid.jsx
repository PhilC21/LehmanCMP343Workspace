import ProjectCard from "@/components/ProjectCard";
import { styles } from "@/lib/styles";

export default function ProjectsGrid({ projects }) {
    if (projects.length === 0) {
        return (
            <div className={styles.card.empty}>
                No projects found yet. Add your first project to get started.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <div className={`${styles.grid.projects} min-w-[360px]`}>
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}