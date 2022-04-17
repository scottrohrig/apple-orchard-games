import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "./GlobalState";

export function getTimeRemaining(startedAtTime, duration) {
  const now = new Date();
  const then = new Date(startedAtTime);
  const tr = Math.max(duration - Math.floor((now - then) / 1000), 0);
  return tr;
}

export function formatTime(rawTime) {
  var minutes = rawTime.getMinutes();
  var seconds = rawTime.getSeconds();
  var strTime = `${seconds}`;

  return strTime;
}

export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

// custom interval Hook
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback, delay) {
  const savedCallback = useRef();
  // remember last callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // setup interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function useStateToLocalStorage() {
  console.log("hello from useStateToLocalStorage");
  console.log();
  localStorage.setItem("state", " 7");
  // const [state, dispatch] = useGlobalContext();

  // const consoleLogState = function (arg) {
  //   console.log(arg);
  // };

  return (
    // <>const [state, dispatch] = useGlobalContext(); consoleLogState("test");</>
    <>
      {/* const [state, dispatch] = useGlobalContext(); console.log("test inside return"); */}
    </>
    // <></>
  );
}
