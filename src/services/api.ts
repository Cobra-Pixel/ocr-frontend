// ============================================================
// src/services/api.ts — Cliente HTTP para el OCR Extractor Pro
// ============================================================
// Este módulo define las funciones para comunicarse con el backend
// (FastAPI desplegado en Render). Gestiona las peticiones HTTP que
// permiten procesar imágenes y guardar texto extraído.
//
// Incluye:
//   - OCR local (EasyOCR + Tesseract)
//   - OCR en la nube (OCR.Space)
//   - Guardado del texto en el backend
//
// Usa Axios para manejar las solicitudes.
// ============================================================

import axios from "axios";


// ============================================================
// URL base del backend
// ------------------------------------------------------------
// Se obtiene de la variable de entorno VITE_API_BASE.
// Si no está definida (por ejemplo, en entorno local),
// se usa la URL por defecto del backend en Render.
//
// El método `.replace(/\/$/, "")` elimina una barra final
// para evitar duplicar "/" en las rutas.
// ============================================================
const API_BASE = (
  import.meta.env.VITE_API_BASE ||
  "https://ocr-backend-deploy.onrender.com"
).replace(/\/$/, "");


// ============================================================
// Instancia principal de Axios
// ------------------------------------------------------------
// Crea una instancia configurada con la baseURL del backend.
// Así todas las peticiones se construyen sobre esta ruta base.
// ============================================================
const api = axios.create({
  baseURL: API_BASE,
});


// ============================================================
// OCR local (EasyOCR + PyTesseract)
// ------------------------------------------------------------
// Envía una imagen al backend para procesarla usando los motores
// locales EasyOCR y Tesseract. Ideal para texto impreso.
//
// Endpoint: POST /api/ocr/
// ============================================================
export const extractText = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post("/api/ocr/", formData);
  return data;
};


// ============================================================
// OCR manuscrito (OCR.Space)
// ------------------------------------------------------------
// Envía la imagen al backend, que a su vez la reenvía al servicio
// externo OCR.Space. Ideal para escritura a mano o texto difícil.
//
// Endpoint: POST /api/ocr/cloud/
// ============================================================
export const extractTextCloud = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post("/api/ocr/cloud/", formData);
  return data;
};


// ============================================================
// Guardar texto procesado en backend
// ------------------------------------------------------------
// Envía el texto extraído y el tipo MIME de la imagen para
// almacenarlos en la base de datos MySQL del servidor.
//
// Endpoint: POST /api/save/
// ============================================================
export const saveText = async (text: string, mimeTypes: string) => {
  const formData = new FormData();
  formData.append("text", text);
  formData.append("image_mime", mimeTypes);

  const { data } = await api.post("/api/save/", formData);
  return data;
};


// ============================================================
// Exportar la URL base (opcional)
// ------------------------------------------------------------
// Permite consultar la URL de backend usada en la configuración,
// útil para depuración o logs en el frontend.
// ============================================================
export { API_BASE };