package com.EMPhysics;

public class Vector2D {
    private double x;
    private double y;

    public Vector2D(double x, double y) {
        this.x =x;
        this.y=y;
    } 

    public double getX(){
        return x;
    }
    public double getY(){
        return y;
    }
    public void setX(double x){
        this.x = x;
    }
    public void setY(double y){
        this.y = y;
    }
    public Vector2D add(Vector2D other){
        return new Vector2D(this.getX() + other.getX(), this.getY() + other.getY());
    }
    public Vector2D subtract(Vector2D other) {
        return new Vector2D(this.getX() - other.getX(), this.getY() - other.getY());
    }
    public Vector2D scalar_multiply(double scalar){
        return new Vector2D(this.getX() * scalar, this.getY() * scalar);
    }
    public Vector2D normalize() {
        double magnitude = this.magnitude();
        if (magnitude == 0) {
            throw new ArithmeticException("Cannot normalize a zero vector");
        }
        return new Vector2D(this.getX() / magnitude, this.getY() / magnitude);
    }
    public double magnitude (){
        return Math.sqrt(Math.pow(this.getX(), 2) + Math.pow(this.getY(), 2));
    }
    public double dot_product(Vector2D other) {
        return this.getX() * other.getX() + this.getY() * other.getY();
    }
    public double distanceTo(Vector2D other) {
        double dx = this.getX() - other.getX();
        double dy = this.getY() - other.getY();

        return Math.sqrt(dx*dx + dy*dy);
    }
}
