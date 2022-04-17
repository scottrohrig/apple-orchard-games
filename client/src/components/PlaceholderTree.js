import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from "react";
import placeholderTreeImage from "../assets/images/placeholder-tree.png";
import { useGlobalContext } from "../utils/GlobalState";
import { PURCHASE_A_TREE } from "../utils/actions";
import { ADD_TREE } from "../utils/mutations";

import emptyPlot from '../assets/images/empty-plot-with-leaf.svg';

// import { ADD_TREE } from '../utils/mutations'

export default function PlaceholderTree() {
  // error checking: 1) this component shouldn't show if player has less than 3 apples, but I think this would happen at the parent component

  const [state, dispatch] = useGlobalContext();
  // define [addTree, { error }] = useMutation(ADD_TREE)
  const [addTree, { addTreeError }] = useMutation(ADD_TREE);
  const { trees } = state;


  const handlePurchaseTreeClick = async (evt) => {

    console.log(`appleCount ${state.appleCount} in handlePurchaseTreeClick`);
    if (state.appleCount < state.gameVariables.applesForNewTree){
      return
    }
    console.log('appleGrowTime: ',state.gameVariables.appleGrowTime);
    const now = new Date();
    let newTree; 
    try {
      const { data: userData } = await addTree({
        variables: {
          duration: state.gameVariables.appleGrowTime
        }
      });
      const treesArr = userData.addTree.trees;
      newTree = treesArr[treesArr.length - 1];
      console.log(newTree);
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
        console.log('newTree PAYLOAD...', payload);
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
