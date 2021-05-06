/*
* Copyright (c) 2006-2012 Erin Catto http://www.box2d.org
*
* This software is provided 'as-is', without any express or implied
* warranty.  In no event will the authors be held liable for any damages
* arising from the use of this software.
* Permission is granted to anyone to use this software for any purpose,
* including commercial applications, and to alter it and redistribute it
* freely, subject to the following restrictions:
* 1. The origin of this software must not be misrepresented; you must not
* claim that you wrote the original software. If you use this software
* in a product, an acknowledgment in the product documentation would be
* appreciated but is not required.
* 2. Altered source versions must be plainly marked as such, and must not be
* misrepresented as being the original software.
* 3. This notice may not be removed or altered from any source distribution.
*/

import * as b2 from "@box2d";
import * as testbed from "@testbed";

export class BuoyancyTest extends testbed.Test {
  public m_bodies: b2.b2Body[];

  constructor() {
    super();

    this.m_bodies = new Array();

    const ground = this.m_world.CreateBody(new b2.b2BodyDef());

    {
      const shape = new b2.b2EdgeShape();
      shape.SetTwoSided(new b2.b2Vec2(-40.0, 0.0), new b2.b2Vec2(40.0, 0.0));
      ground.CreateFixture(shape, 0.0);
      shape.SetTwoSided(new b2.b2Vec2(-40.0, 0.0), new b2.b2Vec2(-40.0, 25.0));
      ground.CreateFixture(shape, 0.0);
      shape.SetTwoSided(new b2.b2Vec2(40.0, 0.0), new b2.b2Vec2(40.0, 25.0));
      ground.CreateFixture(shape, 0.0);
    }

    // Spawn in a bunch of crap
    {
      for (let i = 0; i < 5; i++) {
        const bd = new b2.b2BodyDef();
        bd.type = b2.b2BodyType.b2_dynamicBody;
        //bd.isBullet = true;
        bd.position.Set(Math.random() * 40.0 - 20.0, Math.random() * 15.0 + 5.0);
        bd.angle = Math.random() * Math.PI;
        const body = this.m_world.CreateBody(bd);

        const fd = new b2.b2FixtureDef();
        fd.density = 1.0;
        // Override the default friction.
        fd.friction = 0.3;
        fd.restitution = 0.1;
        const polygon = new b2.b2PolygonShape();
        fd.shape = polygon;
        polygon.SetAsBox(Math.random() * 0.5 + 1.0, Math.random() * 0.5 + 1.0);
        body.CreateFixture(fd);

        this.m_bodies.push(body);
      }
    }

    {
      for (let i = 0; i < 5; i++) {
        const bd = new b2.b2BodyDef();
        bd.type = b2.b2BodyType.b2_dynamicBody;
        //bd.isBullet = true;
        bd.position.Set(Math.random() * 40.0 - 20.0, Math.random() * 15.0 + 5.0);
        bd.angle = Math.random() * Math.PI;
        const body = this.m_world.CreateBody(bd);

        const fd = new b2.b2FixtureDef();
        fd.density = 1.0;
        // Override the default friction.
        fd.friction = 0.3;
        fd.restitution = 0.1;
        fd.shape = new b2.b2CircleShape(Math.random() * 0.5 + 1.0);
        body.CreateFixture(fd);

        this.m_bodies.push(body);
      }
    }

    {
      for (let i = 0; i < 15; i++) {
        const bd = new b2.b2BodyDef();
        bd.type = b2.b2BodyType.b2_dynamicBody;
        //bd.isBullet = true;
        bd.position.Set(Math.random() * 40.0 - 20.0, Math.random() * 15.0 + 5.0);
        bd.angle = Math.random() * Math.PI;
        const body = this.m_world.CreateBody(bd);

        const fd = new b2.b2FixtureDef();
        fd.density = 1.0;
        fd.friction = 0.3;
        fd.restitution = 0.1;
        const polygon = new b2.b2PolygonShape();
        fd.shape = polygon;
        if (Math.random() > 0.66) {
          polygon.Set([
            new b2.b2Vec2(-1.0 - Math.random() * 1.0, 1.0 + Math.random() * 1.0),
            new b2.b2Vec2(-0.5 - Math.random() * 1.0, -1.0 - Math.random() * 1.0),
            new b2.b2Vec2(0.5 + Math.random() * 1.0, -1.0 - Math.random() * 1.0),
            new b2.b2Vec2(1.0 + Math.random() * 1.0, 1.0 + Math.random() * 1.0),
          ]);
        } else if (Math.random() > 0.5) {
          const array = [];
          array[0] = new b2.b2Vec2(0.0, 1.0 + Math.random() * 1.0);
          array[2] = new b2.b2Vec2(-0.5 - Math.random() * 1.0, -1.0 - Math.random() * 1.0);
          array[3] = new b2.b2Vec2(0.5 + Math.random() * 1.0, -1.0 - Math.random() * 1.0);
          array[1] = new b2.b2Vec2((array[0].x + array[2].x), (array[0].y + array[2].y));
          array[1].SelfMul(Math.random() / 2 + 0.8);
          array[4] = new b2.b2Vec2((array[3].x + array[0].x), (array[3].y + array[0].y));
          array[4].SelfMul(Math.random() / 2 + 0.8);
          polygon.Set(array);
        } else {
          polygon.Set([
            new b2.b2Vec2(0.0, 1.0 + Math.random() * 1.0),
            new b2.b2Vec2(-0.5 - Math.random() * 1.0, -1.0 - Math.random() * 1.0),
            new b2.b2Vec2(0.5 + Math.random() * 1.0, -1.0 - Math.random() * 1.0),
          ]);
        }
        body.CreateFixture(fd);

        this.m_bodies.push(body);
      }
    }

    //Add some exciting bath toys
    {
      const bd = new b2.b2BodyDef();
      bd.type = b2.b2BodyType.b2_dynamicBody;
      bd.position.Set(0.0, 40.0);
      bd.angle = 0;
      const body = this.m_world.CreateBody(bd);

      const fd = new b2.b2FixtureDef();
      fd.density = 3.0;
      const polygon = new b2.b2PolygonShape();
      fd.shape = polygon;
      polygon.SetAsBox(4.0, 1.0);
      body.CreateFixture(fd);

      this.m_bodies.push(body);
    }

    {
      const bd = new b2.b2BodyDef();
      bd.type = b2.b2BodyType.b2_dynamicBody;
      bd.position.Set(0.0, 30.0);
      const body = this.m_world.CreateBody(bd);

      const fd = new b2.b2FixtureDef();
      fd.density = 2.0;
      const circle = new b2.b2CircleShape(0.7);
      fd.shape = circle;
      circle.m_p.Set(3.0, 0.0);
      body.CreateFixture(fd);
      circle.m_p.Set(-3.0, 0.0);
      body.CreateFixture(fd);
      circle.m_p.Set(0.0, 3.0);
      body.CreateFixture(fd);
      circle.m_p.Set(0.0, -3.0);
      body.CreateFixture(fd);

      fd.density = 2.0;
      const polygon = new b2.b2PolygonShape();
      fd.shape = polygon;
      polygon.SetAsBox(3.0, 0.2);
      body.CreateFixture(fd);
      polygon.SetAsBox(0.2, 3.0);
      body.CreateFixture(fd);

      this.m_bodies.push(body);
    }
  }

  public Step(settings: testbed.Settings): void {
    super.Step(settings);
  }

  public static Create(): testbed.Test {
    return new BuoyancyTest();
  }
}

export const testIndex: number = testbed.RegisterTest("Extras", "Buoyancy Test", BuoyancyTest.Create);
