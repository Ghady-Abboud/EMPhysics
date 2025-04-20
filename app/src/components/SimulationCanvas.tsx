import { useEffect, useRef, useState } from "react";
import { SimulationSpace } from "../Physics/SimulationSpace";
import { Vector2D } from "../Physics/Vector2D";

const sim = new SimulationSpace();

export default function SimulationCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const runningRef = useRef<boolean>(false);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.99;

        const render = () => {
            if (!runningRef.current) {
                sim.update(0.016); // Assuming 60 FPS so deltaTime is 1/60
            }

            ctx?.clearRect(0, 0, canvas.width, canvas.height);

            for (const p of sim.getParticles()) {
                const pos = p.getPosition();
                p.setVelocity(new Vector2D(12, 0));
                ctx.beginPath();
                ctx.arc(pos.getX() + canvas.width / 2, pos.getY() + canvas.height / 2, 5, 0, Math.PI * 2);
                ctx.fillStyle = p.getCharge() > 0 ? "red" : "blue";
                ctx.fill();
            }
            animationRef.current = requestAnimationFrame(render);
        };
        render();
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        }
    }, []);

    const toggleRunning = () => {
        runningRef.current = !runningRef.current;
    }

    return (
        <div>
            <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
            <button onClick={toggleRunning} style={{ position: "absolute", top: 10, right: 10 }}>
                {runningRef.current ? "Stop" : "Start"}
            </button>
        </div>
    )
}