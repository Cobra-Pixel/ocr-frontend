import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { useTheme } from "./hooks/useTheme";
import "./styles.css";

function ThemeWrapper() {
  const { colors } = useTheme();

  useEffect(() => {
    document.body.style.background = colors.bg;
    document.body.style.color = colors.text;
    document.body.style.transition = "background 0.3s, color 0.3s";
  }, [colors]);

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeWrapper />
  </React.StrictMode>
);