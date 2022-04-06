import React from "react";
// need to import Juicer component

const exampleJuicerArray = [
  { juicerId: 0, juicerStatus: "juicing" },
  { juicerId: 1, juicerStatus: "juice ready to drink" },
];

export default function Juicers() {
  return (
    <>
      <h1 style={{ color: "blue" }}>juicers</h1>
      {exampleJuicerArray.map((juicer) => (
        <div key={juicer.juicerId}>
          {/* <Juicer /> */}
          <p>Juicer Image Here</p>
          <p>{juicer.juicerStatus}</p>
        </div>
      ))}
    </>
  );
}
