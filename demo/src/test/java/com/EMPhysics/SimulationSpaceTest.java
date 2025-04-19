package com.EMPhysics;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class SimulationSpaceTest {

    SimulationSpace simSpace;
    ChargedParticle charge2;

    @BeforeEach
    public void setUp() {
        simSpace = new SimulationSpace();
        charge2 = new ChargedParticle(new Vector2D(0, 0), new Vector2D(0, 0), 10, 1e-6);
    }
    @Test
    public void simulation_space_created_with_one_charge_by_default() {
        assertEquals(1, simSpace.getCharges().size());
    }

    @Test
    public void simulation_space_correctly_retrieves_all_charges() {
        simSpace.addCharge(charge2);

        assertEquals(2, simSpace.getCharges().size());
    }

    @Test
    public void simulation_space_correctly_adds_charge() {
        simSpace.addCharge(charge2);

        assertEquals(2, simSpace.getCharges().size());
    }

    @Test
    public void simulation_space_correctly_removes_charge() {
        simSpace.addCharge(charge2);
        simSpace.removeCharge(charge2);

        assertEquals(1, simSpace.getCharges().size());
    }

    @Test
    public void simulation_space_correctly_updates_particle_velocity_and_position() {
        ChargedParticle randomCharge = new ChargedParticle(new Vector2D(1, 0), new Vector2D(0, 0), 10, 1e-6);
        simSpace.addCharge(randomCharge);
        double initialX = randomCharge.getPosition().getX();

        simSpace.update(0.1);

        assertTrue(initialX >= randomCharge.getPosition().getX());
    }
}
