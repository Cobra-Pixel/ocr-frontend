// ============================================================
// ButtonsPanel.tsx — Panel de botones de acciones principales
// ============================================================
// Este componente muestra los botones principales de la interfaz OCR:
//   - Seleccionar imagen
//   - Extraer texto (EasyOCR + PyTesseract)
//   - Procesar en la nube (OCR.Space)
//   - Guardar resultado (.txt)
//
// Combina lógica de control de estado con estilos definidos en ButtonsPanel.css
// y colores temáticos (light / dark) proporcionados por props.
// ============================================================

import "./ButtonsPanel.css";

// ============================================================
// Interfaz de propiedades (Props)
// ------------------------------------------------------------
// Define todas las funciones y estados requeridos para el panel.
// ============================================================
interface ButtonsPanelProps {
  onPickImage: () => void;                               // Acción: abrir selector de imagen
  onExtract: () => void;                                 // Acción: procesar OCR local
  onExtractCloud: () => void;                            // Acción: procesar OCR en la nube
  onSaveAll: () => void;                                 // Acción: guardar texto extraído
  fileInputRef: React.RefObject<HTMLInputElement>;       // Referencia al input oculto de archivo
  disabledExtract: boolean;                              // Deshabilita extracción si no hay imagen
  disabledSave: boolean;                                 // Deshabilita guardado si no hay texto
  loading: boolean;                                      // Muestra estado de carga durante OCR
  colors: any;                                           // Colores temáticos del tema actual
  theme: "dark" | "light";                               // Tema actual de la interfaz
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Evento al seleccionar imagen
}


// ============================================================
// Componente principal: ButtonsPanel
// ------------------------------------------------------------
// Contenedor flexible con botones estilizados y eventos de acción.
// Utiliza los estilos definidos en ButtonsPanel.css.
// ============================================================
export default function ButtonsPanel({
  onPickImage,
  onExtract,
  onExtractCloud,
  onSaveAll,
  fileInputRef,
  disabledExtract,
  disabledSave,
  loading,
  colors,
  theme,
  onImageChange,
}: ButtonsPanelProps) {
  return (
    <div
      className="buttons-panel"
      style={{ borderBottom: `1px solid ${colors.border}` }}
    >
      {/* ===================================================== */}
      {/* Botón para seleccionar imagen local */}
      {/* ===================================================== */}
      <button className="btn btn-ghost" onClick={onPickImage}>
        📁 Seleccionar imagen
      </button>

      {/* Input oculto que dispara la selección real de archivo */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="file-input-hidden"
        onChange={onImageChange}
      />

      {/* ===================================================== */}
      {/* Botón de extracción OCR local */}
      {/* -----------------------------------------------------
          Combina EasyOCR + PyTesseract para texto impreso o digital.
          Muestra mensaje de "Procesando…" mientras está en ejecución.
      ===================================================== */}
      <button
        className="btn btn-primary"
        onClick={onExtract}
        disabled={disabledExtract}
        style={{ background: colors.accent, borderColor: colors.accent }}
      >
        {loading ? "Procesando…" : "🔍 Extraer texto (Easy OCR + PyTesseract)"}
      </button>

      {/* ===================================================== */}
      {/* Botón de OCR en la nube (OCR.Space) */}
      {/* -----------------------------------------------------
          Ideal para texto manuscrito o difícil de reconocer localmente.
      ===================================================== */}
      <button
        className="btn btn-cloud"
        onClick={onExtractCloud}
        disabled={disabledExtract}
      >
        ☁️ Procesar manuscrito (OCR.Cloud)
      </button>

      {/* ===================================================== */}
      {/* Botón de guardado general (.txt) */}
      {/* -----------------------------------------------------
          Guarda el texto procesado localmente en la base de datos
          y exporta el archivo dentro de /data/exports.
      ===================================================== */}
      <button
        className="btn btn-success"
        onClick={onSaveAll}
        disabled={disabledSave}
        style={{ background: colors.success, borderColor: colors.success }}
      >
        💾 Guardar .txt (todo)
      </button>
    </div>
  );
}