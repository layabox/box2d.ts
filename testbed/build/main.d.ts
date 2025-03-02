import * as b2 from "@box2d";
import { Settings } from "./settings.js";
import { Test } from "./test.js";
export declare class Main {
    m_time_last: number;
    m_fps_time: number;
    m_fps_frames: number;
    m_fps: number;
    m_fps_div: HTMLDivElement;
    m_debug_div: HTMLDivElement;
    readonly m_settings: Settings;
    m_test?: Test;
    m_test_select: HTMLSelectElement;
    m_test_options: HTMLOptionElement[];
    m_shift: boolean;
    m_ctrl: boolean;
    m_lMouseDown: boolean;
    m_rMouseDown: boolean;
    readonly m_projection0: b2.b2Vec2;
    readonly m_viewCenter0: b2.b2Vec2;
    m_demo_mode: boolean;
    m_demo_time: number;
    m_max_demo_time: number;
    m_canvas_div: HTMLDivElement;
    m_canvas_2d: HTMLCanvasElement;
    m_ctx: CanvasRenderingContext2D | null;
    m_demo_button: HTMLInputElement;
    constructor(time: number);
    HomeCamera(): void;
    MoveCamera(move: b2.b2Vec2): void;
    ZoomCamera(zoom: number): void;
    private m_mouse;
    HandleMouseMove(e: MouseEvent): void;
    HandleMouseDown(e: MouseEvent): void;
    HandleMouseUp(e: MouseEvent): void;
    HandleTouchMove(e: TouchEvent): void;
    HandleTouchStart(e: TouchEvent): void;
    HandleTouchEnd(e: TouchEvent): void;
    HandleMouseWheel(e: MouseWheelEvent): void;
    HandleKeyDown(e: KeyboardEvent): void;
    HandleKeyUp(e: KeyboardEvent): void;
    UpdateTest(time_elapsed: number): void;
    DecrementTest(): void;
    IncrementTest(): void;
    LoadTest(restartTest?: boolean): void;
    Pause(): void;
    SingleStep(): void;
    ToggleDemo(): void;
    SimulationLoop(time: number): void;
}
import "./tests/add_pair.js";
import "./tests/apply_force.js";
import "./tests/body_types.js";
import "./tests/box_stack.js";
import "./tests/breakable.js";
import "./tests/bridge.js";
import "./tests/bullet_test.js";
import "./tests/cantilever.js";
import "./tests/car.js";
import "./tests/chain.js";
import "./tests/character_collision.js";
import "./tests/circle_stack.js";
import "./tests/collision_filtering.js";
import "./tests/collision_processing.js";
import "./tests/compound_shapes.js";
import "./tests/confined.js";
import "./tests/continuous_test.js";
import "./tests/convex_hull.js";
import "./tests/conveyor_belt.js";
import "./tests/distance_joint.js";
import "./tests/distance_test.js";
import "./tests/dominos.js";
import "./tests/dump_loader.js";
import "./tests/dynamic_tree.js";
import "./tests/edge_shapes.js";
import "./tests/edge_test.js";
import "./tests/friction.js";
import "./tests/gear_joint.js";
import "./tests/heavy1.js";
import "./tests/heavy2.js";
import "./tests/mobile_balanced.js";
import "./tests/mobile_unbalanced.js";
import "./tests/motor_joint.js";
import "./tests/pinball.js";
import "./tests/platformer.js";
import "./tests/polygon_collision.js";
import "./tests/polygon_shapes.js";
import "./tests/prismatic_joint.js";
import "./tests/pulley_joint.js";
import "./tests/pyramid.js";
import "./tests/ray_cast.js";
import "./tests/restitution.js";
import "./tests/revolute_joint.js";
import "./tests/rope.js";
import "./tests/sensor.js";
import "./tests/shape_cast.js";
import "./tests/shape_editing.js";
import "./tests/skier.js";
import "./tests/slider_crank_1.js";
import "./tests/slider_crank_2.js";
import "./tests/theo_jansen.js";
import "./tests/tiles.js";
import "./tests/time_of_impact.js";
import "./tests/tumbler.js";
import "./tests/web.js";
import "./tests/wheel_joint.js";
import "./tests/wrecking_ball.js";
import "./tests/extras/blob_test.js";
import "./tests/extras/domino_tower.js";
import "./tests/extras/pyramid_topple.js";
import "./tests/extras/test_ccd.js";
import "./tests/extras/test_ragdoll.js";
import "./tests/extras/test_stack.js";
import "./tests/extras/top_down_car.js";
import "./tests/extras/segway.js";
