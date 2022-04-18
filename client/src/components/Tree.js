import React, { useState } from "react";
import { HARVEST_TREE, UPDATE_TREE_TIMER } from "../utils/actions";
import { SET_TREE } from "../utils/mutations";
import { getTimeRemaining, useInterval } from '../utils/helpers';

import treeBare from "../assets/images/tree-short.svg";
import treeApples from "../assets/images/tree-with-apples-short.svg";
import { useMutation } from '@apollo/client';

export default function Tree({ tree, _id, dispatchParent }) {
  const [setTreeTime] = useMutation(SET_TREE)

  const [timeRemaining, setTime] = useState(10);

  let isReady = timeRemaining <= 0;

  // reset countdown when button clicked
  function handleTreeClick(evt) {

    const now = new Date();
    dispatchParent({
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
    setTreeTime({variables: {
      treeId: _id,
      startedAtTime: now,
      duration: tree.duration
    }})
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
