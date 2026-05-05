"use client";

import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { styles } from "@/lib/styles";

export default function ProjectTasksCard({ projectId }) {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function fetchTasks() {
        try {
            setIsLoading(true);

            const response = await fetch(`/api/projects/${projectId}/tasks`);

            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }

            const data = await response.json();
            setTasks(data);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, [projectId]);

    async function handleAddTask(event) {
        event.preventDefault();

        if (!newTask.trim()) return;

        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const response = await fetch(`/api/projects/${projectId}/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: newTask }),
            });

            if (!response.ok) {
                throw new Error("Failed to add task");
            }

            const createdTask = await response.json();

            setTasks((prev) => [createdTask, ...prev]);
            setNewTask("");
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleToggleTask(task) {
        const response = await fetch(`/api/projects/${projectId}/tasks`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: task.id,
                is_complete: !task.is_complete,
            }),
        });

        if (!response.ok) {
            alert("Failed to update task");
            return;
        }

        const updatedTask = await response.json();

        setTasks((prev) =>
            prev.map((item) => (item.id === updatedTask.id ? updatedTask : item))
        );
    }

    async function handleDeleteTask(taskId) {
        const response = await fetch(`/api/projects/${projectId}/tasks`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: taskId }),
        });

        if (!response.ok) {
            alert("Failed to delete task");
            return;
        }

        setTasks((prev) => prev.filter((task) => task.id !== taskId));
    }

    return (
        <div className={styles.panel.box}>
            <p className={styles.meta.label}>Tasks To-do:</p>

            {errorMessage && (
                <div className={`${styles.form.error} mt-3`}>{errorMessage}</div>
            )}

            <form onSubmit={handleAddTask} className="mt-3 flex gap-2">
                <input
                    type="text"
                    value={newTask}
                    onChange={(event) => setNewTask(event.target.value)}
                    placeholder="What do you need to do for this project?"
                    required
                    className={styles.form.inputField}
                />

                <button
                    type="submit"
                    disabled={isSubmitting || !newTask.trim()}
                    className={`${styles.button.primary} disabled:cursor-not-allowed disabled:opacity-50`}
                >
                    {isSubmitting ? "Adding..." : "Add"}
                </button>
            </form>

            <div className="mt-5 max-h-64 overflow-y-auto pr-1">
                {isLoading ? (
                    <p className="text-slate-700">Loading tasks...</p>
                ) : tasks.length === 0 ? (
                    <p className="text-slate-700">No tasks yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {tasks.map((task) => (
                            <li
                                key={task.id}
                                className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-100"
                            >
                                <label className="flex min-w-0 flex-1 items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={task.is_complete}
                                        onChange={() => handleToggleTask(task)}
                                        className="mt-1 h-4 w-4 accent-emerald-600"
                                    />

                                    <span
                                        className={`text-sm ${task.is_complete
                                            ? "text-slate-400 line-through"
                                            : "text-slate-800"
                                            }`}
                                    >
                                        {task.content}
                                    </span>
                                </label>

                                <button
                                    type="button"
                                    onClick={() => handleDeleteTask(task.id)}
                                    aria-label="Delete task"
                                    className="text-red-700 hover:text-red-500"
                                >
                                    <TrashIcon className="size-5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}