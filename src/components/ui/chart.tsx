"use client"
import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

function ChartContainer({ id, className, children, config, ...props }: React.ComponentProps<"div"> & { config: any; children: React.ReactNode }) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`
  return (
    <div
      data-slot="chart"
      data-chart={chartId}
      className={cn("[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground flex aspect-video justify-center text-xs", className)}
      {...props}
    >
      <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
    </div>
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl", className)} {...props} />
}

const ChartLegend = RechartsPrimitive.Legend

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend }
