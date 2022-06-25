import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import "../style/leaderboard.css";

const GET_SCORES = gql`
  query Users {
    users {
      username
      money
      inventoryJSON
    }
  }
`;

export default function Leaderboard({ showLeaderboard, setShowLeaderboard }) {
  // const [getScores] = useQuery(GET_SCORES)
  const {
    loading,
    data: highscoreData,
    error,
    refetch: refetchScores,
  } = useQuery(GET_SCORES);

  if (!loading) {
    refetchScores();
  }

  console.log(highscoreData);
  // let users = [{ username: "JKL", inventoryJSON: '{"money":111}' }];
  let users = [...highscoreData.users];
  console.log(users);
  users = users.sort(
    (a, b) =>
      JSON.parse(b.inventoryJSON).money - JSON.parse(a.inventoryJSON).money
  );
  console.log(users);

  return (
    <div>
      <div
        className={`modal-background ${
          showLeaderboard && "modal-background-active"
        }`}
        onClick={() => {
          if (showLeaderboard) {
            setShowLeaderboard(!showLeaderboard);
          }
        }}
      ></div>

      <div className={`leaderboard modal ${showLeaderboard && "modal-active"}`}>
        <button
          className="btn btn-modal"
          onClick={() => setShowLeaderboard(!showLeaderboard)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="page-title">
          <p className="display-banner">Leaderboard</p>
        </h2>

        <div className="lb-grid">
          <div className="lb-grid-item lb-title">Place</div>
          <div className="lb-grid-item lb-title">Name</div>
          <div className="lb-grid-item lb-title">Score</div>
        </div>
        {!loading &&
          users.map((user, index) => (
            <div className="lb-grid" key={index}>
              <div className="lb-grid-item">{index + 1}</div>
              <div className="lb-grid-item">{user.username}</div>
              <div className="lb-grid-item">
                {JSON.parse(user.inventoryJSON).money}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
