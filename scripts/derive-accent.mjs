// Même algorithme que l'atelier du moodboard (tasks/moodboard-001.html)
const hexToRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgbToHex = (r, g, b) =>
  "#" + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");
const luminance = (rgb) => {
  const a = rgb.map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};
const contrast = (h1, h2) => {
  const l1 = luminance(hexToRgb(h1)), l2 = luminance(hexToRgb(h2));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};
const rgbToHsl = ([r, g, b]) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [h, s, l];
};
const hslToHex = (h, s, l) => {
  const f = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  if (s === 0) return rgbToHex(l * 255, l * 255, l * 255);
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return rgbToHex(f(p, q, h + 1 / 3) * 255, f(p, q, h) * 255, f(p, q, h - 1 / 3) * 255);
};
const shiftL = (hex, delta) => {
  const [h, s, l] = rgbToHsl(hexToRgb(hex));
  return hslToHex(h, s, Math.max(0, Math.min(1, l + delta)));
};
const fitContrast = (hex, bg, target, dir) => {
  let c = hex, guard = 0;
  while (contrast(c, bg) < target && guard < 50) {
    const next = shiftL(c, dir * 0.02);
    if (next === c) break;
    c = next; guard++;
  }
  return c;
};

// Usage : node scripts/derive-accent.mjs "#6e3b5c"
// Affiche les tokens accent AA des deux themes pour la couleur donnee,
// a reporter dans src/styles/nora.css si on change d'accent.
const PRUNE = (process.argv[2] || "#6e3b5c").toLowerCase();
const DARK_BG = "#191f1d";
const LIGHT_BG = "#eae8e2";

// Thème sombre (défaut)
const dBtn = fitContrast(PRUNE, DARK_BG, 3.0, 1);
const dText = fitContrast(PRUNE, DARK_BG, 4.5, 1);
const dOn = contrast("#ffffff", dBtn) >= 4.5 ? "#ffffff" : "#14201d";
const dHover = luminance(hexToRgb(dBtn)) > 0.35 ? shiftL(dBtn, -0.06) : shiftL(dBtn, 0.06);

// Thème clair adouci
const lBtn = fitContrast(PRUNE, "#ffffff", 3.0, -1);
const lText = fitContrast(PRUNE, LIGHT_BG, 4.5, -1);
const lOn = contrast("#ffffff", lBtn) >= 4.5 ? "#ffffff" : "#14201d";
const lHover = luminance(hexToRgb(lBtn)) > 0.35 ? shiftL(lBtn, -0.06) : shiftL(lBtn, 0.06);

console.log("DARK  accent(btn):", dBtn, "hover:", dHover, "on-accent:", dOn, "accent-text:", dText);
console.log("      contrastes — text/bg:", contrast(dText, DARK_BG).toFixed(2), "on/btn:", contrast(dOn, dBtn).toFixed(2));
console.log("LIGHT accent(btn):", lBtn, "hover:", lHover, "on-accent:", lOn, "accent-text:", lText);
console.log("      contrastes — text/bg:", contrast(lText, LIGHT_BG).toFixed(2), "on/btn:", contrast(lOn, lBtn).toFixed(2));
