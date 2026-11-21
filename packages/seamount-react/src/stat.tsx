import * as React from "react";
import { cn } from "./cn";
import { Label } from "./label";

export type SparklineProps = Omit<React.ComponentProps<"svg">, "values"> & {
  values: ReadonlyArray<number | null>;
  width?: number;
  height?: number;
  /** Read aloud in place of the drawing: "Spending fell over 12 weeks". */
  label?: string;
};

/** ink-3 line with the current point in cobalt; gaps where a value is missing. */
export function Sparkline({
  values,
  width = 96,
  height = 24,
  label,
  className,
  ...props
}: SparklineProps): React.JSX.Element | null {
  const geometry = React.useMemo(() => sparklineGeometry(values, width, height), [values, width, height]);
  if (!geometry) return null;
  return (
    <svg
      data-slot="sparkline"
      className={cn("sm-sparkline", className)}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...props}
    >
      <path className="sm-sparkline-line" d={geometry.path} />
      {geometry.end && (
        <rect className="sm-sparkline-end" x={geometry.end[0] - 2} y={geometry.end[1] - 2} width={4} height={4} />
      )}
    </svg>
  );
}

/** Path data for a sparkline, with an inset so the end mark is never clipped. */
export function sparklineGeometry(
  values: ReadonlyArray<number | null>,
  width: number,
  height: number,
): { path: string; end: [number, number] | null } | null {
  const present = values.filter((v): v is number => v !== null && Number.isFinite(v));
  if (present.length === 0) return null;
  const inset = 2;
  const min = Math.min(...present);
  const max = Math.max(...present);
  const span = max - min || 1;
  const step = values.length > 1 ? (width - inset * 2) / (values.length - 1) : 0;
  let path = "";
  let pen = false;
  let end: [number, number] | null = null;
  values.forEach((v, i) => {
    if (v === null || !Number.isFinite(v)) {
      pen = false;
      return;
    }
    const x = inset + i * step;
    // A flat series sits on the midline rather than the floor
    const y = max === min ? height / 2 : inset + (1 - (v - min) / span) * (height - inset * 2);
    path += `${pen ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`;
    pen = true;
    end = [x, y];
  });
  return { path, end };
}

export type StatTileProps = Omit<React.ComponentProps<"div">, "children"> & {
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: React.ReactNode;
  /** The change against a named period, in words: "12% less than October". */
  change?: React.ReactNode;
  spark?: ReadonlyArray<number | null>;
  sparkLabel?: string;
};

/** A single number is a stat tile, not a chart. */
export function StatTile({
  label,
  value,
  unit,
  change,
  spark,
  sparkLabel,
  className,
  ...props
}: StatTileProps): React.JSX.Element {
  return (
    <div data-slot="stat" className={cn("sm-stat", className)} {...props}>
      <Label>{label}</Label>
      <div className="sm-stat-value">
        {value}
        {unit && <span className="sm-stat-unit">{unit}</span>}
      </div>
      {(change || spark) && (
        <div className="sm-stat-foot">
          {change && <span className="sm-stat-change">{change}</span>}
          {spark && <Sparkline values={spark} label={sparkLabel} />}
        </div>
      )}
    </div>
  );
}

export type MeterProps = Omit<React.ComponentProps<"div">, "children"> & {
  value: number;
  max: number;
  /** Names what is measured: "Groceries budget used". */
  label: string;
  /** Text for assistive tech, e.g. "$412 of $500". */
  valueText?: string;
};

/** A share of a whole. Over the limit the fill turns ink; say so in words beside it, never by colour alone. */
export function Meter({ value, max, label, valueText, className, ...props }: MeterProps): React.JSX.Element {
  const share = max > 0 ? Math.min(value / max, 1) : 0;
  return (
    // biome-ignore lint/a11y/useSemanticElements: a native <meter> cannot be styled consistently across engines
    <div
      data-slot="meter"
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={valueText}
      data-over={value > max || undefined}
      className={cn("sm-meter", className)}
      {...props}
    >
      <div className="sm-meter-fill" style={{ width: `${share * 100}%` }} />
    </div>
  );
}
