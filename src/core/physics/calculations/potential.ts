import { ChargedParticle } from '../ChargedParticle';
import { constants } from '../Constants';

export function calculateElectricPotential(targetParticle: ChargedParticle, otherParticles: ChargedParticle[]): number {
    let potential = 0;
    for (const particle of otherParticles) {
        if (particle === targetParticle) continue;

        const distance: number = particle.getPosition().subtract(targetParticle.getPosition()).magnitude();
        potential += (constants.k * particle.getCharge()) / distance;
    }
    return potential;
}