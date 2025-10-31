// Llamadas a FastAPI (OCR y guardar)
import axios from "axios";

// Muestra la URL en consola para verificar conexión
console.log("🌐 API Base URL:", import.meta.env.VITE_API_URL);

// Lee la URL base desde .env
const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
//const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
// Instancia principal de axios
const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "multipart/form-data" },
});

// OCR normal (EasyOCR + Tesseract)
export const extractText = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/api/ocr", formData);
  return data;
};

// OCR manuscrito (OCR.Space)
export const extractTextCloud = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/api/ocr/cloud", formData);
  return data;
};

// Guardar texto en backend
export const saveText = async (text: string, mimeTypes: string) => {
  const formData = new FormData();
  formData.append("text", text);
  formData.append("image_mime", mimeTypes);
  const { data } = await api.post("/api/save", formData);
  return data;
};