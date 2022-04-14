// Orchard.js
import Tree from "../components/Tree";
import PlaceholderTree from "../components/PlaceholderTree";

import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../utils/GlobalState";

export default function Orchard() {
  // let disabled = true;

  const [state, dispatch] = useGlobalContext();
  const { trees } = state;

  return (
    <div>
      <h2 className="page-title">
        <div className="display-banner text-center">Orchard Page</div>
      </h2>
      <div className="item-row">
        <div className="tree-container"
        style={{
          width: "90vw",
          margin: "2rem auto",
          display: "flex",
          flexWrap: "wrap",
          border: "1px solid var(--btn-harvest-main)",
          borderRadius: ".5rem",
        }}>
          {
            // map thru juicer objects from GlobalState to add to row
            trees.map((tree, i) => {
              return (
                <div key={i} className="item-box">
                  {
                    // if object in map does not have `_id` show placeholder.
                    tree._id ? (
                      <Tree props={{ tree, dispatch }} />
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
      {/* <div
        className="tree-container"
        style={{
          width: "90vw",
          margin: "2rem auto",
          display: "flex",
          flexWrap: "wrap",
          border: "1px solid var(--btn-harvest-main)",
          borderRadius: ".5rem",
        }}
      >
        <Tree />
        <PlaceholderTree />
      </div> */}
    </div>
  );
}
