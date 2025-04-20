import { useEffect, useRef } from "react";
import { SimulationSpace } from "../Physics/SimulationSpace";

const sim = new SimulationSpace();


export default function SimulationCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight;

        const render = () => {
            sim.update(0.016); // Assuming 60 FPS so deltaTime is 1/60

            ctx?.clearRect(0, 0, canvas.width, canvas.height);

            for (const p of sim.getParticles()) {
                const pos = p.getPosition();
                ctx.beginPath();
                ctx.arc(pos.getX() + canvas.width / 2, pos.getY() + canvas.height / 2, 5, 0, Math.PI * 2);
                ctx.fillStyle = p.getCharge() > 0 ? "red" : "blue";
                ctx.fill();
            }
            requestAnimationFrame(render);
        };
        render();
    }, []);

    return <canvas ref={canvasRef} style={{ border: "1px solid black" }} />;
}