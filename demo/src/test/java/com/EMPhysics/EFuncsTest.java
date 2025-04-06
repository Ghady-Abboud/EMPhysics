package com.EMPhysics;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;


public class EFuncsTest {

    ChargedParticle movingParticle;
    ChargedParticle fixedParticle;

    @BeforeEach
    public void setUp() {
        movingParticle = new ChargedParticle(new Vector2D(0, 0), new Vector2D(5, 6), 10, 1.0e-6);
        fixedParticle = new ChargedParticle(new Vector2D(1, 0), 10, 1.0e-6, true);
    }

   @Test
    public void calculate_electric_field_test() {
        double electricFieldMagnitude = EFuncs.calculateElectricField(movingParticle, fixedParticle);

        assertEquals(8.99e-3,electricFieldMagnitude,1e-5);

    } 
}
