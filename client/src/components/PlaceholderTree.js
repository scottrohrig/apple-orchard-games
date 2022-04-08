import React, { useEffect, useState } from "react";
import placeholderTreeImage from "../assets/images/placeholderTreeImage.png";

const costOfTree = 3;

export default function PlaceholderTree() {

  // error checking: 1) this component shouldn't show if player has less than 3 apples, but I think this would happen at the parent component

  function handlePurchaseTreeClick(evt) {
    evt.preventDefault();
    console.log("add one tree to inventory, reduce apples by " + costOfTree + "."

    )
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
