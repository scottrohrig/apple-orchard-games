import React from "react";
import Tree from "../Tree";

const exampleTreeArray = [
  { treeId: 0, treeStatus: "growing" },
  { treeId: 1, treeStatus: "ready to harvest" },
];

export default function Orchard() {
  return (
    <>
      <h1 style={{ color: "blue" }}>orchard</h1>
      {exampleTreeArray.map((tree) => (
        <div key={tree.treeId}>
          <Tree />
          <p>{tree.treeStatus}</p>
        </div>
      ))}
    </>
  );
}
