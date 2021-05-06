import * as b2 from "@box2d";
import * as testbed from "@testbed";
export declare class ShapeEditing extends testbed.Test {
    m_body: b2.b2Body;
    m_fixture1: b2.b2Fixture;
    m_fixture2: b2.b2Fixture | null;
    m_sensor: boolean;
    constructor();
    Keyboard(key: string): void;
    Step(settings: testbed.Settings): void;
    static Create(): testbed.Test;
}
export declare const testIndex: number;
