import * as b2 from "@box2d";
import * as testbed from "@testbed";
export declare class GearJoint extends testbed.Test {
    m_joint1: b2.b2RevoluteJoint;
    m_joint2: b2.b2RevoluteJoint;
    m_joint3: b2.b2PrismaticJoint;
    m_joint4: b2.b2GearJoint;
    m_joint5: b2.b2GearJoint;
    constructor();
    Step(settings: testbed.Settings): void;
    static Create(): testbed.Test;
}
export declare const testIndex: number;
