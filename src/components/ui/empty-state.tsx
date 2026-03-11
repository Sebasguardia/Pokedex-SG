import * as React from "react"
import { cn } from "@/lib/utils/cn"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
}

export function EmptyState({ title, description, icon, action, className, ...props }: EmptyStateProps) {
    return (
        <div className={cn("flex h-[400px] shrink-0 items-center justify-center rounded-xl border border-dashed border-poke-border bg-poke-surface/50", className)} {...props}>
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                {icon ? (
                    <div className="mb-4 text-muted-foreground opacity-50">
                        {icon}
                    </div>
                ) : (
                    <div className="mb-4 h-24 w-24 rounded-full bg-poke-darker/50 flex items-center justify-center">
                        {/* Fallback empty visual */}
                        <span className="text-4xl">?</span>
                    </div>
                )}

                <h3 className="mb-2 text-lg font-semibold text-white font-pixel text-sm leading-6">{title}</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                    {description}
                </p>

                {action && (
                    <div>{action}</div>
                )}
            </div>
        </div>
    )
}
