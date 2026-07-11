import { Slot } from "radix-ui";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "success";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Affiche un spinner et désactive le bouton */
  loading?: boolean;
  /**
   * Rend l'enfant à la place du <button> en lui passant les styles —
   * pour les liens (<a>, <Link> de react-router…) sans plein rechargement.
   */
  asChild?: boolean;
  children: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-nora-ctl " +
  "cursor-pointer transition-colors duration-150 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nora-accent " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-nora-accent text-nora-on-accent hover:bg-nora-accent-hover",
  secondary:
    "bg-transparent text-nora-ink border border-nora-line-strong hover:border-nora-muted",
  ghost: "bg-transparent text-nora-accent-text hover:underline",
  danger: "bg-nora-danger text-nora-on-danger hover:bg-nora-danger-hover",
  success: "bg-nora-success text-nora-on-success hover:bg-nora-success-hover",
};

const sizes: Record<ButtonSize, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-6 py-3",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  asChild = false,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const className = `${base} ${variants[variant]} ${sizes[size]}`;

  if (asChild) {
    return (
      <Slot.Root className={className} {...rest}>
        {children}
      </Slot.Root>
    );
  }

  return (
    <button
      className={className}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="size-4 shrink-0 animate-spin rounded-nora-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  );
}
