export declare class Settings {
    m_testIndex: number;
    m_windowWidth: number;
    m_windowHeight: number;
    m_hertz: number;
    m_velocityIterations: number;
    m_positionIterations: number;
    m_drawShapes: boolean;
    m_drawJoints: boolean;
    m_drawAABBs: boolean;
    m_drawContactPoints: boolean;
    m_drawContactNormals: boolean;
    m_drawContactImpulse: boolean;
    m_drawFrictionImpulse: boolean;
    m_drawCOMs: boolean;
    m_drawControllers: boolean;
    m_drawStats: boolean;
    m_drawProfile: boolean;
    m_enableWarmStarting: boolean;
    m_enableContinuous: boolean;
    m_enableSubStepping: boolean;
    m_enableSleep: boolean;
    m_pause: boolean;
    m_singleStep: boolean;
    Reset(): void;
    Save(): void;
    Load(): void;
}
