import { Monitor, Moon, Sun } from "lucide-react";

export const themes = [
  {
    value: "dark",
    title: "Dark",
    description: "Dark appearance for low-light environments.",
    icon: Moon,
  },
  {
    value: "light",
    title: "Light",
    description: "Bright appearance for daytime use.",
    icon: Sun,
  },
  {
    value: "system",
    title: "System",
    description: "Automatically match your device settings.",
    icon: Monitor,
  },
];
