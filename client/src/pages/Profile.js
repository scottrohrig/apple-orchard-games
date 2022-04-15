import { useQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';
import { validateEmail } from '../utils/helpers';

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
  // console.log(user);

  // const [formState, setFormState] = useState({
  //   username: '',
  //   email: '',
  // });
  // const { username, email } = formState;

  // useEffect(() => {
  //   if (data) {
  //     setFormState({
  //       username: user.username,
  //       email: user.email,
  //     });
  //   }
  // }, [loading, data]);

  return (
    <div>
      <div
        className={`modal-background ${
          showProfile && 'modal-background-active'
        }`}
        onClick={() => setShowProfile(!showProfile)}
      ></div>

      <div
        className={`leaderboard profile modal ${showProfile && 'modal-active'}`}
      >
        <button
          className="btn btn-modal"
          onClick={() => setShowProfile(!showProfile)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="page-title">
          <p className="display-banner">{user.username}'s Profile</p>
        </h2>

        <form className="update-profile">
          <h3>Update Profile</h3>
          {/* <label className="form-label">Username:</label> */}
          <input
            type="text"
            id="username"
            className="form-control"
            defaultValue={user.username}
            placeholder="Username"
          />
          {/* <label className="form-label">Email:</label> */}
          <input
            type="text"
            id="email"
            className="form-control"
            defaultValue={user.email}
            placeholder="Email"
          />
          {/* <label className="form-label">Password:</label> */}
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
          <button className="btn btn-update" type="submit">
            Update
          </button>
        </form>
        <div className="stats">
          <h3>Stats</h3>
          <p>User stats are coming soon!</p>
        </div>
        <div className="logout">
          <button className="btn btn-logout" type="logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
