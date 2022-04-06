import React from "react";
import treeImage from "../assets/images/tree.jpg";

export default function Tree() {
  useEffect(() => {
    const updateTimer = setInterval(() => {
      getTime();
    }, 1000);
  }, []);

  return (
    <>
      <h1>tree</h1>
      <img src={treeImage} alt=""></img>
      <button>30</button>
    </>
  );
}
