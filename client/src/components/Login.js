import React, { useState } from 'react';
// import mutation hook

import { useMutation } from '@apollo/client';
// import Link for router
import { Link } from 'react-router-dom';
// import login mutation
import { LOGIN_USER } from '../utils/mutations';
// import auth class to handle json web token decoding
import Auth from '../utils/auth';

// define Login component function
const Login = (props) => {
  // set the default form state
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const [login, { error }] = useMutation(LOGIN_USER);

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
    <main className="login">
      <h4 className="card-header form-label">Login</h4>
      <div className="card-body">
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
          <button className="btn form-submit" type="submit">
            Submit
          </button>
        </form>

        {error && <div>Login failed</div>}
      </div>
    </main>
  );
};

export default Login;
