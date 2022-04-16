import React, { useEffect, useState } from "react";
import treeImage from "../assets/images/tree.png";
import { useGlobalContext } from "../utils/GlobalState";
import { HARVEST_TREE, UPDATE_TREE_TIMER } from "../utils/actions";
import { SET_TREE } from "../utils/mutations";
import { getTimeRemaining, useInterval } from '../utils/helpers';

import treeBare from "../assets/images/tree-short.svg";
import treeApples from "../assets/images/tree-with-apples-short.svg";
import { useMutation } from '@apollo/client';

export default function Tree({ tree, _id, dispatchParent }) {
  const [state, dispatch] = useGlobalContext();
  const [updateTree, {error}] = useMutation(SET_TREE,{
    update(cache, {data: {updateTree}}){
      console.log('mutation SET_TREE', updateTree)
    }
  })

  const [timeRemaining, setTime] = useState(10);

  let isReady = timeRemaining <= 0;


  // reset countdown when button clicked
  async function handleTreeClick(evt) {

    const now = new Date();
    dispatch({
      type: HARVEST_TREE,
    });

    const payload = {
      _id,
      startedAtTime: now,
      duration: tree.duration
    }

    dispatchParent({
      type: UPDATE_TREE_TIMER,
      payload,
    });

    setTime(tree.duration);

    await updateTree({variables: {treeId: payload._id, startedAtTime: now, duration: tree.duration}})
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
