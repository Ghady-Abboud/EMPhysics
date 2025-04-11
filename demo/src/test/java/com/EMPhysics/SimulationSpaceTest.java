package com.EMPhysics;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class SimulationSpaceTest {

    SimulationSpace simSpace;
    ChargedParticle fixedParticle;
    ChargedParticle movingParticle;

    @BeforeEach
    public void setUp() {
        simSpace = new SimulationSpace(100, 100, 0.01);
        fixedParticle = new ChargedParticle(new Vector2D(50, 50),new Vector2D(0, 0),1, 1e-6);
        movingParticle = new ChargedParticle(new Vector2D(40, 50), new Vector2D(0, 0), 1, 1e-6);
    }

    @Test
    public void test_add_particle() {
        simSpace.addParticle(fixedParticle);

        assertEquals(1, simSpace.getParticles().size());
    }

    @Test
    public void test_remove_particle() {
        simSpace.addParticle(fixedParticle);
        assertEquals(1, simSpace.getParticles().size());

        simSpace.removeParticle(fixedParticle);
        assertEquals(0, simSpace.getParticles().size());
    }
    
    @Test
    public void test_get_particles_returns_copy() {
        simSpace.addParticle(fixedParticle);
        
        // Get particles list and try to modify it
        List<ChargedParticle> particles = simSpace.getParticles();
        particles.add(movingParticle);
        
        // The simulation's internal list should be unchanged
        assertEquals(1, simSpace.getParticles().size());
    }
    
    @Test
    public void test_boundaries_enabled_by_default() {
        assertTrue(simSpace.getBoundariesEnabled());
    }
    
    @Test
    public void test_set_boundaries_enabled() {
        simSpace.setBoundariesEnabled(false);
        assertFalse(simSpace.getBoundariesEnabled());
    }

    @Test
    public void test_update_fixed_particle_does_not_move() {
        simSpace.addParticle(fixedParticle);
        
        Vector2D initialPosition = new Vector2D(fixedParticle.getPosition().getX(), fixedParticle.getPosition().getY());
        
        simSpace.update();
        
        assertEquals(initialPosition.getX(), fixedParticle.getPosition().getX());
        assertEquals(initialPosition.getY(), fixedParticle.getPosition().getY());
    }
    
}
