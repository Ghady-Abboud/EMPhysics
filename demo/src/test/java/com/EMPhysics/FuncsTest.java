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


    List<ChargedParticle> particles;
    @BeforeEach
    public void setUp() {
        particles = new ArrayList<>();
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
    public void test_net_electric_field_list_is_empty() {
        Vector2D field = Funcs.calculateNetElectricField(new Vector2D(5, 5), particles);
        
        assertEquals(0, field.getX(), 1e-10);
        assertEquals(0, field.getY(), 1e-10);
    }

    @Test
    public void test_calculate_electric_field_single_point() {
        particles.add(positiveCharge);
        double electricFieldMagnitude = Funcs.calculateNetElectricField(new Vector2D(1, 0), particles).magnitude();
        assertEquals(PhysicsConstants.COULOMB_CONSTANT * 1.0e-6, electricFieldMagnitude, 10);
    }

}
