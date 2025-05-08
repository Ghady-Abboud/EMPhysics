import { ChargedParticle } from "../physics/ChargedParticle";
import { calculateNetElectricField } from "../physics/calculations/field";
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
            const netElectricForce = calculateNetElectricForce(particle, this.particles);
            const netElectricFieldVector = calculateNetElectricField(particle.getPosition(), this.particles);
            particle.setElectricField(netElectricFieldVector);
            const acceleration = netElectricForce.scalar_multiply(particle.getCharge() / particle.getMass());
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