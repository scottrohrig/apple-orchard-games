import React from "react";
import Masher from "./Masher";

const exampleMasherArray = [
  { masherId: 0, masherStatus: "mashing" },
  { masherId: 1, masherStatus: "sauce is made" },
];

export default function Mashers() {
  return (
    <>
      <h1 style={{ color: "blue" }}>mashers</h1>
      {exampleMasherArray.map((masher) => (
        <div key={masher.masherId}>
          <Masher />
          <p>{masher.masherStatus}</p>
        </div>
      ))}
    </>
  );
}
