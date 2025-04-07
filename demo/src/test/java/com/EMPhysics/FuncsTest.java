package com.EMPhysics;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;

public class FuncsTest {

    ChargedParticle particle1;
    ChargedParticle particle2;

    @BeforeEach
    public void setUp() {
        particle1 = new ChargedParticle(new Vector2D(0, 0), new Vector2D(5, 6), 10, 1.0e-6);
        particle2 = new ChargedParticle(new Vector2D(1, 0), new Vector2D(5, 6), 10, 1.0e-6);
    }

    @Test
    public void test_coulomb_law() {
        double electricFieldMagnitude = Funcs.coulombLaw(particle1, particle2);

        assertEquals(8.99e-3, electricFieldMagnitude, 1e-5);

    }

    @Test
    public void test_calculate_electric_potential() {
        double electricPotential = Funcs.calculateElectricPotential(new Vector2D(1, 0), particle1);

        assertEquals(0.008988e6, electricPotential, 1);
    }

    @Test
    public void test_calculate_electric_field_single_point() {
        double electricFieldMagnitude = Funcs.calculateElectricFieldSinglePoint(new Vector2D(1, 0), particle1);

        assertEquals(PhysicsConstants.COULOMB_CONSTANT * 1.0e-6, electricFieldMagnitude, 1);
    }

    @Test
    public void test_calculate_net_electric_field() {
        List<ChargedParticle> particles = new ArrayList<>();

        // Test 1: Empty list should return zero field
        Vector2D field = Funcs.calculateNetElectricField(new Vector2D(5, 5), particles);
        assertEquals(0, field.getY(), 1e-10);
        assertEquals(0, field.getX(), 1e-10);

        // Test 2: Single particle (should match single point function)
        particles.add(particle1);
        field = Funcs.calculateNetElectricField(new Vector2D(1, 0), particles);
        double expectedMagnitude = Funcs.calculateElectricFieldSinglePoint(new Vector2D(1, 0), particle1);
        assertEquals(expectedMagnitude, field.magnitude(), 1e-10);
        assertEquals(expectedMagnitude, field.getX(), 1e-10);
        assertEquals(0, field.getY(), 1e-10);

        // Test 3: Two particles
        ChargedParticle particle3 = new ChargedParticle(new Vector2D(0, 2), new Vector2D(0, 0), 1, 1.0e-6);
        particles.add(particle3);
        field = Funcs.calculateNetElectricField(new Vector2D(1, 1), particles);

        assertTrue(field.getX() > 0);
        assertEquals(0, field.getY(), 1e-10);

        particles.clear();
        particles.add(particle1);
        ChargedParticle negativeCharge = new ChargedParticle(new Vector2D(2, 0), new Vector2D(0, 0), 1, -1.0e-6);
        particles.add(negativeCharge);

        // At the midpoint (1,0), fields should cancel in x-direction
        field = Funcs.calculateNetElectricField(new Vector2D(1, 0), particles);
        assertEquals(0, field.getX(), 1e-10);
        assertEquals(0, field.getY(), 1e-10);

        // At point (1,1), fields should have positive y-component
        field = Funcs.calculateNetElectricField(new Vector2D(1, 1), particles);
        assertTrue(field.getY() > 0);

    }

}
