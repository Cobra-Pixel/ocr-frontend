// Manejo del tema (claro/oscuro + colores)
import { useState } from "react";
import { themes } from "../styles/theme";

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const colors = themes[theme];
  return { theme, toggleTheme, colors };
}