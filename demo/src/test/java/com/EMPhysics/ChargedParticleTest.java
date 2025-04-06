package com.EMPhysics;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;

public class ChargedParticleTest {
    
    ChargedParticle movingParticle;
    ChargedParticle fixedParticle;

    @BeforeEach
    public void setUp() {
        movingParticle = new ChargedParticle(new Vector2D(1, 2), new Vector2D(5, 6), 10, 1);
        fixedParticle = new ChargedParticle(new Vector2D(1, 2), 10, 1, true);
    }

    @Test
    public void test_charged_particle_default_constructor(){
        movingParticle.getPosition().equals(new Vector2D(1, 2));
        movingParticle.getPosition().equals(new Vector2D(5, 6));

        assertEquals(10, movingParticle.getMass());
        assertEquals(1, movingParticle.getCharge());
        assertFalse(movingParticle.getFixed());
    }

    @Test
    public void test_charged_particle_alternative_constructor(){
        fixedParticle = new ChargedParticle(new Vector2D(1, 2), 10, 1, false);

        fixedParticle.getPosition().equals(new Vector2D(1, 2));
        fixedParticle.getVelocity().equals(new Vector2D(0, 0));
        assertEquals(10, fixedParticle.getMass());
        assertEquals(1, fixedParticle.getCharge());
    }

    @Test
    public void test_charged_particle_setters(){
        fixedParticle.setPosition(new Vector2D(3, 4));
        fixedParticle.setVelocity(new Vector2D(5, 6));
        fixedParticle.setMass(20);
        fixedParticle.setCharge(2);
        fixedParticle.setFixed(false);


        fixedParticle.getPosition().equals(new Vector2D(3, 4));
        fixedParticle.getVelocity().equals(new Vector2D(5, 6));
        assertEquals(20, fixedParticle.getMass());
        assertEquals(2, fixedParticle.getCharge());
        assertFalse(fixedParticle.getFixed()); 
    }
    
}
