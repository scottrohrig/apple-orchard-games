import React, { useEffect, useState } from "react";
import treeImage from "../assets/images/tree.jpg";

export default function Tree() {
  // number of seconds to grow apples; should reference a global game tuning variable?
  const [secondsLeft, setSecondsLeft] = useState(30);

  // reset countdown when button clicked
  function handleTreeClick(evt) {
    evt.preventDefault();
    setSecondsLeft(30);
  }

  //countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }
    const updateSecondsLeft = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(updateSecondsLeft);
  }, [secondsLeft]);

  return (
    <>
      <h1>tree</h1>
      <img src={treeImage} alt=""></img>
      <button onClick={handleTreeClick}>{secondsLeft}</button>
    </>
  );
}
