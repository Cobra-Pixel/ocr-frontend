// ============================================================
// InstructionsPanel.tsx — Panel de instrucciones del OCR Extractor
// ============================================================
// Muestra una guía breve con los pasos esenciales para usar
// correctamente la aplicación OCR Extractor Pro.
// Explica cómo seleccionar una imagen, elegir el método de OCR
// y guardar los resultados.
//
// Usa estilos definidos en `InstructionsPanel.css` y colores
// dinámicos proporcionados por el sistema de temas (props.colors).
// ============================================================

import "./InstructionsPanel.css";


// ============================================================
// Interfaz de propiedades (Props)
// ------------------------------------------------------------
// - colors: objeto con la paleta de colores del tema actual,
//   usado para definir fondo, borde y color del texto.
// ============================================================
interface InstructionsPanelProps {
  colors: any;
}


// ============================================================
// Componente principal: InstructionsPanel
// ------------------------------------------------------------
// Renderiza un panel visual con:
//   1️ Título principal de la guía.
//   2️ Descripción breve del sistema OCR.
//   3️ Lista ordenada de pasos de uso.
//   4️ Lista secundaria con tipos de extracción disponibles.
//   5️ Tip o recomendación final.
//
// Se integra visualmente con el tema claro/oscuro mediante
// los colores definidos en la prop `colors`.
// ============================================================
export default function InstructionsPanel({ colors }: InstructionsPanelProps) {
  return (
    <div
      className="instructions-panel"
      style={{
        background: colors.panel,              // Fondo adaptable al tema
        border: `1px solid ${colors.border}`,  // Borde dinámico
        color: colors.text,                    // Texto ajustado al modo actual
      }}
    >
      {/* ===================================================== */}
      {/* Título del panel */}
      {/* -----------------------------------------------------
          Identifica el propósito del bloque.
      ===================================================== */}
      <h3 style={{ marginBottom: 8 }}> Guía de uso del OCR Extractor Pro</h3>

      {/* ===================================================== */}
      {/* Introducción general */}
      {/* -----------------------------------------------------
          Explica brevemente el propósito del sistema.
      ===================================================== */}
      <p>
        Este sistema te permite extraer texto desde imágenes comunes o manuscritas.
        Sigue estos pasos para obtener los mejores resultados:
      </p>

      {/* ===================================================== */}
      {/* Lista principal de pasos */}
      {/* -----------------------------------------------------
          Describe las acciones básicas que el usuario debe realizar.
      ===================================================== */}
      <ol style={{ marginLeft: 20 }}>
        <li>
          Haz clic en <strong>“Seleccionar imagen”</strong> y carga tu imagen.
        </li>
        <li>Elige el método de extracción adecuado:</li>
      </ol>

      {/* ===================================================== */}
      {/* Lista secundaria: métodos OCR disponibles */}
      {/* -----------------------------------------------------
          Detalla las diferencias entre los dos tipos de extracción.
      ===================================================== */}
      <ul style={{ marginLeft: 30, listStyleType: "circle" }}>
        <li>
          <strong>Extraer texto (EasyOCR + PyTesseract):</strong> Ideal para texto impreso.
        </li>
        <li>
          <strong>Procesar manuscrito (OCR.Cloud):</strong> Para escritura a mano.
        </li>
      </ul>

      {/* ===================================================== */}
      {/* Instrucción final */}
      {/* -----------------------------------------------------
          Indica cómo guardar el texto procesado.
      ===================================================== */}
      <p style={{ marginTop: 8 }}>
        Después puedes editar el texto y presionar <strong>“Guardar .txt (todo)”</strong>.
      </p>

      {/* ===================================================== */}
      {/* Tip o recomendación */}
      {/* -----------------------------------------------------
          Sugerencia final para mejorar la precisión del OCR.
      ===================================================== */}
      <p
        style={{
          fontStyle: "italic",
          fontSize: 14,
          marginTop: 6,
          opacity: 0.8,
        }}
      >
        Tip: evita fotos borrosas o muy oscuras para lograr mayor precisión.
      </p>
    </div>
  );
}