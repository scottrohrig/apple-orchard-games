import { useReducer } from 'react';
import { UPDATE_TIMERS } from './actions';

export const reducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_TIMERS:
      return state.map((timer) => {
        if (timer.isRunning) {
          timer = { ...timer, startedAtTime: timer.startedAtTime += action.payload.deltaTime };
        }
        return timer;
      });
  }
};

// initialize our global state object
export function useAppReducer(initialState) {
  return useReducer(reducer, initialState)
}
