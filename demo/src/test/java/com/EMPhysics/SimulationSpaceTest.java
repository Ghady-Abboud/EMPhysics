package com.EMPhysics;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class SimulationSpaceTest {

    SimulationSpace simSpace;
    ChargedParticle particle;

    @BeforeEach
    public void setUp() {
        simSpace = new SimulationSpace(100, 100, 0.01);
        particle = new ChargedParticle(new Vector2D(0, 0), new Vector2D(1, 0), 1, 1);

    }

    @Test
    public void test_add_particle() {
        simSpace.addParticle(particle);

        assertEquals(1,simSpace.getParticles().size());
    }

    @Test
    public void test_remove_particle() {
        simSpace.addParticle(particle);
        assertEquals(simSpace.getParticles().size(), 1);

        simSpace.removeParticle(particle);
        assertEquals(simSpace.getParticles().size(), 0);
    }
}
