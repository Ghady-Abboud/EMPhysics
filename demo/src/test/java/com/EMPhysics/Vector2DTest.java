package com.EMPhysics;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;

public class Vector2DTest {

    Vector2D vector;
    Vector2D vectorA;
    Vector2D vectorB;
    Vector2D result;

    @BeforeEach
    public void setUp(){
        vector = new Vector2D(1,2);
        vectorA = new Vector2D(2, 4);
        vectorB = new Vector2D(1, 5);
    }
    // Test the constructor
    @Test
    public void test_vector2d_creation(){
        assertEquals(1, vector.getX());
        assertEquals(2, vector.getY());
    }

    @Test
    public void test_vector2d_getter_and_setter(){
        vector.setX(3);
        vector.setY(4);
        assertEquals(3, vector.getX());
        assertEquals(4, vector.getY());
    }

    @Test
    public void test_vector2d_addition(){
        result = vectorA.add(vectorB);

        assertEquals(3, result.getX());
        assertEquals(9, result.getY());
    }

    @Test
    public void test_vector2d_subtraction(){
        result = vectorA.subtract(vectorB);

        assertEquals(1, result.getX());
        assertEquals(-1, result.getY());
    }

    @Test
    public void test_vector2d_scalar_multiplication(){
        double scalar = 2;
        result = new Vector2D(vectorA.getX() * scalar, vectorA.getY() * scalar);

        assertEquals(4, result.getX());
        assertEquals(8, result.getY());

    }

    @Test
    public void test_vector2d_magnitude(){
        vector.setX(3);
        vector.setY(4);
        double magnitude = Math.sqrt(Math.pow(vector.getX(), 2) + Math.pow(vector.getY(), 2));

        assertEquals(5, magnitude);
    }

    @Test
    public void test_vector2d_dot_product(){
        double dotProduct = vectorA.dot_product(vectorB);

        assertEquals(22, dotProduct);
    }

    @Test
    public void test_vector2d_normalize(){
        vector.setX(3);
        vector.setY(4);
        result = vector.normalize();

        assertEquals(0.6, result.getX());
        assertEquals(0.8, result.getY());
    }

    @Test
    public void test_vector2d_distanceTo() {
        double distance = vectorA.distanceTo(vectorB);


        assertEquals(Math.sqrt(2), distance);
    }
}