import Header from "@/components/Header";
import DashboardStats from "@/components/DashboardStats";
import ProjectActivityList from "@/components/ProjectActivityList";
import RecentProjectsList from "@/components/RecentProjectsList";
import { styles } from "@/lib/styles";

// GET projects from local API route
async function getProjects() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch projects");
    }

    return response.json();
}

function getDashboardStats(projects) {
    return {
        totalProjects: projects.length,
        planned: projects.filter((project) => project.status === "planned").length,
        inProgress: projects.filter((project) => project.status === "in progress").length,
        completed: projects.filter((project) => project.status === "completed").length,
        paused: projects.filter((project) => project.status === "paused").length,
    };
}



export default async function Home() {
    const projects = await getProjects();

    const stats = getDashboardStats(projects);

    const recentProjects = projects.slice(0, 5);
    const recentActivity = [...projects]
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 5);

    return (
        <main className={styles.layout.page}>
            <Header />

            <DashboardStats stats={stats} />

            <section className={styles.grid.main}>
                <ProjectActivityList projects={recentActivity} />
                <RecentProjectsList projects={recentProjects} />
            </section>
        </main>
    );
}