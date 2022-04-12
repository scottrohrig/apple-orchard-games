import React from 'react';
import './Splash.css';

// Import login and signup
import Login from '../components/Login';
import Signup from '../components/Signup';

// Import SVG Images
import apple from '../assets/images/apple.svg';
import tree from '../assets/images/tree-with-apples.svg';
import cloud from '../assets/images/cloud-1.svg';

const Splash = () => {
    return (
        <div className='splash-page'>
            <div className='splash-animation'>
                <img src={cloud} className='animation-cloud' id='cloud' alt='' />
                <img src='https://cdn-icons-png.flaticon.com/512/517/517588.png' className='barn barn-shadow shadow' alt='' />
                <img src='https://cdn-icons-png.flaticon.com/512/517/517588.png' className='barn' alt='' />
                <img src={tree} className='tree shadow' alt='' />
                <img src={tree} className='tree' alt='' />
                <img src={apple} className='apple apple-shadow' alt='' />
                <img src={apple} className='animation-fall apple' alt='' />
            </div>
            <Login />
            <Signup />
        </div>
    );
}

export default Splash;