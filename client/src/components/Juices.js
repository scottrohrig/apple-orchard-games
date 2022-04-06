import React from "react";
import Juice from "./Juice";

const exampleJuiceArray = [
    { juiceId: 0, juiceStatus: "juicing" },
    { juiceId: 1, juiceStatus: "juice is made" },
];

export default function Juices() {
    return (
        <>
            <h1 style={{ color: "yellow" }}>Juices</h1>
            {exampleJuiceArray.map((juice) => (
                <div key={juice.juiceId}>
                    <Juice />
                    <p>{juice.juiceStatus}</p>
                </div>
            ))}
        </>
    );
}
