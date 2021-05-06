import * as b2 from "@box2d";
import * as testbed from "@testbed";
export declare class Segway extends testbed.Test {
    static PENDULUM_LENGTH: number;
    targetPosition: number;
    targetPositionInterval: number;
    posAvg: number;
    readonly angleController: PIDController;
    readonly positionController: PIDController;
    pendulumBody: b2.b2Body;
    wheelBody: b2.b2Body;
    groundBody: b2.b2Body;
    wheelJoint: b2.b2RevoluteJoint;
    constructor();
    Step(settings: testbed.Settings): void;
    static Create(): testbed.Test;
}
declare class PIDController {
    gainP: number;
    gainI: number;
    gainD: number;
    currentError: number;
    previousError: number;
    integral: number;
    output: number;
    step(dt: number): void;
}
export declare const testIndex: number;
export {};
