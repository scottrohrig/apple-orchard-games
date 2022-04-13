import { useReducer } from "react";
import {
  UPDATE_USER,
  UPDATE_TIMERS,
  UPDATE_JUICERS,
  PURCHASE_A_TREE,
  UPDATE_MASHERS,
  UPDATE_OVENS,
  SELL_JUICE,
  BUY_JUICER,
  APPLES_FOR_JUICE,
  SELL_SAUCE,
  BUY_MASHER,
  APPLES_FOR_SAUCE,
  SELL_PIE,
  BUY_OVEN,
  APPLES_FOR_PIE,
  APPLES_FOR_MONEY,
} from "./actions";

export const reducer = (state = [], action) => {
  switch (action.type) {
    // case update user

    // case update orchards

    // case update trees

    // case update juicers
    case UPDATE_JUICERS:
      let updatedJuicers = state.juicers.map((juicer) =>
        juicer._id === action.payload._id ? action.payload : juicer
      );
      return {
        ...state,
        juicers: updatedJuicers,
      };

    // case update mashers
    case UPDATE_MASHERS:
      let updatedMashers = state.mashers.map((masher) =>
        masher._id === action.payload._id ? action.payload : masher
      );
      return {
        ...state,
        mashers: updatedMashers,
      };

    // case update ovens
    case UPDATE_OVENS:
      let updatedOvens = state.ovens.map((oven) =>
        oven._id === action.payload._id ? action.payload : oven
      );
      return {
        ...state,
        ovens: updatedOvens,
      };

    case PURCHASE_A_TREE:
      console.log("PURCHASE_A_TREE reducer running...");

      let newTreeArray = state.trees;
      let newId = state.trees.length;
      newTreeArray.push({_id:newId});

      return {
        ...state,
        appleCount: state.appleCount - state.gameVariables.applesForNewTree,
        trees: newTreeArray,
      };

    case BUY_JUICER:
      const boughtJuicers = state.juicers;

      // insert juicer to placeholder space
      boughtJuicers.splice(boughtJuicers.length - 2, 0, action.payload);

      if (boughtJuicers.length > 5) {
        boughtJuicers.pop();
        return { ...state, juicers: boughtJuicers };
      }
      return {
        ...state,
        juicers: boughtJuicers,
        // money: state.money - 10
        money: state.money - state.gameVariables.juicerCost,
        appleCount: state.appleCount - state.gameVariables.makeJuiceApplesUsed
      };

    case SELL_JUICE:
      return {
        ...state,
        money: state.money + state.gameVariables.juiceSaleRevenue,
      };

    case APPLES_FOR_JUICE:
      return {
        ...state,
        appleCount: state.appleCount - state.gameVariables.makeJuiceApplesUsed,
      };

    // buy mashers
    case BUY_MASHER:
      const boughtMashers = state.mashers;

      // insert MASHER to placeholder space
      boughtMashers.splice(boughtMashers.length - 2, 0, action.payload);

      if (boughtMashers.length > 5) {
        boughtMashers.pop();
        return { ...state, mashers: boughtMashers };
      }
      console.log(boughtMashers);
      return {
        ...state,
        mashers: boughtMashers,
        // money: state.money - 14
        money: state.money - state.gameVariables.masherCost,
        appleCount: state.appleCount - state.gameVariables.makeSauceApplesUsed
      };


    case SELL_SAUCE:
      return {
        ...state,
        money: state.money + state.gameVariables.sauceSaleRevenue,
      };

    case APPLES_FOR_SAUCE:
      return {
        ...state,
        appleCount: state.appleCount - state.gameVariables.makeSauceApplesUsed,
      };

    // buy ovens
    case BUY_OVEN:
      const boughtOvens = state.ovens;

      // insert OVEN to placeholder space
      boughtOvens.splice(boughtOvens.length - 2, 0, action.payload);

      if (boughtOvens.length > 5) {
        boughtOvens.pop();
        return { ...state, ovens: boughtOvens };
      }
      console.log("in buy ovens" + boughtOvens);
      return {
        ...state,
        ovens: boughtOvens,

        money: state.money - state.gameVariables.ovenCost,
        //appleCount: state.appleCount - 40
        appleCount: state.appleCount - state.gameVariables.makePieApplesUsed
      };

    case SELL_PIE:
      return {
        ...state,
        money: state.money + state.gameVariables.pieSaleRevenue,
      };

    case APPLES_FOR_PIE:
      return {
        ...state,
        appleCount: state.appleCount - state.gameVariables.makePieApplesUsed,
      };

    case APPLES_FOR_MONEY: 
      const newBalance = state.money + (action.payload * state.gameVariables.appleSaleRevenue)
      const remainingApples = Math.max(state.appleCount - action.payload, 0)
      return {
        ...state,
        appleCount: remainingApples,
        money: newBalance
      }

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
