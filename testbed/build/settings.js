// MIT License
System.register([], function (exports_1, context_1) {
    "use strict";
    var Settings;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
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
            Settings = class Settings {
                constructor() {
                    this.m_testIndex = 0;
                    this.m_windowWidth = 1600;
                    this.m_windowHeight = 900;
                    this.m_hertz = 60;
                    this.m_velocityIterations = 8;
                    this.m_positionIterations = 3;
                    this.m_drawShapes = true;
                    this.m_drawJoints = true;
                    this.m_drawAABBs = false;
                    this.m_drawContactPoints = false;
                    this.m_drawContactNormals = false;
                    this.m_drawContactImpulse = false;
                    this.m_drawFrictionImpulse = false;
                    this.m_drawCOMs = false;
                    this.m_drawControllers = true;
                    this.m_drawStats = false;
                    this.m_drawProfile = false;
                    this.m_enableWarmStarting = true;
                    this.m_enableContinuous = true;
                    this.m_enableSubStepping = false;
                    this.m_enableSleep = true;
                    this.m_pause = false;
                    this.m_singleStep = false;
                }
                Reset() {
                    this.m_testIndex = 0;
                    this.m_windowWidth = 1600;
                    this.m_windowHeight = 900;
                    this.m_hertz = 60;
                    this.m_velocityIterations = 8;
                    this.m_positionIterations = 3;
                    this.m_drawShapes = true;
                    this.m_drawJoints = true;
                    this.m_drawAABBs = false;
                    this.m_drawContactPoints = false;
                    this.m_drawContactNormals = false;
                    this.m_drawContactImpulse = false;
                    this.m_drawFrictionImpulse = false;
                    this.m_drawCOMs = false;
                    this.m_drawStats = false;
                    this.m_drawProfile = false;
                    this.m_enableWarmStarting = true;
                    this.m_enableContinuous = true;
                    this.m_enableSubStepping = false;
                    this.m_enableSleep = true;
                    this.m_pause = false;
                    this.m_singleStep = false;
                }
                Save() { }
                Load() { }
            };
            exports_1("Settings", Settings);
        }
    };
});
//# sourceMappingURL=settings.js.map