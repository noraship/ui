export interface LevelAvatarProps {
  /** Nom complet — initiales et alt */
  name: string;
  src?: string;
  /** Niveau courant (1, 2…) et son titre (« Apprenti »…) */
  levelNum: number;
  levelLabel: string;
  /** Progression dans le niveau, 0..100 — l'anneau conique */
  pct: number;
  /** Info-bulle native (ex. l'email du compte) */
  title?: string;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

/** Avatar 34px avec anneau de progression XP + libellé de niveau (moodboard-002). */
export function LevelAvatar({ name, src, levelNum, levelLabel, pct, title }: LevelAvatarProps) {
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <span className="inline-flex items-center gap-2 select-none" title={title}>
      <span
        className="inline-flex size-[34px] rounded-nora-full p-0.5"
        style={{
          background: `conic-gradient(var(--nora-accent) ${clamped}%, var(--nora-line) 0)`,
        }}
      >
        <span className="font-nora-display flex size-full items-center justify-center overflow-hidden rounded-nora-full bg-nora-surface text-xs font-bold">
          {src ? (
            <img className="size-full rounded-nora-full object-cover" src={src} alt={name} />
          ) : (
            <span role="img" aria-label={name}>
              {initials(name)}
            </span>
          )}
        </span>
      </span>
      <span className="flex flex-col leading-[1.15]">
        <span className="text-[9px] tracking-[0.12em] text-nora-muted uppercase">
          Niv. {levelNum}
        </span>
        <span className="text-xs font-semibold text-nora-ink">{levelLabel}</span>
      </span>
    </span>
  );
}
