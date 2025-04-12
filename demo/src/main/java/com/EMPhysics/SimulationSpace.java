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
}
