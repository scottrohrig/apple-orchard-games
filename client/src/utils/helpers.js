import { useEffect, useRef, useState } from 'react';


export function getTimeRemaining(startedAtTime, duration) {
  const now = new Date()
  const then = new Date(startedAtTime)
  const tr = Math.max(duration - Math.floor((now - then) / 1000),0)
  return tr
}

export function formatTime(rawTime) {
  var minutes = rawTime.getMinutes()
  var seconds = rawTime.getSeconds()
  var strTime = `${seconds}`

  return strTime
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

// IndexedDB
export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // Opens connection to `orchard_db` version 1
    const request = indexedDB.open("orchard_db", 1);

    // Creates variables to hold references to the database, transaction (tx), and object store
    let db, tx, store;

    // If version has changed, or first time connecting, create new object stores
    request.onupgradeneeded = (e) => {
      const db = request.result;

      // Create object store for each type of data and set primary key to `_id` of the data
      db.createObjectStore("orchard", { keyPath: "_id" });
      db.createObjectStore("mashers", { keyPath: "_id" });
      db.createObjectStore("juicers", { keyPath: "_id" });
      db.createObjectStore("pies", { keyPath: "_id" });
    };

    // Handles errors
    request.onerror = (e) => {
      console.log("There was an error");
    };

    // On open success
    request.onsuccess = (e) => {
      // Save a reference of the database
      db = request.result;
      // Open a transaction with `storeName`
      tx = db.transaction(storeName, "readwrite");
      // Saves a reference to the object store
      store = tx.objectStore(storeName);

      // Notify of errors
      db.onerror = (e) => {
        console.log("error", e);
      };

      switch (method) {
        case "put":
          store.put(object);
          resolve(object);
          break;
        case "get":
          const all = store.getAll();
          all.onsuccess(all.result);
          break;
        case "delete":
          store.delete(object._id);
          break;
        default:
          console.log("No valid method");
          break;
      }

      // Close connection on transaction completion
      tx.oncomplete = () => {
        db.close();
      };
    };
  });
}
