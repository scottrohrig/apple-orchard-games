import { useState, useEffect } from "react";
import { useGlobalContext } from "../utils/GlobalState";

// import iconSell from "../assets/images/item-sell.png";
// import iconMake from "../assets/images/item-make.png";

import { getTimeRemaining, useInterval } from "../utils/helpers";
import { SELL_PRODUCT, UPDATE_ITEM } from "../utils/actions";

export default function Item({
  item,
  _id,
  itemType,
  dispatchParent,
  sendInventoryToDB,
}) {
  const [state, dispatch] = useGlobalContext();
  // const juiceMake = state.gameVariables[itemType].iconMake;

  // only thing I don't like is this duration displays on mount
  const [timeRemaining, setTime] = useState(5);
  let isReady = timeRemaining <= 0;

  function handleUseBtnPressed(event) {
    // const now = new Date();
    dispatch({
      type: SELL_PRODUCT,
      payload: {
        itemType: itemType,
      },
    });
    // TODO is dispatchParent necessary?
    dispatchParent({
      type: UPDATE_ITEM,
      payload: {
        _id,
        // startedAtTime: now,
        // duration: item.duration,
        itemType: itemType,
      },
    });
    setTime(item.duration);
    sendInventoryToDB(state);
  }

  // custom Hook to handle intervals across item types
  useInterval(() => {
    if (isReady) {
      // return;
    }
    setTime(getTimeRemaining(item.startedAtTime, item.duration));
  }, 1000);

  return (
    <>
      <div className="item-container">
        {isReady ? (
          <div>
            <div className="temp-img">
              <img
                src={state.gameVariables[itemType].iconSell}
                alt="item image"
              />
            </div>
            <div className="item-btn-wrapper">
              <div className="item-btn-flex">
                <button
                  className="btn btn-harvest"
                  onClick={() => {
                    handleUseBtnPressed();
                  }}
                >
                  sell
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="temp-img">
              <img
                src={state.gameVariables[itemType].iconMake}
                alt="item image"
              />
            </div>
            <div className="item-btn-wrapper">
              <div className="item-btn-flex">
                <button className="btn btn-timer" disabled>
                  {timeRemaining}s
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
