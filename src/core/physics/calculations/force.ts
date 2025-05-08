import { Vector2D } from "../Vector2D";
import { ChargedParticle } from "../ChargedParticle";
import { constants } from "../Constants";

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