import React, { useEffect, useState } from "react";
import treeImage from "../assets/images/tree.png";
import { useGlobalContext } from "../utils/GlobalState";
import { HARVEST_TREE, UPDATE_TREE_TIMER } from "../utils/actions";
import { UPDATE_USER } from "../utils/mutations";
import { getTimeRemaining, useInterval } from '../utils/helpers';

import treeBare from "../assets/images/tree-short.svg";
import treeApples from "../assets/images/tree-with-apples-short.svg";

export default function Tree({ tree, _id, dispatchParent }) {
  const [state, dispatch] = useGlobalContext();
  const { trees, gameVariables } = state;
  const resetTreeTimerSeconds = gameVariables.appleGrowTime;

  const [timeRemaining, setTime] = useState(30);

  let isReady = timeRemaining <= 0;


  // reset countdown when button clicked
  function handleTreeClick(evt) {

    console.log('treeId', timeRemaining);
    const now = new Date();
    dispatch({
      type: HARVEST_TREE,
    });

    // TODO: Need to update database: apples and start time have changed; need to acquire and pass tree's _id
    // dispatch({
    //   type: UPDATE_USER
    // });
    dispatchParent({
      type: UPDATE_TREE_TIMER,
      payload: {
        _id,
        startedAtTime: now,
        duration: tree.duration
      }
    });
    setTime(tree.duration);
  }

  useInterval(() => {
    if (isReady) {
      return;
    }
    setTime(getTimeRemaining(tree.startedAtTime, tree.duration));
  }, 1000);

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
              {timeRemaining}s
            </button>
          </div>
        </div>
      )}
    </>
  );
}
