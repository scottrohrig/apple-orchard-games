import React from "react";
import Oven from "./Oven";

const exampleOvenArray = [
    { ovenId: 0, ovenStatus: "baking" },
    { ovenId: 1, ovenStatus: "pie is baked" },
];

export default function Ovens() {
    return (
        <>
            <h1 style={{ color: "grey" }}>ovens</h1>
            {exampleOvenArray.map((oven) => (
                <div key={oven.ovenId}>
                    <Oven />
                    <p>{oven.ovenStatus}</p>
                </div>
            ))}
        </>
    );
}