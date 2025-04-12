package com.EMPhysics;


public class ChargedParticle {
    private Vector2D position;
    private Vector2D velocity;
    private double mass; 
    private double charge;

    public ChargedParticle(Vector2D position, Vector2D velocity, double mass, double charge) {
        this.position = position;
        this.velocity = velocity;
        this.mass = mass;
        this.charge = charge;
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

    public void updatePosition(double deltaTime) {
        setPosition(position.add(velocity.scalar_multiply(deltaTime)));
    }
    
    public void updateVelocity(Vector2D acceleration, double deltaTime) {
        // v = v + a*t (not a + v*t as in the original)
        setVelocity(velocity.add(acceleration.scalar_multiply(deltaTime)));
    }
}
