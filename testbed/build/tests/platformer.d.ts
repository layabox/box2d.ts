import * as b2 from "@box2d";
import * as testbed from "@testbed";
export declare class Platformer extends testbed.Test {
    m_radius: number;
    m_top: number;
    m_bottom: number;
    m_state: Platformer_State;
    m_platform: b2.b2Fixture;
    m_character: b2.b2Fixture;
    constructor();
    PreSolve(contact: b2.b2Contact, oldManifold: b2.b2Manifold): void;
    Step(settings: testbed.Settings): void;
    static Create(): testbed.Test;
}
export declare enum Platformer_State {
    e_unknown = 0,
    e_above = 1,
    e_below = 2
}
export declare const testIndex: number;
