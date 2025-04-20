import { ChargedParticle } from "./ChargedParticle";
import { Vector2D } from "./Vector2D";
import { calculateNetElectricForce } from "./Funcs";

export class SimulationSpace {
    private particles: ChargedParticle[] = [];
    private charge: ChargedParticle = new ChargedParticle(new Vector2D(0, 0), new Vector2D(0, 0), 1, 1e-6);

    constructor() {
        this.particles.push(this.charge);
    }

    public getParticles(): ChargedParticle[] {
        return this.particles;
    }

    public addParticle(particle: ChargedParticle): void {
        this.particles.push(particle);
    }

    public removeParticle(particle: ChargedParticle): void {
        const index = this.particles.indexOf(particle);
        if (index > -1) {
            this.particles.splice(index, 1);
        }
    }

    public update(deltaTime: number): void {
        for (const particle of this.particles) {
            const netForce = calculateNetElectricForce(particle, this.particles);
            const acceleration = netForce.scalar_multiply(1 / particle.getMass());
            particle.updateVelocity(acceleration, deltaTime);
        }

        for (const particle of this.particles) {
            particle.updatePosition(deltaTime);
        }
    }
}