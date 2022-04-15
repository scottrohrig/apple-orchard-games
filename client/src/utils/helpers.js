import { useEffect, useRef, useState } from 'react';

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

export function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
