import { useCallback, useRef, useState, useMemo } from "react";
import { SimulationSpace } from "../../../core/simulation/SimulationSpace";
import { useSimulation } from "../../../hooks/useSimulation";
import { ChargedParticle } from "../../../core/physics/ChargedParticle";
import { Vector2D } from "../../../core/physics/Vector2D";
import { SimulationControls } from "./controls";
import { Boundaries } from "../../../core/simulation/BoundaryManager";
import { SimulationStats } from "./stats";

export default function SimulationCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [simulation] = useState<SimulationSpace>(() => new SimulationSpace());
    const [running, setRunning] = useState<boolean>(false);
    const [showVectors, setShowVectors] = useState<boolean>(true);
    const [particleCount, setParticleCount] = useState<number>(0);

    const canvasDimensions = useMemo(() => ({
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.8,
    }), []);

    const simulationBoundaries = useMemo<Boundaries>(() => ({
        left: -canvasDimensions.width / 2,
        right: canvasDimensions.width / 2,
        top: -canvasDimensions.height / 2,
        bottom: canvasDimensions.height / 2,
        elasticity: 0.9,
    }), [canvasDimensions.width, canvasDimensions.height]);

    useMemo(() => {
        simulation.setBoundaries(simulationBoundaries);
    }, [simulation, simulationBoundaries]);

    useSimulation({
        running,
        canvasRef,
        simulation,
        canvasDimensions,
        showVectors,
    });

    const toggleRunning = useCallback(() => {
        setRunning((prev) => !prev);
    }, []);

    const toggleVectors = useCallback(() => {
        setShowVectors((prev) => !prev);
    }, []);

    const addRandomParticle = useCallback(() => {
        const posX = (Math.random() * 0.8 - 0.4) * canvasDimensions.width;
        const posY = (Math.random() * 0.8 - 0.4) * canvasDimensions.height;

        const velX = (Math.random() * 80 - 40);
        const velY = (Math.random() * 80 - 40);

        const mass = 0.5 + Math.random() * 2.5;

        const charge = (Math.random() > 0.5 ? 1 : -1) * (1e-6 + Math.random() * 9e-6);

        simulation.addParticle(
            new ChargedParticle(
                new Vector2D(posX, posY),
                new Vector2D(velX, velY),
                mass,
                charge
            )
        );

        setParticleCount(simulation.getParticles().length);
    }, [simulation, canvasDimensions.width, canvasDimensions.height]);

    const clearParticles = useCallback(() => {
        const particles = [...simulation.getParticles()];
        for (const p of particles) {
            simulation.removeParticle(p);
        }
        setRunning(false);
        setParticleCount(0);
    }, [simulation]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                style={{
                    border: "1px solid #333",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    margin: "20px auto",
                    display: "block"
                }}
            />

            <SimulationStats
                particleCount={particleCount}
                isRunning={running}
            />

            <SimulationControls
                running={running}
                onToggleRunning={toggleRunning}
                onAddParticle={addRandomParticle}
                onClearParticles={clearParticles}
                showVectors={showVectors}
                onToggleVectors={toggleVectors}
            />
        </div>
    );
}