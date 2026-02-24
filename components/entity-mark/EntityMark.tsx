'use client';

import React, { useMemo } from 'react';
import { useEntityMark } from './useEntityMark';
import type { EntityMarkProps } from './types';
import {
  WOBBLE_DURATIONS,
  WOBBLE_OFFSETS,
  IDLE_DRIFT_OFFSETS,
  SUCCESS_DRIFT_OFFSETS,
  PROCESSING_TRAIL_OPACITIES,
} from './types';
import './entity-mark.css';

const EASE = '0.4 0 0.6 1;0.4 0 0.6 1';
const EASE_GENTLE = '0.25 0.1 0.25 1;0.25 0.1 0.25 1';

/**
 * Calculate node positions at a given distance from center (50,50).
 * Angles: 0° (12 o'clock), 45°, 90°, 135°, 180°, 225°, 270°, 315°
 */
function getNodePositions(distance: number): [number, number][] {
  const cx = 50, cy = 50;
  // 0°=top, clockwise. Convert to math angles (0°=right, counter-clockwise).
  const angles = [270, 315, 0, 45, 90, 135, 180, 225];
  return angles.map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return [
      Math.round((cx + distance * Math.cos(rad)) * 10) / 10,
      Math.round((cy + distance * Math.sin(rad)) * 10) / 10,
    ];
  });
}

function getVisibleNodes(size: number): number[] {
  if (size <= 12) return [];               // tiny: center dot only
  if (size <= 16) return [0, 2, 4, 6];     // favicon: 4 cardinal nodes
  return [0, 1, 2, 3, 4, 5, 6, 7];         // 17px+: all 8 nodes
}

function getFillColor(theme: 'dark' | 'light' | 'mono', stateColor: string): string {
  if (stateColor !== 'white') return stateColor;
  if (theme === 'light') return '#18181B';
  return '#FFFFFF';
}

function getThemeOpacity(
  theme: 'dark' | 'light' | 'mono',
  baseOpacity: number,
  isCenter: boolean,
): number {
  if (theme === 'mono') return 1;
  if (theme === 'light' && !isCenter && baseOpacity === 0.5) return 0.45;
  return baseOpacity;
}

// ── Idle: drift directions per node (radially outward) ──
// Each is [deltaX, deltaY] in viewBox units
const IDLE_DRIFT: [number, number][] = [
  [0, -2.5],     // node 0: up
  [1.8, -1.8],   // node 1: up-right
  [2.5, 0],      // node 2: right
  [1.8, 1.8],    // node 3: down-right
  [0, 2.5],      // node 4: down
  [-1.8, 1.8],   // node 5: down-left
  [-2.5, 0],     // node 6: left
  [-1.8, -1.8],  // node 7: up-left
];
const IDLE_DRIFT_DURS = [10, 11, 9.5, 10.5, 9, 10.8, 9.8, 10.2];

// ── Thinking: wobble amount per node (±3 viewBox units) ──
const THINK_WOBBLE = 3;

// ── Success: drift directions per node (±2 viewBox units, radially outward) ──
const SUCCESS_DRIFT: [number, number][] = [
  [0, -2],
  [1.4, -1.4],
  [2, 0],
  [1.4, 1.4],
  [0, 2],
  [-1.4, 1.4],
  [-2, 0],
  [-1.4, -1.4],
];
const SUCCESS_DRIFT_DURS = [6, 6.5, 5.8, 6.2, 5.5, 6.3, 5.7, 6.1];

// ── Processing: node positions at distance 34 ──
const PROCESSING_POSITIONS = getNodePositions(34);

// ── Error: shake values ──
const SHAKE_VALUES = '0,0;-2,0;2,0;-1.5,0;1,0;0,0';

export function EntityMark({
  size = 48,
  state = 'static',
  theme = 'dark',
  className = '',
}: EntityMarkProps) {
  const values = useEntityMark(state);
  const visibleNodes = useMemo(() => getVisibleNodes(size), [size]);
  const nodePositions = useMemo(
    () => getNodePositions(values.nodeDistance),
    [values.nodeDistance],
  );
  const fill = useMemo(() => getFillColor(theme, values.color), [theme, values.color]);

  // Scale adjustments for small sizes
  const centerR = size <= 12 ? 16 : size <= 16 ? 12 : size <= 24 ? 9 : values.centerR;
  const nodeR = size <= 16 ? 4.5 : size <= 24 ? 3.5 : values.nodeR;
  const centerOpacity = getThemeOpacity(theme, values.centerOpacity, true);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role="img"
      aria-label={`Entity mark — ${state}`}
    >
      {/* Wrapper group for error shake */}
      <g>
        {state === 'error' && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values={SHAKE_VALUES}
            dur="0.3s"
            repeatCount="indefinite"
          />
        )}

        {/* ── Center node ── */}
        <circle cx={50} cy={50} r={centerR} fill={fill} opacity={centerOpacity}>
          {/* Idle: very slow breath 8→8.3 over 8s */}
          {state === 'idle' && (
            <animate
              attributeName="r"
              dur="8s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines={EASE}
              values={`${centerR};${centerR + 0.3};${centerR}`}
            />
          )}

          {/* Thinking: pulse 8.5→9.5 over 2.5s */}
          {state === 'thinking' && (
            <animate
              attributeName="r"
              dur="2.5s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines={EASE}
              values={`${centerR};${centerR + 1};${centerR}`}
            />
          )}

          {/* Processing: fast pulse 8.5→10.5 over 1s + opacity pulse */}
          {state === 'processing' && (
            <>
              <animate
                attributeName="r"
                dur="1s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines={EASE}
                values={`${centerR};${centerR + 2};${centerR}`}
              />
              <animate
                attributeName="opacity"
                dur="1s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines={EASE}
                values="0.85;0.95;0.85"
              />
            </>
          )}

          {/* Success: calm breath 9.5→10 over 5s */}
          {state === 'success' && (
            <animate
              attributeName="r"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines={EASE_GENTLE}
              values={`${centerR};${centerR + 0.5};${centerR}`}
            />
          )}

          {/* Error: contract pulse 7→6.2 over 0.8s */}
          {state === 'error' && (
            <animate
              attributeName="r"
              dur="0.8s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines={EASE}
              values={`${centerR};${centerR - 0.8};${centerR}`}
            />
          )}
        </circle>

        {/* ── Satellite nodes ── */}
        {(state === 'processing' || state === 'idle') ? (
          /* Processing + Idle: unified orbit group rotating clockwise */
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur={state === 'processing' ? '2s' : '20s'}
              repeatCount="indefinite"
            />
            {visibleNodes.map((i) => {
              const positions = state === 'processing' ? PROCESSING_POSITIONS : nodePositions;
              const [cx, cy] = positions[i];
              const baseOpacity = state === 'processing'
                ? (theme === 'mono' ? 1 : PROCESSING_TRAIL_OPACITIES[i])
                : (theme === 'mono' ? 1 : getThemeOpacity(theme, Array.isArray(values.nodeOpacity) ? values.nodeOpacity[i] : values.nodeOpacity, false));
              return (
                <circle key={i} cx={cx} cy={cy} r={nodeR} fill={fill} opacity={baseOpacity} />
              );
            })}
          </g>
        ) : (
          /* All other states: individual nodes with SMIL animations */
          visibleNodes.map((i) => {
            const [cx, cy] = nodePositions[i];
            const baseOpacity = Array.isArray(values.nodeOpacity)
              ? values.nodeOpacity[i]
              : values.nodeOpacity;
            const opacity = theme === 'mono' ? 1 : getThemeOpacity(theme, baseOpacity, false);

            return (
              <circle key={i} cx={cx} cy={cy} r={nodeR} fill={fill} opacity={opacity}>
                {/* Thinking: independent wobble in both x and y */}
                {state === 'thinking' && (
                  <>
                    <animate
                      attributeName="cx"
                      dur={`${WOBBLE_DURATIONS[i]}s`}
                      repeatCount="indefinite"
                      calcMode="spline"
                      keySplines={`${EASE};0.4 0 0.6 1`}
                      values={`${cx};${cx - THINK_WOBBLE};${cx + THINK_WOBBLE};${cx}`}
                      begin={`${WOBBLE_OFFSETS[i]}s`}
                    />
                    <animate
                      attributeName="cy"
                      dur={`${WOBBLE_DURATIONS[i]}s`}
                      repeatCount="indefinite"
                      calcMode="spline"
                      keySplines={`${EASE};0.4 0 0.6 1`}
                      values={`${cy};${cy - THINK_WOBBLE};${cy + THINK_WOBBLE};${cy}`}
                      begin={`${WOBBLE_OFFSETS[i]}s`}
                    />
                  </>
                )}

                {/* Success: slow radial drift */}
                {state === 'success' && SUCCESS_DRIFT[i] && (
                  <>
                    {SUCCESS_DRIFT[i][0] !== 0 && (
                      <animate
                        attributeName="cx"
                        dur={`${SUCCESS_DRIFT_DURS[i]}s`}
                        repeatCount="indefinite"
                        calcMode="spline"
                        keySplines={EASE}
                        values={`${cx};${cx + SUCCESS_DRIFT[i][0]};${cx}`}
                        begin={`${SUCCESS_DRIFT_OFFSETS[i]}s`}
                      />
                    )}
                    {SUCCESS_DRIFT[i][1] !== 0 && (
                      <animate
                        attributeName="cy"
                        dur={`${SUCCESS_DRIFT_DURS[i]}s`}
                        repeatCount="indefinite"
                        calcMode="spline"
                        keySplines={EASE}
                        values={`${cy};${cy + SUCCESS_DRIFT[i][1]};${cy}`}
                        begin={`${SUCCESS_DRIFT_OFFSETS[i]}s`}
                      />
                    )}
                  </>
                )}

                {/* Error + Static: no per-node animation */}
              </circle>
            );
          })
        )}
      </g>
    </svg>
  );
}
