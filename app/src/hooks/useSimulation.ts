import { useEffect } from "react";
import { SimulationDeps } from "../components/SimulationCanvas";

export const useSimulation = (simulationDeps: SimulationDeps) => {
    useEffect(() => {
        const canvas = simulationDeps.canvasRef.current!;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = simulationDeps.canvasDimensions.width as number;
        canvas.height = simulationDeps.canvasDimensions.height as number;

        // Draw coordinate grid
        const drawGrid = () => {
            const gridSize = 50; // Distance between grid lines
            ctx.strokeStyle = "rgba(200, 200, 200, 0.3)";
            ctx.lineWidth = 1;

            // Draw horizontal grid lines
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Draw vertical grid lines
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            // Draw axes with different color
            ctx.strokeStyle = "rgba(100, 100, 100, 0.5)";
            ctx.lineWidth = 2;

            // X-axis
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);
            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();

            // Y-axis
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, 0);
            ctx.lineTo(canvas.width / 2, canvas.height);
            ctx.stroke();
        };

        const renderFrame = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw grid first (below particles)
            drawGrid();

            // Draw particles
            for (const p of simulationDeps.sim.getParticles()) {
                const pos = p.getPosition();
                const charge = p.getCharge();
                const mass = p.getMass();

                // Calculate radius based on mass (min 5px)
                const radius = 5 + mass * 2;

                // Draw particle
                ctx.beginPath();
                ctx.arc(
                    pos.getX() + canvas.width / 2,
                    pos.getY() + canvas.height / 2,
                    radius, 0, Math.PI * 2
                );

                // Fill based on charge
                ctx.fillStyle = charge > 0 ? "rgba(255, 50, 50, 0.8)" : "rgba(50, 50, 255, 0.8)";
                ctx.fill();

                // Add border
                ctx.lineWidth = 1;
                ctx.strokeStyle = "#333";
                ctx.stroke();

                // Draw velocity vector
                const vel = p.getVelocity();
                const velMagnitude = Math.sqrt(vel.getX() ** 2 + vel.getY() ** 2);
                if (velMagnitude > 0) {
                    const scale = 5; // Scale factor for velocity vectors
                    const arrowX = pos.getX() + canvas.width / 2 + vel.getX() * scale;
                    const arrowY = pos.getY() + canvas.height / 2 + vel.getY() * scale;

                    ctx.beginPath();
                    ctx.moveTo(pos.getX() + canvas.width / 2, pos.getY() + canvas.height / 2);
                    ctx.lineTo(arrowX, arrowY);
                    ctx.strokeStyle = charge > 0 ? "rgb(200, 0, 0)" : "rgb(0, 0, 200)";
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    // Arrow head
                    const headSize = 5;
                    const angle = Math.atan2(vel.getY(), vel.getX());
                    ctx.beginPath();
                    ctx.moveTo(arrowX, arrowY);
                    ctx.lineTo(
                        arrowX - headSize * Math.cos(angle - Math.PI / 6),
                        arrowY - headSize * Math.sin(angle - Math.PI / 6)
                    );
                    ctx.lineTo(
                        arrowX - headSize * Math.cos(angle + Math.PI / 6),
                        arrowY - headSize * Math.sin(angle + Math.PI / 6)
                    );
                    ctx.closePath();
                    ctx.fillStyle = charge > 0 ? "rgb(200, 0, 0)" : "rgb(0, 0, 200)";
                    ctx.fill();
                }
            }
        };

        let animationId: number | null = null;

        if (simulationDeps.running) {
            const animate = () => {
                simulationDeps.sim.update(0.016);
                renderFrame();
                animationId = requestAnimationFrame(animate);
            };
            animate();
        } else {
            // This is key - when not running, still render whenever state changes
            renderFrame();
        }

        return () => {
            if (animationId !== null) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [
        simulationDeps.running,
        simulationDeps.canvasRef,
        simulationDeps.sim,
        simulationDeps.updateCanvas,
        simulationDeps.sim.getParticles().length
    ]);
};