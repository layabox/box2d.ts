import * as b2 from "@box2d";
import * as testbed from "@testbed";
export declare class DistanceTest extends testbed.Test {
    m_positionB: b2.b2Vec2;
    m_angleB: number;
    m_transformA: b2.b2Transform;
    m_transformB: b2.b2Transform;
    m_polygonA: b2.b2PolygonShape;
    m_polygonB: b2.b2PolygonShape;
    constructor();
    Keyboard(key: string): void;
    Step(settings: testbed.Settings): void;
    static Create(): testbed.Test;
}
export declare const testIndex: number;
