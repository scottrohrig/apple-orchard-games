// Orchard.js
import Tree from "../components/Tree";
import PlaceholderTree from "../components/PlaceholderTree";
import PlaceholderDD from "../components/PlaceholderDD";

import "../style/orchard.css";

import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { useGlobalContext } from "../utils/GlobalState";
import { getTimeRemaining } from "../utils/helpers";
import { HARVEST_TREE, UPDATE_TREE_TIMER } from "../utils/actions";

import barn from "../assets/images/barn.png";

let showHarvestOrchardButton = false;

export default function Orchard() {
  const [state, dispatch] = useGlobalContext();

  const loading = state?.loading;
  const trees = state?.trees || [];

  const [checkOrchardReadyToHarvest, setCheckOrchardReadyToHarvest] =
    useState(false);

  // this useEffect controls whether the Harvest Orchard button is displayed
  useEffect(() => {
    setCheckOrchardReadyToHarvest(false);
    if (trees.length <= 2) {
      return;
    }
    showHarvestOrchardButton = trees.every((tree) => {
      if (tree.startedAtTime == undefined) {
        return true;
      } else {
        let tr = getTimeRemaining(tree.startedAtTime, tree.duration);
        if (tr <= 0) {
          return true;
        } else {
          return false;
        }
      }
    });
  }, [checkOrchardReadyToHarvest]);

  const handleHarvestOrchard = function () {
    console.log("handleHarvestOrchard");
    const now = new Date();
    trees.forEach((tree) => {
      // console.log("tree id is " + tree._id);
      if (tree.startedAtTime == undefined) {
        return;
      } else {
        dispatch({
          type: HARVEST_TREE,
        });

        dispatch({
          type: UPDATE_TREE_TIMER,
          payload: {
            _id: tree._id,
            startedAtTime: now,
            duration: tree.duration,
          },
        });
      }
      //   let tr = getTimeRemaining(tree.startedAtTime, tree.duration);
      //   if (tr <= 0) {
      //     console.log("tr is: " + tr + "id is " + tree._id);
      //     return true;
      //   } else {
      //     return false;
      //   }
      // }
    });
  };

  return (
    <div className="orchard-wrapper">
      <img src={barn} className="orchard-barn" alt="" />
      <h2 className="page-title">
        <div className="display-banner text-center">My Orchard</div>
      </h2>
      <div className="orchard">
        {showHarvestOrchardButton && (
          <button
            className="btn btn-orchard-harvest"
            onClick={handleHarvestOrchard}
          >
            Harvest
            <br />
            Orchard
          </button>
        )}
        <div className="orchard-row">
          <div className="tree-container">
            <PlaceholderTree />
            <PlaceholderDD />
            {
              // map thru juicer objects from GlobalState to add to row
              trees.map((tree, i) => {
                return (
                  <div key={i} className="orchard-box">
                    {
                      <Tree
                        _id={tree._id}
                        tree={tree}
                        dispatchParent={dispatch}
                        setCheckOrchardReadyToHarvest={
                          setCheckOrchardReadyToHarvest
                        }
                      />
                    }
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
