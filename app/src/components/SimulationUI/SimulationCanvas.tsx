import { useCallback, useRef, useState, useMemo } from "react";
import { SimulationSpace } from "../../Physics/Simulation/SimulationSpace";
import { useSimulation, SimulationRenderOptions } from "../../hooks/useSimulation";
import { ChargedParticle } from "../../Physics/ChargedParticle";
import { Vector2D } from "../../Physics/Vector2D";
import { SimulationControls } from "./SimulationControls";
import { SimulationStats } from "./SimulationStats";
import { Boundaries } from "../../Physics/Simulation/BoundaryManager";

export default function SimulationCanvas() {
    // Initialize state and refs
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [simulation] = useState<SimulationSpace>(() => new SimulationSpace());
    const [running, setRunning] = useState<boolean>(false);
    const [updateTrigger, setUpdateTrigger] = useState<boolean>(false);
    const [showGrid, setShowGrid] = useState<boolean>(true);
    const [showVectors, setShowVectors] = useState<boolean>(true);
    const [particleCount, setParticleCount] = useState<number>(0);

    // Memoize canvas dimensions to prevent unnecessary recalculations
    const canvasDimensions = useMemo(() => ({
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.8,
    }), []);

    // Memoize simulation boundaries
    const simulationBoundaries = useMemo<Boundaries>(() => ({
        left: -canvasDimensions.width / 2,
        right: canvasDimensions.width / 2,
        top: -canvasDimensions.height / 2,
        bottom: canvasDimensions.height / 2,
        elasticity: 0.9,
    }), [canvasDimensions.width, canvasDimensions.height]);

    // Set boundaries when they change
    useMemo(() => {
        simulation.setBoundaries(simulationBoundaries);
    }, [simulation, simulationBoundaries]);

    // Memoize render options to prevent unnecessary re-renders
    const renderOptions = useMemo<SimulationRenderOptions>(() => ({
        showGrid,
        showVectors
    }), [showGrid, showVectors]);

    // Hook into simulation rendering
    useSimulation({
        running,
        canvasRef,
        simulation,
        canvasDimensions,
        renderOptions,
        updateTrigger
    });

    // Event handlers using useCallback to prevent unnecessary re-renders
    const toggleRunning = useCallback(() => {
        setRunning((prev) => !prev);
    }, []);

    const toggleGrid = useCallback(() => {
        setShowGrid((prev) => !prev);
    }, []);

    const toggleVectors = useCallback(() => {
        setShowVectors((prev) => !prev);
    }, []);

    const addRandomParticle = useCallback(() => {
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
        simulation.addParticle(
            new ChargedParticle(
                new Vector2D(posX, posY),
                new Vector2D(velX, velY),
                mass,
                charge
            )
        );

        // Update particle count and trigger re-render
        setParticleCount(simulation.getParticles().length);
        setUpdateTrigger(prev => !prev);
    }, [simulation, canvasDimensions.width, canvasDimensions.height]);

    const clearParticles = useCallback(() => {
        // Reset the simulation
        simulation.getParticles().forEach(p => simulation.removeParticle(p));
        setParticleCount(0);
        setUpdateTrigger(prev => !prev);
    }, [simulation]);

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
            <SimulationStats
                particleCount={particleCount}
                isRunning={running}
            />

            {/* Controls panel */}
            <SimulationControls
                running={running}
                onToggleRunning={toggleRunning}
                onAddParticle={addRandomParticle}
                onClearParticles={clearParticles}
                showGrid={showGrid}
                onToggleGrid={toggleGrid}
                showVectors={showVectors}
                onToggleVectors={toggleVectors}
            />
        </div>
    );
}