import { useEffect, useRef, useState } from "react";
import { SimulationSpace } from "../Physics/SimulationSpace";

const sim = new SimulationSpace();

export default function SimulationCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [running, setRunning] = useState<boolean>(false);

    const [fps, setFps] = useState<number>(0);

    // const frameCountRef = useRef<number>(0);
    // const lastTimeRef = useRef<number>(0);

    useEffect(() => {

        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.99;

        const renderFrame = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const p of sim.getParticles()) {
                const pos = p.getPosition();
                ctx.beginPath();
                ctx.arc(pos.getX() + canvas.width / 2, pos.getY() + canvas.height / 2, 5, 0, Math.PI * 2);
                ctx.fillStyle = p.getCharge() > 0 ? "red" : "blue";
                ctx.fill();
            }
        }

        let animationId: number | null = null;
        if (running) {
            const animate = (/*timstamp:number*/) => {

                /*
                frameCountRef.current++;
                if (timestamp - lastTimeRef.current >= 1000) {
                    setFps(frameCountRef.current);
                    frameCountRef.current = 0;
                    lastTimeRef.current = timestamp;
                }
                */
                sim.update(0.016);
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
    }, [running]);

    const toggleRunning = () => {
        setRunning((prev) => !prev);
    }

    return (
        <div>
            {/* 
            <div style={{ position: "absolute", top: 20, right: 10, background: "rgba(255,255,255,0.7)", padding: 5 }}>
                <p>FPS: {fps}</p>
                <p>Particles: {sim.getParticles().length}</p>
            </div>
            */}
            <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
            <button onClick={toggleRunning} style={{ position: "absolute", top: 10, right: 10 }}>
                {running ? "Stop" : "Start"}
            </button>
        </div>
    )
}