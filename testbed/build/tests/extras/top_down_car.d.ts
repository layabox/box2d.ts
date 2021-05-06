import * as b2 from "@box2d";
import * as testbed from "@testbed";
/**
 * a class to allow subclassing of different fixture user data
 */
export declare class FixtureUserData {
    m_type: number;
    constructor(type: number);
    getType(): number;
}
/**
 * class to allow marking a fixture as a car tire
 */
export declare class CarTireFUD extends FixtureUserData {
    constructor();
}
export declare class GroundAreaFUD extends FixtureUserData {
    frictionModifier: number;
    outOfCourse: boolean;
    constructor(fm: number, ooc: boolean);
}
export declare class TDTire {
    m_groundAreas: GroundAreaFUD[];
    m_body: b2.b2Body;
    m_currentTraction: number;
    m_maxForwardSpeed: number;
    m_maxBackwardSpeed: number;
    m_maxDriveForce: number;
    m_maxLateralImpulse: number;
    constructor(world: b2.b2World);
    setCharacteristics(maxForwardSpeed: number, maxBackwardSpeed: number, maxDriveForce: number, maxLateralImpulse: number): void;
    addGroundArea(ga: GroundAreaFUD): void;
    removeGroundArea(ga: GroundAreaFUD): void;
    updateTraction(): void;
    getLateralVelocity(): b2.b2Vec2;
    getForwardVelocity(): b2.b2Vec2;
    updateFriction(): void;
    updateDrive(controlState: number): void;
    updateTurn(controlState: number): void;
}
export declare class TDCar {
    m_tires: TDTire[];
    m_body: b2.b2Body;
    flJoint: b2.b2RevoluteJoint;
    frJoint: b2.b2RevoluteJoint;
    constructor(world: b2.b2World);
    update(controlState: number): void;
}
export declare class MyDestructionListener extends testbed.DestructionListener {
    SayGoodbyeFixture(fixture: b2.b2Fixture): void;
    /**
     * (unused but must implement all pure virtual functions)
     */
    SayGoodbyeJoint(joint: b2.b2Joint): void;
}
export declare class TopdownCar extends testbed.Test {
    m_car: TDCar;
    m_controlState: number;
    constructor();
    Keyboard(key: string): void;
    KeyboardUp(key: string): void;
    static handleContact(contact: b2.b2Contact, began: boolean): void;
    BeginContact(contact: b2.b2Contact): void;
    EndContact(contact: b2.b2Contact): void;
    static tire_vs_groundArea(tireFixture: b2.b2Fixture, groundAreaFixture: b2.b2Fixture, began: boolean): void;
    Step(settings: testbed.Settings): void;
    static Create(): TopdownCar;
}
export declare const testIndex: number;
