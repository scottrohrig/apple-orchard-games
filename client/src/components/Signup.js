import React, { useState } from 'react';
// import mutation hook
import { useMutation } from '@apollo/client';
// import Link for router
import { Redirect, Link } from 'react-router-dom';
// import adding user mutation
import { ADD_USER } from '../utils/mutations';
// import auth class to handle json web token decoding
import Auth from '../utils/auth';


// define Login component function
const Signup = (props) => {

  // set the default form state
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [addUser, { error }] = useMutation(ADD_USER);
  // define the login function to handle the LOGIN mutation
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // redirect the user to /home if user is logged in
  if (Auth.loggedIn()) {
    return <Redirect to="/home" />;
  };

  // form submit handler function
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  // form input change handler function

  // return the component JSX
  return (
    <main className="sign-up">
      <h4 className="card-header form-label">Sign Up</h4>
      <div className="card-body">
        <form onSubmit={handleFormSubmit}>
          <input
            className="form-control"
            placeholder="Your username"
            name="username"
            type="text"
            id="signup-username"
            value={formState.username}
            onChange={handleChange}
          />
          <input
            className="form-control"
            placeholder="Your email"
            name="email"
            type="email"
            id="signup-email"
            value={formState.email}
            onChange={handleChange}
          />
          <input
            className="form-control"
            placeholder="******"
            name="password"
            type="password"
            id="signup-password"
            value={formState.password}
            onChange={handleChange}
          />
          <button className="btn d-block w-100 form-submit" type="submit">
            Submit
          </button>
        </form>

        {error && <div>Signup failed</div>}
      </div>
    </main>
  );
};

export default Signup;
