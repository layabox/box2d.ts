import * as b2 from "@box2d";
import * as testbed from "@testbed";
export declare class TimeOfImpact extends testbed.Test {
    m_shapeA: b2.b2PolygonShape;
    m_shapeB: b2.b2PolygonShape;
    constructor();
    Step(settings: testbed.Settings): void;
    static Create(): testbed.Test;
}
export declare const testIndex: number;
