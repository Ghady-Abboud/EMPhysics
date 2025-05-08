import { Vector2D } from "./Vector2D";
import { calculateNetElectricField } from "./calculations/field";

export class ChargedParticle {
    private position: Vector2D;
    private velocity: Vector2D;
    private charge: number;
    private mass: number;
    private electricField: Vector2D;

    constructor(position: Vector2D, velocity: Vector2D, mass: number, charge: number) {
        this.position = position;
        this.velocity = velocity;
        this.charge = charge;
        this.mass = mass;
        this.electricField = new Vector2D(0, 0);
    }

    public getPosition(): Vector2D {
        return this.position;
    }

    public getVelocity(): Vector2D {
        return this.velocity;
    }

    public getCharge(): number {
        return this.charge;
    }

    public getMass(): number {
        return this.mass;
    }

    public setPosition(position: Vector2D): void {
        this.position = position;
    }

    public setVelocity(velocity: Vector2D): void {
        this.velocity = velocity;
    }

    public setMass(mass: number): void {
        this.mass = mass;
    }

    public setCharge(charge: number): void {
        this.charge = charge;
    }

    public updatePosition(deltaTime: number): void {
        this.setPosition(this.position.add(this.velocity.scalar_multiply(deltaTime)));
    }
    public updateVelocity(acceleration: Vector2D, deltaTime: number): void {
        this.setVelocity(this.velocity.add(acceleration.scalar_multiply(deltaTime)));
    }
    public getElectricField() {
        return this.electricField;
    }

    public setElectricField(electricField: Vector2D): void {
        this.electricField = electricField;
    }
}