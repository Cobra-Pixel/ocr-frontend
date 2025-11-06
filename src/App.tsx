// ============================================================
// App.tsx — Componente principal del OCR Extractor Pro
// ============================================================
// Controla todo el flujo del frontend:
//   1️ Selección y vista previa de imágenes.
//   2️ Procesamiento OCR (local y en la nube).
//   3️ Guardado y descarga de resultados.
//   4️ Cambio de tema (oscuro/claro).
//   5️ Visualización de instrucciones y componentes UI.
//
// Este archivo coordina todos los componentes principales:
// Header, ButtonsPanel, LoaderBar, ImagePreview, ExtractedTextArea,
// InstructionsPanel, InstructionsButton y Footer.
// ============================================================

import { useState, useRef } from "react";
import { extractText, extractTextCloud, saveText, API_BASE } from "./services/api";
import { useTheme } from "./hooks/useTheme";
import Header from "./components/Header/Header";
import LoaderBar from "./components/LoaderBar/LoaderBar";
import ImagePreview from "./components/ImagePreview/ImagePreview";
import ExtractedTextArea from "./components/ExtractedTextArea/ExtractedTextArea";
import ButtonsPanel from "./components/ButtonsPanel/ButtonsPanel";
import InstructionsPanel from "./components/InstructionsPanel/InstructionsPanel";
import InstructionsButton from "./components/InstructionsButton/InstructionsButton";
import Footer from "./components/Footer/Footer";


// ============================================================
// Componente principal
// ------------------------------------------------------------
// Maneja los estados globales de la app y define el flujo
// completo de interacción del usuario.
// ============================================================
export default function App() {
  // =============================
  // Estados globales
  // =============================
  const [image, setImage] = useState<File | null>(null);          // Imagen seleccionada
  const [preview, setPreview] = useState<string | null>(null);    // URL para vista previa
  const [extractedText, setExtractedText] = useState("");         // Texto extraído (OCR)
  const [mimeSet, setMimeSet] = useState<Set<string>>(new Set()); // Tipos MIME detectados
  const [loading, setLoading] = useState(false);                  // Indicador de carga OCR
  const [msg, setMsg] = useState("");                             // Mensaje dinámico (éxito/error)
  const [showInstructions, setShowInstructions] = useState(false);// Controla el panel de guía

  // =============================
  // Tema y colores dinámicos
  // =============================
  const { theme, toggleTheme, colors } = useTheme();

  // =============================
  // Referencia al input de archivo
  // =============================
  const fileRef = useRef<HTMLInputElement>(null!);

  // =============================
  // Funciones auxiliares de UI
  // =============================
  const handlePickImage = () => fileRef.current?.click();        // Abre el selector de imagen
  const toggleInstructions = () => setShowInstructions((prev) => !prev); // Muestra/oculta guía

  // =============================
  // Cambio de imagen seleccionada
  // =============================
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setMsg("");
  };

  // ============================================================
  // OCR LOCAL (EasyOCR + PyTesseract)
  // ------------------------------------------------------------
  // Procesa texto impreso desde una imagen mediante los motores
  // locales del backend.
  // ============================================================
  const handleExtract = async () => {
    if (!image) return setMsg("Selecciona una imagen primero.");
    setLoading(true);

    try {
      const data = await extractText(image);
      const nuevo = data?.text?.trim();
      if (!nuevo) return setMsg("No se detectó texto.");

      // Separador para mantener trazabilidad por archivo
      const etiqueta = `\n\n────────────────────────────\n— ${image.name} —\n`;

      // Agrega el texto al existente, evitando duplicados
      setExtractedText((prev) => {
        const yaIncluye = prev.includes(`— ${image.name} —`);
        if (!prev) return `${etiqueta}${nuevo}`;
        else if (!yaIncluye) return `${prev}${etiqueta}${nuevo}`;
        else return `${prev}\n${nuevo}`;
      });

      setMimeSet((prev) => new Set(prev).add(image.type));
      setMsg(" Texto impreso extraído correctamente (Easy OCR + PyTesseract).");
    } catch {
      setMsg(" Error al procesar la imagen.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // OCR CLOUD (OCR.Space)
  // ------------------------------------------------------------
  // Procesa escritura manuscrita mediante el servicio OCR.Space.
  // Ideal para notas, apuntes o texto irregular.
  // ============================================================
  const handleExtractCloud = async () => {
    if (!image) return setMsg("Selecciona una imagen primero.");
    setLoading(true);

    try {
      let nuevo = (await extractTextCloud(image))?.text || "";
      nuevo = nuevo.trim();

      if (!nuevo.trim()) return setMsg("No se detectó texto manuscrito.");

      const etiqueta = `\n\n────────────────────────────\n— ${image.name} —\n`;

      setExtractedText((prev) => {
        const yaIncluye = prev.includes(`— ${image.name} —`);
        if (!prev) return `${etiqueta}${nuevo}`;
        else if (!yaIncluye) return `${prev}${etiqueta}${nuevo}`;
        else return `${prev}\n${nuevo}`;
      });

      setMimeSet((prev) => new Set(prev).add(image.type));
      setMsg(" Texto manuscrito extraído correctamente (OCR.Cloud).");
    } catch {
      setMsg(" Error al procesar manuscrito (OCR.Cloud).");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // GUARDAR Y DESCARGAR RESULTADOS
  // ------------------------------------------------------------
  // Envía el texto acumulado al backend, lo guarda en disco y
  // genera un enlace de descarga directa (.txt).
  // ============================================================
  const handleSaveAll = async () => {
    if (!extractedText.trim()) return setMsg("No hay texto para guardar.");
    try {
      const mimeStr = Array.from(mimeSet).join(",");
      const result = await saveText(extractedText, mimeStr);

      if (result?.saved && result?.txt_path) {
        const filename = result.txt_path.split("/").pop();
        const link = document.createElement("a");
        link.href = `${API_BASE}/api/download/${filename}`;
        link.download = filename || "texto_extraido.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setMsg(" Archivo descargado correctamente.");
      } else {
        setMsg(" No se pudo obtener el archivo para descargar.");
      }
    } catch {
      setMsg(" Error al registrar o descargar archivo.");
    }
  };

  // ============================================================
  // Renderizado principal
  // ------------------------------------------------------------
  // Define la estructura general del layout: encabezado, panel
  // de botones, barra de carga, paneles de contenido e instrucciones.
  // ============================================================
  return (
    <div style={{ background: colors.bg, color: colors.text, minHeight: "100vh" }}>
      {/* Encabezado con tema dinámico */}
      <Header theme={theme} toggleTheme={toggleTheme} color={colors.text} />

      {/* Sección principal */}
      <main style={{ padding: 30, maxWidth: 960, margin: "0 auto" }}>
        {/* Botón para mostrar/ocultar guía de uso */}
        <InstructionsButton onClick={toggleInstructions} />
        {showInstructions && <InstructionsPanel colors={colors} />}

        {/* Panel de botones para subir, extraer y guardar */}
        <ButtonsPanel
          onPickImage={handlePickImage}
          onExtract={handleExtract}
          onExtractCloud={handleExtractCloud}
          onSaveAll={handleSaveAll}
          fileInputRef={fileRef}
          disabledExtract={!image || loading}
          disabledSave={!extractedText.trim()}
          loading={loading}
          colors={colors}
          theme={theme}
          onImageChange={handleImageChange}
        />

        {/* Barra de carga mientras se procesa OCR */}
        {loading && <LoaderBar theme={theme} />}

        {/* Contenido principal dividido: imagen | texto */}
        <div
          style={{
            display: "grid",
            gap: 20,
            marginTop: 20,
            gridTemplateColumns: "1fr 1fr",
          }}
          className="content-area"
        >
          <ImagePreview
            preview={preview}
            mimeSet={mimeSet}
            colors={colors}
            gifPath="/bot.gif"
          />

          <ExtractedTextArea
            extractedText={extractedText}
            setExtractedText={setExtractedText}
            msg={msg}
            theme={theme}
            colors={colors}
          />
        </div>
      </main>

      {/* Pie de página */}
      <Footer color={colors.text} borderColor={colors.border} />
    </div>
  );
}