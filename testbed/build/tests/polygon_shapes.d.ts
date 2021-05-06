import * as b2 from "@box2d";
import * as testbed from "@testbed";
export declare class PolygonShapesCallback extends b2.b2QueryCallback {
    static readonly e_maxCount = 4;
    m_circle: b2.b2CircleShape;
    m_transform: b2.b2Transform;
    m_count: number;
    ReportFixture(fixture: b2.b2Fixture): boolean;
}
export declare class PolygonShapes extends testbed.Test {
    static readonly e_maxBodies = 256;
    m_bodyIndex: number;
    m_bodies: Array<b2.b2Body | null>;
    m_polygons: b2.b2PolygonShape[];
    m_circle: b2.b2CircleShape;
    constructor();
    CreateBody(index: number): void;
    DestroyBody(): void;
    Keyboard(key: string): void;
    Step(settings: testbed.Settings): void;
    static Create(): testbed.Test;
}
export declare const testIndex: number;
