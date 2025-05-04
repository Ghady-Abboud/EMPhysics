import { useEffect } from "react";
import { SimulationSpace } from "../Physics/Simulation/SimulationSpace";
import { drawGrid } from "../utils/Grid/drawGrid";
import { renderFrame, renderParticle } from "../utils/Canvas/Render";

export interface SimulationRenderOptions {
    showGrid: boolean;
    showVectors: boolean;
}

export interface SimulationViewProps {
    running: boolean;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    simulation: SimulationSpace;
    canvasDimensions: {
        width: number;
        height: number;
    };
    renderOptions: SimulationRenderOptions;
    updateTrigger: boolean;
}

export const useSimulation = (props: SimulationViewProps) => {
    const {
        running,
        canvasRef,
        simulation,
        canvasDimensions,
        renderOptions,
        updateTrigger
    } = props;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = canvasDimensions.width;
        canvas.height = canvasDimensions.height;

        if (!renderOptions.showGrid) return;
        drawGrid(ctx, canvas);

        let animationId: number | null = null;

        if (running) {
            const animate = () => {
                simulation.update(0.016); // ~60fps
                renderFrame(ctx, canvas, simulation, renderOptions);
                animationId = requestAnimationFrame(animate);
            };
            animate();
        } else {
            // Even when not running, render the current state
            renderFrame(ctx, canvas, simulation, renderOptions);
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
        renderOptions.showGrid,
        renderOptions.showVectors,
        updateTrigger,
        simulation.getParticles().length
    ]);
};