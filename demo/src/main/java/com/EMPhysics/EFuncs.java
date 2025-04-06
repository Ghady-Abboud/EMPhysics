package com.EMPhysics;

public class EFuncs {

   public static double calculateElectricField(ChargedParticle particle1, ChargedParticle particle2) {
        Vector2D direction = particle2.getPosition().subtract(particle1.getPosition());
        double distance = direction.magnitude();
        if (distance < 0.0001) {
            return 0;
        } 
        double electricFieldMagnitude = (particle1.getCharge() * particle2.getCharge() * PhysicsConstants.COULOMB_CONSTANT) / (distance * distance); 
        return electricFieldMagnitude;
    } 
}
