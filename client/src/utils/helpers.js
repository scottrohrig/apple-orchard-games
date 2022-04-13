import { useEffect, useRef, useState } from 'react';


export function getTimeRemaining(startedAtTime, duration) {
  const now = new Date()
  const tr = Math.max(duration - Math.floor((now - startedAtTime) / 1000),0)
  return tr
}

export function formatTime(rawTime) {
  var minutes = rawTime.getMinutes()
  var seconds = rawTime.getSeconds()
  var strTime = `${seconds}`

  return strTime
}

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
