import { useState, useEffect } from "react";
import { useGlobalContext } from "../utils/GlobalState";

import iconSell from "../assets/images/item-sell.png";
import iconMake from "../assets/images/item-make.png";

import { getTimeRemaining, useInterval } from "../utils/helpers";
import { SELL_JUICE, UPDATE_JUICER } from "../utils/actions";

// pass in juicer props from parent page / component
export default function Item({
  juicer,
  _id,
  dispatchParent,
  sendInventoryToDB,
}) {
  const [state, dispatch] = useGlobalContext();

  // only thing I don't like is this duration displays on mount
  const [timeRemaining, setTime] = useState(5);
  let isReady = timeRemaining <= 0;

  function handleUseBtnPressed(event) {
    const now = new Date();
    dispatch({
      type: SELL_JUICE,
    });

    dispatchParent({
      type: UPDATE_JUICER,
      payload: {
        _id,
        startedAtTime: now,
        duration: juicer.duration,
      },
    });
    setTime(juicer.duration);
    sendInventoryToDB(state);
  }

  // custom Hook to handle intervals across item types
  useInterval(() => {
    if (isReady) {
      // return;
    }
    setTime(getTimeRemaining(juicer.startedAtTime, juicer.duration));
  }, 1000);

  return (
    <>
      <div className="item-container">
        {isReady ? (
          <div>
            <div className="temp-img">
              <img src={iconSell} alt="juicer" />
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
              <img src={iconMake} alt="juicer" />
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
