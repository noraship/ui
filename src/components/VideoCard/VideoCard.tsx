export interface VideoCardProps {
  title: string;
  /** Durée affichée en pastille mono (ex. « 4:12 ») */
  duration?: string;
  /** Sur-titre mono en haut à gauche (ex. « Chapitre 3 · démo ») */
  kicker?: string;
  onPlay?: () => void;
}

/**
 * Placeholder vidéo 16/9 (moodboard-002) : écran sombre à scanlines,
 * bouton lecture accent, titre serif + durée. L'écran reste sombre dans
 * les deux thèmes, comme le Terminal.
 */
export function VideoCard({ title, duration, kicker, onPlay }: VideoCardProps) {
  return (
    <div
      className="relative flex aspect-video items-center justify-center overflow-hidden rounded-[14px] border border-nora-line"
      style={{
        background: "radial-gradient(120% 120% at 30% 20%, #26302c 0%, #161b19 70%)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 22px, rgba(255,255,255,.02) 22px 23px)",
        }}
      />
      {kicker && (
        <div className="absolute top-4 left-[18px] font-nora-mono text-xs text-nora-term-muted">
          {kicker}
        </div>
      )}
      <button
        type="button"
        onClick={onPlay}
        aria-label={`Lire : ${title}`}
        className={
          "flex size-[74px] cursor-pointer items-center justify-center rounded-nora-full border-none " +
          "bg-nora-accent transition-transform duration-200 hover:scale-105 " +
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nora-accent"
        }
        style={{ boxShadow: "0 8px 30px rgba(110,59,92,.5)" }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="var(--nora-on-accent)" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
      <div className="absolute right-[18px] bottom-4 left-[18px] flex items-center justify-between gap-3">
        <span className="font-nora-display text-lg font-semibold text-white">{title}</span>
        {duration && (
          <span className="rounded-[6px] bg-[rgba(20,26,24,.7)] px-2 py-[3px] font-nora-mono text-xs text-nora-term-muted">
            {duration}
          </span>
        )}
      </div>
    </div>
  );
}
