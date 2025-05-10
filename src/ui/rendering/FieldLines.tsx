import { calculateNetElectricField } from "../../core/physics/calculations/field";
import { ChargedParticle } from "../../core/physics/ChargedParticle";
import { Vector2D } from "../../core/physics/Vector2D";
import { SimulationSpace } from "../../core/simulation/SimulationSpace";

export const drawElectricField = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, simulation: SimulationSpace): void => {
    const particles = simulation.getParticles();

    const gridSize = 50;

    for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
            const simX = x - canvas.width / 2;
            const simY = y - canvas.height / 2;

            drawFieldLine(ctx, canvas, new Vector2D(simX, simY), particles);
        }
    }
}

const drawFieldLine = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, startPoint: Vector2D, particles: ChargedParticle[]): void => {
    let currentPoint = startPoint;
    const stepSize = 10;
    const maxLength = 100;

    ctx.beginPath();
    ctx.moveTo(currentPoint.getX() + canvas.width / 2, currentPoint.getY() + canvas.height / 2);

    /*
    let totalLength = 0;
    while (totalLength < maxLength) {
        const field: Vector2D = calculateNetElectricField(currentPoint, particles);
        const fieldMagnitude = field.magnitude();

        if (fieldMagnitude < 1e-6) break;

        const direction = field.normalize().scalar_multiply(stepSize);
        currentPoint = currentPoint.add(direction);
    }
    */

    ctx.strokeStyle = "rgba(100, 100, 255, 0.5)";
    ctx.lineWidth = 0.5;
    ctx.stroke();
}