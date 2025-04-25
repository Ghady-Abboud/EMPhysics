import { useEffect } from "react";
import { SimulationDeps } from "../components/SimulationCanvas";

export const useSimulation = (/*running: boolean, canvasRef: React.RefObject<HTMLCanvasElement>, sim: SimulationSpace, canvasDimensions: any*/ simulationDeps: SimulationDeps) => {
    useEffect(() => {

        const canvas = simulationDeps.canvasRef.current!;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = simulationDeps.canvasDimensions.width as number;
        canvas.height = simulationDeps.canvasDimensions.height as number;

        const renderFrame = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const p of simulationDeps.sim.getParticles()) {
                const pos = p.getPosition();
                ctx.beginPath();
                ctx.arc(pos.getX() + canvas.width / 2, pos.getY() + canvas.height / 2, 5, 0, Math.PI * 2);
                ctx.fillStyle = p.getCharge() > 0 ? "red" : "blue";
                ctx.fill();
            }
        }

        let animationId: number | null = null;
        if (simulationDeps.running) {
            const animate = (/*timstamp:number*/) => {

                /*
                frameCountRef.current++;
                if (timestamp - lastTimeRef.current >= 1000) {
                    setFps(frameCountRef.current);
                    frameCountRef.current = 0;
                    lastTimeRef.current = timestamp;
                }
                */
                simulationDeps.sim.update(0.016);
                renderFrame();
                animationId = requestAnimationFrame(animate);
            }
            // animate(performance.now());

            animate();
        } else {
            renderFrame();
        }
        return () => {
            if (animationId !== null) {
                cancelAnimationFrame(animationId);
            }
        }
    }, [simulationDeps.running, simulationDeps.canvasRef, simulationDeps.sim, simulationDeps.updateCanvas]);
}