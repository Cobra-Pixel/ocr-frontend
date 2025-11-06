// ============================================================
// theme.ts — Paleta de colores global para OCR Extractor Pro
// ============================================================
// Este módulo define los temas visuales de la aplicación: 
//   - "dark" (oscuro)
//   - "light" (claro)
//
// Cada tema contiene una serie de variables de color utilizadas 
// por los componentes (fondos, bordes, textos, acentos, etc.).
//
// Se integra con el hook personalizado `useTheme.ts` para 
// alternar entre ambos modos dinámicamente.
// ============================================================


// ============================================================
// Paleta global de temas
// ------------------------------------------------------------
// Los objetos `dark` y `light` definen las propiedades de color
// para los diferentes elementos visuales del frontend.
// ============================================================
export const themes = {
  // ==========================================================
  // Tema oscuro
  // ----------------------------------------------------------
  // Enfocado en tonos azul oscuro con alto contraste de texto.
  // Ideal para uso prolongado en entornos con poca luz.
  // ==========================================================
  dark: {
    bg: "#0b1220",        // Fondo principal de la aplicación
    panel: "#0f172a",     // Fondo de paneles y contenedores
    text: "#e8eefc",      // Color de texto principal (claro)
    border: "#233253",    // Líneas divisorias / bordes
    accent: "#2563eb",    // Color de acento (botones, enlaces)
    success: "#16a34a",   // Verde de confirmación o éxito
    ghost: "#2a3961",     // Color neutro para bordes suaves o hover
  },

  // ==========================================================
  // Tema claro
  // ----------------------------------------------------------
  // Paleta con fondos blancos y grises suaves, manteniendo 
  // el azul como color de acento principal.
  // ==========================================================
  light: {
    bg: "#f7f8fc",        // Fondo general de la aplicación
    panel: "#ffffff",     // Paneles o tarjetas blancas
    text: "#1e1e2d",      // Texto oscuro principal
    border: "#d0d4e1",    // Bordes claros entre secciones
    accent: "#2563eb",    // Azul principal (idéntico al tema oscuro)
    success: "#16a34a",   // Verde de éxito / confirmación
    ghost: "#d0d4e1",     // Color gris neutro (hover o contornos)
  },
};