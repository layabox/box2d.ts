// MIT License
System.register(["@box2d", "./draw.js"], function (exports_1, context_1) {
    "use strict";
    var b2, draw_js_1, DRAW_STRING_NEW_LINE, TestEntry, g_testEntries, DestructionListener, ContactPoint, Test;
    var __moduleName = context_1 && context_1.id;
    function RandomFloat(lo = -1, hi = 1) {
        let r = Math.random();
        r = (hi - lo) * r + lo;
        return r;
    }
    exports_1("RandomFloat", RandomFloat);
    function RegisterTest(category, name, fcn) {
        return g_testEntries.push(new TestEntry(category, name, fcn));
    }
    exports_1("RegisterTest", RegisterTest);
    return {
        setters: [
            function (b2_1) {
                b2 = b2_1;
            },
            function (draw_js_1_1) {
                draw_js_1 = draw_js_1_1;
            }
        ],
        execute: function () {
            exports_1("DRAW_STRING_NEW_LINE", DRAW_STRING_NEW_LINE = 16);
            TestEntry = class TestEntry {
                constructor(category, name, createFcn) {
                    this.category = "";
                    this.name = "unknown";
                    this.category = category;
                    this.name = name;
                    this.createFcn = createFcn;
                }
            };
            exports_1("TestEntry", TestEntry);
            exports_1("g_testEntries", g_testEntries = []);
            DestructionListener = class DestructionListener extends b2.b2DestructionListener {
                constructor(test) {
                    super();
                    this.test = test;
                }
                SayGoodbyeJoint(joint) {
                    if (this.test.m_mouseJoint === joint) {
                        this.test.m_mouseJoint = null;
                    }
                    else {
                        this.test.JointDestroyed(joint);
                    }
                }
                SayGoodbyeFixture(fixture) { }
            };
            exports_1("DestructionListener", DestructionListener);
            ContactPoint = class ContactPoint {
                constructor() {
                    this.normal = new b2.b2Vec2();
                    this.position = new b2.b2Vec2();
                    this.state = b2.b2PointState.b2_nullState;
                    this.normalImpulse = 0;
                    this.tangentImpulse = 0;
                    this.separation = 0;
                }
            };
            exports_1("ContactPoint", ContactPoint);
            Test = class Test extends b2.b2ContactListener {
                constructor() {
                    super();
                    this.m_bomb = null;
                    this.m_textLine = 30;
                    this.m_mouseJoint = null;
                    this.m_points = b2.b2MakeArray(Test.k_maxContactPoints, (i) => new ContactPoint());
                    this.m_pointCount = 0;
                    this.m_bombSpawnPoint = new b2.b2Vec2();
                    this.m_bombSpawning = false;
                    this.m_mouseWorld = new b2.b2Vec2();
                    this.m_stepCount = 0;
                    this.m_maxProfile = new b2.b2Profile();
                    this.m_totalProfile = new b2.b2Profile();
                    const gravity = new b2.b2Vec2(0, -10);
                    this.m_world = new b2.b2World(gravity);
                    this.m_bomb = null;
                    this.m_textLine = 30;
                    this.m_mouseJoint = null;
                    this.m_destructionListener = new DestructionListener(this);
                    this.m_world.SetDestructionListener(this.m_destructionListener);
                    this.m_world.SetContactListener(this);
                    this.m_world.SetDebugDraw(draw_js_1.g_debugDraw);
                    const bodyDef = new b2.b2BodyDef();
                    this.m_groundBody = this.m_world.CreateBody(bodyDef);
                }
                JointDestroyed(joint) { }
                BeginContact(contact) { }
                EndContact(contact) { }
                PreSolve(contact, oldManifold) {
                    const manifold = contact.GetManifold();
                    if (manifold.pointCount === 0) {
                        return;
                    }
                    const fixtureA = contact.GetFixtureA();
                    const fixtureB = contact.GetFixtureB();
                    const state1 = Test.PreSolve_s_state1;
                    const state2 = Test.PreSolve_s_state2;
                    b2.b2GetPointStates(state1, state2, oldManifold, manifold);
                    const worldManifold = Test.PreSolve_s_worldManifold;
                    contact.GetWorldManifold(worldManifold);
                    for (let i = 0; i < manifold.pointCount && this.m_pointCount < Test.k_maxContactPoints; ++i) {
                        const cp = this.m_points[this.m_pointCount];
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
                PostSolve(contact, impulse) { }
                Keyboard(key) { }
                KeyboardUp(key) { }
                SetTextLine(line) {
                    this.m_textLine = line;
                }
                DrawTitle(title) {
                    draw_js_1.g_debugDraw.DrawString(5, DRAW_STRING_NEW_LINE, title);
                    this.m_textLine = 3 * DRAW_STRING_NEW_LINE;
                }
                MouseDown(p) {
                    this.m_mouseWorld.Copy(p);
                    if (this.m_mouseJoint !== null) {
                        this.m_world.DestroyJoint(this.m_mouseJoint);
                        this.m_mouseJoint = null;
                    }
                    let hit_fixture = null; // HACK: tsc doesn't detect calling callbacks
                    // Query the world for overlapping shapes.
                    this.m_world.QueryPointAABB(p, (fixture) => {
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
                        const jd = new b2.b2MouseJointDef();
                        jd.bodyA = this.m_groundBody;
                        jd.bodyB = body;
                        jd.target.Copy(p);
                        jd.maxForce = 1000 * body.GetMass();
                        b2.b2LinearStiffness(jd, frequencyHz, dampingRatio, jd.bodyA, jd.bodyB);
                        this.m_mouseJoint = this.m_world.CreateJoint(jd);
                        body.SetAwake(true);
                    }
                }
                SpawnBomb(worldPt) {
                    this.m_bombSpawnPoint.Copy(worldPt);
                    this.m_bombSpawning = true;
                }
                CompleteBombSpawn(p) {
                    if (!this.m_bombSpawning) {
                        return;
                    }
                    const multiplier = 30;
                    const vel = b2.b2Vec2.SubVV(this.m_bombSpawnPoint, p, new b2.b2Vec2());
                    vel.SelfMul(multiplier);
                    this.LaunchBombAt(this.m_bombSpawnPoint, vel);
                    this.m_bombSpawning = false;
                }
                ShiftMouseDown(p) {
                    this.m_mouseWorld.Copy(p);
                    if (this.m_mouseJoint !== null) {
                        return;
                    }
                    this.SpawnBomb(p);
                }
                MouseUp(p) {
                    if (this.m_mouseJoint) {
                        this.m_world.DestroyJoint(this.m_mouseJoint);
                        this.m_mouseJoint = null;
                    }
                    if (this.m_bombSpawning) {
                        this.CompleteBombSpawn(p);
                    }
                }
                MouseMove(p) {
                    this.m_mouseWorld.Copy(p);
                    if (this.m_mouseJoint) {
                        this.m_mouseJoint.SetTarget(p);
                    }
                }
                LaunchBomb() {
                    const p = new b2.b2Vec2(b2.b2RandomRange(-15, 15), 30);
                    const v = b2.b2Vec2.MulSV(-5, p, new b2.b2Vec2());
                    this.LaunchBombAt(p, v);
                }
                LaunchBombAt(position, velocity) {
                    if (this.m_bomb) {
                        this.m_world.DestroyBody(this.m_bomb);
                        this.m_bomb = null;
                    }
                    const bd = new b2.b2BodyDef();
                    bd.type = b2.b2BodyType.b2_dynamicBody;
                    bd.position.Copy(position);
                    bd.bullet = true;
                    this.m_bomb = this.m_world.CreateBody(bd);
                    this.m_bomb.SetLinearVelocity(velocity);
                    const circle = new b2.b2CircleShape();
                    circle.m_radius = 0.3;
                    const fd = new b2.b2FixtureDef();
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
                Step(settings) {
                    let timeStep = settings.m_hertz > 0 ? 1 / settings.m_hertz : 0;
                    if (settings.m_pause) {
                        if (settings.m_singleStep) {
                            settings.m_singleStep = false;
                        }
                        else {
                            timeStep = 0;
                        }
                        draw_js_1.g_debugDraw.DrawString(5, this.m_textLine, "****PAUSED****");
                        this.m_textLine += DRAW_STRING_NEW_LINE;
                    }
                    let flags = b2.b2DrawFlags.e_none;
                    if (settings.m_drawShapes) {
                        flags |= b2.b2DrawFlags.e_shapeBit;
                    }
                    if (settings.m_drawJoints) {
                        flags |= b2.b2DrawFlags.e_jointBit;
                    }
                    if (settings.m_drawAABBs) {
                        flags |= b2.b2DrawFlags.e_aabbBit;
                    }
                    if (settings.m_drawCOMs) {
                        flags |= b2.b2DrawFlags.e_centerOfMassBit;
                    }
                    draw_js_1.g_debugDraw.SetFlags(flags);
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
                        draw_js_1.g_debugDraw.DrawString(5, this.m_textLine, "bodies/contacts/joints = " + bodyCount + "/" + contactCount + "/" + jointCount);
                        this.m_textLine += DRAW_STRING_NEW_LINE;
                        const proxyCount = this.m_world.GetProxyCount();
                        const height = this.m_world.GetTreeHeight();
                        const balance = this.m_world.GetTreeBalance();
                        const quality = this.m_world.GetTreeQuality();
                        draw_js_1.g_debugDraw.DrawString(5, this.m_textLine, "proxies/height/balance/quality = " + proxyCount + "/" + height + "/" + balance + "/" + quality.toFixed(2));
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
                        const aveProfile = new b2.b2Profile();
                        if (this.m_stepCount > 0) {
                            const scale = 1 / this.m_stepCount;
                            aveProfile.step = scale * this.m_totalProfile.step;
                            aveProfile.collide = scale * this.m_totalProfile.collide;
                            aveProfile.solve = scale * this.m_totalProfile.solve;
                            aveProfile.solveInit = scale * this.m_totalProfile.solveInit;
                            aveProfile.solveVelocity = scale * this.m_totalProfile.solveVelocity;
                            aveProfile.solvePosition = scale * this.m_totalProfile.solvePosition;
                            aveProfile.solveTOI = scale * this.m_totalProfile.solveTOI;
                            aveProfile.broadphase = scale * this.m_totalProfile.broadphase;
                        }
                        draw_js_1.g_debugDraw.DrawString(5, this.m_textLine, "step [ave] (max) = " + p.step.toFixed(2) + " [" + aveProfile.step.toFixed(2) + "] (" + this.m_maxProfile.step.toFixed(2) + ")");
                        this.m_textLine += DRAW_STRING_NEW_LINE;
                        draw_js_1.g_debugDraw.DrawString(5, this.m_textLine, "collide [ave] (max) = " + p.collide.toFixed(2) + " [" + aveProfile.collide.toFixed(2) + "] (" + this.m_maxProfile.collide.toFixed(2) + ")");
                        this.m_textLine += DRAW_STRING_NEW_LINE;
                        draw_js_1.g_debugDraw.DrawString(5, this.m_textLine, "solve [ave] (max) = " + p.solve.toFixed(2) + " [" + aveProfile.solve.toFixed(2) + "] (" + this.m_maxProfile.solve.toFixed(2) + ")");
                        this.m_textLine += DRAW_STRING_NEW_LINE;
                        draw_js_1.g_debugDraw.DrawString(5, this.m_textLine, "solve init [ave] (max) = " + p.solveInit.toFixed(2) + " [" + aveProfile.solveInit.toFixed(2) + "] (" + this.m_maxProfile.solveInit.toFixed(2) + ")");
                        this.m_textLine += DRAW_STRING_NEW_LINE;
                        draw_js_1.g_debugDraw.DrawString(5, this.m_textLine, "solve velocity [ave] (max) = " + p.solveVelocity.toFixed(2) + " [" + aveProfile.solveVelocity.toFixed(2) + "] (" + this.m_maxProfile.solveVelocity.toFixed(2) + ")");
                        this.m_textLine += DRAW_STRING_NEW_LINE;
                        draw_js_1.g_debugDraw.DrawString(5, this.m_textLine, "solve position [ave] (max) = " + p.solvePosition.toFixed(2) + " [" + aveProfile.solvePosition.toFixed(2) + "] (" + this.m_maxProfile.solvePosition.toFixed(2) + ")");
                        this.m_textLine += DRAW_STRING_NEW_LINE;
                        draw_js_1.g_debugDraw.DrawString(5, this.m_textLine, "solveTOI [ave] (max) = " + p.solveTOI.toFixed(2) + " [" + aveProfile.solveTOI.toFixed(2) + "] (" + this.m_maxProfile.solveTOI.toFixed(2) + ")");
                        this.m_textLine += DRAW_STRING_NEW_LINE;
                        draw_js_1.g_debugDraw.DrawString(5, this.m_textLine, "broad-phase [ave] (max) = " + p.broadphase.toFixed(2) + " [" + aveProfile.broadphase.toFixed(2) + "] (" + this.m_maxProfile.broadphase.toFixed(2) + ")");
                        this.m_textLine += DRAW_STRING_NEW_LINE;
                    }
                    if (this.m_bombSpawning) {
                        const c = new b2.b2Color(0, 0, 1);
                        draw_js_1.g_debugDraw.DrawPoint(this.m_bombSpawnPoint, 4, c);
                        c.SetRGB(0.8, 0.8, 0.8);
                        draw_js_1.g_debugDraw.DrawSegment(this.m_mouseWorld, this.m_bombSpawnPoint, c);
                    }
                    if (settings.m_drawContactPoints) {
                        const k_impulseScale = 0.1;
                        const k_axisScale = 0.3;
                        for (let i = 0; i < this.m_pointCount; ++i) {
                            const point = this.m_points[i];
                            if (point.state === b2.b2PointState.b2_addState) {
                                // Add
                                draw_js_1.g_debugDraw.DrawPoint(point.position, 10, new b2.b2Color(0.3, 0.95, 0.3));
                            }
                            else if (point.state === b2.b2PointState.b2_persistState) {
                                // Persist
                                draw_js_1.g_debugDraw.DrawPoint(point.position, 5, new b2.b2Color(0.3, 0.3, 0.95));
                            }
                            if (settings.m_drawContactNormals) {
                                const p1 = point.position;
                                const p2 = b2.b2Vec2.AddVV(p1, b2.b2Vec2.MulSV(k_axisScale, point.normal, b2.b2Vec2.s_t0), new b2.b2Vec2());
                                draw_js_1.g_debugDraw.DrawSegment(p1, p2, new b2.b2Color(0.9, 0.9, 0.9));
                            }
                            else if (settings.m_drawContactImpulse) {
                                const p1 = point.position;
                                const p2 = b2.b2Vec2.AddVMulSV(p1, k_impulseScale * point.normalImpulse, point.normal, new b2.b2Vec2());
                                draw_js_1.g_debugDraw.DrawSegment(p1, p2, new b2.b2Color(0.9, 0.9, 0.3));
                            }
                            if (settings.m_drawFrictionImpulse) {
                                const tangent = b2.b2Vec2.CrossVOne(point.normal, new b2.b2Vec2());
                                const p1 = point.position;
                                const p2 = b2.b2Vec2.AddVMulSV(p1, k_impulseScale * point.tangentImpulse, tangent, new b2.b2Vec2());
                                draw_js_1.g_debugDraw.DrawSegment(p1, p2, new b2.b2Color(0.9, 0.9, 0.3));
                            }
                        }
                    }
                }
                ShiftOrigin(newOrigin) {
                    this.m_world.ShiftOrigin(newOrigin);
                }
                GetDefaultViewZoom() {
                    return 1.0;
                }
            };
            exports_1("Test", Test);
            Test.k_maxContactPoints = 2048;
            Test.PreSolve_s_state1 = [ /*b2.b2maxManifoldPoints*/];
            Test.PreSolve_s_state2 = [ /*b2.b2maxManifoldPoints*/];
            Test.PreSolve_s_worldManifold = new b2.b2WorldManifold();
        }
    };
});
//# sourceMappingURL=test.js.map