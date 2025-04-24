import { useRef, useState } from "react";
import { SimulationSpace } from "../Physics/SimulationSpace";
import { useSimulation } from "../hooks/useSimulation";
import { ChargedParticle } from "../Physics/ChargedParticle";
import { Vector2D } from "../Physics/Vector2D";

const sim = new SimulationSpace();

export default function SimulationCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(undefined) as React.RefObject<HTMLCanvasElement>;
    const [running, setRunning] = useState<boolean>(false);

    // const [fps, setFps] = useState<number>(0);

    // const frameCountRef = useRef<number>(0);
    // const lastTimeRef = useRef<number>(0);

    const canvasDimensions = {
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.99,
    }
    sim.setBoundaries({
        left: -canvasDimensions.width / 2,
        right: canvasDimensions.width / 2,
        top: -canvasDimensions.height / 2,
        bottom: canvasDimensions.height / 2,
        elasticity: 0.9,
    });

    useSimulation(running, canvasRef, sim, canvasDimensions);

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
            <button onClick={() => {
                sim.addParticle(new ChargedParticle(new Vector2D(10, 0), new Vector2D(7, 4), 1, 10e-6));
            }} style={{ position: "absolute", top: 50, right: 10 }}>
                Add Particle
            </button>
        </div>
    )
}