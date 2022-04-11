import React from "react";
import "./Leaderboard.css";

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

export default function Leaderboard({ showLeaderboard, setShowLeaderboard }) {
  return (
    <div>
      {showLeaderboard &&
        <div className="modal-background"
          onClick={() => setShowLeaderboard(!showLeaderboard)}>
        </div>
      }
      <div className={`leaderboard modal ${showLeaderboard && 'modal-active'}`}>

        <button
          className="btn btn-modal"
          onClick={() => setShowLeaderboard(!showLeaderboard)}>
            <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className='page-title'><p className="display-banner">Leaderboard</p></h2>

        <div className="lb-grid">
          <div className="lb-grid-item lb-title">Place</div>
          <div className="lb-grid-item lb-title">Name</div>
          <div className="lb-grid-item lb-title">Score</div>
        </div>

          {exampleLeaderboardArray.map((leader, index) => (
            <div className="lb-grid" key={index}>
              <div className="lb-grid-item">{index + 1}</div>
              <div className="lb-grid-item">{leader.displayName}</div>
              <div className="lb-grid-item">{leader.score}</div>
            </div>
          ))}
          
      </div>
    </div>
  );
}
