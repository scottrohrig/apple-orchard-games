import { useReducer } from "react";
import { UPDATE_TIMERS, UPDATE_JUICERS, PURCHASE_A_TREE, UPDATE_MASHERS, UPDATE_OVENS } from "./actions";

export const reducer = (state=[], action) => {
  switch (action.type) {
    // case update orchards
    // case update trees
    // case update juicers
    case UPDATE_JUICERS:
      console.log('UPDATE_JUICERS reducer running...', action)
      let updatedJuicers = state.juicers.map(juicer => juicer._id === action.payload._id ? action.payload : juicer)
      return {
        ...state, juicers: updatedJuicers
      };
      // case update mashers
    case UPDATE_MASHERS:
      console.log('UPDATE_MASHERS reducer running...', action)
      let updatedMashers = state.mashers.map(masher => masher._id === action.payload._id ? action.payload : masher)
      return {
        ...state, mashers: updatedMashers
      };
      // case update ovens
      case UPDATE_OVENS:
        console.log('UPDATE_OVENS reducer running...', action)
        let updatedOvens = state.ovens.map(oven => oven._id === action.payload._id ? action.payload : oven)
        return {
          ...state, ovens: updatedOvens
        };
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
