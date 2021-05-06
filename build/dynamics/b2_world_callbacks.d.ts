import { b2Vec2 } from "../common/b2_math.js";
import { b2Manifold } from "../collision/b2_collision.js";
import { b2Contact } from "./b2_contact.js";
import { b2Joint } from "./b2_joint.js";
import { b2Fixture } from "./b2_fixture.js";
export declare class b2DestructionListener {
    SayGoodbyeJoint(joint: b2Joint): void;
    SayGoodbyeFixture(fixture: b2Fixture): void;
}
export declare class b2ContactFilter {
    ShouldCollide(fixtureA: b2Fixture, fixtureB: b2Fixture): boolean;
    static readonly b2_defaultFilter: b2ContactFilter;
}
export declare class b2ContactImpulse {
    normalImpulses: number[];
    tangentImpulses: number[];
    count: number;
}
export declare class b2ContactListener {
    BeginContact(contact: b2Contact): void;
    EndContact(contact: b2Contact): void;
    PreSolve(contact: b2Contact, oldManifold: b2Manifold): void;
    PostSolve(contact: b2Contact, impulse: b2ContactImpulse): void;
    static readonly b2_defaultListener: b2ContactListener;
}
export declare class b2QueryCallback {
    ReportFixture(fixture: b2Fixture): boolean;
}
export declare type b2QueryCallbackFunction = (fixture: b2Fixture) => boolean;
export declare class b2RayCastCallback {
    ReportFixture(fixture: b2Fixture, point: b2Vec2, normal: b2Vec2, fraction: number): number;
}
export declare type b2RayCastCallbackFunction = (fixture: b2Fixture, point: b2Vec2, normal: b2Vec2, fraction: number) => number;
