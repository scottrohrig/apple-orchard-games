import React from "react";
// import "./Leaderboard.css";

const exampleLeaderboardArray = [
  { displayName: "albert", score: 99 },
  { displayName: "betty", score: 98 },
  { displayName: "calvin", score: 97 },
  { displayName: "denice", score: 96 },
  { displayName: "edgar", score: 95 },
  { displayName: "freddie", score: 94 },
  { displayName: "grace", score: 93 },
  { displayName: "holly", score: 92 },
  { displayName: "ignacio", score: 91 },
  { displayName: "joy", score: 90 },
];

export default function Leaderboard() {
  return (
    <>
      <h1 style={{ color: "blue" }}>Leaderboard</h1>
      <p>Place Name Score</p>
      <ol>
        {exampleLeaderboardArray.map((leader, index) => (
          <li>
            {index + 1} --- {leader.displayName} --- {leader.score}
          </li>
        ))}
      </ol>
    </>
  );
}
