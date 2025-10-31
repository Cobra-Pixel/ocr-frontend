import { Moon, Sun } from "lucide-react";
import "./Header.css";

interface Props {
  theme: "dark" | "light";
  toggleTheme: () => void;
  color: string;
}

export default function Header({ theme, toggleTheme, color }: Props) {
  return (
    <header className="app-header" style={{ borderBottom: `1px solid ${color}` }}>
      <h1 className="app-title">OCR Extractor Pro</h1>

      <button
        className="theme-toggle-btn"
        onClick={toggleTheme}
        title={
          theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
        }
        style={{ color }}
      >
        {theme === "dark" ? <Sun size={26} /> : <Moon size={26} />}
      </button>
    </header>
  );
}