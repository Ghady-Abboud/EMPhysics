package com.EMPhysics;

import java.util.ArrayList;

public class SimulationSpace {
    private ArrayList<ChargedParticle> charges;
    private ChargedParticle charge = new ChargedParticle(new Vector2D(0, 0), new Vector2D(0, 0), 10, 1e-6);

    
    public SimulationSpace() {
        charges = new ArrayList<>();
        charges.add(charge);
    }

    public ArrayList<ChargedParticle> getCharges() {
        return charges;
    }

    public void addCharge(ChargedParticle charge) {
        charges.add(charge);
    }

    public void removeCharge(ChargedParticle charge) {
        charges.remove(charge);
    }

    public void update(double deltaTime) {
        for (ChargedParticle particle: charges) {
            Vector2D netForce = Funcs.calculateNetElectricForce(particle, charges);

            Vector2D acceleration = netForce.scalar_multiply(1.0 / particle.getMass());
            particle.updateVelocity(acceleration, deltaTime);
        }
        // Update position using new velocity 
        for (ChargedParticle particle: charges) {
            particle.updatePosition(deltaTime);
        }
    }
}
