"use client";

import { HomeIcon, CubeIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { styles } from "@/lib/styles";

export default function Sidebar() {
    const pathname = usePathname();

    const navLinks = [
        { label: "Home", href: "/", icon: HomeIcon },
        { label: "Projects", href: "/projects", icon: CubeIcon },
        { label: "Add Project", href: "/projects/new", icon: PlusCircleIcon },
    ];

    return (
        // left sidebar shown on every page
        <aside className={styles.sidebar.container}>
            <h1 className={styles.sidebar.title}>BuildBoard</h1>

            <nav className={styles.sidebar.nav}>
                {navLinks.map((link) => {
                    const LinkIcon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.sidebar.link} ${isActive ? styles.sidebar.activeLink : ""}`}
                        >
                            <LinkIcon className="w-5" />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}