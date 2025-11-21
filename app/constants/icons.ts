import { Icon } from "../types/Icon";

export const icons: Icon[] = [
  {
    id: "home",
    label: "home.md",
    icon: "🏠",
    window: {
      id: "home-md",
      title: "home.md",
      contentType: "markdown",
      w: 520,
      h: 420,
      content: "# Welcome to home.md!",
    },
  },
  {
    id: "about",
    label: "About",
    icon: "💡",
    window: {
      id: "about",
      title: "About",
      contentType: "text",
      w: 400,
      h: 300,
      content: "This is a demo OS-like desktop UI.",
    },
  },
];
