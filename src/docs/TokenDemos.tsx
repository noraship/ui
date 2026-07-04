/* Aides visuelles pour la page de docs « Tokens » — lisent les CSS variables en direct,
   donc réagissent au toggle sombre/clair de la toolbar. */

const swatchGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  gap: 12,
};

export function ColorGrid({ tokens }: { tokens: { name: string; cssVar: string }[] }) {
  return (
    <div style={swatchGrid}>
      {tokens.map((token) => (
        <div
          key={token.cssVar}
          style={{
            border: "1px solid var(--nora-line)",
            borderRadius: "var(--nora-radius-card)",
            overflow: "hidden",
            background: "var(--nora-surface)",
          }}
        >
          <div style={{ height: 56, background: `var(${token.cssVar})` }} />
          <div style={{ padding: "8px 12px" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--nora-ink)" }}>
              {token.name}
            </div>
            <code style={{ fontSize: 11, color: "var(--nora-muted)" }}>{token.cssVar}</code>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TypeScale() {
  const steps = [
    { label: "display", size: "var(--nora-text-display)", family: "var(--nora-font-display)" },
    { label: "3xl", size: "var(--nora-text-3xl)", family: "var(--nora-font-display)" },
    { label: "2xl", size: "var(--nora-text-2xl)", family: "var(--nora-font-display)" },
    { label: "xl", size: "var(--nora-text-xl)", family: "var(--nora-font-body)" },
    { label: "base", size: "var(--nora-text-base)", family: "var(--nora-font-body)" },
    { label: "sm", size: "var(--nora-text-sm)", family: "var(--nora-font-body)" },
    { label: "xs", size: "var(--nora-text-xs)", family: "var(--nora-font-body)" },
  ];
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {steps.map((step) => (
        <div key={step.label} style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <code style={{ width: 64, fontSize: 12, color: "var(--nora-muted)" }}>
            {step.label}
          </code>
          <span
            style={{
              fontSize: step.size,
              fontFamily: step.family,
              color: "var(--nora-ink)",
              lineHeight: "var(--nora-leading-tight)",
            }}
          >
            Nora, prête au lancement
          </span>
        </div>
      ))}
    </div>
  );
}

export function SpaceScale() {
  const steps = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {steps.map((step) => (
        <div key={step} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <code style={{ width: 110, fontSize: 12, color: "var(--nora-muted)" }}>
            --nora-space-{step}
          </code>
          <div
            style={{
              width: `var(--nora-space-${step})`,
              height: 16,
              background: "var(--nora-accent)",
              borderRadius: 2,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function RadiusRow() {
  const radii = ["sm", "ctl", "card", "full"];
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {radii.map((radius) => (
        <div key={radius} style={{ textAlign: "center" }}>
          <div
            style={{
              width: 72,
              height: 48,
              background: "var(--nora-accent-soft)",
              border: "1px solid var(--nora-accent)",
              borderRadius: `var(--nora-radius-${radius})`,
            }}
          />
          <code style={{ fontSize: 12, color: "var(--nora-muted)" }}>{radius}</code>
        </div>
      ))}
    </div>
  );
}

export function ShadowRow() {
  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", padding: 8 }}>
      {[1, 2].map((level) => (
        <div
          key={level}
          style={{
            width: 140,
            padding: 16,
            background: "var(--nora-surface)",
            border: "1px solid var(--nora-line)",
            borderRadius: "var(--nora-radius-card)",
            boxShadow: `var(--nora-shadow-${level})`,
            fontSize: 13,
            color: "var(--nora-ink)",
          }}
        >
          <code style={{ fontSize: 12, color: "var(--nora-muted)" }}>shadow-{level}</code>
        </div>
      ))}
    </div>
  );
}
