"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { styles } from "@/lib/styles";

export default function Sidebar() {
    const pathname = usePathname();

    const navLinks = [
        { label: "Dashboard", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Add Project", href: "/projects/new" },
    ];

    return (
        // left sidebar shown on every page
        <aside className={styles.sidebar.container}>
            <h1 className={styles.sidebar.title}>BuildBoard</h1>

            <nav className={styles.sidebar.nav}>
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.sidebar.link} ${isActive ? styles.sidebar.activeLink : ""
                                }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}