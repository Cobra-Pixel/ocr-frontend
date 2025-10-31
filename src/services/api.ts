// src/services/api.ts
import axios from "axios";

// 🔧 Usa siempre la URL de producción del backend (Render)
const API_BASE = (import.meta.env.VITE_API_BASE || "https://ocr-backend-deploy.onrender.com").replace(/\/$/, "");

// Instancia principal
const api = axios.create({
  baseURL: API_BASE,
});

// OCR normal (EasyOCR + Tesseract)
export const extractText = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/api/ocr/", formData); // 🔹 barra final
  return data;
};

// OCR manuscrito (OCR.Space)
export const extractTextCloud = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/api/ocr/cloud/", formData); // 🔹 barra final
  return data;
};

// Guardar texto en backend
export const saveText = async (text: string, mimeTypes: string) => {
  const formData = new FormData();
  formData.append("text", text);
  formData.append("image_mime", mimeTypes);
  const { data } = await api.post("/api/save/", formData); // 🔹 barra final
  return data;
};

export { API_BASE };