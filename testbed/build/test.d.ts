import * as b2 from "@box2d";
import { Settings } from "./settings.js";
export declare const DRAW_STRING_NEW_LINE: number;
export declare function RandomFloat(lo?: number, hi?: number): number;
export declare class TestEntry {
    category: string;
    name: string;
    createFcn: () => Test;
    constructor(category: string, name: string, createFcn: () => Test);
}
export declare const g_testEntries: TestEntry[];
export declare function RegisterTest(category: string, name: string, fcn: () => Test): number;
export declare class DestructionListener extends b2.b2DestructionListener {
    test: Test;
    constructor(test: Test);
    SayGoodbyeJoint(joint: b2.b2Joint): void;
    SayGoodbyeFixture(fixture: b2.b2Fixture): void;
}
export declare class ContactPoint {
    fixtureA: b2.b2Fixture;
    fixtureB: b2.b2Fixture;
    readonly normal: b2.b2Vec2;
    readonly position: b2.b2Vec2;
    state: b2.b2PointState;
    normalImpulse: number;
    tangentImpulse: number;
    separation: number;
}
export declare class Test extends b2.b2ContactListener {
    static readonly k_maxContactPoints: number;
    m_world: b2.b2World;
    m_bomb: b2.b2Body | null;
    m_textLine: number;
    m_mouseJoint: b2.b2MouseJoint | null;
    readonly m_points: ContactPoint[];
    m_pointCount: number;
    m_destructionListener: DestructionListener;
    readonly m_bombSpawnPoint: b2.b2Vec2;
    m_bombSpawning: boolean;
    readonly m_mouseWorld: b2.b2Vec2;
    m_stepCount: number;
    readonly m_maxProfile: b2.b2Profile;
    readonly m_totalProfile: b2.b2Profile;
    m_groundBody: b2.b2Body;
    constructor();
    JointDestroyed(joint: b2.b2Joint): void;
    BeginContact(contact: b2.b2Contact): void;
    EndContact(contact: b2.b2Contact): void;
    private static PreSolve_s_state1;
    private static PreSolve_s_state2;
    private static PreSolve_s_worldManifold;
    PreSolve(contact: b2.b2Contact, oldManifold: b2.b2Manifold): void;
    PostSolve(contact: b2.b2Contact, impulse: b2.b2ContactImpulse): void;
    Keyboard(key: string): void;
    KeyboardUp(key: string): void;
    SetTextLine(line: number): void;
    DrawTitle(title: string): void;
    MouseDown(p: b2.b2Vec2): void;
    SpawnBomb(worldPt: b2.b2Vec2): void;
    CompleteBombSpawn(p: b2.b2Vec2): void;
    ShiftMouseDown(p: b2.b2Vec2): void;
    MouseUp(p: b2.b2Vec2): void;
    MouseMove(p: b2.b2Vec2): void;
    LaunchBomb(): void;
    LaunchBombAt(position: b2.b2Vec2, velocity: b2.b2Vec2): void;
    Step(settings: Settings): void;
    ShiftOrigin(newOrigin: b2.b2Vec2): void;
    GetDefaultViewZoom(): number;
}
