import React, { createContext, useContext } from "react";
import { useAppReducer } from "./reducers";

const GlobalContext = createContext();
const { Provider } = GlobalContext;

const defaultGameVariables = {
  initialAppleInventory: 5,
  applesForNewTree: 3,
  appleGrowTime: 30,
  appleSaleRevenue: 1,
  juicerCost: 10,
  masherCost: 14,
  ovenCost: 30,
  makeJuiceTime: 60,
  makeJuiceApplesUsed: 2,
  makeSauceTime: 120,
  makeSauceApplesUsed: 4,
  makePieTime: 300,
  makePieApplesUsed: 8,
  juiceSaleRevenue: 4, // this is revenue from sale of each juice
  sauceSaleRevenue: 8,
  pieSaleRevenue: 20,
  gemPurchaseCost: 0.99,
  gemsFromPurchase: 5,
};

const defaultStartTime = new Date()

const GlobalProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useAppReducer({
    money: 3,
    appleCount: 500,
    gemCount: 20,

    gameVariables: defaultGameVariables,
    mashers: [{},],
    juicers: [{}],
    ovens: [{}],
    trees: [{}, {}, {}, {}, {}],
    orchards: [
      {
        _id: 1,
        trees: [],
      },
    ],
    currentOrchard: [],
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };
