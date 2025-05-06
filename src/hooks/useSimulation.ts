import { useEffect, useRef } from "react";
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

    const animationIdRef = useRef<number | null>(null);
    const particleCountRef = useRef<number>(simulation.getParticles().length);


    // Physics simulation loop
    useEffect(() => {
        if (!running) { return };

        const runSimulationLoop = () => {
            simulation.update(0.016); // ~60fps
            animationIdRef.current = requestAnimationFrame(runSimulationLoop);
        };
        runSimulationLoop();

        return () => {
            if (animationIdRef.current !== null) {
                cancelAnimationFrame(animationIdRef.current);
                animationIdRef.current = null;
            }
        };
    }, [
        running,
        simulation
    ]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = canvasDimensions.width;
        canvas.height = canvasDimensions.height;

        renderFrame(ctx, canvas, simulation, showVectors);

        if (running) {
            const renderLoop = () => {
                renderFrame(ctx, canvas, simulation, showVectors)
                requestAnimationFrame(renderLoop);
            };

            const renderId = requestAnimationFrame(renderLoop);
            return () => cancelAnimationFrame(renderId);
        }

        const particleCount = simulation.getParticles().length;
        particleCountRef.current = particleCount;

    }, [canvasRef, simulation, running, showVectors])

    useEffect(() => {
        if (running) return;

        const checkParticleChangesOnPause = () => {
            const currentCount = simulation.getParticles().length;
            if (currentCount !== particleCountRef.current) {
                particleCountRef.current = currentCount;
            }
        }

        renderFrame(canvasRef.current?.getContext("2d")!, canvasRef.current!, simulation, showVectors)

        const intervalId = setInterval(checkParticleChangesOnPause, 1000 / 60);
        return () => {
            clearInterval(intervalId);
        }
    }, [running, simulation, canvasRef, showVectors])
};