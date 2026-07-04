import type { AnchorHTMLAttributes, ReactNode } from "react";

export interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  children: ReactNode;
}

const headingSizes: Record<NonNullable<HeadingProps["level"]>, string> = {
  1: "text-4xl",
  2: "text-3xl",
  3: "text-2xl",
  4: "text-lg",
};

/** Titres — portés par la display serif de l'identité Hélios */
export function Heading({ level = 2, children }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag
      className={`font-nora-display font-semibold text-nora-ink leading-tight text-balance ${headingSizes[level]}`}
    >
      {children}
    </Tag>
  );
}

export interface TextProps {
  size?: "sm" | "base";
  muted?: boolean;
  children: ReactNode;
}

export function Text({ size = "base", muted = false, children }: TextProps) {
  return (
    <p
      className={
        (size === "sm" ? "text-sm " : "text-base ") +
        (muted ? "text-nora-muted" : "text-nora-ink") +
        " max-w-[65ch]"
      }
    >
      {children}
    </p>
  );
}

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export function Link({ children, ...rest }: LinkProps) {
  return (
    <a
      className={
        "font-semibold text-nora-accent-text underline decoration-1 underline-offset-2 " +
        "hover:decoration-2 rounded-nora-sm " +
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nora-accent"
      }
      {...rest}
    >
      {children}
    </a>
  );
}
