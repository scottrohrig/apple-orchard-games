import React, { useState } from 'react';
// import mutation hook
import { useMutation } from '@apollo/client';
// import Redirect, Link for router
import { Navigate } from 'react-router-dom';
// import login mutation
import { LOGIN_USER } from '../utils/mutations';
// import auth class to handle json web token decoding
import Auth from '../utils/auth';

// define Login component function
const Login = ({ showLogin, setShowLogin, setShowSignup, setShowStartButton }) => {
  // set the default form state
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const [login, { error }] = useMutation(LOGIN_USER);

  // redirect the user to /home if user is logged in
  if (Auth.loggedIn()) {
    return <Navigate to="/" replace={true} />;
  };

  // define the login function to handle the LOGIN mutation
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // form submit handler function
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      console.log('success login');

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  // form input change handler function

  // return the component JSX
  return (
    <main className={`splash-form login ${!showLogin && 'form-deactive'}`}>
    <button className='splash-back' onClick={() => {
      setShowLogin(!showLogin);
      setShowStartButton(true);
    }}>
      <i className="fa-solid fa-caret-left"></i>
    </button>
    <h2 className='page-title splash-title'><p className="display-banner">Login</p></h2>
      <form onSubmit={handleFormSubmit}>
        <input
          className="form-control"
          placeholder="Your email"
          name="email"
          type="email"
          id="login-email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          className="form-control"
          placeholder="******"
          name="password"
          type="password"
          id="login-password"
          value={formState.password}
          onChange={handleChange}
        />

        <div className='text-center'>
          <button className="btn form-submit" type="submit">
            Submit
          </button>
        </div>
      </form>

      <button className="btn toggle-login" onClick={() => {
        setShowLogin(false);
        setShowSignup(true);
      }}>Don't have an account? Sign up!</button>

      {error && <div className="login-failed">Login failed</div>}
    </main>
  );
};

export default Login;
