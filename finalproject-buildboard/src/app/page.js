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

    return (
        <main className={styles.layout.page}>
            <Header />

            {/* Top summary stats */}
            <section className={styles.grid.stats}>
                <StatCard title="Total Projects" value={totalProjects} />
                <StatCard title="In Progress" value={inProgress} />
                <StatCard title="Completed" value={completed} />
                <StatCard title="Paused" value={paused} />
            </section>

            {/* Main content area */}
            <section className={styles.grid.main}>
                {/* Left: placeholder activity chart */}
                <div className={styles.layout.section}>
                    <h3 className={styles.text.sectionTitle}>Project Activity</h3>

                    <div className="h-64 flex items-center justify-center text-slate-400">
                        Chart coming soon
                    </div>
                </div>

                {/* Right: Recent Projects */}
                <div className={styles.layout.section}>
                    <h3 className={styles.text.sectionTitle}>Recent Projects</h3>

                    {recentProjects.length === 0 ? (
                        <p className="text-slate-600">No projects yet</p>
                    ) : (
                        <ul className="space-y-4">
                            {recentProjects.map((project) => (
                                <li
                                    key={project.id}
                                    className="flex rounded-lg px-3 py-2 mb-2 items-center justify-between border border-slate-300 hover:bg-slate-100"
                                >
                                    <div>
                                        <p className="font-semibold text-slate-800">
                                            {project.title}
                                        </p>
                                        <p className="text-sm text-slate-500 capitalize">
                                            {project.category}
                                        </p>
                                    </div>

                                    <span className={styles.badge.status}>
                                        {project.status}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
        </main>
    );
}