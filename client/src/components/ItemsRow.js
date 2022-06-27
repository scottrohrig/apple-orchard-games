import { useEffect } from "react";
import { useGlobalContext } from "../utils/GlobalState";

import { useIsMount } from "../utils/helpers";

import {
  APPLES_FOR_JUICE,
  APPLES_USED_FOR_PRODUCT,
  BUY_ITEM,
  SELL_JUICE,
  UPDATE_JUICER,
} from "../utils/actions";

import Item from "./Item";
import BuyItem from "./BuyItem";

export default function ItemsRow(props) {
  const { sendInventoryToDB, itemType } = props;

  const [state, dispatch] = useGlobalContext();

  const items = state?.[itemType] || [];

  // if (loading)
  //   return (
  //     <div>
  //       <h1>LOADING....</h1>
  //     </div>
  //   );

  const handleUpgradePurchased = async (event) => {
    // validate enough money
    if (state.money < state.gameVariables[itemType].itemCost) {
      return;
    }

    dispatch({
      type: BUY_ITEM,
      payload: {
        // _id: state.items.length + 1,
        // startedAtTime: new Date(),
        // duration: state.gameVariables.makeJuiceTime,
        itemType: itemType,
      },
    });
    sendInventoryToDB(state);
  };

  return (
    <div>
      <div className="item-row">
        {
          <div className="item-scroll">
            {
              // map thru item objects from GlobalState to add to row
              items.map((item, i) => {
                return (
                  <div key={i} className="item-box">
                    <Item
                      _id={item._id}
                      item={item}
                      itemType={itemType}
                      dispatchParent={dispatch}
                      sendInventoryToDB={sendInventoryToDB}
                    />
                  </div>
                );
              })
            }
            {items.length < 5 && (
              <BuyItem handleUpgradePurchased={handleUpgradePurchased} />
            )}
          </div>
        }
      </div>
      <div className="dash-label">
        <span className="item-label">{itemType}</span>
        <div className="item-price">
          <p className="item-price-buy">
            Buy New:{" "}
            <span className="item-amount">
              {state.gameVariables[itemType].itemCost}
            </span>
          </p>
          <p className="item-price-apples">
            Uses:{" "}
            <span className="item-amount">
              {state.gameVariables[itemType].makeProductApplesUsed}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
