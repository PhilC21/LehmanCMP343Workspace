"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon, HomeIcon, CubeIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { styles } from "@/lib/styles";

export default function MobileHeader() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { label: "Home", href: "/", icon: HomeIcon },
        { label: "Projects", href: "/projects", icon: CubeIcon },
        { label: "Add Project", href: "/projects/new", icon: PlusCircleIcon },
    ];

    return (
        <header className="sticky top-0 z-40 bg-emerald-600 shadow-sm md:hidden">
            <div className="flex items-center justify-between px-4 py-3">
                <Link href="/" className="text-xl font-bold text-white">
                    BuildBoard
                </Link>

                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label="Toggle navigation menu"
                    className={styles.button.secondary}
                >
                    {isOpen ? (
                        <XMarkIcon className="size-5" />
                    ) : (
                        <Bars3Icon className="size-5" />
                    )}
                </button>
            </div>

            <nav
                className={`overflow-hidden border-t border-slate-200 bg-emerald-600 transition-all duration-300 md:hidden ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="space-y-1 px-4 py-3">
                    {navLinks.map((link) => {
                        const Icon = link.icon;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={styles.sidebar.link}
                            >
                                <Icon className="size-5" />
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </header>
    );
}