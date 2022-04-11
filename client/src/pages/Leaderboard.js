import React from "react";
import "../components/Leaderboard.css";

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
    <div className="leaderboard">
      <h2 className='page-title'><p className="display-banner">Leaderboard</p></h2>
      <p>Place Name Score</p>
      <ol>
        {exampleLeaderboardArray.map((leader, index) => (
          <li key={index}>
            {index + 1} --- {leader.displayName} --- {leader.score}
          </li>
        ))}
      </ol>
    </div>
  );
}
