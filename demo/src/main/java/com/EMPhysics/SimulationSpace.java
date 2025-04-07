package com.EMPhysics;

import java.util.ArrayList;
import java.util.List;

public class SimulationSpace {
    private List<ChargedParticle> particles;
    private double width;
    private double height;
    private double timeStep;
    private boolean boundariesEnabled;

    public SimulationSpace(double width, double height, double timeStep) {
        this.particles = new ArrayList<>();
        this.width = width;
        this.height = height;
        this.timeStep = timeStep;
        this.boundariesEnabled = true;
    }

    public List<ChargedParticle> getParticles() {
        return particles;
    }
    public void addParticle(ChargedParticle particle) {
        particles.add(particle);
    }

    public void removeParticle(ChargedParticle particle) {
        particles.remove(particle);
    }

    public void update() {
        // First calculate forces between all particles
        for (ChargedParticle p1 : particles) {
            
            // Calculate net force on this particle from all others
            Vector2D netForce = new Vector2D(0, 0);
            
            for (ChargedParticle p2 : particles) {
                if (p1 == p2) continue; // Skip self
                
                netForce = netForce.add(calculateForce(p1, p2));
            }
            
            // F = ma, so a = F/m
            Vector2D acceleration = netForce.scalar_multiply(1.0 / p1.getMass());
            
            // Update velocity based on acceleration
            p1.updateVelocity(acceleration, timeStep);
        }
        
        // Then update positions based on new velocities
        for (ChargedParticle p : particles) {
                p.updatePosition(timeStep);
                
                // Apply boundary conditions if enabled
                if (boundariesEnabled) {
                    enforceBoundaries(p);
                }
        }
    }
    private Vector2D calculateForce(ChargedParticle p1, ChargedParticle p2) {
        Vector2D direction = p2.getPosition().subtract(p1.getPosition());
        double distance = direction.magnitude();
        
        // Prevent extreme forces at very small distances
        if (distance < PhysicsConstants.DISTANCE_DELTA * 100) {
            distance = 0.01;
        }
        
        // Coulomb's law: F = k * q1 * q2 / r²
        double forceMagnitude = Funcs.coulombLaw(p1, p2);
        return direction.normalize().scalar_multiply(forceMagnitude);
    }
    
    private void enforceBoundaries(ChargedParticle p) {
        Vector2D position = p.getPosition();
        Vector2D velocity = p.getVelocity();
        
        // Bounce off boundaries (simple reflection)
        if (position.getX() < 0) {
            p.setPosition(new Vector2D(0, position.getY()));
            p.setVelocity(new Vector2D(-velocity.getX() * 0.9, velocity.getY())); // 10% energy loss
        } else if (position.getX() > width) {
            p.setPosition(new Vector2D(width, position.getY()));
            p.setVelocity(new Vector2D(-velocity.getX() * 0.9, velocity.getY()));
        }
        
        if (position.getY() < 0) {
            p.setPosition(new Vector2D(position.getX(), 0));
            p.setVelocity(new Vector2D(velocity.getX(), -velocity.getY() * 0.9));
        } else if (position.getY() > height) {
            p.setPosition(new Vector2D(position.getX(), height));
            p.setVelocity(new Vector2D(velocity.getX(), -velocity.getY() * 0.9));
        }
    }
}
