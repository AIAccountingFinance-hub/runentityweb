export type EntityMarkState = 'static' | 'idle' | 'thinking' | 'processing' | 'success' | 'error';
export type EntityMarkTheme = 'dark' | 'light' | 'mono';

export interface EntityMarkProps {
  size?: number;
  state?: EntityMarkState;
  theme?: 'dark' | 'light' | 'mono';
  className?: string;
}

export interface EntityMarkValues {
  centerR: number;
  centerOpacity: number;
  nodeR: number;
  nodeOpacity: number | number[];
  nodeDistance: number;
  color: string;
  animationClass: string;
}

// Node positions at 45deg intervals from 12 o'clock
// viewBox 0 0 100 100, center at (50,50)
export const NODE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315] as const;

// Base positions at distance 30 from center
export const BASE_NODE_POSITIONS: [number, number][] = [
  [50, 20],     // 0°   (12 o'clock)
  [71.2, 28.8], // 45°
  [80, 50],     // 90°
  [71.2, 71.2], // 135°
  [50, 80],     // 180°
  [28.8, 71.2], // 225°
  [20, 50],     // 270°
  [28.8, 28.8], // 315°
];

// Thinking state: wobble durations per node (seconds)
export const WOBBLE_DURATIONS = [1.6, 1.8, 2.0, 1.7, 1.5, 1.9, 2.1, 1.4];

// Thinking state: wobble begin offsets per node (seconds)
export const WOBBLE_OFFSETS = [0, 0.1, 0.3, 0.2, 0.15, 0.4, 0.25, 0.35];

// Idle state: drift offsets per node (seconds)
export const IDLE_DRIFT_OFFSETS = [0, 0.5, 0.3, 0.7, 0.1, 0.9, 0.4, 0.6];

// Success state: drift offsets per node (seconds)
export const SUCCESS_DRIFT_OFFSETS = [0, 0.3, 0.6, 0.15, 0.45, 0.75, 0.25, 0.55];

// Processing state: trailing opacity per node (comet tail)
export const PROCESSING_TRAIL_OPACITIES = [0.65, 0.55, 0.45, 0.35, 0.28, 0.22, 0.18, 0.14];
