// MIT License
System.register(["@box2d", "@testbed"], function (exports_1, context_1) {
    "use strict";
    var b2, testbed, Dominos, testIndex;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (b2_1) {
                b2 = b2_1;
            },
            function (testbed_1) {
                testbed = testbed_1;
            }
        ],
        execute: function () {
            Dominos = class Dominos extends testbed.Test {
                constructor() {
                    super();
                    let b1 = null;
                    {
                        const shape = new b2.b2EdgeShape();
                        shape.SetTwoSided(new b2.b2Vec2(-40.0, 0.0), new b2.b2Vec2(40.0, 0.0));
                        const bd = new b2.b2BodyDef();
                        b1 = this.m_world.CreateBody(bd);
                        b1.CreateFixture(shape, 0.0);
                    }
                    {
                        const shape = new b2.b2PolygonShape();
                        shape.SetAsBox(6.0, 0.25);
                        const bd = new b2.b2BodyDef();
                        bd.position.Set(-1.5, 10.0);
                        const ground = this.m_world.CreateBody(bd);
                        ground.CreateFixture(shape, 0.0);
                    }
                    {
                        const shape = new b2.b2PolygonShape();
                        shape.SetAsBox(0.1, 1.0);
                        const fd = new b2.b2FixtureDef();
                        fd.shape = shape;
                        fd.density = 20.0;
                        fd.friction = 0.1;
                        for (let i = 0; i < 10; ++i) {
                            const bd = new b2.b2BodyDef();
                            bd.type = b2.b2BodyType.b2_dynamicBody;
                            bd.position.Set(-6.0 + 1.0 * i, 11.25);
                            const body = this.m_world.CreateBody(bd);
                            body.CreateFixture(fd);
                        }
                    }
                    {
                        const shape = new b2.b2PolygonShape();
                        shape.SetAsBox(7.0, 0.25, b2.b2Vec2_zero, 0.3);
                        const bd = new b2.b2BodyDef();
                        bd.position.Set(1.0, 6.0);
                        const ground = this.m_world.CreateBody(bd);
                        ground.CreateFixture(shape, 0.0);
                    }
                    let _b2 = null;
                    {
                        const shape = new b2.b2PolygonShape();
                        shape.SetAsBox(0.25, 1.5);
                        const bd = new b2.b2BodyDef();
                        bd.position.Set(-7.0, 4.0);
                        _b2 = this.m_world.CreateBody(bd);
                        _b2.CreateFixture(shape, 0.0);
                    }
                    let b3 = null;
                    {
                        const shape = new b2.b2PolygonShape();
                        shape.SetAsBox(6.0, 0.125);
                        const bd = new b2.b2BodyDef();
                        bd.type = b2.b2BodyType.b2_dynamicBody;
                        bd.position.Set(-0.9, 1.0);
                        bd.angle = -0.15;
                        b3 = this.m_world.CreateBody(bd);
                        b3.CreateFixture(shape, 10.0);
                    }
                    const jd = new b2.b2RevoluteJointDef();
                    const anchor = new b2.b2Vec2();
                    anchor.Set(-2.0, 1.0);
                    jd.Initialize(b1, b3, anchor);
                    jd.collideConnected = true;
                    this.m_world.CreateJoint(jd);
                    let b4 = null;
                    {
                        const shape = new b2.b2PolygonShape();
                        shape.SetAsBox(0.25, 0.25);
                        const bd = new b2.b2BodyDef();
                        bd.type = b2.b2BodyType.b2_dynamicBody;
                        bd.position.Set(-10.0, 15.0);
                        b4 = this.m_world.CreateBody(bd);
                        b4.CreateFixture(shape, 10.0);
                    }
                    anchor.Set(-7.0, 15.0);
                    jd.Initialize(_b2, b4, anchor);
                    this.m_world.CreateJoint(jd);
                    let b5 = null;
                    {
                        const bd = new b2.b2BodyDef();
                        bd.type = b2.b2BodyType.b2_dynamicBody;
                        bd.position.Set(6.5, 3.0);
                        b5 = this.m_world.CreateBody(bd);
                        const shape = new b2.b2PolygonShape();
                        const fd = new b2.b2FixtureDef();
                        fd.shape = shape;
                        fd.density = 10.0;
                        fd.friction = 0.1;
                        shape.SetAsBox(1.0, 0.1, new b2.b2Vec2(0.0, -0.9), 0.0);
                        b5.CreateFixture(fd);
                        shape.SetAsBox(0.1, 1.0, new b2.b2Vec2(-0.9, 0.0), 0.0);
                        b5.CreateFixture(fd);
                        shape.SetAsBox(0.1, 1.0, new b2.b2Vec2(0.9, 0.0), 0.0);
                        b5.CreateFixture(fd);
                    }
                    anchor.Set(6.0, 2.0);
                    jd.Initialize(b1, b5, anchor);
                    this.m_world.CreateJoint(jd);
                    let b6 = null;
                    {
                        const shape = new b2.b2PolygonShape();
                        shape.SetAsBox(1.0, 0.1);
                        const bd = new b2.b2BodyDef();
                        bd.type = b2.b2BodyType.b2_dynamicBody;
                        bd.position.Set(6.5, 4.1);
                        b6 = this.m_world.CreateBody(bd);
                        b6.CreateFixture(shape, 30.0);
                    }
                    anchor.Set(7.5, 4.0);
                    jd.Initialize(b5, b6, anchor);
                    this.m_world.CreateJoint(jd);
                    let b7 = null;
                    {
                        const shape = new b2.b2PolygonShape();
                        shape.SetAsBox(0.1, 1.0);
                        const bd = new b2.b2BodyDef();
                        bd.type = b2.b2BodyType.b2_dynamicBody;
                        bd.position.Set(7.4, 1.0);
                        b7 = this.m_world.CreateBody(bd);
                        b7.CreateFixture(shape, 10.0);
                    }
                    const djd = new b2.b2DistanceJointDef();
                    djd.bodyA = b3;
                    djd.bodyB = b7;
                    djd.localAnchorA.Set(6.0, 0.0);
                    djd.localAnchorB.Set(0.0, -1.0);
                    const d = b2.b2Vec2.SubVV(djd.bodyB.GetWorldPoint(djd.localAnchorB, new b2.b2Vec2()), djd.bodyA.GetWorldPoint(djd.localAnchorA, new b2.b2Vec2()), new b2.b2Vec2());
                    djd.length = d.Length();
                    b2.b2LinearStiffness(djd, 1.0, 1.0, djd.bodyA, djd.bodyB);
                    this.m_world.CreateJoint(djd);
                    {
                        const radius = 0.2;
                        const shape = new b2.b2CircleShape();
                        shape.m_radius = radius;
                        for (let i = 0; i < 4; ++i) {
                            const bd = new b2.b2BodyDef();
                            bd.type = b2.b2BodyType.b2_dynamicBody;
                            bd.position.Set(5.9 + 2.0 * radius * i, 2.4);
                            const body = this.m_world.CreateBody(bd);
                            body.CreateFixture(shape, 10.0);
                        }
                    }
                }
                Step(settings) {
                    super.Step(settings);
                }
                static Create() {
                    return new Dominos();
                }
            };
            exports_1("Dominos", Dominos);
            exports_1("testIndex", testIndex = testbed.RegisterTest("Examples", "Dominos", Dominos.Create));
        }
    };
});
//# sourceMappingURL=dominos.js.map