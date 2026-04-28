import { styles } from "@/lib/styles";

export default function StatCard({ title, value }) {
    return (
        // reusable summary card for dashboard stats
        <div className={styles.card.stat}>
            <p className={styles.text.statTitle}>{title}</p>
            <h3 className={styles.text.statValue}>{value}</h3>
        </div>
    );
}