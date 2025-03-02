import * as b2 from "@box2d";
import * as testbed from "@testbed";
export declare class WreckingBall extends testbed.Test {
    m_distanceJointDef: b2.b2DistanceJointDef;
    m_distanceJoint: b2.b2DistanceJoint | null;
    constructor();
    Keyboard(key: string): void;
    Step(settings: testbed.Settings): void;
    static Create(): testbed.Test;
}
export declare const testIndex: number;
