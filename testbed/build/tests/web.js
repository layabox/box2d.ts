// MIT License
System.register(["@box2d", "@testbed"], function (exports_1, context_1) {
    "use strict";
    var b2, testbed, Web, testIndex;
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
            // Test distance joints, body destruction, and joint destruction.
            Web = class Web extends testbed.Test {
                constructor() {
                    super();
                    this.m_bodies = new Array(4);
                    this.m_joints = new Array(8);
                    let ground = null;
                    {
                        const bd = new b2.b2BodyDef();
                        ground = this.m_world.CreateBody(bd);
                        const shape = new b2.b2EdgeShape();
                        shape.SetTwoSided(new b2.b2Vec2(-40.0, 0.0), new b2.b2Vec2(40.0, 0.0));
                        ground.CreateFixture(shape, 0.0);
                    }
                    {
                        const shape = new b2.b2PolygonShape();
                        shape.SetAsBox(0.5, 0.5);
                        const bd = new b2.b2BodyDef();
                        bd.type = b2.b2BodyType.b2_dynamicBody;
                        bd.position.Set(-5.0, 5.0);
                        const body0 = this.m_bodies[0] = this.m_world.CreateBody(bd);
                        body0.CreateFixture(shape, 5.0);
                        bd.position.Set(5.0, 5.0);
                        const body1 = this.m_bodies[1] = this.m_world.CreateBody(bd);
                        body1.CreateFixture(shape, 5.0);
                        bd.position.Set(5.0, 15.0);
                        const body2 = this.m_bodies[2] = this.m_world.CreateBody(bd);
                        body2.CreateFixture(shape, 5.0);
                        bd.position.Set(-5.0, 15.0);
                        const body3 = this.m_bodies[3] = this.m_world.CreateBody(bd);
                        body3.CreateFixture(shape, 5.0);
                        const jd = new b2.b2DistanceJointDef();
                        let p1, p2, d;
                        const frequencyHz = 2.0;
                        const dampingRatio = 0.0;
                        jd.bodyA = ground;
                        jd.bodyB = body0;
                        b2.b2LinearStiffness(jd, frequencyHz, dampingRatio, jd.bodyA, jd.bodyB);
                        jd.localAnchorA.Set(-10.0, 0.0);
                        jd.localAnchorB.Set(-0.5, -0.5);
                        p1 = jd.bodyA.GetWorldPoint(jd.localAnchorA, new b2.b2Vec2());
                        p2 = jd.bodyB.GetWorldPoint(jd.localAnchorB, new b2.b2Vec2());
                        d = b2.b2Vec2.SubVV(p2, p1, new b2.b2Vec2());
                        jd.length = d.Length();
                        this.m_joints[0] = this.m_world.CreateJoint(jd);
                        jd.bodyA = ground;
                        jd.bodyB = body1;
                        b2.b2LinearStiffness(jd, frequencyHz, dampingRatio, jd.bodyA, jd.bodyB);
                        jd.localAnchorA.Set(10.0, 0.0);
                        jd.localAnchorB.Set(0.5, -0.5);
                        p1 = jd.bodyA.GetWorldPoint(jd.localAnchorA, new b2.b2Vec2());
                        p2 = jd.bodyB.GetWorldPoint(jd.localAnchorB, new b2.b2Vec2());
                        d = b2.b2Vec2.SubVV(p2, p1, new b2.b2Vec2());
                        jd.length = d.Length();
                        this.m_joints[1] = this.m_world.CreateJoint(jd);
                        jd.bodyA = ground;
                        jd.bodyB = body2;
                        b2.b2LinearStiffness(jd, frequencyHz, dampingRatio, jd.bodyA, jd.bodyB);
                        jd.localAnchorA.Set(10.0, 20.0);
                        jd.localAnchorB.Set(0.5, 0.5);
                        p1 = jd.bodyA.GetWorldPoint(jd.localAnchorA, new b2.b2Vec2());
                        p2 = jd.bodyB.GetWorldPoint(jd.localAnchorB, new b2.b2Vec2());
                        d = b2.b2Vec2.SubVV(p2, p1, new b2.b2Vec2());
                        jd.length = d.Length();
                        this.m_joints[2] = this.m_world.CreateJoint(jd);
                        jd.bodyA = ground;
                        jd.bodyB = body3;
                        b2.b2LinearStiffness(jd, frequencyHz, dampingRatio, jd.bodyA, jd.bodyB);
                        jd.localAnchorA.Set(-10.0, 20.0);
                        jd.localAnchorB.Set(-0.5, 0.5);
                        p1 = jd.bodyA.GetWorldPoint(jd.localAnchorA, new b2.b2Vec2());
                        p2 = jd.bodyB.GetWorldPoint(jd.localAnchorB, new b2.b2Vec2());
                        d = b2.b2Vec2.SubVV(p2, p1, new b2.b2Vec2());
                        jd.length = d.Length();
                        this.m_joints[3] = this.m_world.CreateJoint(jd);
                        jd.bodyA = body0;
                        jd.bodyB = body1;
                        b2.b2LinearStiffness(jd, frequencyHz, dampingRatio, jd.bodyA, jd.bodyB);
                        jd.localAnchorA.Set(0.5, 0.0);
                        jd.localAnchorB.Set(-0.5, 0.0);
                        p1 = jd.bodyA.GetWorldPoint(jd.localAnchorA, new b2.b2Vec2());
                        p2 = jd.bodyB.GetWorldPoint(jd.localAnchorB, new b2.b2Vec2());
                        d = b2.b2Vec2.SubVV(p2, p1, new b2.b2Vec2());
                        jd.length = d.Length();
                        this.m_joints[4] = this.m_world.CreateJoint(jd);
                        jd.bodyA = body1;
                        jd.bodyB = body2;
                        b2.b2LinearStiffness(jd, frequencyHz, dampingRatio, jd.bodyA, jd.bodyB);
                        jd.localAnchorA.Set(0.0, 0.5);
                        jd.localAnchorB.Set(0.0, -0.5);
                        p1 = jd.bodyA.GetWorldPoint(jd.localAnchorA, new b2.b2Vec2());
                        p2 = jd.bodyB.GetWorldPoint(jd.localAnchorB, new b2.b2Vec2());
                        d = b2.b2Vec2.SubVV(p2, p1, new b2.b2Vec2());
                        jd.length = d.Length();
                        this.m_joints[5] = this.m_world.CreateJoint(jd);
                        jd.bodyA = body2;
                        jd.bodyB = body3;
                        b2.b2LinearStiffness(jd, frequencyHz, dampingRatio, jd.bodyA, jd.bodyB);
                        jd.localAnchorA.Set(-0.5, 0.0);
                        jd.localAnchorB.Set(0.5, 0.0);
                        p1 = jd.bodyA.GetWorldPoint(jd.localAnchorA, new b2.b2Vec2());
                        p2 = jd.bodyB.GetWorldPoint(jd.localAnchorB, new b2.b2Vec2());
                        d = b2.b2Vec2.SubVV(p2, p1, new b2.b2Vec2());
                        jd.length = d.Length();
                        this.m_joints[6] = this.m_world.CreateJoint(jd);
                        jd.bodyA = body3;
                        jd.bodyB = body0;
                        b2.b2LinearStiffness(jd, frequencyHz, dampingRatio, jd.bodyA, jd.bodyB);
                        jd.localAnchorA.Set(0.0, -0.5);
                        jd.localAnchorB.Set(0.0, 0.5);
                        p1 = jd.bodyA.GetWorldPoint(jd.localAnchorA, new b2.b2Vec2());
                        p2 = jd.bodyB.GetWorldPoint(jd.localAnchorB, new b2.b2Vec2());
                        d = b2.b2Vec2.SubVV(p2, p1, new b2.b2Vec2());
                        jd.length = d.Length();
                        this.m_joints[7] = this.m_world.CreateJoint(jd);
                    }
                }
                JointDestroyed(joint) {
                    for (let i = 0; i < 8; ++i) {
                        if (this.m_joints[i] === joint) {
                            this.m_joints[i] = null;
                            break;
                        }
                    }
                }
                Keyboard(key) {
                    switch (key) {
                        case "b":
                            for (let i = 0; i < 4; ++i) {
                                const body = this.m_bodies[i];
                                if (body) {
                                    this.m_world.DestroyBody(body);
                                    this.m_bodies[i] = null;
                                    break;
                                }
                            }
                            break;
                        case "j":
                            for (let i = 0; i < 8; ++i) {
                                const joint = this.m_joints[i];
                                if (joint) {
                                    this.m_world.DestroyJoint(joint);
                                    this.m_joints[i] = null;
                                    break;
                                }
                            }
                            break;
                    }
                }
                Step(settings) {
                    super.Step(settings);
                    testbed.g_debugDraw.DrawString(5, this.m_textLine, "Press: (b) to delete a body, (j) to delete a joint");
                    this.m_textLine += testbed.DRAW_STRING_NEW_LINE;
                }
                static Create() {
                    return new Web();
                }
            };
            exports_1("Web", Web);
            exports_1("testIndex", testIndex = testbed.RegisterTest("Examples", "Web", Web.Create));
        }
    };
});
//# sourceMappingURL=web.js.map