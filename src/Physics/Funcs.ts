import { Vector2D } from './Vector2D';
import { ChargedParticle } from './ChargedParticle';
const constants = {
    k: 8.9875517873681764e9, // Coulomb's constant in N m²/C²
    epsilon_0: 8.854187817e-12, // Vacuum permittivity in C²/(N m²)
    e: 1.602176634e-19 // Elementary charge in C
}
export function coulombLaw(p1: ChargedParticle, p2: ChargedParticle): number {
    const distance: number = p2.getPosition().subtract(p1.getPosition()).magnitude();
    const forceMagnitude = (constants.k * p1.getCharge() * p2.getCharge()) / (distance * distance);
    return forceMagnitude;
}


export function calculateNetElectricForce(targetParticle: ChargedParticle, otherParticles: ChargedParticle[]): Vector2D {
    let netField = new Vector2D(0, 0);
    for (const particle of otherParticles) {
        if (particle === targetParticle) continue;

        const direction: Vector2D = targetParticle.getPosition().subtract(particle.getPosition());
        const distance: number = direction.magnitude();
        if (distance < 1e-6) continue;
        const unit = direction.normalize();
        const magnitude = (constants.k * targetParticle.getCharge() * particle.getCharge()) / (distance * distance);

        netField = netField.add(unit.scalar_multiply(magnitude));
    }
    return netField;
}

export function calculateElectricPotential(targetParticle: ChargedParticle, otherParticles: ChargedParticle[]): number {
    let potential = 0;
    for (const particle of otherParticles) {
        if (particle === targetParticle) continue;

        const distance: number = particle.getPosition().subtract(targetParticle.getPosition()).magnitude();
        potential += (constants.k * particle.getCharge()) / distance;
    }
    return potential;
}

export function calculateNetElectricField(point: Vector2D, otherParticles: ChargedParticle[]): Vector2D {
    let netField = new Vector2D(0, 0);
    for (const particle of otherParticles) {
        const direction = point.subtract(particle.getPosition());
        const distance = direction.magnitude();
        if (distance < 1e-6) continue;

        const unit = direction.normalize();
        const magnitude = (constants.k * particle.getCharge()) / (distance * distance);

        netField = netField.add(unit.scalar_multiply(magnitude));
    }
    return netField;
}