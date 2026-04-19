import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import { styles } from "@/lib/styles";

export default function Home() {
  return (
    <main className={styles.layout.page}>
      <Header />

      {/* top summary stats */}
      <section className={styles.grid.stats}>
        <StatCard title="Total Projects" value="0" />
        <StatCard title="In Progress" value="0" />
        <StatCard title="Completed" value="0" />
        <StatCard title="Paused" value="0" />
      </section>

      {/* main content area */}
      <section className={styles.grid.main}>
        {/* Left: placeholder "activity" chart */}
        <div className={styles.layout.section}>
          <h3 className={styles.text.sectionTitle}>Project Activity</h3>

          <div className="h-64 flex items-center justify-center text-slate-400">
            Chart coming soon
          </div>
        </div>

        {/* Right: Recent Projects */}
        <div className={styles.layout.section}>
          <h3 className={styles.text.sectionTitle}>Recent Projects</h3>

          <ul className="space-y-4">
            <li className="flex justify-between text-slate-600">
              <span>No projects yet</span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
