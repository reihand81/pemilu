"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "./utils";

// Chart container component
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config?: Record<string, any>;
  }
>(({ className, children, config, ...props }, ref) => {
  return (
    <div
      data-chart=""
      ref={ref}
      className={cn(
        "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
        className,
      )}
      {...props}
    >
      <ChartStyle id="" config={config || {}} />
      {children}
    </div>
  );
});
ChartContainer.displayName = "ChartContainer";

const ChartStyle = ({ id, config }: { id: string; config: Record<string, any> }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(config)
          .filter(([_, config]) => config.theme || config.color)
          .map(([key, itemConfig]) => {
            const color = itemConfig.theme?.[id] || itemConfig.color;
            return color ? `--color-${key}: ${color};` : null;
          })
          .join(""),
      }}
    />
  );
};

// Chart tooltip component
const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  {
    active?: boolean;
    payload?: any[];
    label?: any;
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
    className?: string;
  }
>(
  (
    {
      active,
      payload,
      label,
      hideLabel = false,
      hideIndicator = false,
      indicator = "dot",
      className,
      ...props
    },
    ref,
  ) => {
    if (!active || !payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className,
        )}
        {...props}
      >
        {!hideLabel && label && (
          <div className="font-medium text-foreground">{label}</div>
        )}
        {payload.map((item: any, index: number) => {
          const indicatorColor = item.payload?.fill || item.color;

          return (
            <div
              key={`${item.dataKey}-${index}`}
              className="flex w-full items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground"
            >
              {!hideIndicator && (
                <div
                  className="shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]"
                  style={
                    {
                      "--color-bg": indicatorColor,
                      "--color-border": indicatorColor,
                    } as React.CSSProperties
                  }
                />
              )}
              <div className="flex flex-1 justify-between leading-none">
                <div className="grid gap-1.5">
                  <span className="text-muted-foreground">
                    {item.name || item.dataKey}
                  </span>
                </div>
                <span className="font-mono font-medium tabular-nums text-foreground">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);
ChartTooltipContent.displayName = "ChartTooltipContent";

// Chart legend component
const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    payload?: any[];
    verticalAlign?: "top" | "bottom";
  }
>(({ className, payload, verticalAlign = "bottom", ...props }, ref) => {
  if (!payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", className)}
      {...props}
    >
      {payload.map((item: any) => {
        return (
          <div
            key={item.value}
            className="flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
          >
            <div
              className="h-2 w-2 shrink-0 rounded-[2px]"
              style={{
                backgroundColor: item.color,
              }}
            />
            <span className="text-muted-foreground">{item.value}</span>
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegendContent";

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
};