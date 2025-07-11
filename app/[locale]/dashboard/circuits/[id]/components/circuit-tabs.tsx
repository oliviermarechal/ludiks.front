import * as Tabs from "@radix-ui/react-tabs";
import { Settings, BarChart3, Code, Gift, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface CircuitTabsProps {
    className?: string;
    disabledTabs?: string[];
    isActive?: boolean;
}

export function CircuitTabs({ className, disabledTabs = [], isActive = false }: CircuitTabsProps) {
    const t = useTranslations('dashboard.circuits.common');

    return (
        <Tabs.List 
            className={cn(
                "inline-flex h-12 items-center justify-center rounded-xl p-1.5",
                "bg-surface-2 border border-secondary/20",
                className
            )}
        >
            {isActive ? (
                <>
                    <Tabs.Trigger
                        value="analytics"
                        disabled={disabledTabs.includes('analytics')}
                        className={cn(
                            "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2",
                            "data-[state=active]:bg-secondary/20 data-[state=active]:text-black data-[state=active]:dark:text-secondary",
                            "hover:bg-secondary/10 text-foreground/70"
                        )}
                    >
                        <BarChart3 className="h-4 w-4" />
                        {t('tabs.analytics')}
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="overview"
                        className={cn(
                            "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2",
                            "data-[state=active]:bg-secondary/20 data-[state=active]:text-black data-[state=active]:dark:text-secondary",
                            "hover:bg-secondary/10 text-foreground/70"
                        )}
                    >
                        <Eye className="h-4 w-4" />
                        {t('tabs.overview')}
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
                        {t('tabs.rewards')}
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
                        {t('tabs.api')}
                    </Tabs.Trigger>
                </>
            ) : (
                <>
                    <Tabs.Trigger
                        value="settings"
                        className={cn(
                            "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2",
                            "data-[state=active]:bg-secondary/20 data-[state=active]:text-black data-[state=active]:dark:text-secondary",
                            "hover:bg-secondary/10 text-foreground/70"
                        )}
                    >
                        <Settings className="h-4 w-4" />
                        {t('tabs.settings')}
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
                        {t('tabs.rewards')}
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
                        {t('tabs.api')}
                    </Tabs.Trigger>
                </>
            )}
        </Tabs.List>
    );
} 