import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from "react";
import { useGlobalContext } from '../utils/GlobalState';
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

const GET_SCORES = gql`
query Users {
  users {
    username
    money
  }
}
`;

export default function Leaderboard({
  showLeaderboard, setShowLeaderboard,
  showMarketplace, setShowMarketplace,
}) {
  // const [getScores] = useQuery(GET_SCORES)
  const { loading, data: highscoreData, error, refetch: refretchScores } = useQuery(GET_SCORES);

  useEffect(() => {
    if (highscoreData) {

      // console.log(highscoreData.users);
      highscoreData.users.map(u=> console.log(u.username, u.money))
    } else if (!loading) {
      highscoreData = exampleLeaderboardArray
    }
  }, [loading, highscoreData]);

  if (loading) return <div><h2>Loading...</h2></div>;
  if (!loading) {
    refretchScores();
  }

  return (
    <div>
      <div className={`modal-background ${showLeaderboard && 'modal-background-active'}`}
        onClick={() => setShowLeaderboard(!showLeaderboard)}></div>

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
        {!loading && highscoreData.users.map((user, index) => (
          <div className="lb-grid" key={index}>
            <div className="lb-grid-item">{index + 1}</div>
            <div className="lb-grid-item">{user.username}</div>
            <div className="lb-grid-item">{user.money}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
