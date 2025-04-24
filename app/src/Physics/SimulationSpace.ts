import { ChargedParticle } from "./ChargedParticle";
import { Vector2D } from "./Vector2D";
import { calculateNetElectricForce } from "./Funcs";

type Boundaries = {
    left: number | undefined,
    right: number | undefined,
    top: number | undefined,
    bottom: number | undefined,
    elasticity: number | undefined,

};
export class SimulationSpace {
    private particles: ChargedParticle[] = [];
    private charge: ChargedParticle = new ChargedParticle(new Vector2D(0, 0), new Vector2D(0, 0), 1, 1e-6);
    private boundaries: Boundaries = {
        left: undefined,
        right: undefined,
        top: undefined,
        bottom: undefined,
        elasticity: undefined,
    }
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

    public setBoundaries(boundaries: Boundaries): void {
        this.boundaries = {
            left: boundaries.left,
            right: boundaries.right,
            top: boundaries.top,
            bottom: boundaries.bottom,
            elasticity: boundaries.elasticity,
        }
    }

    public getBoundaries(): Boundaries {
        return { ...this.boundaries };
    }

    private enforceBoundaries(): void {
        const { left, right, top, bottom, elasticity } = this.boundaries;

        if (left === undefined || right === undefined || top === undefined || bottom === undefined) {
            return;
        }

        for (const particle of this.particles) {
            const pos = particle.getPosition();
            const vel = particle.getVelocity();

            let x = pos.getX();
            let y = pos.getY();
            let vx = vel.getX();
            let vy = vel.getY();
            let changed: Boolean = false;

            // Check boundaries
            if (x < left) {
                x = left;
                vx = -vx * elasticity!;
                changed = true;
            } else if (x > right) {
                x = right;
                vx = -vx * elasticity!;
                changed = true;
            }

            if (y < top) {
                y = top;
                vy = -vy * elasticity!;
                changed = true;
            } else if (y > bottom) {
                y = bottom;
                vy = -vy * elasticity!;
                changed = true;
            }


            if (changed) {
                particle.setPosition(new Vector2D(x, y));
                particle.setVelocity(new Vector2D(vx, vy));
            }
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

        this.enforceBoundaries();
    }
}