export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps {
  /** Nom complet — sert aux initiales et à l'alt */
  name: string;
  src?: string;
  size?: AvatarSize;
}

const sizes: Record<AvatarSize, string> = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-base",
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

export function Avatar({ name, src, size = "md" }: AvatarProps) {
  const cls = `inline-flex items-center justify-center rounded-nora-full overflow-hidden shrink-0 ${sizes[size]}`;
  if (src) {
    return <img className={`${cls} object-cover`} src={src} alt={name} />;
  }
  return (
    <span
      role="img"
      aria-label={name}
      className={`${cls} bg-nora-accent-soft font-semibold text-nora-accent-text`}
    >
      {initials(name)}
    </span>
  );
}
