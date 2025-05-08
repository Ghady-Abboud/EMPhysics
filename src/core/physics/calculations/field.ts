import { Vector2D } from '../Vector2D';
import { ChargedParticle } from '../ChargedParticle';
import { constants } from '../Constants';


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