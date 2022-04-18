import { useReducer } from "react";
import {
  UPDATE_USER,
  UPDATE_ALL_DATA,
  UPDATE_TREE_TIMER,
  UPDATE_JUICER,
  UPDATE_JUICERS,
  PURCHASE_A_TREE,
  UPDATE_MASHER,
  UPDATE_MASHERS,
  UPDATE_OVEN,
  UPDATE_OVENS,
  SELL_JUICE,
  BUY_JUICER,
  APPLES_FOR_JUICE,
  HARVEST_TREE,
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
    case UPDATE_ALL_DATA:
      console.log({ ...state, ...action.payload });
      return { ...state, ...action.payload }

    // case update orchards

    // case update trees
    case UPDATE_TREE_TIMER:
      let updatedTrees = state.trees.map((tree) =>
        tree._id === action.payload._id ? action.payload : tree
      );
      console.log(updatedTrees);
      return {
        ...state,
        trees: updatedTrees,
      };

    // case update juicers
    case UPDATE_JUICERS:

      return {
        ...state, juicers: [...action.payload]
      }

    case UPDATE_JUICER:
      let updatedJuicers = state.juicers.map((juicer) =>
        juicer._id === action.payload._id ? action.payload : juicer
      );
      return {
        ...state,
        juicers: updatedJuicers,
      };

    // case update mashers
    case UPDATE_MASHERS:

      return {
        ...state, mashers: [...action.payload]
      }

    case UPDATE_MASHER:
      let updatedMashers = state.mashers.map((masher) =>
        masher._id === action.payload._id ? action.payload : masher
      );
      return {
        ...state,
        mashers: updatedMashers,
      };

    // case update ovens
    case UPDATE_OVENS:

      return {
        ...state, ovens: [...action.payload]
      }

    case UPDATE_OVEN:
      let updatedOvens = state.ovens.map((oven) =>
        oven._id === action.payload._id ? action.payload : oven
      );
      return {
        ...state,
        ovens: updatedOvens,
      };


    case PURCHASE_A_TREE:
      let newTreeArray = [...state.trees, { ...action.payload }];
      let newId = state.trees.length;

      return {
        ...state,
        appleCount: state.appleCount - state.gameVariables.applesForNewTree,
        trees: newTreeArray,
      };

    case BUY_JUICER:
      const boughtJuicers = [...state.juicers, action.payload]

      return {
        ...state,
        juicers: boughtJuicers,
        // money: state.money - 10
        money: state.money - state.gameVariables.juicerCost,
        appleCount: state.appleCount - state.gameVariables.makeJuiceApplesUsed
      };

    case SELL_JUICE:
      // state.juicers.map(j=>console.log('sell', j._id))
      return {
        ...state,
        money: state.money + state.gameVariables.juiceSaleRevenue,
      };

    case APPLES_FOR_JUICE:
      // state.juicers.map(j=>console.log('apples', j._id))
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

    case HARVEST_TREE:
      return {
        ...state,
        appleCount: state.appleCount + state.gameVariables.applesGrown

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
  }
};

// initialize our global state object
export function useAppReducer(initialState) {
  return useReducer(reducer, initialState);
}
