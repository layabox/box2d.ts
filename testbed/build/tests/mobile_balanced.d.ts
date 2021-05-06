import * as b2 from "@box2d";
import * as testbed from "@testbed";
export declare class MobileBalanced extends testbed.Test {
    static readonly e_depth = 4;
    constructor();
    AddNode(parent: b2.b2Body, localAnchor: b2.b2Vec2, depth: number, offset: number, a: number): b2.b2Body;
    Step(settings: testbed.Settings): void;
    static Create(): testbed.Test;
}
export declare const testIndex: number;
