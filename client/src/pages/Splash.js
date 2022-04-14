import React, { useState } from 'react';
import './Splash.css';

// Import login and signup
import Login from '../components/Login';
import Signup from '../components/Signup';

// Import SVG Images
import apple from '../assets/images/apple.svg';
import tree from '../assets/images/tree-with-apples.svg';
import cloud from '../assets/images/cloud-1.svg';
import barn from '../assets/images/barn.png';

const Splash = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);
    return (
        <div className='splash-page'>
            <div className='splash-animation'>
                <img src={cloud} className='animation-cloud' id='cloud' alt='' />
                <img src={barn} className='barn barn-shadow shadow' alt='' />
                <img src={barn} className='barn' alt='' />
                <img src={tree} className='tree shadow' alt='' />
                <img src={tree} className='tree' alt='' />
                <img src={apple} className='apple apple-shadow' alt='' />
                <img src={apple} className='animation-fall apple' alt='' />
            </div>
            <div className='login-page-center'>
                <div className={`btn-login ${!showStartButton && 'start-deactive'}`}>
                    <button className='btn btn-shop' onClick={() => {
                        setShowLogin(!showLogin);
                        setShowStartButton(!showStartButton);
                    }}>Let's Harvest!</button>
                </div>
            </div>
            <div className='login-page-center'>
                <Login showLogin={showLogin} setShowLogin={setShowLogin} setShowSignup={setShowSignup} setShowStartButton={setShowStartButton} />
            </div>
            <div className='login-page-center'>
                <Signup showSignup={showSignup} setShowSignup={setShowSignup} setShowLogin={setShowLogin} setShowStartButton={setShowStartButton} />
            </div>
            
        </div>
    );
}

export default Splash;