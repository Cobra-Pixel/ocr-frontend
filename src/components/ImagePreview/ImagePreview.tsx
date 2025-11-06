// ============================================================
// ImagePreview.tsx — Panel de vista previa de imágenes OCR
// ============================================================
// Este componente muestra una vista previa de la imagen cargada,
// junto con los tipos MIME detectados y un GIF decorativo opcional.
//
// Se usa en la interfaz del OCR Extractor antes de procesar una
// imagen con EasyOCR o OCR.Space.
// ============================================================

import React from "react";
import "./ImagePreview.css";


// ============================================================
// Interfaz de propiedades (Props)
// ------------------------------------------------------------
// - preview: URL o base64 de la imagen cargada.
// - mimeSet: conjunto de tipos MIME detectados (por ejemplo: "image/png").
// - colors: paleta de colores dinámica según el tema activo.
// - gifPath: ruta opcional de un GIF decorativo (por defecto /assets/reading.gif).
// ============================================================
interface ImagePreviewProps {
  preview: string | null;
  mimeSet: Set<string>;
  colors: any;
  gifPath?: string;
}


// ============================================================
// Componente principal: ImagePreview
// ------------------------------------------------------------
// Renderiza:
//   1️ Un título ("Vista previa").
//   2️ Un marco con la imagen seleccionada o mensaje vacío.
//   3️ Una lista de tipos MIME detectados.
//   4️ (Opcional) Un GIF decorativo animado debajo del panel.
// ============================================================
export default function ImagePreview({
  preview,
  mimeSet,
  colors,
  gifPath = "/assets/reading.gif", // Valor por defecto
}: ImagePreviewProps) {
  return (
    <div
      className="image-preview-container"
      style={{
        background: colors.panel,              // Fondo del panel
        border: `1px solid ${colors.border}`,  // Borde dinámico según tema
      }}
    >
      {/* ===================================================== */}
      {/* Sección principal de vista previa */}
      {/* -----------------------------------------------------
          Muestra el título, el marco con la imagen (si existe)
          y la lista de tipos MIME detectados.
      ===================================================== */}
      <div>
        {/* Título */}
        <div className="image-preview-title">Vista previa</div>

        {/* Marco que contiene la imagen o el texto “No hay imagen seleccionada” */}
        <div
          className="image-preview-frame"
          style={{
            border: `1px dashed ${colors.ghost}`,  // Borde decorativo punteado
            background: colors.bg,                 // Fondo adaptable
          }}
        >
          {preview ? (
            <img src={preview} className="image-preview-img" />
          ) : (
            <div className="image-preview-empty">No hay imagen seleccionada</div>
          )}
        </div>

        {/* Tipos de archivo detectados */}
        <div className="image-preview-types">
          <strong>Tipos detectados:</strong>{" "}
          {Array.from(mimeSet).length
            ? Array.from(mimeSet).join(", ")
            : "—"}
        </div>
      </div>

      {/* ===================================================== */}
      {/* GIF decorativo opcional */}
      {/* -----------------------------------------------------
          Se muestra debajo de la vista previa principal.
          Ideal para un toque visual o animación ilustrativa.
      ===================================================== */}
      {gifPath && (
        <div className="image-preview-gif">
          <img
            src={gifPath}
            alt="gif decorativo"
            className="image-preview-gif-img"
          />
        </div>
      )}
    </div>
  );
}