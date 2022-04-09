import { useReducer } from "react";
import { UPDATE_TIMERS, PURCHASE_A_TREE } from "./actions";

export const reducer = (state=[], action) => {
  switch (action.type) {
    // case update orchards
    // case update trees
    // case update mashers
    // case update juicers
    // case update ovens
    // case update user
    case PURCHASE_A_TREE:
      console.log('in purchase a tree')
      let newTreeArray = state.trees;
      newTreeArray.push({});

      return {
        ...state
        ,
        
        appleCount: state.appleCount - state.gameVariables.applesForNewTree,
        trees: newTreeArray,
      };

    case UPDATE_TIMERS:
      return state.map((timer) => {
        if (timer.isRunning) {
          timer = {
            ...timer,
            startedAtTime: (timer.startedAtTime += action.payload.deltaTime),
          };
        }
        return timer;
      });
  }
};

// initialize our global state object
export function useAppReducer(initialState) {
  return useReducer(reducer, initialState);
}
