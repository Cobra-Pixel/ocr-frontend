import "./ExtractedTextArea.css";

interface Props {
  extractedText: string;
  setExtractedText: (v: string) => void;
  msg: string;
  theme: "dark" | "light";
  colors: any;
}

export default function ExtractedTextArea({
  extractedText,
  setExtractedText,
  msg,
  theme,
  colors,
}: Props) {
  const isError = msg.startsWith("❌") || msg.startsWith("⚠️");

  return (
    <div
      className="extracted-container"
      style={{
        background: colors.panel,
        border: `1px solid ${colors.border}`,
        borderRadius: 14,         // ✅ restauramos bordes
        padding: 14,              // ✅ restauramos padding original
        height: "100%",           // ✅ mismo alto que el panel izquierdo
        boxSizing: "border-box",  // ✅ para que no se achique por padding
      }}
    >
      <div className="extracted-title">Texto extraído (acumulado)</div>

      <textarea
        className="extracted-textarea"
        value={extractedText}
        onChange={(e) => setExtractedText(e.target.value)}
        rows={28}
        style={{
          background: colors.bg,
          color: colors.text,
          border: `1px solid ${colors.border}`,
          borderRadius: 10,
          padding: "14px 16px",
          minHeight: 400, // ✅ altura original restaurada
        }}
      />

      {!!msg && (
        <div
          className={`extracted-message ${isError ? "error" : "success"} ${
            theme === "dark" ? "dark" : "light"
          }`}
          style={{
            marginTop: 14,
            background: isError
              ? theme === "dark"
                ? "rgba(255, 80, 80, 0.15)"
                : "rgba(255, 90, 90, 0.2)"
              : theme === "dark"
              ? "rgba(22, 163, 74, 0.25)"
              : "rgba(34, 197, 94, 0.2)",
            border: `1px solid ${isError ? "#ff6b6b" : colors.success}`,
            color: isError
              ? "#ffb3b3"
              : theme === "dark"
              ? "#b6ffce"
              : "#065f46",
            padding: "10px 14px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
           <span>{msg}</span>
        </div>
      )}
    </div>
  );
}