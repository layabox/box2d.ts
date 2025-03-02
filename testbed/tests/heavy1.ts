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

export class Heavy1 extends testbed.Test {
  constructor() {
    super();

    {
      const bd = new b2.b2BodyDef();
      const ground = this.m_world.CreateBody(bd);

      const shape = new b2.b2EdgeShape();
      shape.SetTwoSided(new b2.b2Vec2(-40.0, 0.0), new b2.b2Vec2(40.0, 0.0));
      ground.CreateFixture(shape, 0.0);
    }

    const bd = new b2.b2BodyDef();
    bd.type = b2.b2BodyType.b2_dynamicBody;
    bd.position.Set(0.0, 0.5);
    let body = this.m_world.CreateBody(bd);

    const shape = new b2.b2CircleShape();
    shape.m_radius = 0.5;
    body.CreateFixture(shape, 10.0);

    bd.position.Set(0.0, 6.0);
    body = this.m_world.CreateBody(bd);
    shape.m_radius = 5.0;
    body.CreateFixture(shape, 10.0);
  }

  public static Create() {
    return new Heavy1();
  }
}

export const testIndex: number = testbed.RegisterTest("Solver", "Heavy 1", Heavy1.Create);
