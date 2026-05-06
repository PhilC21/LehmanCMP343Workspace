import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { styles } from "@/lib/styles";

export default function ProjectsHeader() {
    return (
        <div className="mb-6">
            <h1 className={styles.header.title}>Projects</h1>
            <p className={styles.header.subtitle}>
                View and manage all saved projects in BuildBoard.
            </p>
            
            <Link
                href="/projects/new"
                className={`${styles.button.primary} inline-flex items-center gap-2`}
            >
                <PlusIcon className="w-4" />
                <span>New Project</span>
            </Link>
        </div>
    )
}