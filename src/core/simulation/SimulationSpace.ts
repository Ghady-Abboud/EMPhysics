import { ChargedParticle } from "../physics/ChargedParticle";
import { calculateNetElectricForce } from "../physics/calculations/force";
import { BoundaryManager, Boundaries } from "./BoundaryManager";

export class SimulationSpace {
    private particles: ChargedParticle[] = [];
    private boundaryManager: BoundaryManager | null = null;

    constructor() {
        this.boundaryManager = null;
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

    public setBoundaries(boundaries: Boundaries): void {
        if (!this.boundaryManager) {
            this.boundaryManager = new BoundaryManager(boundaries);
        } else {
            this.boundaryManager.setBoundaries(boundaries);
        }
    }

    public getBoundaries(): Boundaries | null {
        return this.boundaryManager ? this.boundaryManager.getBoundaries() : null;
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

        if (this.boundaryManager) {
            this.boundaryManager.enforceBoundaries(this.particles);
        }
    }
}