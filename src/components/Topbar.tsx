import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";


export const TopBar = () => {
    return (
        <div className="flex items-center justify-between w-full h-[80px] p-4 border-b-1 border-[var(--color-border)] bg-[var(--color-mask-top)]">
            <div className="flex items-center gap-4 ">
            <Image alt="logo" src={'/logo-cubos.svg'} width={160} height={36} className={'invert'}/>
            <p className="font-bold text-xl text-[var(--color-text)]">Movies</p>
            </div>
            <ThemeToggle/>
        </div>
    );
};