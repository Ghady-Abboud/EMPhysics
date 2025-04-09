package com.EMPhysics;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;

public class FuncsTest {

    ChargedParticle positiveCharge;
    ChargedParticle negativeCharge;
    ChargedParticle secondPositiveCharge;

    @BeforeEach
    public void setUp() {
        positiveCharge = new ChargedParticle(new Vector2D(0, 0), new Vector2D(0, 0), 10, 1.0e-6);
        negativeCharge = new ChargedParticle(new Vector2D(2, 0), new Vector2D(0, 0), 10, -1.0e-6);
        secondPositiveCharge = new ChargedParticle(new Vector2D(0, 2), new Vector2D(0, 0), 10, 1.0e-6);
    }

    @Test
    public void test_coulomb_law() {
        double forceMagnitude = Funcs.coulombLaw(positiveCharge, new ChargedParticle(
                new Vector2D(1, 0), new Vector2D(0, 0), 10, 1.0e-6));
        assertEquals(8.99e-3, forceMagnitude, 1e-5);
    }

    @Test
    public void test_calculate_electric_potential() {
        double electricPotential = Funcs.calculateElectricPotential(new Vector2D(1, 0), positiveCharge);
        assertEquals(8.99e3, electricPotential, 10);
    }

    @Test
    public void test_calculate_electric_field_single_point() {
        double electricFieldMagnitude = Funcs.calculateElectricFieldSinglePoint(new Vector2D(1, 0), positiveCharge);
        assertEquals(PhysicsConstants.COULOMB_CONSTANT * 1.0e-6, electricFieldMagnitude, 10);
    }

    @Test
    public void test_net_electric_field_empty_list() {
        List<ChargedParticle> particles = new ArrayList<>();
        Vector2D field = Funcs.calculateNetElectricField(new Vector2D(5, 5), particles);
        
        assertEquals(0, field.getX(), 1e-10);
        assertEquals(0, field.getY(), 1e-10);
    }

    @Test
    public void test_net_electric_field_single_particle_magnitude() {
        List<ChargedParticle> particles = new ArrayList<>();
        particles.add(positiveCharge);
        
        Vector2D field = Funcs.calculateNetElectricField(new Vector2D(1, 0), particles);
        double expectedMagnitude = Funcs.calculateElectricFieldSinglePoint(new Vector2D(1, 0), positiveCharge);
        
        assertEquals(expectedMagnitude, field.magnitude(), 1e-10);
    }

    @Test
    public void test_net_electric_field_single_particle_direction() {
        List<ChargedParticle> particles = new ArrayList<>();
        particles.add(positiveCharge);
        
        Vector2D field = Funcs.calculateNetElectricField(new Vector2D(1, 0), particles);
        
        assertEquals(field.magnitude(), field.getX(), 1e-10); // Field points along x-axis
        assertEquals(0, field.getY(), 1e-10);
    }

    @Test
    public void test_net_electric_field_two_positive_charges_not_equidistant_not_same_charge() {
        List<ChargedParticle> particles = new ArrayList<>();
        particles.add(positiveCharge);
        particles.add(secondPositiveCharge);
        
        Vector2D field = Funcs.calculateNetElectricField(new Vector2D(2, 4), particles);
        
        assertTrue(field.getX() > 0);
        assertTrue(field.getY() > 0);
    }

    @Test
    public void test_net_electric_field_dipole_midpoint() {
        List<ChargedParticle> particles = new ArrayList<>();
        particles.add(positiveCharge);
        particles.add(negativeCharge);
        
        // At midpoint between opposite charges, fields should cancel
        Vector2D field = Funcs.calculateNetElectricField(new Vector2D(1, 0), particles);
        
        assertEquals(0, field.getX(), 1e-10);
        assertEquals(0, field.getY(), 1e-10);
    }

    @Test
    public void test_net_electric_field_dipole_off_axis() {
        List<ChargedParticle> particles = new ArrayList<>();
        particles.add(positiveCharge);
        particles.add(negativeCharge);
        
        // At point (1,2), field should point mainly upward (positive y)
        Vector2D field = Funcs.calculateNetElectricField(new Vector2D(1, 2), particles);
        
        assertTrue(field.getY() > 0);
    }
}
