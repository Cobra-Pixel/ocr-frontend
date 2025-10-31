interface FooterProps {
  color: string;
  borderColor: string;
}

export default function Footer({ color, borderColor }: FooterProps) {
  return (
    <footer
      style={{
        marginTop: 40,
        padding: "20px 0",
        textAlign: "center",
        borderTop: `1px solid ${borderColor}`,
        color,
        opacity: 0.7,
        fontSize: 14,
      }}
    >
      <p>© {new Date().getFullYear()} OCR Extractor Pro — Todos los derechos reservados.</p>
      <p style={{ marginTop: 4 }}>
        Desarrollado con ❤️ por <strong>Team UNISIMA ⛰️🏔️</strong>
      </p>
    </footer>
  );
}