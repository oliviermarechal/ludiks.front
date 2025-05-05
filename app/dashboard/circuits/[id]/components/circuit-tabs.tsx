import * as Tabs from "@radix-ui/react-tabs";
import { Settings, BarChart3, Code, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface CircuitTabsProps {
    className?: string;
}

export function CircuitTabs({ className }: CircuitTabsProps) {
    return (
        <Tabs.List 
            className={cn(
                "inline-flex h-12 items-center justify-center rounded-xl p-1.5",
                "bg-surface-2 border border-secondary/20",
                className
            )}
        >
            <Tabs.Trigger
                value="settings"
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2",
                    "data-[state=active]:bg-secondary/20 data-[state=active]:text-black data-[state=active]:dark:text-secondary",
                    "hover:bg-secondary/10 text-foreground/70"
                )}
            >
                <Settings className="h-4 w-4" />
                Paramètres
            </Tabs.Trigger>
            <Tabs.Trigger
                value="rewards"
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2",
                    "data-[state=active]:bg-secondary/20 data-[state=active]:text-black data-[state=active]:dark:text-secondary",
                    "hover:bg-secondary/10 text-foreground/70"
                )}
            >
                <Gift className="h-4 w-4" />
                Récompenses
            </Tabs.Trigger>
            <Tabs.Trigger
                value="analytics"
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2",
                    "data-[state=active]:bg-secondary/20 data-[state=active]:text-black data-[state=active]:dark:text-secondary",
                    "hover:bg-secondary/10 text-foreground/70"
                )}
            >
                <BarChart3 className="h-4 w-4" />
                Analyse
            </Tabs.Trigger>
            <Tabs.Trigger
                value="api"
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2",
                    "data-[state=active]:bg-secondary/20 data-[state=active]:text-black data-[state=active]:dark:text-secondary",
                    "hover:bg-secondary/10 text-foreground/70"
                )}
            >
                <Code className="h-4 w-4" />
                API Documentation
            </Tabs.Trigger>
        </Tabs.List>
    );
} 