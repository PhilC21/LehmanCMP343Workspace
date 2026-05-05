import StatCard from "@/components/StatCard";
import { styles } from "@/lib/styles";

export default function DashboardStats({ stats }) {
    return (
        <section className={styles.grid.stats}>
            <StatCard title="Total Projects" value={stats.totalProjects} />
            <StatCard title="Planned" value={stats.planned} />
            <StatCard title="In Progress" value={stats.inProgress} />
            <StatCard title="Completed" value={stats.completed} />
            <StatCard title="Paused" value={stats.paused} />
        </section>
    );
}