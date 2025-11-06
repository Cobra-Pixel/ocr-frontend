// ============================================================
// env.d.ts — Tipado de variables de entorno para Vite
// ============================================================
// Este archivo define las interfaces TypeScript necesarias
// para que Vite reconozca correctamente las variables de entorno
// utilizadas en tu proyecto React + TypeScript.
//
// Permite:
//    Autocompletado en variables de entorno (import.meta.env)
//    Validación de tipos en tiempo de desarrollo
//    Prevención de errores al acceder a claves no definidas
// ============================================================

/// <reference types="vite/client" />  // Importa los tipos base de Vite

// ============================================================
// Interfaz: ImportMetaEnv
// ------------------------------------------------------------
// Define las variables disponibles en el entorno de Vite.
// Cada variable debe comenzar con el prefijo VITE_
// para ser accesible desde el frontend.
//
// En este caso, solo se usa `VITE_API_BASE`,
// que apunta a la URL del backend (FastAPI en Render).
// ============================================================
interface ImportMetaEnv {
  readonly VITE_API_BASE: string; // URL base del backend (Render o local)
}

// ============================================================
// Interfaz: ImportMeta
// ------------------------------------------------------------
// Amplía la interfaz global de Vite para incluir `env`,
// permitiendo acceder a las variables declaradas arriba.
// ============================================================
interface ImportMeta {
  readonly env: ImportMetaEnv;
}