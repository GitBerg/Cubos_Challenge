'use client'

import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    return (
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="min-w-[56px] min-h-[48px] cursor-pointer hover:bg-[var(--color-primary-hover)] px-4 py-3 bg-[var(--color-primary)] active:bg-[var(--color-primary-act)] rounded">
            <Image src={theme === "dark" ? `/Sun.svg` : `/Moon.svg`} alt="sun" width={24} height={24} style={{filter: theme === "dark" ? 'invert(1)' : 'invert(0)'}} />
        </button>
    )
};