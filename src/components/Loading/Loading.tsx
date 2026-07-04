export type SpinnerSize = "sm" | "md" | "lg";

const spinnerSizes: Record<SpinnerSize, string> = {
  sm: "size-4 border-2",
  md: "size-6 border-2",
  lg: "size-8 border-[3px]",
};

export function Spinner({
  size = "md",
  label = "Chargement…",
}: {
  size?: SpinnerSize;
  label?: string;
}) {
  return (
    <span
      role="status"
      aria-label={label}
      className={
        "inline-block animate-spin rounded-nora-full border-nora-line-strong " +
        "border-t-nora-accent " +
        spinnerSizes[size]
      }
    />
  );
}

export interface SkeletonProps {
  /** Largeur CSS (ex. "100%", 240) */
  width?: number | string;
  /** Hauteur CSS (ex. 16) */
  height?: number | string;
  circle?: boolean;
}

export function Skeleton({ width = "100%", height = 16, circle = false }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={
        "block animate-pulse bg-nora-line " + (circle ? "rounded-nora-full" : "rounded-nora-sm")
      }
      style={{ width, height }}
    />
  );
}
