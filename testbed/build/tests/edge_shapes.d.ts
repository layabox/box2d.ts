import * as b2 from "@box2d";
import * as testbed from "@testbed";
export declare class EdgeShapesCallback extends b2.b2RayCastCallback {
    m_fixture: b2.b2Fixture | null;
    m_point: b2.b2Vec2;
    m_normal: b2.b2Vec2;
    ReportFixture(fixture: b2.b2Fixture, point: b2.b2Vec2, normal: b2.b2Vec2, fraction: number): number;
}
export declare class EdgeShapes extends testbed.Test {
    static readonly e_maxBodies = 256;
    m_bodyIndex: number;
    m_bodies: Array<b2.b2Body | null>;
    m_polygons: b2.b2PolygonShape[];
    m_circle: b2.b2CircleShape;
    m_angle: number;
    constructor();
    CreateBody(index: number): void;
    DestroyBody(): void;
    Keyboard(key: string): void;
    Step(settings: testbed.Settings): void;
    static Create(): testbed.Test;
}
export declare const testIndex: number;
