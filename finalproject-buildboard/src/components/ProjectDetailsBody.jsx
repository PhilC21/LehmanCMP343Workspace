import ProjectUpdatesCard from "@/components/ProjectUpdatesCard";
import ProjectTasksCard from "@/components/ProjectTasksCard";
import { styles } from "@/lib/styles";

export default function ProjectDetailsBody({ project }) {
    return (
        <>
            <div className="mb-8">
                <h2 className={styles.text.sectionTitle}>Description:</h2>
                <p className="text-slate-700">
                    {project.description || "No description provided."}
                </p>
            </div>

            {/* Top row: Progress + Created/Updated */}
            <div className={styles.grid.detailsTwoCol}>
                <div className={styles.panel.box}>
                    <p className={styles.meta.label}>Progress:</p>

                    <p className="mt-2 text-2xl font-semibold text-slate-800">
                        {project.progress}%
                    </p>

                    <div className={`mt-3 ${styles.progress.track}`}>
                        <div
                            className={styles.progress.fill}
                            style={{ width: `${project.progress}%` }}
                        />
                    </div>
                </div>

                <div className={styles.panel.box}>
                    <p className={styles.meta.label}>Created:</p>
                    <p className="mt-2 text-slate-800">
                        {new Date(project.created_at).toLocaleString()}
                    </p>

                    <div className="mt-5">
                        <p className={styles.meta.label}>Last Updated:</p>
                        <p className="mt-2 text-slate-800">
                            {new Date(project.updated_at).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom row: Updates + To-do */}
            <div className={styles.grid.detailsTwoCol}>
                <ProjectUpdatesCard projectId={project.id} />

                <ProjectTasksCard projectId={project.id} />
            </div>
        </>
    );
}