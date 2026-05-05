import Link from "next/link";
import { styles } from "@/lib/styles";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function Header() {
    return (
        // main dashboard header section
        <header className={styles.header.wrapper}>
            <div>
                <h2 className={styles.header.title}>Home</h2>
                <p className={styles.header.subtitle}>
                    Welcome to BuildBoard! Track your builds. Ship with clarity.
                </p>

                {/* <Link
                    href="/projects/new"
                    className={`${styles.button.primary} inline-flex items-center gap-2`}
                >
                    <PlusIcon className="w-4" />
                    <span>New Project</span>
                </Link> */}
            </div>
        </header>
    );
}