import React, { createContext, useContext } from "react";
import { useAppReducer } from "./reducers";

import juiceMake from "../assets/images/juicer.png";
import juiceSell from "../assets/images/juice.png";
import juicerBuy from "../assets/images/empty_juice.png";
import sauceMake from "../assets/images/masher.png";
import sauceSell from "../assets/images/sauce.png";
import masherBuy from "../assets/images/empty_sauce.png";
import pieMake from "../assets/images/oven.png";
import pieSell from "../assets/images/pie.png";
import ovenBuy from "../assets/images/empty_pie.png";

const GlobalContext = createContext();
const { Provider } = GlobalContext;
let nowTime = Date.now();

const defaultGameVariables = {
  juicers: {
    itemCost: 1,
    makeProductTime: 4,
    makeProductApplesUsed: 1,
    productSaleRevenue: 1,
    iconSell: juiceSell,
    iconMake: juiceMake,
    iconBuy: juicerBuy,
  },

  mashers: {
    itemCost: 2,
    makeProductTime: 5,
    makeProductApplesUsed: 2,
    productSaleRevenue: 2,
    iconSell: sauceSell,
    iconMake: sauceMake,
    iconBuy: masherBuy,
  },

  ovens: {
    itemCost: 3,
    makeProductTime: 6,
    makeProductApplesUsed: 3,
    productSaleRevenue: 3,
    iconSell: pieSell,
    iconMake: pieMake,
    iconBuy: ovenBuy,
  },

  initialAppleInventory: 5,
  // for Tree
  applesForNewTree: 3,
  appleGrowTime: 5,
  applesGrown: 5,
  appleSaleRevenue: 1,
  // for Item
  itemCost: 1,
  makeProductTime: 4,
  makeProductApplesUsed: 1,
  itemSaleRevenue: 1,
  // for Juicer
  juicerCost: 10,
  makeJuiceTime: 5,
  makeJuiceApplesUsed: 2,
  juiceSaleRevenue: 4, // this is revenue from sale of each juice
  // for Masher
  masherCost: 14,
  makeSauceTime: 5,
  makeSauceApplesUsed: 4,
  sauceSaleRevenue: 8,
  //for Oven
  ovenCost: 30,
  makePieTime: 5,
  makePieApplesUsed: 8,
  pieSaleRevenue: 20,
  // for gems
  gemPurchaseCost: 0.99,
  gemsFromPurchase: 5,
};

const GlobalProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useAppReducer({
    // TODO: username, email, and password should not be hard coded
    username: "",
    email: "",
    password: "",
    money: 100,

    appleCount: 50,
    gemCount: 0,

    gameVariables: defaultGameVariables,
    lastUpdateTime: nowTime,
    items: [],
    trees: [],
    mashers: [],
    juicers: [],
    ovens: [],
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
