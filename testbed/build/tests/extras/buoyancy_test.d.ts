import * as b2 from "@box2d";
import * as testbed from "@testbed";
export declare class BuoyancyTest extends testbed.Test {
    m_bodies: b2.b2Body[];
    constructor();
    Step(settings: testbed.Settings): void;
    static Create(): testbed.Test;
}
export declare const testIndex: number;
