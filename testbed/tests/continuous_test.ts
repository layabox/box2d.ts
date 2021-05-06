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

export class ContinuousTest extends testbed.Test {
  public m_body: b2.b2Body;
  public m_angularVelocity = 0.0;

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
      bd.position.Set(0.0, 20.0);
      //bd.angle = 0.1;

      const shape = new b2.b2PolygonShape();
      shape.SetAsBox(2.0, 0.1);

      this.m_body = this.m_world.CreateBody(bd);
      this.m_body.CreateFixture(shape, 1.0);

      this.m_angularVelocity = b2.b2RandomRange(-50.0, 50.0);
      //this.m_angularVelocity = 46.661274;
      this.m_body.SetLinearVelocity(new b2.b2Vec2(0.0, -100.0));
      this.m_body.SetAngularVelocity(this.m_angularVelocity);
    }
    /*
    else
    {
      const bd = new b2.b2BodyDef();
      bd.type = b2.b2BodyType.b2_dynamicBody;
      bd.position.Set(0.0, 2.0);
      const body = this.m_world.CreateBody(bd);
      const shape = new b2.b2CircleShape();
      shape.m_p.SetZero();
      shape.m_radius = 0.5;
      body.CreateFixture(shape, 1.0);
      bd.bullet = true;
      bd.position.Set(0.0, 10.0);
      body = this.m_world.CreateBody(bd);
      body.CreateFixture(shape, 1.0);
      body.SetLinearVelocity(new b2.b2Vec2(0.0, -100.0));
    }
    */

    // b2.b2_gjkCalls = 0;
    // b2.b2_gjkIters = 0;
    // b2.b2_gjkMaxIters = 0;
    b2.b2_gjk_reset();
    // b2.b2_toiCalls = 0;
    // b2.b2_toiIters = 0;
    // b2.b2_toiRootIters = 0;
    // b2.b2_toiMaxRootIters = 0;
    // b2.b2_toiTime = 0.0;
    // b2.b2_toiMaxTime = 0.0;
    b2.b2_toi_reset();
  }

  public Launch() {
    // b2.b2_gjkCalls = 0;
    // b2.b2_gjkIters = 0;
    // b2.b2_gjkMaxIters = 0;
    b2.b2_gjk_reset();
    // b2.b2_toiCalls = 0;
    // b2.b2_toiIters = 0;
    // b2.b2_toiRootIters = 0;
    // b2.b2_toiMaxRootIters = 0;
    // b2.b2_toiTime = 0.0;
    // b2.b2_toiMaxTime = 0.0;
    b2.b2_toi_reset();

    this.m_body.SetTransformVec(new b2.b2Vec2(0.0, 20.0), 0.0);
    this.m_angularVelocity = b2.b2RandomRange(-50.0, 50.0);
    this.m_body.SetLinearVelocity(new b2.b2Vec2(0.0, -100.0));
    this.m_body.SetAngularVelocity(this.m_angularVelocity);
  }

  public Step(settings: testbed.Settings): void {
    super.Step(settings);

    if (b2.b2_gjkCalls > 0) {
      // testbed.g_debugDraw.DrawString(5, this.m_textLine, "gjk calls = %d, ave gjk iters = %3.1f, max gjk iters = %d",
      testbed.g_debugDraw.DrawString(5, this.m_textLine, `gjk calls = ${b2.b2_gjkCalls.toFixed(0)}, ave gjk iters = ${(b2.b2_gjkIters / b2.b2_gjkCalls).toFixed(1)}, max gjk iters = ${b2.b2_gjkMaxIters.toFixed(0)}`);
      this.m_textLine += testbed.DRAW_STRING_NEW_LINE;
    }

    if (b2.b2_toiCalls > 0) {
      // testbed.g_debugDraw.DrawString(5, this.m_textLine, "toi [max] calls = %d, ave toi iters = %3.1f [%d]",
      testbed.g_debugDraw.DrawString(5, this.m_textLine, `toi [max] calls = ${b2.b2_toiCalls}, ave toi iters = ${(b2.b2_toiIters / b2.b2_toiCalls).toFixed(1)} [${b2.b2_toiMaxRootIters}]`);
      this.m_textLine += testbed.DRAW_STRING_NEW_LINE;

      // testbed.g_debugDraw.DrawString(5, this.m_textLine, "ave [max] toi root iters = %3.1f [%d]",
      testbed.g_debugDraw.DrawString(5, this.m_textLine, `ave [max] toi root iters = ${(b2.b2_toiRootIters / b2.b2_toiCalls).toFixed(1)} [${b2.b2_toiMaxRootIters.toFixed(0)}]`);
      this.m_textLine += testbed.DRAW_STRING_NEW_LINE;

      // testbed.g_debugDraw.DrawString(5, this.m_textLine, "ave [max] toi time = %.1f [%.1f] (microseconds)",
      testbed.g_debugDraw.DrawString(5, this.m_textLine, `ave [max] toi time = ${(1000.0 * b2.b2_toiTime / b2.b2_toiCalls).toFixed(1)} [${(1000.0 * b2.b2_toiMaxTime).toFixed(1)}] (microseconds)`);
      this.m_textLine += testbed.DRAW_STRING_NEW_LINE;
    }

    if (this.m_stepCount % 60 === 0) {
      this.Launch();
    }
  }

  public static Create(): testbed.Test {
    return new ContinuousTest();
  }
}

export const testIndex: number = testbed.RegisterTest("Continuous", "Continuous Test", ContinuousTest.Create);
