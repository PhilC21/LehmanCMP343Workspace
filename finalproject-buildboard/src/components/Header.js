import { styles } from "@/lib/styles";

export default function Header() {
    return (
        // main dashboard header section
        <header className={styles.header.wrapper}>
            <div>
                <h2 className={styles.header.title}>Dashboard</h2>
                <p className={styles.header.subtitle}>
                    Track your builds. Ship with clarity.
                </p>

                <button className={styles.button.primary}>+ New Project</button>
            </div>
        </header>
    );
}