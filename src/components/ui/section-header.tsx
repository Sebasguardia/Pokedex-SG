import * as React from "react"
import { cn } from "@/lib/utils/cn"

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    subtitle?: string; // alias for description
}

export function SectionHeader({ title, description, subtitle, className, ...props }: SectionHeaderProps) {
    const text = subtitle ?? description;
    return (
        <div className={cn("flex flex-col gap-1 my-6", className)} {...props}>
            <div className="flex items-center gap-3">
                <div className="h-6 w-2 rounded-full bg-poke-red" />
                <h2 className="text-xl font-pixel text-foreground tracking-widest">{title}</h2>
            </div>
            {text && (
                <p className="text-muted-foreground ml-5">{text}</p>
            )}
        </div>
    )
}
