import React, { useEffect, useState } from "react";
import placeholderTreeImage from "../assets/images/placeholder-tree.png";
import { useGlobalContext } from '../utils/GlobalState';
import { PURCHASE_A_TREE } from "../utils/actions";
// import { ADD_TREE } from '../utils/mutations'




export default function PlaceholderTree() {

  // error checking: 1) this component shouldn't show if player has less than 3 apples, but I think this would happen at the parent component

  const [state, dispatch] = useGlobalContext();
  // define [addTree, { error }] = useMutation(ADD_TREE)

  function handlePurchaseTreeClick(evt) {
    evt.preventDefault();

    // try const {data} await addTree() mutation

    dispatch({type:PURCHASE_A_TREE});
    console.log(
      "apple count is: " + state.appleCount);
      console.log(
        "trees.length is: " + state.trees.length);

  }

  return (
    <>
      <div className='item-box relative'>
        <img src={placeholderTreeImage} alt=""></img>
        <div className='absolute'>
            <button className='sz-sm btn btn-harvest' onClick={handlePurchaseTreeClick}>Purchase Tree</button>
        </div>
      </div>
    </>
  );
}
