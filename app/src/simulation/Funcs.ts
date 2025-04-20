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

export function calculateNetElectricField(targetParticle: ChargedParticle, otherParticles: ChargedParticle[]): Vector2D {
    let netField = new Vector2D(0, 0);
    for (const particle of otherParticles) {
        if (particle == targetParticle) continue;

        const direction: Vector2D = particle.getPosition().subtract(targetParticle.getPosition());
        const distance: number = direction.magnitude();
        const forceMagnitude = (constants.k * targetParticle.getCharge() * particle.getCharge()) / (distance * distance);

        const unitVector: Vector2D = direction.normalize().scalar_multiply(forceMagnitude);

        netField = netField.add(unitVector);
    }
    return netField;
}