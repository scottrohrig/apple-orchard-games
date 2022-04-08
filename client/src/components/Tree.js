import React, { useEffect, useState } from "react";
import treeImage from "../assets/images/tree.png";

export default function Tree() {
  // number of seconds to grow apples; should reference a global game tuning variable?
  const [secondsLeft, setSecondsLeft] = useState(30);

  // reset countdown when button clicked
  function handleTreeClick(evt) {
    evt.preventDefault();
    setSecondsLeft(30);
  }

  //countdown timer
  // TODO - [ ] make update action for timer function
  // https://makeschool.org/mediabook/oa/tutorials/react-redux-passwords-app-tutorial-oh4/react-redux-timers-keeping-time/

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
      {/* <h1>tree</h1> */}
      <div className='item-box relative'>
        <img src={treeImage} alt=""></img>
        <div className='absolute'>
            <button className='sz-sm btn btn-harvest' onClick={handleTreeClick}>{secondsLeft}</button>
            <button className='sz-sm btn btn-timer' >Harvest</button>
        </div>
      </div>
    </>
  );
}
