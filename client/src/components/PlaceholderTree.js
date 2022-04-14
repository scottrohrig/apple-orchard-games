import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from "react";
import placeholderTreeImage from "../assets/images/placeholder-tree.png";
import { useGlobalContext } from "../utils/GlobalState";
import { PURCHASE_A_TREE } from "../utils/actions";
import { ADD_TREE } from "../utils/mutations";

// import { ADD_TREE } from '../utils/mutations'

export default function PlaceholderTree() {
  // error checking: 1) this component shouldn't show if player has less than 3 apples, but I think this would happen at the parent component

  const [state, dispatch] = useGlobalContext();
  // define [addTree, { error }] = useMutation(ADD_TREE)
  const [addTree, { error }] = useMutation(ADD_TREE);
  const { trees }=state;


  const handlePurchaseTreeClick = async (evt) => {
    console.log("in handlePurchaseTreeClick");

    try {
      await addTree();
    } catch (err) {
      console.error(err);
    }

    console.log("dispatching to GameState");
    try {
      const payload = {
        _id: trees.length + 1,
        startedAtTime: new Date(),
        duration: state.gameVariables.appleGrowTime,
      };
      dispatch({
        type: PURCHASE_A_TREE,
        payload,
      });
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <div className="item-box relative">
        <img src={placeholderTreeImage} alt=""></img>
        <div className="absolute">
          <button
            className="sz-sm btn btn-harvest"
            onClick={handlePurchaseTreeClick}
          >
            Grow Tree
          </button>
        </div>
      </div>
    </>
  );
}
