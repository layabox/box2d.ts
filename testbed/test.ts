// MIT License

// Copyright (c) 2019 Erin Catto

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import * as b2 from "@box2d";
import { Settings } from "./settings.js";
import { g_debugDraw } from "./draw.js";

export const DRAW_STRING_NEW_LINE: number = 16;

export function RandomFloat(lo: number = -1, hi: number = 1) {
  let r = Math.random();
  r = (hi - lo) * r + lo;
  return r;
}

export class TestEntry {
  public category: string = "";
  public name: string = "unknown";
  public createFcn: () => Test;

  constructor(category: string, name: string, createFcn: () => Test) {
    this.category = category;
    this.name = name;
    this.createFcn = createFcn;
  }
}

export const g_testEntries: TestEntry[] = [
]

export function RegisterTest(category: string, name: string, fcn: () => Test): number {
  return g_testEntries.push(new TestEntry(category, name, fcn));
}

export class DestructionListener extends b2.b2DestructionListener {
  public test: Test;

  constructor(test: Test) {
    super();

    this.test = test;
  }

  public SayGoodbyeJoint(joint: b2.b2Joint): void {
    if (this.test.m_mouseJoint === joint) {
      this.test.m_mouseJoint = null;
    } else {
      this.test.JointDestroyed(joint);
    }
  }

  public SayGoodbyeFixture(fixture: b2.b2Fixture): void {}

}

export class ContactPoint {
  public fixtureA!: b2.b2Fixture;
  public fixtureB!: b2.b2Fixture;
  public readonly normal: b2.b2Vec2 = new b2.b2Vec2();
  public readonly position: b2.b2Vec2 = new b2.b2Vec2();
  public state: b2.b2PointState = b2.b2PointState.b2_nullState;
  public normalImpulse: number = 0;
  public tangentImpulse: number = 0;
  public separation: number = 0;
}


export class Test extends b2.b2ContactListener {
  public static readonly k_maxContactPoints: number = 2048;

  public m_world: b2.b2World;
  public m_bomb: b2.b2Body | null = null;
  public m_textLine: number = 30;
  public m_mouseJoint: b2.b2MouseJoint | null = null;
  public readonly m_points: ContactPoint[] = b2.b2MakeArray(Test.k_maxContactPoints, (i) => new ContactPoint());
  public m_pointCount: number = 0;
  public m_destructionListener: DestructionListener;
  public readonly m_bombSpawnPoint: b2.b2Vec2 = new b2.b2Vec2();
  public m_bombSpawning: boolean = false;
  public readonly m_mouseWorld: b2.b2Vec2 = new b2.b2Vec2();
  public m_stepCount: number = 0;
  public readonly m_maxProfile: b2.b2Profile = new b2.b2Profile();
  public readonly m_totalProfile: b2.b2Profile = new b2.b2Profile();
  public m_groundBody: b2.b2Body;

  constructor() {
    super();
    const gravity: b2.b2Vec2 = new b2.b2Vec2(0, -10);
    this.m_world = new b2.b2World(gravity);
    this.m_bomb = null;
    this.m_textLine = 30;
    this.m_mouseJoint = null;

    this.m_destructionListener = new DestructionListener(this);
    this.m_world.SetDestructionListener(this.m_destructionListener);
    this.m_world.SetContactListener(this);
    this.m_world.SetDebugDraw(g_debugDraw);

    const bodyDef: b2.b2BodyDef = new b2.b2BodyDef();
    this.m_groundBody = this.m_world.CreateBody(bodyDef);
  }

  public JointDestroyed(joint: b2.b2Joint): void {}

  public BeginContact(contact: b2.b2Contact): void {}

  public EndContact(contact: b2.b2Contact): void {}

  private static PreSolve_s_state1: b2.b2PointState[] = [/*b2.b2maxManifoldPoints*/];
  private static PreSolve_s_state2: b2.b2PointState[] = [/*b2.b2maxManifoldPoints*/];
  private static PreSolve_s_worldManifold: b2.b2WorldManifold = new b2.b2WorldManifold();
  public PreSolve(contact: b2.b2Contact, oldManifold: b2.b2Manifold): void {
    const manifold: b2.b2Manifold = contact.GetManifold();

    if (manifold.pointCount === 0) {
      return;
    }

    const fixtureA: b2.b2Fixture | null = contact.GetFixtureA();
    const fixtureB: b2.b2Fixture | null = contact.GetFixtureB();

    const state1: b2.b2PointState[] = Test.PreSolve_s_state1;
    const state2: b2.b2PointState[] = Test.PreSolve_s_state2;
    b2.b2GetPointStates(state1, state2, oldManifold, manifold);

    const worldManifold: b2.b2WorldManifold = Test.PreSolve_s_worldManifold;
    contact.GetWorldManifold(worldManifold);

    for (let i: number = 0; i < manifold.pointCount && this.m_pointCount < Test.k_maxContactPoints; ++i) {
      const cp: ContactPoint = this.m_points[this.m_pointCount];
      cp.fixtureA = fixtureA;
      cp.fixtureB = fixtureB;
      cp.position.Copy(worldManifold.points[i]);
      cp.normal.Copy(worldManifold.normal);
      cp.state = state2[i];
      cp.normalImpulse = manifold.points[i].normalImpulse;
      cp.tangentImpulse = manifold.points[i].tangentImpulse;
      cp.separation = worldManifold.separations[i];
      ++this.m_pointCount;
    }
  }

  public PostSolve(contact: b2.b2Contact, impulse: b2.b2ContactImpulse): void {}

  public Keyboard(key: string): void {}

  public KeyboardUp(key: string): void {}

  public SetTextLine(line: number): void {
    this.m_textLine = line;
  }

  public DrawTitle(title: string): void {
    g_debugDraw.DrawString(5, DRAW_STRING_NEW_LINE, title);
    this.m_textLine = 3 * DRAW_STRING_NEW_LINE;
  }

  public MouseDown(p: b2.b2Vec2): void {
    this.m_mouseWorld.Copy(p);

    if (this.m_mouseJoint !== null) {
      this.m_world.DestroyJoint(this.m_mouseJoint);
      this.m_mouseJoint = null;
    }

    let hit_fixture: b2.b2Fixture | null | any = null; // HACK: tsc doesn't detect calling callbacks

    // Query the world for overlapping shapes.
    this.m_world.QueryPointAABB(p, (fixture: b2.b2Fixture): boolean => {
      const body = fixture.GetBody();
      if (body.GetType() === b2.b2BodyType.b2_dynamicBody) {
        const inside = fixture.TestPoint(p);
        if (inside) {
          hit_fixture = fixture;
          return false; // We are done, terminate the query.
        }
      }
      return true; // Continue the query.
    });

    if (hit_fixture) {
      const frequencyHz = 5.0;
      const dampingRatio = 0.7;

      const body = hit_fixture.GetBody();
      const jd: b2.b2MouseJointDef = new b2.b2MouseJointDef();
      jd.bodyA = this.m_groundBody;
      jd.bodyB = body;
      jd.target.Copy(p);
      jd.maxForce = 1000 * body.GetMass();
      b2.b2LinearStiffness(jd, frequencyHz, dampingRatio, jd.bodyA, jd.bodyB);

      this.m_mouseJoint = this.m_world.CreateJoint(jd);
      body.SetAwake(true);
    }
  }

  public SpawnBomb(worldPt: b2.b2Vec2): void {
    this.m_bombSpawnPoint.Copy(worldPt);
    this.m_bombSpawning = true;
  }

  public CompleteBombSpawn(p: b2.b2Vec2): void {
    if (!this.m_bombSpawning) {
      return;
    }

    const multiplier: number = 30;
    const vel: b2.b2Vec2 = b2.b2Vec2.SubVV(this.m_bombSpawnPoint, p, new b2.b2Vec2());
    vel.SelfMul(multiplier);
    this.LaunchBombAt(this.m_bombSpawnPoint, vel);
    this.m_bombSpawning = false;
  }

  public ShiftMouseDown(p: b2.b2Vec2): void {
    this.m_mouseWorld.Copy(p);

    if (this.m_mouseJoint !== null) {
      return;
    }

    this.SpawnBomb(p);
  }

  public MouseUp(p: b2.b2Vec2): void {
    if (this.m_mouseJoint) {
      this.m_world.DestroyJoint(this.m_mouseJoint);
      this.m_mouseJoint = null;
    }

    if (this.m_bombSpawning) {
      this.CompleteBombSpawn(p);
    }
  }

  public MouseMove(p: b2.b2Vec2): void {
    this.m_mouseWorld.Copy(p);

    if (this.m_mouseJoint) {
      this.m_mouseJoint.SetTarget(p);
    }
  }

  public LaunchBomb(): void {
    const p: b2.b2Vec2 = new b2.b2Vec2(b2.b2RandomRange(-15, 15), 30);
    const v: b2.b2Vec2 = b2.b2Vec2.MulSV(-5, p, new b2.b2Vec2());
    this.LaunchBombAt(p, v);
  }

  public LaunchBombAt(position: b2.b2Vec2, velocity: b2.b2Vec2): void {
    if (this.m_bomb) {
      this.m_world.DestroyBody(this.m_bomb);
      this.m_bomb = null;
    }

    const bd: b2.b2BodyDef = new b2.b2BodyDef();
    bd.type = b2.b2BodyType.b2_dynamicBody;
    bd.position.Copy(position);
    bd.bullet = true;
    this.m_bomb = this.m_world.CreateBody(bd);
    this.m_bomb.SetLinearVelocity(velocity);

    const circle: b2.b2CircleShape = new b2.b2CircleShape();
    circle.m_radius = 0.3;

    const fd: b2.b2FixtureDef = new b2.b2FixtureDef();
    fd.shape = circle;
    fd.density = 20;
    fd.restitution = 0;

    // b2.b2Vec2 minV = position - b2.b2Vec2(0.3f,0.3f);
    // b2.b2Vec2 maxV = position + b2.b2Vec2(0.3f,0.3f);

    // b2.b2AABB aabb;
    // aabb.lowerBound = minV;
    // aabb.upperBound = maxV;

    this.m_bomb.CreateFixture(fd);
  }

  public Step(settings: Settings): void {
    let timeStep = settings.m_hertz > 0 ? 1 / settings.m_hertz : 0;

    if (settings.m_pause) {
      if (settings.m_singleStep) {
        settings.m_singleStep = false;
      } else {
        timeStep = 0;
      }

      g_debugDraw.DrawString(5, this.m_textLine, "****PAUSED****");
      this.m_textLine += DRAW_STRING_NEW_LINE;
    }

    let flags = b2.b2DrawFlags.e_none;
    if (settings.m_drawShapes) { flags |= b2.b2DrawFlags.e_shapeBit;        }
    if (settings.m_drawJoints) { flags |= b2.b2DrawFlags.e_jointBit;        }
    if (settings.m_drawAABBs ) { flags |= b2.b2DrawFlags.e_aabbBit;         }
    if (settings.m_drawCOMs  ) { flags |= b2.b2DrawFlags.e_centerOfMassBit; }
    g_debugDraw.SetFlags(flags);

    this.m_world.SetAllowSleeping(settings.m_enableSleep);
    this.m_world.SetWarmStarting(settings.m_enableWarmStarting);
    this.m_world.SetContinuousPhysics(settings.m_enableContinuous);
    this.m_world.SetSubStepping(settings.m_enableSubStepping);

    this.m_pointCount = 0;

    this.m_world.Step(timeStep, settings.m_velocityIterations, settings.m_positionIterations);

    this.m_world.DebugDraw();

    if (timeStep > 0) {
      ++this.m_stepCount;
    }

    if (settings.m_drawStats) {
      const bodyCount = this.m_world.GetBodyCount();
      const contactCount = this.m_world.GetContactCount();
      const jointCount = this.m_world.GetJointCount();
      g_debugDraw.DrawString(5, this.m_textLine, "bodies/contacts/joints = " + bodyCount + "/" + contactCount + "/" + jointCount);
      this.m_textLine += DRAW_STRING_NEW_LINE;

      const proxyCount = this.m_world.GetProxyCount();
      const height = this.m_world.GetTreeHeight();
      const balance = this.m_world.GetTreeBalance();
      const quality = this.m_world.GetTreeQuality();
      g_debugDraw.DrawString(5, this.m_textLine, "proxies/height/balance/quality = " + proxyCount + "/" + height + "/" + balance + "/" + quality.toFixed(2));
      this.m_textLine += DRAW_STRING_NEW_LINE;
    }

    // Track maximum profile times
    {
      const p = this.m_world.GetProfile();
      this.m_maxProfile.step = b2.b2Max(this.m_maxProfile.step, p.step);
      this.m_maxProfile.collide = b2.b2Max(this.m_maxProfile.collide, p.collide);
      this.m_maxProfile.solve = b2.b2Max(this.m_maxProfile.solve, p.solve);
      this.m_maxProfile.solveInit = b2.b2Max(this.m_maxProfile.solveInit, p.solveInit);
      this.m_maxProfile.solveVelocity = b2.b2Max(this.m_maxProfile.solveVelocity, p.solveVelocity);
      this.m_maxProfile.solvePosition = b2.b2Max(this.m_maxProfile.solvePosition, p.solvePosition);
      this.m_maxProfile.solveTOI = b2.b2Max(this.m_maxProfile.solveTOI, p.solveTOI);
      this.m_maxProfile.broadphase = b2.b2Max(this.m_maxProfile.broadphase, p.broadphase);

      this.m_totalProfile.step += p.step;
      this.m_totalProfile.collide += p.collide;
      this.m_totalProfile.solve += p.solve;
      this.m_totalProfile.solveInit += p.solveInit;
      this.m_totalProfile.solveVelocity += p.solveVelocity;
      this.m_totalProfile.solvePosition += p.solvePosition;
      this.m_totalProfile.solveTOI += p.solveTOI;
      this.m_totalProfile.broadphase += p.broadphase;
    }

    if (settings.m_drawProfile) {
      const p = this.m_world.GetProfile();

      const aveProfile: b2.b2Profile = new b2.b2Profile();
      if (this.m_stepCount > 0) {
        const scale: number = 1 / this.m_stepCount;
        aveProfile.step = scale * this.m_totalProfile.step;
        aveProfile.collide = scale * this.m_totalProfile.collide;
        aveProfile.solve = scale * this.m_totalProfile.solve;
        aveProfile.solveInit = scale * this.m_totalProfile.solveInit;
        aveProfile.solveVelocity = scale * this.m_totalProfile.solveVelocity;
        aveProfile.solvePosition = scale * this.m_totalProfile.solvePosition;
        aveProfile.solveTOI = scale * this.m_totalProfile.solveTOI;
        aveProfile.broadphase = scale * this.m_totalProfile.broadphase;
      }

      g_debugDraw.DrawString(5, this.m_textLine, "step [ave] (max) = " + p.step.toFixed(2) + " [" + aveProfile.step.toFixed(2) + "] (" + this.m_maxProfile.step.toFixed(2) + ")");
      this.m_textLine += DRAW_STRING_NEW_LINE;
      g_debugDraw.DrawString(5, this.m_textLine, "collide [ave] (max) = " + p.collide.toFixed(2) + " [" + aveProfile.collide.toFixed(2) + "] (" + this.m_maxProfile.collide.toFixed(2) + ")");
      this.m_textLine += DRAW_STRING_NEW_LINE;
      g_debugDraw.DrawString(5, this.m_textLine, "solve [ave] (max) = " + p.solve.toFixed(2) + " [" + aveProfile.solve.toFixed(2) + "] (" + this.m_maxProfile.solve.toFixed(2) + ")");
      this.m_textLine += DRAW_STRING_NEW_LINE;
      g_debugDraw.DrawString(5, this.m_textLine, "solve init [ave] (max) = " + p.solveInit.toFixed(2) + " [" + aveProfile.solveInit.toFixed(2) + "] (" + this.m_maxProfile.solveInit.toFixed(2) + ")");
      this.m_textLine += DRAW_STRING_NEW_LINE;
      g_debugDraw.DrawString(5, this.m_textLine, "solve velocity [ave] (max) = " + p.solveVelocity.toFixed(2) + " [" + aveProfile.solveVelocity.toFixed(2) + "] (" + this.m_maxProfile.solveVelocity.toFixed(2) + ")");
      this.m_textLine += DRAW_STRING_NEW_LINE;
      g_debugDraw.DrawString(5, this.m_textLine, "solve position [ave] (max) = " + p.solvePosition.toFixed(2) + " [" + aveProfile.solvePosition.toFixed(2) + "] (" + this.m_maxProfile.solvePosition.toFixed(2) + ")");
      this.m_textLine += DRAW_STRING_NEW_LINE;
      g_debugDraw.DrawString(5, this.m_textLine, "solveTOI [ave] (max) = " + p.solveTOI.toFixed(2) + " [" + aveProfile.solveTOI.toFixed(2) + "] (" + this.m_maxProfile.solveTOI.toFixed(2) + ")");
      this.m_textLine += DRAW_STRING_NEW_LINE;
      g_debugDraw.DrawString(5, this.m_textLine, "broad-phase [ave] (max) = " + p.broadphase.toFixed(2) + " [" + aveProfile.broadphase.toFixed(2) + "] (" + this.m_maxProfile.broadphase.toFixed(2) + ")");
      this.m_textLine += DRAW_STRING_NEW_LINE;
    }

    if (this.m_bombSpawning) {
      const c: b2.b2Color = new b2.b2Color(0, 0, 1);
      g_debugDraw.DrawPoint(this.m_bombSpawnPoint, 4, c);

      c.SetRGB(0.8, 0.8, 0.8);
      g_debugDraw.DrawSegment(this.m_mouseWorld, this.m_bombSpawnPoint, c);
    }

    if (settings.m_drawContactPoints) {
      const k_impulseScale: number = 0.1;
      const k_axisScale: number = 0.3;

      for (let i: number = 0; i < this.m_pointCount; ++i) {
        const point = this.m_points[i];

        if (point.state === b2.b2PointState.b2_addState) {
          // Add
          g_debugDraw.DrawPoint(point.position, 10, new b2.b2Color(0.3, 0.95, 0.3));
        } else if (point.state === b2.b2PointState.b2_persistState) {
          // Persist
          g_debugDraw.DrawPoint(point.position, 5, new b2.b2Color(0.3, 0.3, 0.95));
        }

        if (settings.m_drawContactNormals) {
          const p1 = point.position;
          const p2: b2.b2Vec2 = b2.b2Vec2.AddVV(p1, b2.b2Vec2.MulSV(k_axisScale, point.normal, b2.b2Vec2.s_t0), new b2.b2Vec2());
          g_debugDraw.DrawSegment(p1, p2, new b2.b2Color(0.9, 0.9, 0.9));
        } else if (settings.m_drawContactImpulse) {
          const p1 = point.position;
          const p2: b2.b2Vec2 = b2.b2Vec2.AddVMulSV(p1, k_impulseScale * point.normalImpulse, point.normal, new b2.b2Vec2());
          g_debugDraw.DrawSegment(p1, p2, new b2.b2Color(0.9, 0.9, 0.3));
        }

        if (settings.m_drawFrictionImpulse) {
          const tangent: b2.b2Vec2 = b2.b2Vec2.CrossVOne(point.normal, new b2.b2Vec2());
          const p1 = point.position;
          const p2: b2.b2Vec2 = b2.b2Vec2.AddVMulSV(p1, k_impulseScale * point.tangentImpulse, tangent, new b2.b2Vec2());
          g_debugDraw.DrawSegment(p1, p2, new b2.b2Color(0.9, 0.9, 0.3));
        }
      }
    }
  }

  public ShiftOrigin(newOrigin: b2.b2Vec2): void {
    this.m_world.ShiftOrigin(newOrigin);
  }

  public GetDefaultViewZoom(): number {
    return 1.0;
  }

}
