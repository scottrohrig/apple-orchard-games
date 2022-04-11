import { useReducer } from "react";
import {
  UPDATE_TIMERS,
  UPDATE_JUICERS,
  PURCHASE_A_TREE,
  UPDATE_MASHERS,
  UPDATE_OVENS,
  JUICE_SOLD,
  BUY_JUICER,
  APPLES_FOR_JUICE,
} from "./actions";

export const reducer = (state = [], action) => {
  switch (action.type) {
    // case update orchards
    // case update trees
    // case update juicers
    case UPDATE_JUICERS:
      console.log("UPDATE_JUICERS reducer running...", action);
      let updatedJuicers = state.juicers.map((juicer) =>
        juicer._id === action.payload._id ? action.payload : juicer
      );
      return {
        ...state,
        juicers: updatedJuicers,
      };
    // case update mashers
    case UPDATE_MASHERS:
      console.log("UPDATE_MASHERS reducer running...", action);
      let updatedMashers = state.mashers.map((masher) =>
        masher._id === action.payload._id ? action.payload : masher
      );
      return {
        ...state,
        mashers: updatedMashers,
      };
    // case update ovens
    case UPDATE_OVENS:
      console.log("UPDATE_OVENS reducer running...", action);
      let updatedOvens = state.ovens.map((oven) =>
        oven._id === action.payload._id ? action.payload : oven
      );
      return {
        ...state,
        ovens: updatedOvens,
      };
    // case update user
    case PURCHASE_A_TREE:
      console.log("in purchase a tree");
      let newTreeArray = state.trees;
      newTreeArray.push({});

      return {
        ...state,
        appleCount: state.appleCount - state.gameVariables.applesForNewTree,
        trees: newTreeArray,
      };

    case BUY_JUICER:
      const boughtJuicers = state.juicers

      // insert juicer to placeholder space
      boughtJuicers.splice(boughtJuicers.length - 2, 0, action.payload)

      if (boughtJuicers.length > 5) {
        boughtJuicers.pop()
        return { ...state, juicers: boughtJuicers }
      }
      console.log(boughtJuicers);
      return { ...state, 
        juicers: boughtJuicers,
        // money: state.money - 10 
        money: state.money - state.gameVariables.juicerCost, 
        appleCount: state.appleCount - state.gameVariables.makeJuiceApplesUsed
      }

    case JUICE_SOLD:
      console.log("in juice sold");
      console.log("money is " + state.money);


      return {
        ...state,
        money: state.money + state.gameVariables.juiceSaleRevenue,
      };

    case APPLES_FOR_JUICE:
      console.log("apples for juice");
      console.log("apples is " + state.appleCount);
      console.log("apples used" + state.gameVariables.makeJuiceApplesUsed);
      console.log("apples used" + (state.appleCount - state.gameVariables.makeJuiceApplesUsed));


      return {
        ...state,
        appleCount: state.appleCount - state.gameVariables.makeJuiceApplesUsed,


        // appleCount: state.appleCount - state.makeJuiceApplesUsed,
        // appleCount: 22,
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
