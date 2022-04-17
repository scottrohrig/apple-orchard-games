import { useQuery, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';
import { RESET_USER_STATS } from '../utils/mutations';


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

  // define the mutation function and set it equal to useMutation(RESET_USER_STATS)

  const [resetStats, { error: resetError }] = useMutation(RESET_USER_STATS);
  const handleReset = async (event) => {
    event.preventDefault();
    try {
      const { data: resetData } = await resetStats({
        variables: {
          money: 0,
          appleCount: 5
        }
      })
    }

    catch (error) {
      console.error(error)
    }

  }


  // define the event handler


  return (
    <div>
      <div
        className={`modal-background ${showProfile && 'modal-background-active'
          }`}
        onClick={() => setShowProfile(!showProfile)}
      ></div>

      <div className={`leaderboard profile modal ${showProfile && 'modal-active'}`}>
        <button
          className="btn btn-modal"
          onClick={() => {
            if (showProfile) {
              setShowProfile(!showProfile);
            }
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="page-title">
          <p className="display-banner">{user.username}'s Profile</p>
        </h2>

        <form className="update-profile">
          <h3>Update Profile</h3>
          <label className='form-label'>Username:</label>
          <input type="text" id="username" className='form-control' defaultValue={user.username} />
          <label className='form-label'>Email:</label>
          <input type="text" id="email" className='form-control' defaultValue={user.email} />
          <label className='form-label'>Password:</label>
          <input type="password" className='form-control' id="password" />
          <button className='btn btn-update' type="submit" disabled>
            Update
          </button>
        </form>
        <div className='stats'>
          <h3>Stats</h3>
          <p>User stats are coming soon!</p>
          <button className='btn btn-shop' type="resetStats" onClick={resetStats}>
            Reset Stats
          </button>
        </div>
        <div className='logout'>
          <button className='btn btn-logout' type="logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
