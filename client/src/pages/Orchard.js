// Orchard.js
import Tree from "../components/Tree";
import PlaceholderTree from "../components/PlaceholderTree";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../utils/GlobalState";

import barn from "../assets/images/barn.png";

const QUERY_TREES = gql`
query Trees {
  trees {
    _id
    startedAtTime
    duration
  }
}
`;

export default function Orchard() {
  // let disabled = true;

  const {loading, data: treeData} = useQuery(QUERY_TREES)

  const [, dispatch] = useGlobalContext();
  // const { trees } = state;
  let trees = [{}]

  useEffect(()=>{
    if (treeData) {
      console.log(treeData);
      dispatch({
        type: '',
        payload: '',
      })
    } else if (!loading) {
      console.log('sdoif');
    }
  })

  if (loading) <div>Loading...</div>

  return (
    <div className="orchard-wrapper">
      <img src={barn} className="orchard-barn" alt="" />
      <h2 className="page-title">
        <div className="display-banner text-center">My Orchard</div>
      </h2>
      <div className="orchard">
        <div className="orchard-row">
          <div className="tree-container">
            {
              // map thru juicer objects from GlobalState to add to row
              trees.map((tree, i) => {
                return (
                  <div key={i} className="orchard-box">
                    {
                      // if object in map does not have `_id` show placeholder.
                      tree._id ? (
                        <Tree
                        _id={tree._id}
                        tree={tree}
                        dispatchParent={dispatch}
                        />
                      ) : (
                        // Placeholder
                        <PlaceholderTree />
                      )
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
