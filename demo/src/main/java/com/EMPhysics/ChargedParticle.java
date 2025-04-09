package com.EMPhysics;


public class ChargedParticle {
    private Vector2D position;
    private Vector2D velocity;
    private double mass; 
    private double charge;
    private boolean fixed;

    // Constructor if particle is not fixed
    public ChargedParticle(Vector2D position, Vector2D velocity, double mass, double charge) {
        this.position = position;
        this.velocity = velocity;
        this.mass = mass;
        this.charge = charge;
        this.fixed = false;
    }

    // Constructor for fixed particle
    public ChargedParticle(Vector2D position, double mass, double charge, boolean fixed) {
        this.position = position;
        this.velocity = new Vector2D(0, 0);
        this.mass = mass;
        this.charge = charge;
        this.fixed = fixed;
    }

    public Vector2D getPosition() {
        return position;
    }
    public Vector2D getVelocity() {
        return velocity;
    }
    public double getMass() {
        return mass;
    }
    public double getCharge() {
        return charge;
    }
    public boolean getFixed() {
        return fixed;
    }

    public void setPosition(Vector2D position) {
        this.position = position;
    }
    public void setVelocity(Vector2D velocity) {
        this.velocity = velocity;
    }
    public void setMass(double mass) {
        this.mass = mass;
    }
    public void setCharge(double charge) {
        this.charge = charge;
    }
    public void setFixed(boolean fixed) {
        this.fixed = fixed;
    }

    public void updatePosition(double deltaTime) {
        if (!fixed) {
            setPosition(position.add(velocity.scalar_multiply(deltaTime)));
        }
    }
    
    public void updateVelocity(Vector2D acceleration, double deltaTime) {
        if (!fixed) {
            // v = v + a*t (not a + v*t as in the original)
            setVelocity(velocity.add(acceleration.scalar_multiply(deltaTime)));
        }
    }
}
