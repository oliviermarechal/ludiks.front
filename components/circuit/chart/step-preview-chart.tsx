'use client';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { CircuitStep } from "@/lib/types/circuit";

interface StepPreviewChartProps {
    steps: CircuitStep[];
}

export function StepPreviewChart({ steps }: StepPreviewChartProps) {
    const data = steps.map((step, index) => ({
        name: `Étape ${index + 1}`,
        value: step.completionThreshold
    }));

    return (
        <ChartContainer
            className="h-48 w-full [&>div]:!w-full"
            config={{
                value: {
                    theme: {
                        light: "var(--secondary)",
                        dark: "var(--secondary)"
                    }
                }
            }}
        >
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/10" />
                <XAxis
                    dataKey="name"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                    className="text-foreground/50"
                />
                <YAxis
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                    className="text-foreground/50"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="var(--secondary)"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    strokeWidth={2}
                />
            </AreaChart>
        </ChartContainer>
    );
} 