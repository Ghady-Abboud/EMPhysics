import React from 'react';

interface SimulationStatsProps {
    particleCount: number;
    isRunning: boolean;
}

export const SimulationStats: React.FC<SimulationStatsProps> = ({
    particleCount,
    isRunning
}) => {
    return (
        <div style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "rgba(255,255,255,0.8)",
            padding: 10,
            borderRadius: 5,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            minWidth: "150px"
        }}>
            <p><strong>Particles:</strong> {particleCount}</p>
            <p><strong>Status:</strong> {isRunning ? "Running" : "Paused"}</p>
        </div>
    );
};