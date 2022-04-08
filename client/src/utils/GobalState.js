import React, { createContext, useContext } from "react";
import { useAppReducer } from "./reducers";

const GlobalContext = createContext();
const { Provider } = GlobalContext;

const GlobalProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useAppReducer({
    gameVariables: {
      initialAppleInventory: 5,
      applesForNewTree: 3,
      appleGrowTime: 30,
      appleSaleRevenue: 1,
      juicerCost: 10,
      masherCost: 14,
      ovenCost: 30,
      makeJuiceTime: 60,
      makeJuiceApplesUsed: 2,
      sauceMashTime: 120,
      sauceMashApplesUsed: 4,
      pieBakeTime: 300,
      pieBakeApplesUsed: 8,
      juiceSaleRevenue: 4,
      sauceSaleRevenue: 8,
      pieSaleRevenue: 20,
      gemPurchaseCost: 0.99,
      gemsFromPurchase: 5,
    },
    mashers: [{}, {}, {}, {}, {}],
    juicers: [{ _id: 1 }, {}, {}, {}, {}],
    ovens: [{}, {}, {}, {}, {}],
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
