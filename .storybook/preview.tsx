import type { Preview, Decorator } from "@storybook/react-vite";
import { useEffect } from "react";
import "@fontsource-variable/source-serif-4";
import "@fontsource-variable/public-sans";
import "@fontsource-variable/jetbrains-mono";
import "../src/styles/nora.css";

/*
 * Thème : sombre par défaut (identité « Hélios Prune »), clair adouci en second.
 * Le toggle de la toolbar pose data-theme sur <html>, comme le fera une vraie app.
 */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? "dark";
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.dataset.theme = "light";
    } else {
      delete document.documentElement.dataset.theme;
    }
  }, [theme]);
  return <Story />;
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Thème Nora",
      toolbar: {
        title: "Thème",
        icon: "moon",
        items: [
          { value: "dark", title: "Sombre (défaut)", icon: "moon" },
          { value: "light", title: "Clair adouci", icon: "sun" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "dark",
  },
  decorators: [withTheme],
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
