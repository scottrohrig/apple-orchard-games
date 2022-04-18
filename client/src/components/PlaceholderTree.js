import { useMutation } from '@apollo/client';
import React from "react";
import { useGlobalContext } from "../utils/GlobalState";
import { PURCHASE_A_TREE } from "../utils/actions";
import { ADD_TREE } from "../utils/mutations";

import emptyPlot from '../assets/images/empty-plot-with-leaf.svg';

// import { ADD_TREE } from '../utils/mutations'

export default function PlaceholderTree() {

  const [state, dispatch] = useGlobalContext();
  const [addTree, { addTreeError }] = useMutation(ADD_TREE);

  const handlePurchaseTreeClick = async (evt) => {

    if (state.appleCount < state.gameVariables.applesForNewTree){
      return
    }
    const now = new Date();
    let newTree;
    try {
      const { data: userData } = await addTree({
        variables: {
          duration: state.gameVariables.appleGrowTime
        }
      });
      // get newest added tree
      const treesArr = userData.addTree.trees;
      newTree = treesArr[treesArr.length - 1];
    } catch (err) {
      console.error(err);
    }

    if(newTree){
      try {
        const payload = {
          _id: newTree._id,
          startedAtTime: now,
          duration: newTree.duration,
        };
        dispatch({
          type: PURCHASE_A_TREE,
          payload,
        });
      } catch (error) {
        console.log("error");
        console.log(addTreeError);
      }
    }
    };

  return (
    <>
      <div className="item-box relative tree-item">
        <img src={emptyPlot} className="empty-plot" alt=""></img>
        <div className="">
          <button
            className="btn btn-harvest"
            onClick={handlePurchaseTreeClick}
          >
            Plant
          </button>
        </div>
      </div>
    </>
  );
}
