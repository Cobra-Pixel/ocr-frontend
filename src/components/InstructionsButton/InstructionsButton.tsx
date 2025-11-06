// ============================================================
// InstructionsButton.tsx — Botón de ayuda / instrucciones
// ============================================================
// Componente simple y reutilizable que muestra un botón para
// acceder a las instrucciones o guía de uso de la aplicación.
//
// Puede emplearse en la pantalla principal del OCR o en cualquier
// vista que requiera mostrar un panel de ayuda o tutorial.
//
// Usa estilos definidos en `InstructionsButton.css`.
// ============================================================

import "./InstructionsButton.css";


// ============================================================
// Interfaz de propiedades (Props)
// ------------------------------------------------------------
// - onClick: función ejecutada al presionar el botón.
//   Suele abrir un modal, panel lateral o alerta con instrucciones.
// ============================================================
interface InstructionsButtonProps {
  onClick: () => void;
}


// ============================================================
// Componente principal: InstructionsButton
// ------------------------------------------------------------
// Renderiza:
//   1️ Un contenedor centrado horizontalmente.
//   2️ Un botón estilizado con ícono  y texto “Instrucciones”.
//
// El evento `onClick` se maneja desde el componente padre.
// ============================================================
export default function InstructionsButton({ onClick }: InstructionsButtonProps) {
  return (
    <div style={{ textAlign: "center", marginBottom: 10 }}>
      <button className="instructions-btn" onClick={onClick}>
        🧠 Instrucciones
      </button>
    </div>
  );
}