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
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-5">
                    <p className="text-sm text-slate-500">Progress:</p>

                    <p className="mt-2 text-2xl font-semibold text-slate-800">
                        {project.progress}%
                    </p>

                    <div className="mt-3 h-2 w-full rounded-full bg-slate-200">
                        <div
                            className="h-2 rounded-full bg-emerald-500"
                            style={{ width: `${project.progress}%` }}
                        />
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-5">
                    <p className="text-sm text-slate-500">Created:</p>
                    <p className="mt-2 text-slate-800">
                        {new Date(project.created_at).toLocaleString()}
                    </p>

                    <div className="mt-5">
                        <p className="text-sm text-slate-500">Last Updated:</p>
                        <p className="mt-2 text-slate-800">
                            {new Date(project.updated_at).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom row: Updates + To-do */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-5">
                    <p className="text-sm text-slate-500">Updates:</p>
                    <p className="mt-2 text-slate-700">Under construction...</p>
                </div>

                <div className="rounded-xl border border-slate-200 p-5">
                    <p className="text-sm text-slate-500">To-do:</p>
                    <p className="mt-2 text-slate-700">Under construction...</p>
                </div>
            </div>
        </>
    );
}