package com.EMPhysics;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
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
        double electricFieldMagnitude = Funcs.coulombLaw(particle1,particle2);

        assertEquals(8.99e-3,electricFieldMagnitude,1e-5);

    } 

    @Test
    public void test_calculate_electric_potential() {
        double electricPotential = Funcs.calculateElectricPotential(new Vector2D(1,0), particle1);

        assertEquals(0.008988e6, electricPotential,1);
    }

}
