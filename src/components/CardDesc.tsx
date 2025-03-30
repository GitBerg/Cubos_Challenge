export const CardDesc = ({title, desc}: {title: string, desc?: string}) => {
    return (
        <div className="flex flex-col gap-y-1 p-4 bg-[var(--color-card)] text-[var(--color-text-title-card)] rounded md:bg-[var(--color-card)]/70">
            <span className="font-semibold text-lg">{title}</span>
            <p className="text-justify font-normal text-base">{desc}</p>
        </div>
    )
}