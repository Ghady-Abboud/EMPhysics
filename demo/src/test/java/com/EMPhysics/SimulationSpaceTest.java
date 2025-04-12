package com.EMPhysics;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class SimulationSpaceTest {

    SimulationSpace simSpace;

    @BeforeEach
    public void setUp() {
        simSpace = new SimulationSpace();
    }

    @Test
    public void simulation_space_created_with_one_charge_by_default() {
        assertEquals(1, simSpace.getNumberOfCharges());
    }


}
