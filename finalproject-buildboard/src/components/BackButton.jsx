"use client";

import { useRouter } from "next/navigation";
import { styles } from "@/lib/styles";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push("/projects")}
            className={styles.button.secondary}
        >
            <ArrowLeftIcon className="w-4" />
            Back to Projects
        </button>
    );
}