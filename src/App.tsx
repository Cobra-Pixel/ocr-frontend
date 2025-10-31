import { useState, useRef } from "react";
import { extractText, extractTextCloud, saveText } from "./services/api";
import { useTheme } from "./hooks/useTheme";
import Header from "./components/Header/Header";
import LoaderBar from "./components/LoaderBar/LoaderBar";
import ImagePreview from "./components/ImagePreview/ImagePreview";
import ExtractedTextArea from "./components/ExtractedTextArea/ExtractedTextArea";
import ButtonsPanel from "./components/ButtonsPanel/ButtonsPanel";
import InstructionsPanel from "./components/InstructionsPanel/InstructionsPanel";
import InstructionsButton from "./components/InstructionsButton/InstructionsButton";
import Footer from "./components/Footer/Footer";

export default function App() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [mimeSet, setMimeSet] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);

  const { theme, toggleTheme, colors } = useTheme();
  const fileRef = useRef<HTMLInputElement>(null!);

  const handlePickImage = () => fileRef.current?.click();
  const toggleInstructions = () => setShowInstructions((prev) => !prev);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setMsg("");
  };

  /** 🔍 OCR local **/
  const handleExtract = async () => {
    if (!image) return setMsg("Selecciona una imagen primero.");
    setLoading(true);
    try {
      const data = await extractText(image);
      const nuevo = data?.text?.trim();
      if (!nuevo) return setMsg("No se detectó texto.");
      const etiqueta = `\n\n────────────────────────────\n— ${image.name} —\n`;

      setExtractedText((prev) => {
        const yaIncluye = prev.includes(`— ${image.name} —`);
        if (!prev) return `${etiqueta}${nuevo}`;
        else if (!yaIncluye) return `${prev}${etiqueta}${nuevo}`;
        else return `${prev}\n${nuevo}`;
      });

      setMimeSet((prev) => new Set(prev).add(image.type));
      setMsg("✅ Texto impreso extraído correctamente (Easy OCR + PyTesseract).");
    } catch {
      setMsg("❌ Error al procesar la imagen.");
    } finally {
      setLoading(false);
    }
  };

  /** ☁️ OCR Cloud **/
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
      setMsg("✅ Texto manuscrito extraído correctamente (OCR.Cloud).");
    } catch {
      setMsg("❌ Error al procesar manuscrito (OCR.Cloud).");
    } finally {
      setLoading(false);
    }
  };


  /** 💾 Guardar y descargar **/
  const handleSaveAll = async () => {
    if (!extractedText.trim()) return setMsg("No hay texto para guardar.");
    try {
      const mimeStr = Array.from(mimeSet).join(",");
      const result = await saveText(extractedText, mimeStr);
      if (result?.saved && result?.txt_path) {
        const filename = result.txt_path.split("/").pop();
        const baseUrl =
          import.meta.env.VITE_API_BASE?.replace(/\/$/, "") || "http://127.0.0.1:8000";
        const link = document.createElement("a");
        link.href = `${baseUrl}/api/download/${filename}`;
        link.download = filename || "texto_extraido.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setMsg("💾 Archivo descargado correctamente.");
      } else setMsg("⚠️ No se pudo obtener el archivo para descargar.");
    } catch {
      setMsg("⚠️ Error al registrar o descargar archivo.");
    }
  };

  return (
    <div style={{ background: colors.bg, color: colors.text, minHeight: "100vh" }}>
      <Header theme={theme} toggleTheme={toggleTheme} color={colors.text} />

      <main style={{ padding: 30, maxWidth: 960, margin: "0 auto" }}>
        <InstructionsButton onClick={toggleInstructions} />
        {showInstructions && <InstructionsPanel colors={colors} />}

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

        {loading && <LoaderBar theme={theme} />}

        <div
          style={{
            display: "grid",
            gap: 20,
            marginTop: 20,
            gridTemplateColumns: "1fr 1fr",
          }}
          className="content-area"
        >
          <ImagePreview preview={preview} mimeSet={mimeSet} colors={colors} gifPath="/bot.gif" />
          <ExtractedTextArea
            extractedText={extractedText}
            setExtractedText={setExtractedText}
            msg={msg}
            theme={theme}
            colors={colors}
          />
        </div>
      </main>

      <Footer color={colors.text} borderColor={colors.border} />
    </div>
  );
}