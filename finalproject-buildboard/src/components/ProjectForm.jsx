"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { styles } from "@/lib/styles";

export default function ProjectForm({
    onSuccess,
    initialData = null,
    mode = "create",
    projectId = null,
}) {
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        category: initialData?.category || "",
        status: initialData?.status || "",
        priority: initialData?.priority || "",
        progress: initialData?.progress ?? "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "progress" ? Number(value) : value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const url =
                mode === "edit" ? `/api/projects/${projectId}` : "/api/projects";

            const method = mode === "edit" ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to save project");
            }

            if (onSuccess) onSuccess();
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
                <div className={styles.form.error}>
                    {errorMessage}
                </div>
            )}

            {/* Title */}
            <div>
                <label className={styles.form.label}>Project Title:</label>
                <input
                    name="title"
                    value={formData.title}
                    placeholder="Name your project..."
                    onChange={handleChange}
                    required
                    className={styles.form.inputField}
                />
            </div>

            {/* Description */}
            <div>
                <label className={styles.form.label}>Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Decribe your project here..."
                    className={styles.form.inputField}
                />
            </div>

            <div className={styles.form.grid}>
                {/* Category */}
                <div>
                    <label className={styles.form.label}>Category:</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className={styles.form.inputField}
                    >
                        <option value="">Select category</option>
                        <option value="web development">Web Development</option>
                        <option value="networking">Networking</option>
                        <option value="embedded systems">Embedded</option>
                        <option value="data analysis">Data</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Status */}
                <div>
                    <label className={styles.form.label}>Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className={styles.form.inputField}
                    >
                        <option value="">Select status</option>
                        <option value="planned">Planned</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="paused">Paused</option>
                    </select>
                </div>

                {/* Priority */}
                <div>
                    <label className={styles.form.label}>Priority:</label>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        required
                        className={styles.form.inputField}
                    >
                        <option value="">Select priority level</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                {/* Progress */}
                <div>
                    <label className={styles.form.label}>Progress:</label>
                    <input
                        name="progress"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.progress}
                        onChange={handleChange}
                        placeholder="0 to 100"
                        className={styles.form.inputField}
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${styles.button.primary} disabled:cursor-not-allowed disabled:opacity-60`}
                >
                    {isSubmitting
                        ? mode === "edit"
                            ? "Updating..."
                            : "Saving..."
                        : mode === "edit"
                            ? "Update Project"
                            : "Save Project"}
                </button>

                <button
                    type="button"
                    onClick={() => {
                        if (window.history.length > 1) {
                            router.back();
                        } else {
                            router.push("/projects");
                        }
                    }}
                    className={styles.button.redBtn}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}