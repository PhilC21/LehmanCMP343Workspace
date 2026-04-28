"use client";

import { useState } from "react";
import { styles } from "@/lib/styles";

export default function ProjectForm({ onSuccess }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        status: "",
        priority: "",
        progress: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function handleChange(event) {
        // console.log(event.target.value)

        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "progress" ? Number(value) : value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        // console.log("Form data:", formData);
        
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const response = await fetch("/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create project");
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
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                    {errorMessage}
                </div>
            )}

            {/* Title */}
            <div>
                <label className={styles.form.label}>
                    Project Title:
                </label>
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
                <label className={styles.form.label}>
                    Description:
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Decribe your project here..."
                    className={styles.form.inputField}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                    <label className={styles.form.label}>
                        Category:
                    </label>
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
                    <label className={styles.form.label}>
                        Status:
                    </label>
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
                    <label className={styles.form.label}>
                        Priority:
                    </label>
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
                    <label className={styles.form.label}>
                        Progress:
                    </label>
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

            <button
                type="submit"
                disabled={isSubmitting}
                className={styles.button.primary}
            >
                {isSubmitting ? "Saving..." : "Save Project"}
            </button>
        </form>
    );
}