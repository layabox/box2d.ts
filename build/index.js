System.register(["./common/b2_block_allocator.js", "./common/b2_draw.js", "./common/b2_growable_stack.js", "./common/b2_math.js", "./common/b2_settings.js", "./common/b2_stack_allocator.js", "./common/b2_timer.js", "./collision/b2_broad_phase.js", "./collision/b2_chain_shape.js", "./collision/b2_circle_shape.js", "./collision/b2_collide_circle.js", "./collision/b2_collide_edge.js", "./collision/b2_collide_polygon.js", "./collision/b2_collision.js", "./collision/b2_distance.js", "./collision/b2_dynamic_tree.js", "./collision/b2_edge_shape.js", "./collision/b2_polygon_shape.js", "./collision/b2_shape.js", "./collision/b2_time_of_impact.js", "./dynamics/b2_area_joint.js", "./dynamics/b2_body.js", "./dynamics/b2_chain_circle_contact.js", "./dynamics/b2_chain_polygon_contact.js", "./dynamics/b2_circle_contact.js", "./dynamics/b2_contact_factory.js", "./dynamics/b2_contact_manager.js", "./dynamics/b2_contact_solver.js", "./dynamics/b2_contact.js", "./dynamics/b2_distance_joint.js", "./dynamics/b2_edge_circle_contact.js", "./dynamics/b2_edge_polygon_contact.js", "./dynamics/b2_fixture.js", "./dynamics/b2_friction_joint.js", "./dynamics/b2_gear_joint.js", "./dynamics/b2_island.js", "./dynamics/b2_joint.js", "./dynamics/b2_motor_joint.js", "./dynamics/b2_mouse_joint.js", "./dynamics/b2_polygon_circle_contact.js", "./dynamics/b2_polygon_contact.js", "./dynamics/b2_prismatic_joint.js", "./dynamics/b2_pulley_joint.js", "./dynamics/b2_revolute_joint.js", "./dynamics/b2_time_step.js", "./dynamics/b2_weld_joint.js", "./dynamics/b2_wheel_joint.js", "./dynamics/b2_world_callbacks.js", "./dynamics/b2_world.js", "./rope/b2_rope.js"], function (exports_1, context_1) {
    "use strict";
    var b2_body_js_1, staticBody, kinematicBody, dynamicBody, b2_rope_js_1, springAngleBendingModel, pbdAngleBendingModel, xpbdAngleBendingModel, pbdDistanceBendingModel, pbdHeightBendingModel, pbdTriangleBendingModel, b2_rope_js_2, pbdStretchingModel, xpbdStretchingModel;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (b2_block_allocator_js_1_1) {
                exports_1({
                    "b2BlockAllocator": b2_block_allocator_js_1_1["b2BlockAllocator"]
                });
            },
            function (b2_draw_js_1_1) {
                exports_1({
                    "b2Draw": b2_draw_js_1_1["b2Draw"]
                });
                exports_1({
                    "b2Color": b2_draw_js_1_1["b2Color"]
                });
                exports_1({
                    "b2DrawFlags": b2_draw_js_1_1["b2DrawFlags"]
                });
            },
            function (b2_growable_stack_js_1_1) {
                exports_1({
                    "b2GrowableStack": b2_growable_stack_js_1_1["b2GrowableStack"]
                });
            },
            function (b2_math_js_1_1) {
                exports_1({
                    "b2Mat22": b2_math_js_1_1["b2Mat22"]
                });
                exports_1({
                    "b2Mat33": b2_math_js_1_1["b2Mat33"]
                });
                exports_1({
                    "b2Rot": b2_math_js_1_1["b2Rot"]
                });
                exports_1({
                    "b2Sweep": b2_math_js_1_1["b2Sweep"]
                });
                exports_1({
                    "b2Transform": b2_math_js_1_1["b2Transform"]
                });
                exports_1({
                    "b2Vec2": b2_math_js_1_1["b2Vec2"]
                });
                exports_1({
                    "b2Vec3": b2_math_js_1_1["b2Vec3"]
                });
                exports_1({
                    "b2_pi_over_180": b2_math_js_1_1["b2_pi_over_180"]
                });
                exports_1({
                    "b2_180_over_pi": b2_math_js_1_1["b2_180_over_pi"]
                });
                exports_1({
                    "b2_two_pi": b2_math_js_1_1["b2_two_pi"]
                });
                exports_1({
                    "b2Abs": b2_math_js_1_1["b2Abs"]
                });
                exports_1({
                    "b2Acos": b2_math_js_1_1["b2Acos"]
                });
                exports_1({
                    "b2Asin": b2_math_js_1_1["b2Asin"]
                });
                exports_1({
                    "b2Atan2": b2_math_js_1_1["b2Atan2"]
                });
                exports_1({
                    "b2Cos": b2_math_js_1_1["b2Cos"]
                });
                exports_1({
                    "b2IsValid": b2_math_js_1_1["b2IsValid"]
                });
                exports_1({
                    "b2Pow": b2_math_js_1_1["b2Pow"]
                });
                exports_1({
                    "b2Sin": b2_math_js_1_1["b2Sin"]
                });
                exports_1({
                    "b2Sqrt": b2_math_js_1_1["b2Sqrt"]
                });
                exports_1({
                    "b2Vec2_zero": b2_math_js_1_1["b2Vec2_zero"]
                });
                exports_1({
                    "b2Clamp": b2_math_js_1_1["b2Clamp"]
                });
                exports_1({
                    "b2DegToRad": b2_math_js_1_1["b2DegToRad"]
                });
                exports_1({
                    "b2InvSqrt": b2_math_js_1_1["b2InvSqrt"]
                });
                exports_1({
                    "b2IsPowerOfTwo": b2_math_js_1_1["b2IsPowerOfTwo"]
                });
                exports_1({
                    "b2Max": b2_math_js_1_1["b2Max"]
                });
                exports_1({
                    "b2Min": b2_math_js_1_1["b2Min"]
                });
                exports_1({
                    "b2NextPowerOfTwo": b2_math_js_1_1["b2NextPowerOfTwo"]
                });
                exports_1({
                    "b2RadToDeg": b2_math_js_1_1["b2RadToDeg"]
                });
                exports_1({
                    "b2Random": b2_math_js_1_1["b2Random"]
                });
                exports_1({
                    "b2RandomRange": b2_math_js_1_1["b2RandomRange"]
                });
                exports_1({
                    "b2Sq": b2_math_js_1_1["b2Sq"]
                });
                exports_1({
                    "b2Swap": b2_math_js_1_1["b2Swap"]
                });
            },
            function (b2_settings_js_1_1) {
                exports_1({
                    "b2Version": b2_settings_js_1_1["b2Version"]
                });
                exports_1({
                    "b2_aabbExtension": b2_settings_js_1_1["b2_aabbExtension"]
                });
                exports_1({
                    "b2_aabbMultiplier": b2_settings_js_1_1["b2_aabbMultiplier"]
                });
                exports_1({
                    "b2_angularSleepTolerance": b2_settings_js_1_1["b2_angularSleepTolerance"]
                });
                exports_1({
                    "b2_angularSlop": b2_settings_js_1_1["b2_angularSlop"]
                });
                exports_1({
                    "b2_baumgarte": b2_settings_js_1_1["b2_baumgarte"]
                });
                exports_1({
                    "b2_branch": b2_settings_js_1_1["b2_branch"]
                });
                exports_1({
                    "b2_commit": b2_settings_js_1_1["b2_commit"]
                });
                exports_1({
                    "b2_epsilon": b2_settings_js_1_1["b2_epsilon"]
                });
                exports_1({
                    "b2_epsilon_sq": b2_settings_js_1_1["b2_epsilon_sq"]
                });
                exports_1({
                    "b2_lengthUnitsPerMeter": b2_settings_js_1_1["b2_lengthUnitsPerMeter"]
                });
                exports_1({
                    "b2_linearSleepTolerance": b2_settings_js_1_1["b2_linearSleepTolerance"]
                });
                exports_1({
                    "b2_linearSlop": b2_settings_js_1_1["b2_linearSlop"]
                });
                exports_1({
                    "b2_maxAngularCorrection": b2_settings_js_1_1["b2_maxAngularCorrection"]
                });
                exports_1({
                    "b2_maxFloat": b2_settings_js_1_1["b2_maxFloat"]
                });
                exports_1({
                    "b2_maxLinearCorrection": b2_settings_js_1_1["b2_maxLinearCorrection"]
                });
                exports_1({
                    "b2_maxManifoldPoints": b2_settings_js_1_1["b2_maxManifoldPoints"]
                });
                exports_1({
                    "b2_maxPolygonVertices": b2_settings_js_1_1["b2_maxPolygonVertices"]
                });
                exports_1({
                    "b2_maxRotation": b2_settings_js_1_1["b2_maxRotation"]
                });
                exports_1({
                    "b2_maxRotationSquared": b2_settings_js_1_1["b2_maxRotationSquared"]
                });
                exports_1({
                    "b2_maxSubSteps": b2_settings_js_1_1["b2_maxSubSteps"]
                });
                exports_1({
                    "b2_maxTOIContacts": b2_settings_js_1_1["b2_maxTOIContacts"]
                });
                exports_1({
                    "b2_maxTranslation": b2_settings_js_1_1["b2_maxTranslation"]
                });
                exports_1({
                    "b2_maxTranslationSquared": b2_settings_js_1_1["b2_maxTranslationSquared"]
                });
                exports_1({
                    "b2_pi": b2_settings_js_1_1["b2_pi"]
                });
                exports_1({
                    "b2_polygonRadius": b2_settings_js_1_1["b2_polygonRadius"]
                });
                exports_1({
                    "b2_timeToSleep": b2_settings_js_1_1["b2_timeToSleep"]
                });
                exports_1({
                    "b2_toiBaumgarte": b2_settings_js_1_1["b2_toiBaumgarte"]
                });
                exports_1({
                    "b2_version": b2_settings_js_1_1["b2_version"]
                });
                exports_1({
                    "b2Alloc": b2_settings_js_1_1["b2Alloc"]
                });
                exports_1({
                    "b2Assert": b2_settings_js_1_1["b2Assert"]
                });
                exports_1({
                    "b2Free": b2_settings_js_1_1["b2Free"]
                });
                exports_1({
                    "b2Log": b2_settings_js_1_1["b2Log"]
                });
                exports_1({
                    "b2MakeArray": b2_settings_js_1_1["b2MakeArray"]
                });
                exports_1({
                    "b2MakeNullArray": b2_settings_js_1_1["b2MakeNullArray"]
                });
                exports_1({
                    "b2MakeNumberArray": b2_settings_js_1_1["b2MakeNumberArray"]
                });
                exports_1({
                    "b2Maybe": b2_settings_js_1_1["b2Maybe"]
                });
                exports_1({
                    "b2ParseInt": b2_settings_js_1_1["b2ParseInt"]
                });
                exports_1({
                    "b2ParseUInt": b2_settings_js_1_1["b2ParseUInt"]
                });
            },
            function (b2_stack_allocator_js_1_1) {
                exports_1({
                    "b2StackAllocator": b2_stack_allocator_js_1_1["b2StackAllocator"]
                });
            },
            function (b2_timer_js_1_1) {
                exports_1({
                    "b2Counter": b2_timer_js_1_1["b2Counter"]
                });
                exports_1({
                    "b2Timer": b2_timer_js_1_1["b2Timer"]
                });
            },
            function (b2_broad_phase_js_1_1) {
                exports_1({
                    "b2BroadPhase": b2_broad_phase_js_1_1["b2BroadPhase"]
                });
                exports_1({
                    "b2Pair": b2_broad_phase_js_1_1["b2Pair"]
                });
            },
            function (b2_chain_shape_js_1_1) {
                exports_1({
                    "b2ChainShape": b2_chain_shape_js_1_1["b2ChainShape"]
                });
            },
            function (b2_circle_shape_js_1_1) {
                exports_1({
                    "b2CircleShape": b2_circle_shape_js_1_1["b2CircleShape"]
                });
            },
            function (b2_collide_circle_js_1_1) {
                exports_1({
                    "b2CollideCircles": b2_collide_circle_js_1_1["b2CollideCircles"]
                });
                exports_1({
                    "b2CollidePolygonAndCircle": b2_collide_circle_js_1_1["b2CollidePolygonAndCircle"]
                });
            },
            function (b2_collide_edge_js_1_1) {
                exports_1({
                    "b2CollideEdgeAndCircle": b2_collide_edge_js_1_1["b2CollideEdgeAndCircle"]
                });
                exports_1({
                    "b2CollideEdgeAndPolygon": b2_collide_edge_js_1_1["b2CollideEdgeAndPolygon"]
                });
            },
            function (b2_collide_polygon_js_1_1) {
                exports_1({
                    "b2CollidePolygons": b2_collide_polygon_js_1_1["b2CollidePolygons"]
                });
            },
            function (b2_collision_js_1_1) {
                exports_1({
                    "b2AABB": b2_collision_js_1_1["b2AABB"]
                });
                exports_1({
                    "b2ClipVertex": b2_collision_js_1_1["b2ClipVertex"]
                });
                exports_1({
                    "b2ContactFeature": b2_collision_js_1_1["b2ContactFeature"]
                });
                exports_1({
                    "b2ContactID": b2_collision_js_1_1["b2ContactID"]
                });
                exports_1({
                    "b2Manifold": b2_collision_js_1_1["b2Manifold"]
                });
                exports_1({
                    "b2ManifoldPoint": b2_collision_js_1_1["b2ManifoldPoint"]
                });
                exports_1({
                    "b2RayCastInput": b2_collision_js_1_1["b2RayCastInput"]
                });
                exports_1({
                    "b2RayCastOutput": b2_collision_js_1_1["b2RayCastOutput"]
                });
                exports_1({
                    "b2WorldManifold": b2_collision_js_1_1["b2WorldManifold"]
                });
                exports_1({
                    "b2ContactFeatureType": b2_collision_js_1_1["b2ContactFeatureType"]
                });
                exports_1({
                    "b2ManifoldType": b2_collision_js_1_1["b2ManifoldType"]
                });
                exports_1({
                    "b2PointState": b2_collision_js_1_1["b2PointState"]
                });
                exports_1({
                    "b2ClipSegmentToLine": b2_collision_js_1_1["b2ClipSegmentToLine"]
                });
                exports_1({
                    "b2GetPointStates": b2_collision_js_1_1["b2GetPointStates"]
                });
                exports_1({
                    "b2TestOverlapAABB": b2_collision_js_1_1["b2TestOverlapAABB"]
                });
                exports_1({
                    "b2TestOverlapShape": b2_collision_js_1_1["b2TestOverlapShape"]
                });
            },
            function (b2_distance_js_1_1) {
                exports_1({
                    "b2DistanceInput": b2_distance_js_1_1["b2DistanceInput"]
                });
                exports_1({
                    "b2DistanceOutput": b2_distance_js_1_1["b2DistanceOutput"]
                });
                exports_1({
                    "b2DistanceProxy": b2_distance_js_1_1["b2DistanceProxy"]
                });
                exports_1({
                    "b2ShapeCastInput": b2_distance_js_1_1["b2ShapeCastInput"]
                });
                exports_1({
                    "b2ShapeCastOutput": b2_distance_js_1_1["b2ShapeCastOutput"]
                });
                exports_1({
                    "b2Simplex": b2_distance_js_1_1["b2Simplex"]
                });
                exports_1({
                    "b2SimplexCache": b2_distance_js_1_1["b2SimplexCache"]
                });
                exports_1({
                    "b2SimplexVertex": b2_distance_js_1_1["b2SimplexVertex"]
                });
                exports_1({
                    "b2Distance": b2_distance_js_1_1["b2Distance"]
                });
                exports_1({
                    "b2_gjk_reset": b2_distance_js_1_1["b2_gjk_reset"]
                });
                exports_1({
                    "b2ShapeCast": b2_distance_js_1_1["b2ShapeCast"]
                });
                exports_1({
                    "b2_gjkCalls": b2_distance_js_1_1["b2_gjkCalls"]
                });
                exports_1({
                    "b2_gjkIters": b2_distance_js_1_1["b2_gjkIters"]
                });
                exports_1({
                    "b2_gjkMaxIters": b2_distance_js_1_1["b2_gjkMaxIters"]
                });
            },
            function (b2_dynamic_tree_js_1_1) {
                exports_1({
                    "b2DynamicTree": b2_dynamic_tree_js_1_1["b2DynamicTree"]
                });
                exports_1({
                    "b2TreeNode": b2_dynamic_tree_js_1_1["b2TreeNode"]
                });
            },
            function (b2_edge_shape_js_1_1) {
                exports_1({
                    "b2EdgeShape": b2_edge_shape_js_1_1["b2EdgeShape"]
                });
            },
            function (b2_polygon_shape_js_1_1) {
                exports_1({
                    "b2PolygonShape": b2_polygon_shape_js_1_1["b2PolygonShape"]
                });
            },
            function (b2_shape_js_1_1) {
                exports_1({
                    "b2Shape": b2_shape_js_1_1["b2Shape"]
                });
                exports_1({
                    "b2MassData": b2_shape_js_1_1["b2MassData"]
                });
                exports_1({
                    "b2ShapeType": b2_shape_js_1_1["b2ShapeType"]
                });
            },
            function (b2_time_of_impact_js_1_1) {
                exports_1({
                    "b2SeparationFunction": b2_time_of_impact_js_1_1["b2SeparationFunction"]
                });
                exports_1({
                    "b2TOIInput": b2_time_of_impact_js_1_1["b2TOIInput"]
                });
                exports_1({
                    "b2TOIOutput": b2_time_of_impact_js_1_1["b2TOIOutput"]
                });
                exports_1({
                    "b2SeparationFunctionType": b2_time_of_impact_js_1_1["b2SeparationFunctionType"]
                });
                exports_1({
                    "b2TOIOutputState": b2_time_of_impact_js_1_1["b2TOIOutputState"]
                });
                exports_1({
                    "b2TimeOfImpact": b2_time_of_impact_js_1_1["b2TimeOfImpact"]
                });
                exports_1({
                    "b2_toi_reset": b2_time_of_impact_js_1_1["b2_toi_reset"]
                });
                exports_1({
                    "b2_toiCalls": b2_time_of_impact_js_1_1["b2_toiCalls"]
                });
                exports_1({
                    "b2_toiIters": b2_time_of_impact_js_1_1["b2_toiIters"]
                });
                exports_1({
                    "b2_toiMaxIters": b2_time_of_impact_js_1_1["b2_toiMaxIters"]
                });
                exports_1({
                    "b2_toiMaxRootIters": b2_time_of_impact_js_1_1["b2_toiMaxRootIters"]
                });
                exports_1({
                    "b2_toiMaxTime": b2_time_of_impact_js_1_1["b2_toiMaxTime"]
                });
                exports_1({
                    "b2_toiRootIters": b2_time_of_impact_js_1_1["b2_toiRootIters"]
                });
                exports_1({
                    "b2_toiTime": b2_time_of_impact_js_1_1["b2_toiTime"]
                });
            },
            function (b2_area_joint_js_1_1) {
                exports_1({
                    "b2AreaJointDef": b2_area_joint_js_1_1["b2AreaJointDef"]
                });
                exports_1({
                    "b2AreaJoint": b2_area_joint_js_1_1["b2AreaJoint"]
                });
            },
            function (b2_body_js_2_1) {
                exports_1({
                    "b2Body": b2_body_js_2_1["b2Body"]
                });
                exports_1({
                    "b2BodyDef": b2_body_js_2_1["b2BodyDef"]
                });
                exports_1({
                    "b2BodyType": b2_body_js_2_1["b2BodyType"]
                });
                b2_body_js_1 = b2_body_js_2_1;
            },
            function (b2_chain_circle_contact_js_1_1) {
                exports_1({
                    "b2ChainAndCircleContact": b2_chain_circle_contact_js_1_1["b2ChainAndCircleContact"]
                });
            },
            function (b2_chain_polygon_contact_js_1_1) {
                exports_1({
                    "b2ChainAndPolygonContact": b2_chain_polygon_contact_js_1_1["b2ChainAndPolygonContact"]
                });
            },
            function (b2_circle_contact_js_1_1) {
                exports_1({
                    "b2CircleContact": b2_circle_contact_js_1_1["b2CircleContact"]
                });
            },
            function (b2_contact_factory_js_1_1) {
                exports_1({
                    "b2ContactFactory": b2_contact_factory_js_1_1["b2ContactFactory"]
                });
                exports_1({
                    "b2ContactRegister": b2_contact_factory_js_1_1["b2ContactRegister"]
                });
            },
            function (b2_contact_manager_js_1_1) {
                exports_1({
                    "b2ContactManager": b2_contact_manager_js_1_1["b2ContactManager"]
                });
            },
            function (b2_contact_solver_js_1_1) {
                exports_1({
                    "b2ContactPositionConstraint": b2_contact_solver_js_1_1["b2ContactPositionConstraint"]
                });
                exports_1({
                    "b2ContactSolver": b2_contact_solver_js_1_1["b2ContactSolver"]
                });
                exports_1({
                    "b2ContactSolverDef": b2_contact_solver_js_1_1["b2ContactSolverDef"]
                });
                exports_1({
                    "b2ContactVelocityConstraint": b2_contact_solver_js_1_1["b2ContactVelocityConstraint"]
                });
                exports_1({
                    "b2PositionSolverManifold": b2_contact_solver_js_1_1["b2PositionSolverManifold"]
                });
                exports_1({
                    "b2VelocityConstraintPoint": b2_contact_solver_js_1_1["b2VelocityConstraintPoint"]
                });
                exports_1({
                    "g_blockSolve": b2_contact_solver_js_1_1["g_blockSolve"]
                });
                exports_1({
                    "get_g_blockSolve": b2_contact_solver_js_1_1["get_g_blockSolve"]
                });
                exports_1({
                    "set_g_blockSolve": b2_contact_solver_js_1_1["set_g_blockSolve"]
                });
            },
            function (b2_contact_js_1_1) {
                exports_1({
                    "b2Contact": b2_contact_js_1_1["b2Contact"]
                });
                exports_1({
                    "b2ContactEdge": b2_contact_js_1_1["b2ContactEdge"]
                });
                exports_1({
                    "b2MixFriction": b2_contact_js_1_1["b2MixFriction"]
                });
                exports_1({
                    "b2MixRestitution": b2_contact_js_1_1["b2MixRestitution"]
                });
                exports_1({
                    "b2MixRestitutionThreshold": b2_contact_js_1_1["b2MixRestitutionThreshold"]
                });
            },
            function (b2_distance_joint_js_1_1) {
                exports_1({
                    "b2DistanceJointDef": b2_distance_joint_js_1_1["b2DistanceJointDef"]
                });
                exports_1({
                    "b2DistanceJoint": b2_distance_joint_js_1_1["b2DistanceJoint"]
                });
            },
            function (b2_edge_circle_contact_js_1_1) {
                exports_1({
                    "b2EdgeAndCircleContact": b2_edge_circle_contact_js_1_1["b2EdgeAndCircleContact"]
                });
            },
            function (b2_edge_polygon_contact_js_1_1) {
                exports_1({
                    "b2EdgeAndPolygonContact": b2_edge_polygon_contact_js_1_1["b2EdgeAndPolygonContact"]
                });
            },
            function (b2_fixture_js_1_1) {
                exports_1({
                    "b2Filter": b2_fixture_js_1_1["b2Filter"]
                });
                exports_1({
                    "b2Fixture": b2_fixture_js_1_1["b2Fixture"]
                });
                exports_1({
                    "b2FixtureDef": b2_fixture_js_1_1["b2FixtureDef"]
                });
                exports_1({
                    "b2FixtureProxy": b2_fixture_js_1_1["b2FixtureProxy"]
                });
            },
            function (b2_friction_joint_js_1_1) {
                exports_1({
                    "b2FrictionJointDef": b2_friction_joint_js_1_1["b2FrictionJointDef"]
                });
                exports_1({
                    "b2FrictionJoint": b2_friction_joint_js_1_1["b2FrictionJoint"]
                });
            },
            function (b2_gear_joint_js_1_1) {
                exports_1({
                    "b2GearJointDef": b2_gear_joint_js_1_1["b2GearJointDef"]
                });
                exports_1({
                    "b2GearJoint": b2_gear_joint_js_1_1["b2GearJoint"]
                });
            },
            function (b2_island_js_1_1) {
                exports_1({
                    "b2Island": b2_island_js_1_1["b2Island"]
                });
            },
            function (b2_joint_js_1_1) {
                exports_1({
                    "b2JointDef": b2_joint_js_1_1["b2JointDef"]
                });
                exports_1({
                    "b2Joint": b2_joint_js_1_1["b2Joint"]
                });
                exports_1({
                    "b2Jacobian": b2_joint_js_1_1["b2Jacobian"]
                });
                exports_1({
                    "b2JointEdge": b2_joint_js_1_1["b2JointEdge"]
                });
                exports_1({
                    "b2JointType": b2_joint_js_1_1["b2JointType"]
                });
                exports_1({
                    "b2AngularStiffness": b2_joint_js_1_1["b2AngularStiffness"]
                });
                exports_1({
                    "b2LinearStiffness": b2_joint_js_1_1["b2LinearStiffness"]
                });
            },
            function (b2_motor_joint_js_1_1) {
                exports_1({
                    "b2MotorJointDef": b2_motor_joint_js_1_1["b2MotorJointDef"]
                });
                exports_1({
                    "b2MotorJoint": b2_motor_joint_js_1_1["b2MotorJoint"]
                });
            },
            function (b2_mouse_joint_js_1_1) {
                exports_1({
                    "b2MouseJointDef": b2_mouse_joint_js_1_1["b2MouseJointDef"]
                });
                exports_1({
                    "b2MouseJoint": b2_mouse_joint_js_1_1["b2MouseJoint"]
                });
            },
            function (b2_polygon_circle_contact_js_1_1) {
                exports_1({
                    "b2PolygonAndCircleContact": b2_polygon_circle_contact_js_1_1["b2PolygonAndCircleContact"]
                });
            },
            function (b2_polygon_contact_js_1_1) {
                exports_1({
                    "b2PolygonContact": b2_polygon_contact_js_1_1["b2PolygonContact"]
                });
            },
            function (b2_prismatic_joint_js_1_1) {
                exports_1({
                    "b2PrismaticJointDef": b2_prismatic_joint_js_1_1["b2PrismaticJointDef"]
                });
                exports_1({
                    "b2PrismaticJoint": b2_prismatic_joint_js_1_1["b2PrismaticJoint"]
                });
            },
            function (b2_pulley_joint_js_1_1) {
                exports_1({
                    "b2PulleyJointDef": b2_pulley_joint_js_1_1["b2PulleyJointDef"]
                });
                exports_1({
                    "b2PulleyJoint": b2_pulley_joint_js_1_1["b2PulleyJoint"]
                });
                exports_1({
                    "b2_minPulleyLength": b2_pulley_joint_js_1_1["b2_minPulleyLength"]
                });
            },
            function (b2_revolute_joint_js_1_1) {
                exports_1({
                    "b2RevoluteJointDef": b2_revolute_joint_js_1_1["b2RevoluteJointDef"]
                });
                exports_1({
                    "b2RevoluteJoint": b2_revolute_joint_js_1_1["b2RevoluteJoint"]
                });
            },
            function (b2_time_step_js_1_1) {
                exports_1({
                    "b2Position": b2_time_step_js_1_1["b2Position"]
                });
                exports_1({
                    "b2Profile": b2_time_step_js_1_1["b2Profile"]
                });
                exports_1({
                    "b2SolverData": b2_time_step_js_1_1["b2SolverData"]
                });
                exports_1({
                    "b2TimeStep": b2_time_step_js_1_1["b2TimeStep"]
                });
                exports_1({
                    "b2Velocity": b2_time_step_js_1_1["b2Velocity"]
                });
            },
            function (b2_weld_joint_js_1_1) {
                exports_1({
                    "b2WeldJointDef": b2_weld_joint_js_1_1["b2WeldJointDef"]
                });
                exports_1({
                    "b2WeldJoint": b2_weld_joint_js_1_1["b2WeldJoint"]
                });
            },
            function (b2_wheel_joint_js_1_1) {
                exports_1({
                    "b2WheelJointDef": b2_wheel_joint_js_1_1["b2WheelJointDef"]
                });
                exports_1({
                    "b2WheelJoint": b2_wheel_joint_js_1_1["b2WheelJoint"]
                });
            },
            function (b2_world_callbacks_js_1_1) {
                exports_1({
                    "b2ContactFilter": b2_world_callbacks_js_1_1["b2ContactFilter"]
                });
                exports_1({
                    "b2ContactImpulse": b2_world_callbacks_js_1_1["b2ContactImpulse"]
                });
                exports_1({
                    "b2ContactListener": b2_world_callbacks_js_1_1["b2ContactListener"]
                });
                exports_1({
                    "b2DestructionListener": b2_world_callbacks_js_1_1["b2DestructionListener"]
                });
                exports_1({
                    "b2QueryCallback": b2_world_callbacks_js_1_1["b2QueryCallback"]
                });
                exports_1({
                    "b2RayCastCallback": b2_world_callbacks_js_1_1["b2RayCastCallback"]
                });
            },
            function (b2_world_js_1_1) {
                exports_1({
                    "b2World": b2_world_js_1_1["b2World"]
                });
            },
            function (b2_rope_js_3_1) {
                exports_1({
                    "b2RopeDef": b2_rope_js_3_1["b2RopeDef"]
                });
                exports_1({
                    "b2Rope": b2_rope_js_3_1["b2Rope"]
                });
                exports_1({
                    "b2RopeTuning": b2_rope_js_3_1["b2RopeTuning"]
                });
                exports_1({
                    "b2BendingModel": b2_rope_js_3_1["b2BendingModel"]
                });
                b2_rope_js_1 = b2_rope_js_3_1;
                exports_1({
                    "b2StretchingModel": b2_rope_js_3_1["b2StretchingModel"]
                });
                b2_rope_js_2 = b2_rope_js_3_1;
            }
        ],
        execute: function () {
            exports_1("staticBody", staticBody = b2_body_js_1.b2BodyType.b2_staticBody);
            exports_1("kinematicBody", kinematicBody = b2_body_js_1.b2BodyType.b2_kinematicBody);
            exports_1("dynamicBody", dynamicBody = b2_body_js_1.b2BodyType.b2_dynamicBody);
            exports_1("springAngleBendingModel", springAngleBendingModel = b2_rope_js_1.b2BendingModel.b2_springAngleBendingModel);
            exports_1("pbdAngleBendingModel", pbdAngleBendingModel = b2_rope_js_1.b2BendingModel.b2_pbdAngleBendingModel);
            exports_1("xpbdAngleBendingModel", xpbdAngleBendingModel = b2_rope_js_1.b2BendingModel.b2_xpbdAngleBendingModel);
            exports_1("pbdDistanceBendingModel", pbdDistanceBendingModel = b2_rope_js_1.b2BendingModel.b2_pbdDistanceBendingModel);
            exports_1("pbdHeightBendingModel", pbdHeightBendingModel = b2_rope_js_1.b2BendingModel.b2_pbdHeightBendingModel);
            exports_1("pbdTriangleBendingModel", pbdTriangleBendingModel = b2_rope_js_1.b2BendingModel.b2_pbdTriangleBendingModel);
            exports_1("pbdStretchingModel", pbdStretchingModel = b2_rope_js_2.b2StretchingModel.b2_pbdStretchingModel);
            exports_1("xpbdStretchingModel", xpbdStretchingModel = b2_rope_js_2.b2StretchingModel.b2_xpbdStretchingModel);
        }
    };
});
//# sourceMappingURL=index.js.map