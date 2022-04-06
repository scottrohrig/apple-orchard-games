import React from "react";
import Pie from "./Pie";

const examplePieArray = [
    { pieId: 0, pieStatus: "baking" },
    { pieId: 1, pieStatus: "pie is baked" },
];

export default function Pies() {
    return (
        <>
            <h1 style={{ color: "brown" }}>Pies</h1>
            {examplePieArray.map((pie) => (
                <div key={pie.pieId}>
                    <Pie />
                    <p>{pie.pieStatus}</p>
                </div>
            ))}
        </>
    );
}
