// ============================================================
// Header.tsx — Encabezado principal de la aplicación OCR
// ============================================================
// Este componente representa la barra superior de la app,
// mostrando el título del proyecto y un botón para alternar
// entre el tema claro y oscuro.
//
// Usa íconos de `lucide-react` y los estilos definidos en `Header.css`.
// ============================================================

import { Moon, Sun } from "lucide-react"; // Iconos modernos para el cambio de tema
import "./Header.css";


// ============================================================
// Interfaz de propiedades (Props)
// ------------------------------------------------------------
// - theme: modo visual actual ("dark" | "light").
// - toggleTheme: función que invierte el tema al hacer clic.
// - color: color dinámico del borde inferior y del ícono.
// ============================================================
interface Props {
  theme: "dark" | "light";
  toggleTheme: () => void;
  color: string;
}


// ============================================================
// Componente principal: Header
// ------------------------------------------------------------
// Renderiza:
//   1️ Un encabezado con título "OCR Extractor Pro".
//   2️ Un botón de cambio de tema (con íconos dinámicos).
//
// El color y los estilos cambian según el tema activo.
// ============================================================
export default function Header({ theme, toggleTheme, color }: Props) {
  return (
    <header
      className="app-header"
      style={{ borderBottom: `1px solid ${color}` }} // Borde dinámico según tema
    >
      {/* ===================================================== */}
      {/* Título de la aplicación */}
      {/* -----------------------------------------------------
          Se muestra en negrita, centrado verticalmente y sin
          permitir selección de texto. Estilos en Header.css.
      ===================================================== */}
      <h1 className="app-title">OCR Extractor Pro</h1>

      {/* ===================================================== */}
      {/* Botón de cambio de tema */}
      {/* -----------------------------------------------------
          - Muestra un ícono del sol o la luna según el tema actual.
          - Cambia el título emergente (tooltip) dinámicamente.
          - Usa el color del tema para integrarse visualmente.
      ===================================================== */}
      <button
        className="theme-toggle-btn"
        onClick={toggleTheme}
        title={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
        style={{ color }}
      >
        {theme === "dark" ? <Sun size={26} /> : <Moon size={26} />}
      </button>
    </header>
  );
}