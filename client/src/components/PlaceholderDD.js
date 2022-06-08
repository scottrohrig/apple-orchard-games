import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import placeholderTreeImage from "../assets/images/placeholder-tree.png";
import { useGlobalContext } from "../utils/GlobalState";
import { PURCHASE_A_TREE } from "../utils/actions";
import { ADD_TREE_ARRAY, UPDATE_INVENTORY_ALL } from "../utils/mutations";

import emptyPlot from "../assets/images/empty-plot-with-leaf.svg";

// import { ADD_TREE } from '../utils/mutations'

export default function PlaceholderDD() {
  // error checking: 1) this component shouldn't show if player has less than 3 apples, but I think this would happen at the parent component

  const [state, dispatch] = useGlobalContext();
  // define [addTree, { error }] = useMutation(ADD_TREE)
  const [updateInventoryAll, { error }] = useMutation(UPDATE_INVENTORY_ALL);
  const { trees } = state;

  const handleTreeArray = async () => {
    console.log("in handleTreeArray");

    try {
      await updateInventoryAll({
        variables: { tests: "update inventory 8" },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="item-box relative tree-item">
        {/* <img src={emptyPlot} className="empty-plot" alt=""></img> */}
        <div className="">
          <button onClick={handleTreeArray}>Tree Array</button>
        </div>
      </div>
    </>
  );
}
