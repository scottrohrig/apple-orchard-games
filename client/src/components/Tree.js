import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../utils/GlobalState";
import { HARVEST_TREE, UPDATE_TREE_TIMER } from "../utils/actions";
// import { UPDATE_USER } from "../utils/mutations";
import { getTimeRemaining, useInterval } from "../utils/helpers";

import treeBare from "../assets/images/tree-short.svg";
import treeApples from "../assets/images/tree-with-apples-short.svg";

export default function Tree({
  tree,
  _id,
  dispatchParent,
  setCheckOrchardReadyToHarvest,
}) {
  const [state, dispatch] = useGlobalContext();
  const {
    // trees,
    gameVariables,
  } = state;
  // const resetTreeTimerSeconds = gameVariables.appleGrowTime;
  const resetTreeTimerSeconds = tree.duration;

  const [timeRemaining, setTime] = useState(resetTreeTimerSeconds);
  let isReady = timeRemaining <= 0;

  useEffect(() => {
    if (isReady) {
      setCheckOrchardReadyToHarvest(true);
      // console.log("useEffect check orchard");
    }
  });

  // reset countdown when button clicked
  function handleTreeClick(evt) {
    const now = new Date();
    dispatch({
      type: HARVEST_TREE,
    });

    dispatchParent({
      type: UPDATE_TREE_TIMER,
      payload: {
        _id,
        startedAtTime: now,
        duration: tree.duration,
      },
    });
    setTime(tree.duration);
  }

  useInterval(() => {
    if (isReady) {
      // console.log("tree id " + _id + " is ready");
      // return;
    }
    setTime(getTimeRemaining(tree.startedAtTime, tree.duration));
  }, 1000);

  return (
    <>
      {isReady ? (
        <div className="orchard-item-box relative tree-item">
          <img src={treeApples} alt=""></img>
          <div className="">
            <button className=" btn btn-harvest" onClick={handleTreeClick}>
              Harvest
            </button>
          </div>
        </div>
      ) : (
        <div className="orchard-item-box relative tree-item">
          <img src={treeBare} alt=""></img>
          <div className="">
            <button className="btn btn-timer" disabled>
              {timeRemaining}s
            </button>
          </div>
        </div>
      )}
    </>
  );
}
