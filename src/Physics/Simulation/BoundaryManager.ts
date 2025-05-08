import { ChargedParticle } from "../ChargedParticle";
import { Vector2D } from "../Vector2D";


export interface Boundaries {
    left: number;
    right: number;
    top: number;
    bottom: number;
    elasticity: number;
}

export class BoundaryManager {
    private boundaries: Boundaries;

    constructor(boundaries: Boundaries) {
        this.boundaries = {
            left: boundaries.left,
            right: boundaries.right,
            top: boundaries.top,
            bottom: boundaries.bottom,
            elasticity: boundaries.elasticity,
        }
    }

    public setBoundaries(boundaries: Boundaries): void {
        this.boundaries = {
            ...this.boundaries,
            ...boundaries,
        }
    }

    public getBoundaries(): Boundaries {
        return {
            ...this.boundaries
        }
    }

    public enforceBoundaries(particles: ChargedParticle[]): void {
        particles.forEach(particle => {
            this.enforceParticleBoundary(particle);
        });
    }

    private enforceParticleBoundary(particle: ChargedParticle): void {
        const { left, right, top, bottom, elasticity } = this.boundaries;

        if (left === undefined || right === undefined || top === undefined || bottom === undefined) {
            return;
        }

        const pos = particle.getPosition();
        const vel = particle.getVelocity();

        let x = pos.getX();
        let y = pos.getY();
        let vx = vel.getX();
        let vy = vel.getY();
        let changed: Boolean = false;

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