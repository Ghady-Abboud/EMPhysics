package com.EMPhysics;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;

public class ChargedParticleTest {
    
    ChargedParticle particle;

    @BeforeEach
    public void setUp() {
        particle = new ChargedParticle(new Vector2D(0,0),new Vector2D(1, 2), 10, 1);
    }

    @Test
    public void test_charged_particle_constructor(){
        particle.getPosition().equals(new Vector2D(0, 0));
        particle.getVelocity().equals(new Vector2D(1, 2));
        assertEquals(10, particle.getMass());
        assertEquals(1, particle.getCharge());
    }

    @Test
    public void test_charged_particle_setters(){
        particle.setPosition(new Vector2D(3, 4));
        particle.setVelocity(new Vector2D(5, 6));
        particle.setMass(20);
        particle.setCharge(2);


        particle.getPosition().equals(new Vector2D(3, 4));
        particle.getVelocity().equals(new Vector2D(5, 6));
        assertEquals(20, particle.getMass());
        assertEquals(2, particle.getCharge());
    }
    
}
