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
import * as testbed from "@testbed";

export class BulletTest extends testbed.Test {
  public m_body: b2.b2Body;
  public m_bullet: b2.b2Body;
  public m_x: number = 0;

  constructor() {
    super();

    {
      const bd = new b2.b2BodyDef();
      bd.position.Set(0.0, 0.0);
      const body = this.m_world.CreateBody(bd);

      const edge = new b2.b2EdgeShape();

      edge.SetTwoSided(new b2.b2Vec2(-10.0, 0.0), new b2.b2Vec2(10.0, 0.0));
      body.CreateFixture(edge, 0.0);

      const shape = new b2.b2PolygonShape();
      shape.SetAsBox(0.2, 1.0, new b2.b2Vec2(0.5, 1.0), 0.0);
      body.CreateFixture(shape, 0.0);
    }

    {
      const bd = new b2.b2BodyDef();
      bd.type = b2.b2BodyType.b2_dynamicBody;
      bd.position.Set(0.0, 4.0);

      const box = new b2.b2PolygonShape();
      box.SetAsBox(2.0, 0.1);

      this.m_body = this.m_world.CreateBody(bd);
      this.m_body.CreateFixture(box, 1.0);

      box.SetAsBox(0.25, 0.25);

      //this.m_x = b2.b2RandomRange(-1.0, 1.0);
      this.m_x = 0.20352793;
      bd.position.Set(this.m_x, 10.0);
      bd.bullet = true;

      this.m_bullet = this.m_world.CreateBody(bd);
      this.m_bullet.CreateFixture(box, 100.0);

      this.m_bullet.SetLinearVelocity(new b2.b2Vec2(0.0, -50.0));
    }
  }

  public Launch() {
    this.m_body.SetTransformVec(new b2.b2Vec2(0.0, 4.0), 0.0);
    this.m_body.SetLinearVelocity(b2.b2Vec2_zero);
    this.m_body.SetAngularVelocity(0.0);

    this.m_x = b2.b2RandomRange(-1.0, 1.0);
    this.m_bullet.SetTransformVec(new b2.b2Vec2(this.m_x, 10.0), 0.0);
    this.m_bullet.SetLinearVelocity(new b2.b2Vec2(0.0, -50.0));
    this.m_bullet.SetAngularVelocity(0.0);

    //  extern int32 b2.b2_gjkCalls, b2.b2_gjkIters, b2.b2_gjkMaxIters;
    //  extern int32 b2.b2_toiCalls, b2.b2_toiIters, b2.b2_toiMaxIters;
    //  extern int32 b2.b2_toiRootIters, b2.b2_toiMaxRootIters;

    // b2.b2_gjkCalls = 0;
    // b2.b2_gjkIters = 0;
    // b2.b2_gjkMaxIters = 0;
    b2.b2_gjk_reset();

    // b2.b2_toiCalls = 0;
    // b2.b2_toiIters = 0;
    // b2.b2_toiMaxIters = 0;
    // b2.b2_toiRootIters = 0;
    // b2.b2_toiMaxRootIters = 0;
    b2.b2_toi_reset();
  }

  public Step(settings: testbed.Settings): void {
    super.Step(settings);

    if (b2.b2_gjkCalls > 0) {
      // testbed.g_debugDraw.DrawString(5, this.m_textLine, "gjk calls = %d, ave gjk iters = %3.1f, max gjk iters = %d",
      testbed.g_debugDraw.DrawString(5, this.m_textLine, `gjk calls = ${b2.b2_gjkCalls.toFixed(0)}, ave gjk iters = ${(b2.b2_gjkIters / b2.b2_gjkCalls).toFixed(1)}, max gjk iters = ${b2.b2_gjkMaxIters.toFixed(0)}`);
      this.m_textLine += testbed.DRAW_STRING_NEW_LINE;
    }

    if (b2.b2_toiCalls > 0) {
      // testbed.g_debugDraw.DrawString(5, this.m_textLine, "toi calls = %d, ave toi iters = %3.1f, max toi iters = %d",
      testbed.g_debugDraw.DrawString(5, this.m_textLine, `toi calls = ${b2.b2_toiCalls}, ave toi iters = ${(b2.b2_toiIters / b2.b2_toiCalls).toFixed(1)}, max toi iters = ${b2.b2_toiMaxRootIters}`);
      this.m_textLine += testbed.DRAW_STRING_NEW_LINE;

      // testbed.g_debugDraw.DrawString(5, this.m_textLine, "ave toi root iters = %3.1f, max toi root iters = %d",
      testbed.g_debugDraw.DrawString(5, this.m_textLine, `ave toi root iters = ${(b2.b2_toiRootIters / b2.b2_toiCalls).toFixed(1)}, max toi root iters = ${b2.b2_toiMaxRootIters}`);
      this.m_textLine += testbed.DRAW_STRING_NEW_LINE;
    }

    if (this.m_stepCount % 60 === 0) {
      this.Launch();
    }
  }

  public static Create(): testbed.Test {
    return new BulletTest();
  }
}

export const testIndex: number = testbed.RegisterTest("Continuous", "Bullet Test", BulletTest.Create);
