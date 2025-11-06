// ============================================================
// ExtractedTextArea.tsx — Panel de texto extraído (OCR)
// ============================================================
// Componente encargado de mostrar y editar el texto extraído por OCR.
// Incluye:
//   - Área de texto editable (textarea)
//   - Mensajes dinámicos (éxito / error)
//   - Soporte para tema oscuro o claro
//
// Usa estilos definidos en ExtractedTextArea.css y variables
// de color dinámicas enviadas desde el componente padre.
// ============================================================

import "./ExtractedTextArea.css";

// ============================================================
// Interfaz de propiedades (Props)
// ------------------------------------------------------------
// - extractedText: contenido textual obtenido del OCR.
// - setExtractedText: actualiza el texto al editar manualmente.
// - msg: mensaje de estado (por ejemplo “Texto guardado” o error).
// - theme: modo visual (“dark” o “light”).
// - colors: paleta de colores dinámica para integrarse con el tema.
// ============================================================
interface Props {
  extractedText: string;
  setExtractedText: (v: string) => void;
  msg: string;
  theme: "dark" | "light";
  colors: any;
}


// ============================================================
// Componente principal: ExtractedTextArea
// ------------------------------------------------------------
// Renderiza:
//   1️ Un contenedor visual con fondo adaptable.
//   2️ Un título “Texto extraído (acumulado)”.
//   3️ Un <textarea> editable con estilos temáticos.
//   4️ Un mensaje dinámico que cambia según estado (éxito / error).
// ============================================================
export default function ExtractedTextArea({
  extractedText,
  setExtractedText,
  msg,
  theme,
  colors,
}: Props) {
  // Detecta si el mensaje es de error según su prefijo
  const isError = msg.startsWith("❌") || msg.startsWith("⚠️");

  return (
    <div
      className="extracted-container"
      style={{
        background: colors.panel,
        border: `1px solid ${colors.border}`,
        borderRadius: 14,         // Mantiene los bordes redondeados
        padding: 14,              // Espaciado interno consistente
        height: "100%",           // Igual altura que el panel izquierdo
        boxSizing: "border-box",  // Evita que el padding reduzca el tamaño
      }}
    >
      {/* ===================================================== */}
      {/* Título del panel */}
      {/* -----------------------------------------------------
          Indica que el área muestra texto OCR acumulado.
      ===================================================== */}
      <div className="extracted-title">Texto extraído (acumulado)</div>

      {/* ===================================================== */}
      {/* Área de texto editable */}
      {/* -----------------------------------------------------
          Permite revisar y modificar el texto extraído.
          Aplica estilos dinámicos según tema activo.
      ===================================================== */}
      <textarea
        className="extracted-textarea"
        value={extractedText}
        onChange={(e) => setExtractedText(e.target.value)}
        rows={28}
        style={{
          background: colors.bg,
          color: colors.text,
          border: `1px solid ${colors.border}`,
          borderRadius: 10,
          padding: "14px 16px",
          minHeight: 400, // Mantiene la altura original
        }}
      />

      {/* ===================================================== */}
      {/* Mensaje dinámico (éxito / error) */}
      {/* -----------------------------------------------------
          Se muestra solo si existe contenido en msg.
          Cambia color y fondo según estado y tema.
      ===================================================== */}
      {!!msg && (
        <div
          className={`extracted-message ${isError ? "error" : "success"} ${
            theme === "dark" ? "dark" : "light"
          }`}
          style={{
            marginTop: 14,
            background: isError
              ? theme === "dark"
                ? "rgba(255, 80, 80, 0.15)"
                : "rgba(255, 90, 90, 0.2)"
              : theme === "dark"
              ? "rgba(22, 163, 74, 0.25)"
              : "rgba(34, 197, 94, 0.2)",
            border: `1px solid ${isError ? "#ff6b6b" : colors.success}`,
            color: isError
              ? "#ffb3b3"
              : theme === "dark"
              ? "#b6ffce"
              : "#065f46",
            padding: "10px 14px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>{msg}</span>
        </div>
      )}
    </div>
  );
}