/*
* Copyright (c) 2006-2009 Erin Catto http://www.box2d.org
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
System.register([], function (exports_1, context_1) {
    "use strict";
    var b2_maxFloat, b2_epsilon, b2_epsilon_sq, b2_pi, b2_lengthUnitsPerMeter, b2_maxPolygonVertices, b2_maxManifoldPoints, b2_aabbExtension, b2_aabbMultiplier, b2_linearSlop, b2_angularSlop, b2_polygonRadius, b2_maxSubSteps, b2_maxTOIContacts, b2_maxLinearCorrection, b2_maxAngularCorrection, b2_maxTranslation, b2_maxTranslationSquared, b2_maxRotation, b2_maxRotationSquared, b2_baumgarte, b2_toiBaumgarte, b2_timeToSleep, b2_linearSleepTolerance, b2_angularSleepTolerance, b2Version, b2_version, b2_branch, b2_commit;
    var __moduleName = context_1 && context_1.id;
    // import { b2_lengthUnitsPerMeter } from "./b2_settings.js";
    function b2Assert(condition, ...args) {
        if (!condition) {
            // debugger;
            throw new Error(...args);
        }
    }
    exports_1("b2Assert", b2Assert);
    function b2Maybe(value, def) {
        return value !== undefined ? value : def;
    }
    exports_1("b2Maybe", b2Maybe);
    function b2ParseInt(v) {
        return parseInt(v, 10);
    }
    exports_1("b2ParseInt", b2ParseInt);
    function b2ParseUInt(v) {
        return Math.abs(parseInt(v, 10));
    }
    exports_1("b2ParseUInt", b2ParseUInt);
    function b2MakeArray(length, init) {
        const a = new Array(length);
        for (let i = 0; i < length; ++i) {
            a[i] = init(i);
        }
        return a;
    }
    exports_1("b2MakeArray", b2MakeArray);
    function b2MakeNullArray(length) {
        const a = new Array(length);
        for (let i = 0; i < length; ++i) {
            a[i] = null;
        }
        return a;
    }
    exports_1("b2MakeNullArray", b2MakeNullArray);
    function b2MakeNumberArray(length, init = 0) {
        const a = new Array(length);
        for (let i = 0; i < length; ++i) {
            a[i] = init;
        }
        return a;
    }
    exports_1("b2MakeNumberArray", b2MakeNumberArray);
    return {
        setters: [],
        execute: function () {
            exports_1("b2_maxFloat", b2_maxFloat = 1E+37); // FLT_MAX instead of Number.MAX_VALUE;
            exports_1("b2_epsilon", b2_epsilon = 1E-5); // FLT_EPSILON instead of Number.EPSILON;
            exports_1("b2_epsilon_sq", b2_epsilon_sq = (b2_epsilon * b2_epsilon));
            exports_1("b2_pi", b2_pi = 3.14159265359); // Math.PI;
            /// @file
            /// Global tuning constants based on meters-kilograms-seconds (MKS) units.
            ///
            // Tunable Constants
            /// You can use this to change the length scale used by your game.
            /// For example for inches you could use 39.4.
            exports_1("b2_lengthUnitsPerMeter", b2_lengthUnitsPerMeter = 1.0);
            /// The maximum number of vertices on a convex polygon. You cannot increase
            /// this too much because b2BlockAllocator has a maximum object size.
            exports_1("b2_maxPolygonVertices", b2_maxPolygonVertices = 8);
            // Collision
            /// The maximum number of contact points between two convex shapes. Do
            /// not change this value.
            exports_1("b2_maxManifoldPoints", b2_maxManifoldPoints = 2);
            /// This is used to fatten AABBs in the dynamic tree. This allows proxies
            /// to move by a small amount without triggering a tree adjustment.
            /// This is in meters.
            exports_1("b2_aabbExtension", b2_aabbExtension = 0.1 * b2_lengthUnitsPerMeter);
            /// This is used to fatten AABBs in the dynamic tree. This is used to predict
            /// the future position based on the current displacement.
            /// This is a dimensionless multiplier.
            exports_1("b2_aabbMultiplier", b2_aabbMultiplier = 4);
            /// A small length used as a collision and constraint tolerance. Usually it is
            /// chosen to be numerically significant, but visually insignificant.
            exports_1("b2_linearSlop", b2_linearSlop = 0.005 * b2_lengthUnitsPerMeter);
            /// A small angle used as a collision and constraint tolerance. Usually it is
            /// chosen to be numerically significant, but visually insignificant.
            exports_1("b2_angularSlop", b2_angularSlop = 2 / 180 * b2_pi);
            /// The radius of the polygon/edge shape skin. This should not be modified. Making
            /// this smaller means polygons will have an insufficient buffer for continuous collision.
            /// Making it larger may create artifacts for vertex collision.
            exports_1("b2_polygonRadius", b2_polygonRadius = 2 * b2_linearSlop);
            /// Maximum number of sub-steps per contact in continuous physics simulation.
            exports_1("b2_maxSubSteps", b2_maxSubSteps = 8);
            // Dynamics
            /// Maximum number of contacts to be handled to solve a TOI impact.
            exports_1("b2_maxTOIContacts", b2_maxTOIContacts = 32);
            /// The maximum linear position correction used when solving constraints. This helps to
            /// prevent overshoot.
            exports_1("b2_maxLinearCorrection", b2_maxLinearCorrection = 0.2 * b2_lengthUnitsPerMeter);
            /// The maximum angular position correction used when solving constraints. This helps to
            /// prevent overshoot.
            exports_1("b2_maxAngularCorrection", b2_maxAngularCorrection = 8 / 180 * b2_pi);
            /// The maximum linear velocity of a body. This limit is very large and is used
            /// to prevent numerical problems. You shouldn't need to adjust this.
            exports_1("b2_maxTranslation", b2_maxTranslation = 2 * b2_lengthUnitsPerMeter);
            exports_1("b2_maxTranslationSquared", b2_maxTranslationSquared = b2_maxTranslation * b2_maxTranslation);
            /// The maximum angular velocity of a body. This limit is very large and is used
            /// to prevent numerical problems. You shouldn't need to adjust this.
            exports_1("b2_maxRotation", b2_maxRotation = 0.5 * b2_pi);
            exports_1("b2_maxRotationSquared", b2_maxRotationSquared = b2_maxRotation * b2_maxRotation);
            /// This scale factor controls how fast overlap is resolved. Ideally this would be 1 so
            /// that overlap is removed in one time step. However using values close to 1 often lead
            /// to overshoot.
            exports_1("b2_baumgarte", b2_baumgarte = 0.2);
            exports_1("b2_toiBaumgarte", b2_toiBaumgarte = 0.75);
            // Sleep
            /// The time that a body must be still before it will go to sleep.
            exports_1("b2_timeToSleep", b2_timeToSleep = 0.5);
            /// A body cannot sleep if its linear velocity is above this tolerance.
            exports_1("b2_linearSleepTolerance", b2_linearSleepTolerance = 0.01 * b2_lengthUnitsPerMeter);
            /// A body cannot sleep if its angular velocity is above this tolerance.
            exports_1("b2_angularSleepTolerance", b2_angularSleepTolerance = 2 / 180 * b2_pi);
            // FILE* b2_dumpFile = nullptr;
            // void b2OpenDump(const char* fileName)
            // {
            // 	b2Assert(b2_dumpFile == nullptr);
            // 	b2_dumpFile = fopen(fileName, "w");
            // }
            // void b2Dump(const char* string, ...)
            // {
            // 	if (b2_dumpFile == nullptr)
            // 	{
            // 		return;
            // 	}
            // 	va_list args;
            // 	va_start(args, string);
            // 	vfprintf(b2_dumpFile, string, args);
            // 	va_end(args);
            // }
            // void b2CloseDump()
            // {
            // 	fclose(b2_dumpFile);
            // 	b2_dumpFile = nullptr;
            // }
            /// Version numbering scheme.
            /// See http://en.wikipedia.org/wiki/Software_versioning
            b2Version = class b2Version {
                constructor(major = 0, minor = 0, revision = 0) {
                    this.major = 0; ///< significant changes
                    this.minor = 0; ///< incremental changes
                    this.revision = 0; ///< bug fixes
                    this.major = major;
                    this.minor = minor;
                    this.revision = revision;
                }
                toString() {
                    return this.major + "." + this.minor + "." + this.revision;
                }
            };
            exports_1("b2Version", b2Version);
            /// Current version.
            exports_1("b2_version", b2_version = new b2Version(2, 4, 1));
            exports_1("b2_branch", b2_branch = "master");
            exports_1("b2_commit", b2_commit = "9ebbbcd960ad424e03e5de6e66a40764c16f51bc");
        }
    };
});
//# sourceMappingURL=b2_common.js.map