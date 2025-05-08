import React from 'react';

interface SimulationControlsProps {
    running: boolean;
    onToggleRunning: () => void;
    onAddParticle: () => void;
    onClearParticles: () => void;
    onToggleVectors: () => void;
    showVectors: boolean;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
    running,
    onToggleRunning,
    onAddParticle,
    onClearParticles,
    onToggleVectors,
    showVectors,
}) => {
    return (
        <div style={{
            position: "absolute",
            top: 20,
            left: 20,
            background: "rgba(255,255,255,0.8)",
            padding: 10,
            borderRadius: 5,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
        }}>
            <button
                onClick={onToggleRunning}
                style={{
                    padding: "8px 12px",
                    background: running ? "#f44336" : "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
            >
                {running ? "Pause" : "Start"}
            </button>

            <button
                onClick={onAddParticle}
                style={{
                    padding: "8px 12px",
                    background: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
            >
                Add Particle
            </button>

            <button
                onClick={onClearParticles}
                style={{
                    padding: "8px 12px",
                    background: "#FF9800",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
            >
                Clear All
            </button>

            <div style={{ marginTop: "10px" }}>
                <label style={{ display: "flex", alignItems: "center" }}>
                    <input
                        type="checkbox"
                        checked={showVectors}
                        onChange={onToggleVectors}
                        style={{ marginRight: "5px" }}
                    />
                    Show Vectors
                </label>
            </div>
        </div>
    );
};