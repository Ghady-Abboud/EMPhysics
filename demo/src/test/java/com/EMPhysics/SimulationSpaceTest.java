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
        fixedParticle = new ChargedParticle(new Vector2D(50, 50), 1, 1e-6, true);
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
    
    @Test
    public void test_repulsive_force_between_like_charges() {
        // Two positive charges
        ChargedParticle p1 = new ChargedParticle(new Vector2D(40, 50), new Vector2D(0, 0), 1, 1e-6);
        ChargedParticle p2 = new ChargedParticle(new Vector2D(60, 50), new Vector2D(0, 0), 1, 1e-6);
        
        simSpace.addParticle(p1);
        simSpace.addParticle(p2);
        
        // Store initial positions
        Vector2D p1InitialPos = new Vector2D(p1.getPosition().getX(), p1.getPosition().getY());
        Vector2D p2InitialPos = new Vector2D(p2.getPosition().getX(), p2.getPosition().getY());
        
        // Run a few updates
        for (int i = 0; i < 10; i++) {
            simSpace.update();
        }
        
        // p1 should move left (x decreases) and p2 should move right (x increases)
        assertTrue(p1.getPosition().getX() < p1InitialPos.getX());
        assertTrue(p2.getPosition().getX() > p2InitialPos.getX());
    }
    
    @Test
    public void test_attractive_force_between_opposite_charges() {
        // One positive, one negative charge
        ChargedParticle p1 = new ChargedParticle(new Vector2D(40, 50), new Vector2D(0, 0), 1, 1e-6);
        ChargedParticle p2 = new ChargedParticle(new Vector2D(60, 50), new Vector2D(0, 0), 1, -1e-6);
        
        simSpace.addParticle(p1);
        simSpace.addParticle(p2);
        
        // Store initial positions
        Vector2D p1InitialPos = new Vector2D(p1.getPosition().getX(), p1.getPosition().getY());
        Vector2D p2InitialPos = new Vector2D(p2.getPosition().getX(), p2.getPosition().getY());
        
        // Run a few updates
        for (int i = 0; i < 10; i++) {
            simSpace.update();
        }
        
        // p1 should move right (x increases) and p2 should move left (x decreases)
        assertTrue(p1.getPosition().getX() > p1InitialPos.getX());
        assertTrue(p2.getPosition().getX() < p2InitialPos.getX());
    }
    
    @Test
    public void test_boundary_enforcement_x_lower() {
        // Place particle at edge with velocity going out of bounds
        ChargedParticle p = new ChargedParticle(new Vector2D(0.1, 50), new Vector2D(-1, 0), 1, 1e-6);
        simSpace.addParticle(p);
        
        simSpace.update();
        
        // Should be at boundary (x=0) and velocity should have reversed with 10% reduction
        assertEquals(0, p.getPosition().getX(), 0.001);
        assertEquals(0.9, p.getVelocity().getX(), 0.001); // -1 * -0.9 = 0.9
    }
    
    @Test
    public void test_boundary_enforcement_x_upper() {
        // Place particle at edge with velocity going out of bounds
        ChargedParticle p = new ChargedParticle(new Vector2D(99.9, 50), new Vector2D(1, 0), 1, 1e-6);
        simSpace.addParticle(p);
        
        simSpace.update();
        
        // Should be at boundary (x=width=100) and velocity should have reversed with 10% reduction
        assertEquals(100, p.getPosition().getX(), 0.001);
        assertEquals(-0.9, p.getVelocity().getX(), 0.001);
    }
    
    @Test
    public void test_disabled_boundaries() {
        // Disable boundaries
        simSpace.setBoundariesEnabled(false);
        
        // Place particle at edge with velocity going out of bounds
        ChargedParticle p = new ChargedParticle(new Vector2D(99.9, 50), new Vector2D(1, 0), 1, 1e-6);
        simSpace.addParticle(p);
        
        simSpace.update();
        
        // Should move beyond boundary without velocity change
        assertTrue(p.getPosition().getX() > 100);
        assertEquals(1, p.getVelocity().getX(), 0.001);
    }
    
    @Test
    public void test_fixed_particle_influence() {
        // Fixed positive charge
        ChargedParticle fixed = new ChargedParticle(new Vector2D(50, 50), 1, 1e-6, true);
        // Moving positive charge
        ChargedParticle moving = new ChargedParticle(new Vector2D(40, 50), new Vector2D(0, 0), 1, 1e-6);
        
        simSpace.addParticle(fixed);
        simSpace.addParticle(moving);
        
        Vector2D initialPos = new Vector2D(moving.getPosition().getX(), moving.getPosition().getY());
        
        // Run a few updates
        for (int i = 0; i < 5; i++) {
            simSpace.update();
        }
        
        // Fixed particle shouldn't move
        assertEquals(50, fixed.getPosition().getX());
        assertEquals(50, fixed.getPosition().getY());
        
        // Moving particle should be pushed away (to the left)
        assertTrue(moving.getPosition().getX() < initialPos.getX());
    }
}
