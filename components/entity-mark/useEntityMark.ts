import { useMemo } from 'react';
import type { EntityMarkState, EntityMarkValues } from './types';

/**
 * Computes visual properties for each mascot state.
 * Values match SPEC.md exactly.
 */
export function useEntityMark(state: EntityMarkState = 'static'): EntityMarkValues {
  return useMemo(() => {
    switch (state) {
      case 'static':
        return {
          centerR: 8.5,
          centerOpacity: 0.95,
          nodeR: 3.2,
          nodeOpacity: 0.5,
          nodeDistance: 30,
          color: 'white',
          animationClass: '',
        };

      case 'idle':
        return {
          centerR: 8.5,      // breathes 8.5 → 9
          centerOpacity: 0.9,
          nodeR: 3.2,
          nodeOpacity: 0.5,
          nodeDistance: 30,
          color: 'white',
          animationClass: 'entity-idle',
        };

      case 'thinking':
        return {
          centerR: 8.5,      // pulses 8.5 → 9.5
          centerOpacity: 0.8,
          nodeR: 3,
          nodeOpacity: 0.45,
          nodeDistance: 34,   // expanded, wobbling
          color: 'white',
          animationClass: 'entity-thinking',
        };

      case 'processing':
        return {
          centerR: 8.5,      // pulses 8.5 → 10.5
          centerOpacity: 0.85,
          nodeR: 3.2,
          nodeOpacity: [0.65, 0.55, 0.45, 0.35, 0.28, 0.22, 0.18, 0.14], // comet trail
          nodeDistance: 34,
          color: '#6B9FE8',   // blue
          animationClass: 'entity-processing',
        };

      case 'success':
        return {
          centerR: 9.5,      // breathes 9.5 → 10
          centerOpacity: 0.8,
          nodeR: 3.8,
          nodeOpacity: 0.6,
          nodeDistance: 40,    // bloomed
          color: '#5ED4A0',   // green
          animationClass: 'entity-success',
        };

      case 'error':
        return {
          centerR: 7,         // contracts 7 → 6.2
          centerOpacity: 0.5,
          nodeR: 2,
          nodeOpacity: 0.15,
          nodeDistance: 10,    // collapsed
          color: '#E86B6B',   // red
          animationClass: 'entity-error',
        };

      default:
        return {
          centerR: 8.5,
          centerOpacity: 0.95,
          nodeR: 3.2,
          nodeOpacity: 0.5,
          nodeDistance: 30,
          color: 'white',
          animationClass: '',
        };
    }
  }, [state]);
}
