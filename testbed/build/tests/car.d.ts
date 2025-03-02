import * as b2 from "@box2d";
import * as testbed from "@testbed";
export declare class Car extends testbed.Test {
    m_car: b2.b2Body;
    m_wheel1: b2.b2Body;
    m_wheel2: b2.b2Body;
    m_speed: number;
    m_spring1: b2.b2WheelJoint;
    m_spring2: b2.b2WheelJoint;
    constructor();
    Keyboard(key: string): void;
    Step(settings: testbed.Settings): void;
    static Create(): testbed.Test;
}
export declare const testIndex: number;
