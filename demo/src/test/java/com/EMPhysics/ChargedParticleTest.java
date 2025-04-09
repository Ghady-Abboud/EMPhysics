package com.EMPhysics;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;

public class ChargedParticleTest {
    
    ChargedParticle movingParticle;
    ChargedParticle fixedParticle;

    @BeforeEach
    public void setUp() {
        movingParticle = new ChargedParticle(new Vector2D(0,0), new Vector2D(1, 2), 10, 1);
        fixedParticle = new ChargedParticle(new Vector2D(5,5), 10, 2, true);
    }

    @Test
    public void test_movable_particle_constructor() {
        assertEquals(new Vector2D(0, 0).getX(), movingParticle.getPosition().getX());
        assertEquals(new Vector2D(0, 0).getY(), movingParticle.getPosition().getY());
    }
    
    @Test
    public void test_movable_particle_velocity() {
        assertEquals(new Vector2D(1, 2).getX(), movingParticle.getVelocity().getX());
        assertEquals(new Vector2D(1, 2).getY(), movingParticle.getVelocity().getY());
    }

    @Test
    public void test_movable_particle_properties() {
        assertEquals(10, movingParticle.getMass());
        assertEquals(1, movingParticle.getCharge());
        assertFalse(movingParticle.getFixed());
    }
    
    @Test
    public void test_fixed_particle_constructor() {
        assertEquals(new Vector2D(5, 5).getX(), fixedParticle.getPosition().getX());
        assertEquals(new Vector2D(5, 5).getY(), fixedParticle.getPosition().getY());
    }
    
    @Test
    public void test_fixed_particle_properties() {
        assertEquals(10, fixedParticle.getMass());
        assertEquals(2, fixedParticle.getCharge());
        assertTrue(fixedParticle.getFixed());
    }
    
    @Test
    public void test_fixed_particle_velocity() {
        // Fixed particles should have zero velocity
        assertEquals(0, fixedParticle.getVelocity().getX());
        assertEquals(0, fixedParticle.getVelocity().getY());
    }

    @Test
    public void test_position_setter() {
        Vector2D newPosition = new Vector2D(3, 4);
        movingParticle.setPosition(newPosition);
        
        assertEquals(3, movingParticle.getPosition().getX());
        assertEquals(4, movingParticle.getPosition().getY());
    }
    
    @Test
    public void test_velocity_setter() {
        Vector2D newVelocity = new Vector2D(5, 6);
        movingParticle.setVelocity(newVelocity);
        
        assertEquals(5, movingParticle.getVelocity().getX());
        assertEquals(6, movingParticle.getVelocity().getY());
    }
    
    @Test
    public void test_property_setters() {
        movingParticle.setMass(20);
        movingParticle.setCharge(2);
        movingParticle.setFixed(true);
        
        assertEquals(20, movingParticle.getMass());
        assertEquals(2, movingParticle.getCharge());
        assertTrue(movingParticle.getFixed());
    }
    
    @Test
    public void test_update_position_for_movable_particle() {
        movingParticle.setVelocity(new Vector2D(10, 0));
        movingParticle.updatePosition(0.5); // Move for half a second
        
        assertEquals(5, movingParticle.getPosition().getX()); // Should have moved 5 units (10 * 0.5)
        assertEquals(0, movingParticle.getPosition().getY());
    }
    
    @Test
    public void test_update_position_for_fixed_particle() {
        Vector2D initialPosition = new Vector2D(fixedParticle.getPosition().getX(), fixedParticle.getPosition().getY());
        fixedParticle.setVelocity(new Vector2D(10, 0)); // Try to set velocity
        fixedParticle.updatePosition(0.5); // Try to move
        
        // Position should not change
        assertEquals(initialPosition.getX(), fixedParticle.getPosition().getX());
        assertEquals(initialPosition.getY(), fixedParticle.getPosition().getY());
    }
    
    @Test
    public void test_update_velocity() {
        Vector2D acceleration = new Vector2D(2, 0);
        movingParticle.setVelocity(new Vector2D(1, 0));
        movingParticle.updateVelocity(acceleration, 0.5); // Apply acceleration for half a second
        
        assertEquals(2, movingParticle.getVelocity().getX()); // Should be 1 + (2 * 0.5) = 2
        assertEquals(0, movingParticle.getVelocity().getY());
    }
    
    @Test
    public void test_update_velocity_for_fixed_particle() {
        Vector2D acceleration = new Vector2D(2, 0);
        fixedParticle.updateVelocity(acceleration, 0.5); // Try to accelerate
        
        // Velocity should remain zero
        assertEquals(0, fixedParticle.getVelocity().getX());
        assertEquals(0, fixedParticle.getVelocity().getY());
    }
}
