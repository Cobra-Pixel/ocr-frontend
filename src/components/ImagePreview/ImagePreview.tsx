import React from "react";
import "./ImagePreview.css";

interface ImagePreviewProps {
  preview: string | null;
  mimeSet: Set<string>;
  colors: any;
  gifPath?: string;
}

export default function ImagePreview({
  preview,
  mimeSet,
  colors,
  gifPath = "/assets/reading.gif",
}: ImagePreviewProps) {
  return (
    <div
      className="image-preview-container"
      style={{
        background: colors.panel,
        border: `1px solid ${colors.border}`,
      }}
    >
      <div>
        <div className="image-preview-title">Vista previa</div>

        <div
          className="image-preview-frame"
          style={{
            border: `1px dashed ${colors.ghost}`,
            background: colors.bg,
          }}
        >
          {preview ? (
            <img src={preview} className="image-preview-img" />
          ) : (
            <div className="image-preview-empty">No hay imagen seleccionada</div>
          )}
        </div>

        <div className="image-preview-types">
          <strong>Tipos detectados:</strong>{" "}
          {Array.from(mimeSet).length
            ? Array.from(mimeSet).join(", ")
            : "—"}
        </div>
      </div>

      {gifPath && (
        <div className="image-preview-gif">
          <img src={gifPath} alt="gif decorativo" className="image-preview-gif-img" />
        </div>
      )}
    </div>
  );
}