import "./InstructionsButton.css";

interface InstructionsButtonProps {
  onClick: () => void;
}

export default function InstructionsButton({ onClick }: InstructionsButtonProps) {
  return (
    <div style={{ textAlign: "center", marginBottom: 10 }}>
      <button className="instructions-btn" onClick={onClick}>
        🧠 Instrucciones
      </button>
    </div>
  );
}