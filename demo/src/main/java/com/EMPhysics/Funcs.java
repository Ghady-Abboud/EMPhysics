package com.EMPhysics;

import java.util.List;

public class Funcs {

    // Coulomb's law is a law describing the force between two charged particles
    public static double coulombLaw(ChargedParticle particle1, ChargedParticle particle2) {
        Vector2D direction = particle2.getPosition().subtract(particle1.getPosition());
        double distance = direction.magnitude();
        if (!checkDistanceValid(distance))
            return 0;
        double electricFieldMagnitude = (particle1.getCharge() * particle2.getCharge()
                * PhysicsConstants.COULOMB_CONSTANT) / (distance * distance);
        return electricFieldMagnitude;
    }

    // Calculating the force but with a vector
    public static Vector2D calculateNetElectricForce(ChargedParticle target, List<ChargedParticle> others) {
        Vector2D netForce = new Vector2D(0, 0);
        for (ChargedParticle other : others) {
            if (other == target)
                continue;

            Vector2D direction = other.getPosition().subtract(target.getPosition());
            double distance = direction.magnitude();
            if (!checkDistanceValid(distance))
                continue;

            double forceMagnitude = (target.getCharge() * other.getCharge() * PhysicsConstants.COULOMB_CONSTANT)
                    / (distance * distance);

            Vector2D forceVector = direction.normalize().scalar_multiply(forceMagnitude);
            netForce = netForce.add(forceVector);
        }
        return netForce;
    }

    public static double calculateElectricPotential(Vector2D point, ChargedParticle particle) {
        // particle's charge is the one creating the potential at point's position
        double distance = point.distanceTo(particle.getPosition());
        if (!checkDistanceValid(distance))
            return 0;
        return (particle.getCharge() * PhysicsConstants.COULOMB_CONSTANT) / distance;
    }

    public static Vector2D calculateNetElectricField(Vector2D point,
            List<ChargedParticle> particles) {
        Vector2D netElectricField = new Vector2D(0, 0);
        for (ChargedParticle p : particles) {
            Vector2D direction = point.subtract(p.getPosition());
            double distance = direction.magnitude();

            if (distance < PhysicsConstants.DISTANCE_DELTA)
                continue;

            double fieldMagnitude = (Math.abs(p.getCharge()) *
                    PhysicsConstants.COULOMB_CONSTANT)
                    / (distance * distance);

            Vector2D fieldVector = direction.normalize().scalar_multiply(fieldMagnitude);
            if (p.getCharge() < 0) {
                fieldVector = fieldVector.scalar_multiply(-1);
            }
            netElectricField = netElectricField.add(fieldVector);
        }
        return netElectricField;
    }

    public static boolean checkDistanceValid(double distance) {
        if (distance < PhysicsConstants.DISTANCE_DELTA) {
            return false;
        }
        return true;
    }
}
