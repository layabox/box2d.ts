import * as b2 from "@box2d";
import * as testbed from "@testbed";
export declare class Pinball extends testbed.Test {
    m_leftJoint: b2.b2RevoluteJoint;
    m_rightJoint: b2.b2RevoluteJoint;
    m_ball: b2.b2Body;
    m_button: boolean;
    constructor();
    Keyboard(key: string): void;
    KeyboardUp(key: string): void;
    Step(settings: testbed.Settings): void;
    static Create(): testbed.Test;
}
export declare const testIndex: number;
