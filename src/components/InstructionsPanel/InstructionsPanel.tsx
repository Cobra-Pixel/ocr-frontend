import "./InstructionsPanel.css";

interface InstructionsPanelProps {
  colors: any;
}

export default function InstructionsPanel({ colors }: InstructionsPanelProps) {
  return (
    <div
      className="instructions-panel"
      style={{
        background: colors.panel,
        border: `1px solid ${colors.border}`,
        color: colors.text,
      }}
    >
      <h3 style={{ marginBottom: 8 }}>🧠 Guía de uso del OCR Extractor Pro</h3>
      <p>
        Este sistema te permite extraer texto desde imágenes comunes o manuscritas.
        Sigue estos pasos para obtener los mejores resultados:
      </p>
      <ol style={{ marginLeft: 20 }}>
        <li>Haz clic en <strong>“Seleccionar imagen”</strong> y carga tu imagen.</li>
        <li>Elige el método de extracción adecuado:</li>
      </ol>
      <ul style={{ marginLeft: 30, listStyleType: "circle" }}>
        <li>
          <strong>Extraer texto (EasyOCR + PyTesseract):</strong> Ideal para texto impreso.
        </li>
        <li>
          <strong>Procesar manuscrito (OCR.Cloud):</strong> Para escritura a mano.
        </li>
      </ul>
      <p style={{ marginTop: 8 }}>
        Después puedes editar el texto y presionar <strong>“Guardar .txt (todo)”</strong>.
      </p>
      <p style={{ fontStyle: "italic", fontSize: 14, marginTop: 6, opacity: 0.8 }}>
        Tip: evita fotos borrosas o muy oscuras para lograr mayor precisión.
      </p>
    </div>
  );
}