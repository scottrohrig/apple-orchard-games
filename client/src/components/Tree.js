import React, { useEffect, useState } from "react";
import treeImage from "../assets/images/tree.png";
import { useGlobalContext } from "../utils/GlobalState";
import { HARVEST_TREE } from "../utils/actions";
import { UPDATE_USER } from "../utils/mutations";

import treeBare from "../assets/images/tree.svg";
import treeApples from "../assets/images/tree-with-apples.svg";

export default function Tree() {
  const [state, dispatch] = useGlobalContext();
  const { trees, money, appleCount, gameVariables } = state;
  const resetTreeTimerSeconds = gameVariables.appleGrowTime;

  const [secondsLeft, setSecondsLeft] = useState(resetTreeTimerSeconds);
  let isReady = secondsLeft <= 0;

  // reset countdown when button clicked
  function handleTreeClick(evt) {
    evt.preventDefault();
    setSecondsLeft(resetTreeTimerSeconds);

    let startedAtTime = new Date();
    console.log("new time", startedAtTime);

    dispatch({
      type: HARVEST_TREE,
    });

    // TODO: Need to update database: apples and start time have changed; need to acquire and pass tree's _id
    // dispatch({
    //   type: UPDATE_USER
    // });
  }

  useEffect(() => {
    if (isReady) {
      return;
    }
    const updateSecondsLeft = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(updateSecondsLeft);
  }, [secondsLeft]);

  return (
    <>
      {isReady ? (
        <div className="item-box relative tree-item">
          <img src={treeApples} alt=""></img>
          <div className="">
            <button className=" btn btn-harvest" onClick={handleTreeClick}>
              Harvest
            </button>
          </div>
        </div>
      ) : (
        <div className="item-box relative tree-item">
          <img src={treeBare} alt=""></img>
          <div className="">
            <button className="btn btn-timer" disabled>
              {secondsLeft}s
            </button>
          </div>
        </div>
      )}
    </>
  );
}
