import { styles } from "@/lib/styles";
import { PlusIcon } from "@heroicons/react/24/outline";
export default function Header() {
    return (
        // main dashboard header section
        <header className={styles.header.wrapper}>
            <div>
                <h2 className={styles.header.title}>Dashboard</h2>
                <p className={styles.header.subtitle}>
                    Track your builds. Ship with clarity.
                </p>

                <button className={styles.button.primary}> <PlusIcon className="w-4" /> New Project</button>
            </div>
        </header>
    );
}