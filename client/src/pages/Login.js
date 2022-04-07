import React, { useState } from 'react'
// import mutation hook
// import Link for router
// import login mutation
// import auth class to handle json web token decoding


// define Login component function
function Login(props) {

  // set the default form state
  const [ formState, setFormState ] = useState({
    email: 'example@email.com',
    password: '********'
  })
  // define the login function to handle the LOGIN mutation

  // form submit handler function

  // form input change handler function

  // return the component JSX
  return (
    <div>
      <form>
        <div className='form-label'>Login</div>
      {/*
        form with styling (see stylesheet for class names)
          label
          input
          input
          button
          link to signup page
        error message
      */}
      </form>

    </div>
  )

}

export default Login;
