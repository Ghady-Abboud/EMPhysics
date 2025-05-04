import { useEffect } from "react";
import { SimulationSpace } from "../Physics/Simulation/SimulationSpace";
import { renderFrame } from "../utils/Canvas/Render";

export interface SimulationViewProps {
    running: boolean;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    simulation: SimulationSpace;
    canvasDimensions: {
        width: number;
        height: number;
    };
    showVectors: boolean;
}

export const useSimulation = (props: SimulationViewProps) => {
    const {
        running,
        canvasRef,
        simulation,
        canvasDimensions,
        showVectors
    } = props;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = canvasDimensions.width;
        canvas.height = canvasDimensions.height;

        let animationId: number | null = null;

        if (running) {
            const animate = () => {
                simulation.update(0.016); // ~60fps
                renderFrame(ctx, canvas, simulation, showVectors);
                animationId = requestAnimationFrame(animate);
            };
            animate();
        } else {
            // Even when not running, render the current state
            renderFrame(ctx, canvas, simulation, showVectors);
        }

        return () => {
            if (animationId !== null) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [
        running,
        canvasRef,
        simulation,
        canvasDimensions,
        showVectors,
        simulation.getParticles().length
    ]);
};