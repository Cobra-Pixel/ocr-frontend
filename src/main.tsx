// ============================================================
// main.tsx — Punto de entrada principal del frontend OCR Extractor Pro
// ============================================================
// Este archivo monta la aplicación React en el DOM, aplicando el
// sistema de temas (claro/oscuro) globalmente al documento HTML.
//
// Incluye:
//   - Importación de estilos globales.
//   - Carga del componente raíz <App />.
//   - Envoltorio <ThemeWrapper> para aplicar los colores del tema.
// ============================================================

import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { useTheme } from "./hooks/useTheme";
import "./styles.css"; // Estilos globales de la app


// ============================================================
// Componente ThemeWrapper
// ------------------------------------------------------------
// Este componente se encarga de aplicar los colores del tema
// activo (claro u oscuro) directamente sobre el elemento <body>.
//
// De esta forma, se mantiene la coherencia visual global en toda
// la aplicación sin necesidad de propagar estilos manualmente.
// ============================================================
function ThemeWrapper() {
  const { colors } = useTheme(); // Obtiene colores del tema actual

  // Aplica los colores dinámicamente al body cuando cambia el tema
  useEffect(() => {
    document.body.style.background = colors.bg;   // Fondo general
    document.body.style.color = colors.text;      // Color principal del texto
    document.body.style.transition = "background 0.3s, color 0.3s"; // Suaviza el cambio
  }, [colors]);

  return <App />; // Renderiza el componente raíz
}


// ============================================================
// Renderizado de la aplicación
// ------------------------------------------------------------
// Se usa la API moderna de React 18: createRoot().
// React.StrictMode se mantiene activado para ayudar a detectar
// posibles problemas durante el desarrollo.
// ============================================================
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeWrapper />
  </React.StrictMode>
);