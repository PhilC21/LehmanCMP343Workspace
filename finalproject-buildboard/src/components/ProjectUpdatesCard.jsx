"use client";

import { useEffect, useState } from "react";
import ProjectUpdatesModal from "@/components/ProjectUpdatesModal";
import { styles } from "@/lib/styles";

export default function ProjectUpdatesCard({ projectId }) {
    const [updates, setUpdates] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    async function fetchUpdates() {
        try {
            setIsLoading(true);

            const response = await fetch(`/api/projects/${projectId}/updates`);

            if (!response.ok) {
                throw new Error("Failed to fetch updates");
            }

            const data = await response.json();
            setUpdates(data);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchUpdates();
    }, [projectId]);

    const recentUpdates = updates.slice(0, 5);

    return (
        <>
            <div
                onClick={() => setIsModalOpen(true)}
                className={`${styles.panel.box} ${styles.panel.clickable}`}
            >
                <p className={styles.meta.label}>Updates</p>

                {isLoading ? (
                    <p className="mt-2 text-slate-600">Loading updates...</p>
                ) : errorMessage ? (
                    <p className="mt-2 text-red-600">{errorMessage}</p>
                ) : recentUpdates.length === 0 ? (
                    <p className="mt-2 text-slate-700">No updates yet.</p>
                ) : (
                    <ul className="mt-3 space-y-3">
                        {recentUpdates.map((update) => (
                            <li
                                key={update.id}
                                className="border-b border-slate-200 pb-2 last:border-b-0"
                            >
                                <p className="text-sm text-slate-800 line-clamp-2">
                                    {update.content}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                    {new Date(update.created_at).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {isModalOpen && (
                <ProjectUpdatesModal
                    projectId={projectId}
                    updates={updates}
                    setUpdates={setUpdates}
                    onClose={async () => {
                        setIsModalOpen(false);
                        await fetchUpdates();
                    }}
                />
            )}
        </>
    );
}