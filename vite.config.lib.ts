import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/* Build library (npm run build) — séparé de vite.config.ts pour ne pas
   interférer avec Storybook et les tests vitest. */
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      // Rien de React ni de Radix n'est embarqué : dépendances du consommateur.
      external: [/^react($|\/)/, /^react-dom($|\/)/, /^radix-ui($|\/)/, /^@fontsource/],
    },
    sourcemap: true,
  },
});
