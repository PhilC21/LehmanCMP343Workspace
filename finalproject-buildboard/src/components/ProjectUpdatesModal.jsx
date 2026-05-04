"use client";

import { useState } from "react";
import { styles } from "@/lib/styles";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ProjectUpdatesModal({
    projectId,
    updates,
    setUpdates,
    onClose,
}) {
    const [newUpdate, setNewUpdate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleAddUpdate(event) {
        event.preventDefault();

        if (!newUpdate.trim()) return;

        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const response = await fetch(`/api/projects/${projectId}/updates`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: newUpdate }),
            });

            if (!response.ok) {
                throw new Error("Failed to add update");
            }

            const createdUpdate = await response.json();

            setUpdates((prev) => [createdUpdate, ...prev]);
            setNewUpdate("");
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="mb-5 flex items-center justify-between">
                    <h2 className={styles.text.sectionTitle}>Project Updates</h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className={styles.button.redBtn}
                    >
                        <XMarkIcon className="size-5" />
                    </button>
                </div>

                {errorMessage && (
                    <div className={`${styles.form.error} mb-4`}>{errorMessage}</div>
                )}

                <form onSubmit={handleAddUpdate} className="mb-6 space-y-3">
                    <textarea
                        value={newUpdate}
                        onChange={(event) => setNewUpdate(event.target.value)}
                        rows="4"
                        placeholder="Got any updates?"
                        required
                        className={styles.form.inputField}
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${styles.button.primary} disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                        {isSubmitting ? "Adding..." : "Add Update"}
                    </button>
                </form>

                <div className="max-h-80 overflow-y-auto">
                    {updates.length === 0 ? (
                        <p className="text-slate-700">No updates yet.</p>
                    ) : (
                        <ul className="space-y-2">
                            {updates.map((update) => (
                                <li
                                    key={update.id}
                                    className="rounded-xl border border-slate-200 p-4"
                                >
                                    <p className="text-slate-800">{update.content}</p>
                                    <p className="mt-2 text-xs text-slate-500">
                                        {new Date(update.created_at).toLocaleString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}