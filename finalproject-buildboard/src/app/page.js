import Link from "next/link";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
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

export default async function Home() {
    const projects = await getProjects();

    // Dashboard stat calculations
    const totalProjects = projects.length;
    const planned = projects.filter(
        (project) => project.status === "planned"
    ).length;
    const inProgress = projects.filter(
        (project) => project.status === "in progress"
    ).length;
    const completed = projects.filter(
        (project) => project.status === "completed"
    ).length;
    const paused = projects.filter(
        (project) => project.status === "paused"
    ).length;

    const recentProjects = projects.slice(0, 5);
    const recentActivity = [...projects]
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 5);

    return (
        <main className={styles.layout.page}>
            <Header />

            {/* Top summary stats */}
            <section className={styles.grid.stats}>
                <StatCard title="Total Projects" value={totalProjects} />
                <StatCard title="Planned" value={planned} />
                <StatCard title="In Progress" value={inProgress} />
                <StatCard title="Completed" value={completed} />
                <StatCard title="Paused" value={paused} />
            </section>

            {/* Main content area */}
            <section className={styles.grid.main}>
                {/* Left: activity chart */}
                <div className={styles.layout.section}>
                    <h3 className={styles.text.sectionTitle}>Project Activity</h3>

                    <div className="max-h-90 overflow-y-auto pr-1 text-slate-400">
                        {recentActivity.length === 0 ? (
                            <p className="text-slate-600">No project activity yet</p>
                        ) : (
                            <ul className="w-full min-w-0 space-y-3">
                                {recentActivity.map((project) => (
                                    <li key={project.id}>
                                        <Link className="block p-3 transition hover:bg-zinc-100 hover:shadow-md" href={`/projects/${project.id}`}>
                                            <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="flex flex-wrap items-center gap-2 min-w-0">
                                                    <span className="font-semibold text-slate-800 break-words">
                                                        {project.title}
                                                    </span>

                                                    <span
                                                        className={`${styles.badge.base} ${styles.badge.priority[project.priority] ||
                                                            "bg-slate-100 text-slate-700"
                                                            }`}
                                                    >
                                                        {project.priority} Priority
                                                    </span>
                                                </div>

                                                <span className="text-sm text-slate-600">
                                                    {project.progress}%
                                                </span>
                                            </div>

                                            <div className={styles.progress.track}>
                                                <div
                                                    className={styles.progress.fill}
                                                    style={{ width: `${project.progress}%` }}
                                                />
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Right: Recent Projects */}
                <div className={styles.layout.section}>
                    <h3 className={styles.text.sectionTitle}>Recent Projects</h3>
                    
                    {recentProjects.length === 0 ? (
                        <p className="text-slate-600">No projects yet</p>
                    ) : (
                        <ul className="space-y-2">
                            {recentProjects.map((project) => (
                                <li key={project.id}>
                                    <Link
                                        href={`/projects/${project.id}`}
                                        className="flex flex-col gap-3 rounded-lg border border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between transition hover:bg-zinc-200 hover:shadow-sm"
                                    >
                                        <div className="min-w-0">
                                            <p className="font-semibold text-slate-800">
                                                {project.title}
                                            </p>
                                            <p className="text-sm text-slate-500 capitalize">
                                                {project.category}
                                            </p>
                                        </div>
                                        <span
                                            className={`${styles.badge.base} ${styles.badge.status[project.status] || "bg-slate-100 text-slate-700"} self-start sm:self-auto`}
                                        >
                                            {project.status}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
        </main>
    );
}