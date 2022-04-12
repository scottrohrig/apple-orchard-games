import { useReducer } from "react";
import {
  UPDATE_USER,
  UPDATE_TIMERS,
  UPDATE_JUICERS,
  PURCHASE_A_TREE,
  UPDATE_MASHERS,
  UPDATE_OVENS,
  JUICE_SOLD,
  BUY_JUICER,
  APPLES_FOR_JUICE,
  SAUCE_SOLD,
  BUY_MASHER,
  APPLES_FOR_SAUCE,
  PIE_SOLD,
  BUY_OVEN,
  APPLES_FOR_PIE,
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
      return {
        ...state,
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

    // buy mashers
    case BUY_MASHER:
      const boughtMashers = state.mashers

      // insert MASHER to placeholder space
      boughtMashers.splice(boughtMashers.length - 2, 0, action.payload)

      if (boughtMashers.length > 5) {
        boughtMashers.pop()
        return { ...state, mashers: boughtMashers }
      }
      console.log(boughtMashers);
      return {
        ...state,
        mashers: boughtMashers,
        // money: state.money - 14 
        money: state.money - state.gameVariables.masherCost,
        appleCount: state.appleCount - state.gameVariables.sauceMashApplesUsed
      }


    case SAUCE_SOLD:
      console.log("in sauce sold");
      console.log("money is " + state.money);


      return {
        ...state,
        money: state.money + state.gameVariables.sauceSaleRevenue,
      };

    case APPLES_FOR_SAUCE:
      console.log("apples for sauce");
      console.log("apples is " + state.appleCount);
      console.log("apples used" + state.gameVariables.makeSauceApplesUsed);
      console.log("apples used" + (state.appleCount - state.gameVariables.makeSauceApplesUsed));


      return {
        ...state,
        appleCount: state.appleCount - state.gameVariables.makeSauceApplesUsed,

        // appleCount: 150,
      };

    // buy ovens
    case BUY_OVEN:
      const boughtOvens = state.ovens

      // insert OVEN to placeholder space
      boughtOvens.splice(boughtOvens.length - 2, 0, action.payload)

      if (boughtOvens.length > 5) {
        boughtOvens.pop()
        return { ...state, ovens: boughtOvens }
      }
      console.log("in buy ovens" + boughtOvens);
      return {
        ...state,
        ovens: boughtOvens,

        money: state.money - state.gameVariables.ovenCost,
        //appleCount: state.appleCount - 40
        appleCount: state.appleCount - state.gameVariables.pieBakeApplesUsed
      }

    case PIE_SOLD:
      console.log("in pie sold");
      console.log("money is " + state.money);


      return {
        ...state,
        money: state.money + state.gameVariables.pieSaleRevenue,
      };

    case APPLES_FOR_PIE:
      return {
        ...state,
        appleCount: state.appleCount - state.gameVariables.makePieApplesUsed,
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
