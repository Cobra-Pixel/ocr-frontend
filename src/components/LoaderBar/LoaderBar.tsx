// ============================================================
// LoaderBar.tsx — Barra de carga animada del OCR Extractor
// ============================================================
// Este componente muestra una barra de progreso animada que
// se usa durante procesos como la extracción OCR o subida de
// imágenes. 
//
// Cambia su estilo visual dependiendo del tema activo
// (modo claro u oscuro).
// ============================================================

import "./LoaderBar.css";


// ============================================================
// Interfaz de propiedades (Props)
// ------------------------------------------------------------
// - theme: determina el modo de color de la interfaz actual.
//   Puede ser "dark" o "light", afectando el degradado y fondo.
// ============================================================
interface Props {
  theme: "dark" | "light";
}


// ============================================================
// Componente principal: LoaderBar
// ------------------------------------------------------------
// Renderiza dos capas:
//   1️ Un contenedor (div externo) con fondo tenue azul.
//   2️ Una barra interna animada que se desplaza
//       de izquierda a derecha infinitamente.
//
// La clase CSS y el degradado cambian según el tema.
// ============================================================
export default function LoaderBar({ theme }: Props) {
  return (
    <div
      className="loader-bar"
      style={{
        // Fondo semitransparente azul, con menor o mayor opacidad
        background:
          theme === "dark"
            ? "rgba(37, 99, 235, 0.15)"  // Azul tenue para modo oscuro
            : "rgba(37, 99, 235, 0.2)",  // Azul un poco más visible para modo claro
      }}
    >
      {/* ===================================================== */}
      {/* Barra animada interna */}
      {/* -----------------------------------------------------
          Usa clases combinadas según el tema ("dark" o "light").
          La animación está definida en LoaderBar.css con la keyframe slideBar.
      ===================================================== */}
      <div
        className={`loader-bar-progress ${theme === "dark" ? "dark" : "light"}`}
      ></div>
    </div>
  );
}