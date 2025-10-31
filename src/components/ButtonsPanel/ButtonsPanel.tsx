import "./ButtonsPanel.css";

interface ButtonsPanelProps {
  onPickImage: () => void;
  onExtract: () => void;
  onExtractCloud: () => void;
  onSaveAll: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  disabledExtract: boolean;
  disabledSave: boolean;
  loading: boolean;
  colors: any;
  theme: "dark" | "light";
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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
      <button className="btn btn-ghost" onClick={onPickImage}>
        📁 Seleccionar imagen
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="file-input-hidden"
        onChange={onImageChange}
      />

      <button
        className="btn btn-primary"
        onClick={onExtract}
        disabled={disabledExtract}
        style={{ background: colors.accent, borderColor: colors.accent }}
      >
        {loading ? "Procesando…" : "🔍 Extraer texto (Easy OCR + PyTesseract)"}
      </button>

      <button
        className="btn btn-cloud"
        onClick={onExtractCloud}
        disabled={disabledExtract}
      >
        ☁️ Procesar manuscrito (OCR.Cloud)
      </button>

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