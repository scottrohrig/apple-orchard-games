import { useQuery, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';

export default function Profile({
  showProfile,
  setShowProfile,
  showMarketplace,
  setShowMarketplace,
}) {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const { loading, data } = useQuery(QUERY_ME);
  const [updateDB, { error }] = useMutation(UPDATE_USER);

  const user = data?.me || data?.user || {};

  return (
    <div>
      <div
        className={`modal-background ${
          showProfile && 'modal-background-active'
        }`}
        onClick={() => setShowProfile(!showProfile)}
      ></div>

      <div className={`leaderboard modal ${showProfile && 'modal-active'}`}>
        <button
          className="btn btn-modal"
          onClick={() => setShowProfile(!showProfile)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="page-title">
          <p className="display-banner">Profile</p>
        </h2>

        <form className="">
          <div>
            <label>username:</label>
            <input type="text" id="username" defaultValue={user.username} />
          </div>
          <div>
            <label>email:</label>
            <input type="text" id="email" defaultValue={user.email} />
          </div>
          <div>
            <label>password:</label>
            <input type="password" id="password" />
          </div>
          <div>
            <button type="logout" onClick={logout}>
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
