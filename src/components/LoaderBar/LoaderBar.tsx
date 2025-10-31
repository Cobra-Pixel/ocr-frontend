import "./LoaderBar.css";

interface Props {
  theme: "dark" | "light";
}

export default function LoaderBar({ theme }: Props) {
  return (
    <div
      className="loader-bar"
      style={{
        background:
          theme === "dark"
            ? "rgba(37, 99, 235, 0.15)"
            : "rgba(37, 99, 235, 0.2)",
      }}
    >
      <div
        className={`loader-bar-progress ${theme === "dark" ? "dark" : "light"}`}
      ></div>
    </div>
  );
}