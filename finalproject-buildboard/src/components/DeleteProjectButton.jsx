"use client";

import { useRouter } from "next/navigation";
import { styles } from "@/lib/styles";

export default function DeleteProjectButton({
  projectId,
  projectTitle,
  onDeleteSuccess, // callback (optional)
}) {
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = window.confirm(
      `Delete "${projectTitle}" project? This action CANNOT be undone.`
    );

    if (!confirmDelete) return;

    const response = await fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      if (onDeleteSuccess) {
        onDeleteSuccess(); // custom behavior
      } else {
        router.push("/projects"); // default behavior
      }
    } else {
      alert("Failed to delete project");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className={styles.button.redBtn}
    >
      Delete
    </button>
  );
}