import * as b2 from "@box2d";
import * as testbed from "@testbed";
export declare class Breakable extends testbed.Test {
    static readonly e_count = 7;
    readonly m_body1: b2.b2Body;
    readonly m_velocity: b2.b2Vec2;
    m_angularVelocity: number;
    readonly m_shape1: b2.b2PolygonShape;
    readonly m_shape2: b2.b2PolygonShape;
    m_piece1: b2.b2Fixture | null;
    m_piece2: b2.b2Fixture | null;
    m_broke: boolean;
    m_break: boolean;
    constructor();
    PostSolve(contact: b2.b2Contact, impulse: b2.b2ContactImpulse): void;
    Break(): void;
    Step(settings: testbed.Settings): void;
    static Create(): testbed.Test;
}
export declare const testIndex: number;
