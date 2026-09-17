import { simulationReducer } from './reducer.js';
import type { SimulationEvent } from '../events/types.js';
import type { SimulationState } from '../state/types.js';

export class SimulationEngine {
  private state: SimulationState;
  private listeners = new Set<(state: SimulationState) => void>();

  public constructor(initialState: SimulationState) {
    this.state = initialState;
  }

  public getState(): SimulationState {
    return this.state;
  }

  public dispatch(event: SimulationEvent): SimulationState {
    const next = simulationReducer(this.state, event);
    if (next !== this.state) {
      this.state = next;
      this.listeners.forEach((listener) => listener(this.state));
    }
    return this.state;
  }

  public subscribe(listener: (state: SimulationState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
