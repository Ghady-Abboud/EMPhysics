import { useRef, useState } from "react";
import { SimulationSpace } from "../Physics/SimulationSpace";
import { useSimulation } from "../hooks/useSimulation";
import { ChargedParticle } from "../Physics/ChargedParticle";
import { Vector2D } from "../Physics/Vector2D";

const sim = new SimulationSpace();

export interface SimulationDeps {
    running: boolean;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    sim: SimulationSpace;
    canvasDimensions: {
        width: number;
        height: number;
    };
    updateCanvas: boolean;
}

export default function SimulationCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [running, setRunning] = useState<boolean>(false);
    const [updateCanvas, setUpdateCanvas] = useState<boolean>(false);
    const [showGrid, setShowGrid] = useState<boolean>(true);
    const [showVectors, setShowVectors] = useState<boolean>(true);
    const [particleCount, setParticleCount] = useState<number>(0);

    // Canvas dimensions
    const canvasDimensions = {
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.8,
    };

    // Set simulation boundaries
    sim.setBoundaries({
        left: -canvasDimensions.width / 2,
        right: canvasDimensions.width / 2,
        top: -canvasDimensions.height / 2,
        bottom: canvasDimensions.height / 2,
        elasticity: 0.9,
    });

    const simulationDeps: SimulationDeps = {
        running,
        canvasRef,
        sim,
        canvasDimensions,
        updateCanvas,
    };

    useSimulation(simulationDeps);

    const toggleRunning = () => {
        setRunning((prev) => !prev);
    };

    const addRandomParticle = () => {
        // Get boundaries for position constraints
        const bounds = sim.getBoundaries();

        // Calculate appropriate position within 80% of canvas size
        // to avoid particles too close to the edges
        const posX = (Math.random() * 0.8 - 0.4) * canvasDimensions.width;
        const posY = (Math.random() * 0.8 - 0.4) * canvasDimensions.height;

        // Random velocity between -40 and 40 in both directions
        const velX = (Math.random() * 80 - 40);
        const velY = (Math.random() * 80 - 40);

        // Random mass between 0.5 and 3
        const mass = 0.5 + Math.random() * 2.5;

        // Random charge - 50% chance of positive or negative
        const charge = (Math.random() > 0.5 ? 1 : -1) * (1e-6 + Math.random() * 9e-6);

        // Create and add the particle
        sim.addParticle(
            new ChargedParticle(
                new Vector2D(posX, posY),
                new Vector2D(velX, velY),
                mass,
                charge
            )
        );

        // Update particle count and trigger re-render
        setParticleCount(sim.getParticles().length);
        setUpdateCanvas(!updateCanvas);
    };

    const clearParticles = () => {
        // Reset the simulation
        sim.getParticles().forEach(p => sim.removeParticle(p));
        setParticleCount(0);
        setUpdateCanvas(!updateCanvas);
    };

    return (
        <div>
            {/* Main canvas */}
            <canvas
                ref={canvasRef}
                style={{
                    border: "1px solid #333",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    margin: "20px auto",
                    display: "block"
                }}
            />

            {/* Stats panel */}
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
                <p><strong>Particles:</strong> {sim.getParticles().length}</p>
                <p><strong>Status:</strong> {running ? "Running" : "Paused"}</p>
            </div>

            {/* Controls panel */}
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
                    onClick={toggleRunning}
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
                    onClick={addRandomParticle}
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
                    onClick={clearParticles}
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
                    <label style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                        <input
                            type="checkbox"
                            checked={showGrid}
                            onChange={() => setShowGrid(!showGrid)}
                            style={{ marginRight: "5px" }}
                        />
                        Show Grid
                    </label>

                    <label style={{ display: "flex", alignItems: "center" }}>
                        <input
                            type="checkbox"
                            checked={showVectors}
                            onChange={() => setShowVectors(!showVectors)}
                            style={{ marginRight: "5px" }}
                        />
                        Show Vectors
                    </label>
                </div>
            </div>
        </div>
    );
}