import { ChargedParticle } from "../../core/physics/ChargedParticle"
import { SimulationSpace } from "../../core/simulation/SimulationSpace";
import { drawGrid } from "./Grid";

export const renderFrame = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, simulation: SimulationSpace, showVectors: boolean): void => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas);
    // Draw particles
    for (const particle of simulation.getParticles()) {
        renderParticle(particle, ctx, canvas, showVectors);
    }
}

export const renderParticle = (p: ChargedParticle, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, showVectors: boolean): void => {
    const pos = p.getPosition();
    const charge = p.getCharge();
    const mass = p.getMass();
    const electricFieldVector = p.getElectricField();

    const radius = 5 + mass * 2;

    // Draw particle
    ctx.beginPath();
    ctx.arc(
        pos.getX() + canvas.width / 2,
        pos.getY() + canvas.height / 2,
        radius, 0, Math.PI * 2
    );

    ctx.fillStyle = charge > 0 ? "rgba(255, 50, 50, 0.8)" : "rgba(50, 50, 255, 0.8)";
    ctx.fill();

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#333";
    ctx.stroke();

    if (showVectors) {
        const vel = p.getVelocity();
        const velMagnitude = Math.sqrt(vel.getX() ** 2 + vel.getY() ** 2);

        if (velMagnitude > 0) {
            const scale = 5;
            const arrowX = pos.getX() + canvas.width / 2 + vel.getX() * scale;
            const arrowY = pos.getY() + canvas.height / 2 + vel.getY() * scale;

            ctx.beginPath();
            ctx.moveTo(pos.getX() + canvas.width / 2, pos.getY() + canvas.height / 2);
            ctx.lineTo(arrowX, arrowY);
            ctx.strokeStyle = charge > 0 ? "rgb(200, 0, 0)" : "rgb(0, 0, 200)";
            ctx.lineWidth = 2;
            ctx.stroke();

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
}