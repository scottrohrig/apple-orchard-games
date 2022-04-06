import React from 'react';
import './index.css';

// THIS FILE IS FOR DEVELOPMENT ONLY
// Import into App.js to see contents

function StyleReference() {
  return (
    <div className="test">
      <div className='docu'>
        <h1 className='documentation'>Buttons</h1>

        {/* BUTTONS */}
        <button className='btn btn-shop'>Shop!</button>
        <button className='btn btn-timer'>0:30</button>
        <button className='btn btn-harvest'>Harvest!</button>

      </div>
      <div className='docu'>
        <h1 className='documentation'>Display Titles</h1>

        {/* DISPLAY TITLES */}
        <p className='display-money'>100</p>
        <p className='display-banner'>My Orchard</p>

      </div>
      <div className='docu'>
        <h1 className='documentation'>Input</h1>

        {/* INPUT */}
        <form>
          <label className='form-label'>Form Label</label>
          <input className='form-control' placeholder='This is an input' />
          <input className='form-control' placeholder='Disabled Input' disabled/>
          <textarea className='form-control' placeholder='This is a textarea' />
        </form>

      </div>
      <div className='docu'>
        <h1 className='documentation'>100% CSS Animations</h1>

        {/* ANIMATIONS */}
        <div className='sprite-example'>

          <div id='apple-fall'>
            <img src='https://cdn-icons-png.flaticon.com/512/2675/2675848.png' className='animation-cloud' id='cloud' alt='' />
            <img src='https://cdn-icons-png.flaticon.com/512/517/517588.png' className='barn barn-shadow shadow' alt='' />
            <img src='https://cdn-icons-png.flaticon.com/512/517/517588.png' className='barn' alt='' />
            <img src='https://cdn-icons-png.flaticon.com/512/490/490091.png' className='tree shadow' alt='' />
            <img src='https://cdn-icons-png.flaticon.com/512/490/490091.png' className='tree' alt='' />
            <img src='https://cdn-icons-png.flaticon.com/512/704/704834.png' id='grass' alt='' />
            <img src='https://cdn-icons-png.flaticon.com/512/740/740922.png' className='apple apple-shadow' alt='' />
            <img src='https://cdn-icons-png.flaticon.com/512/740/740922.png' className='animation-fall apple' alt='' />
          </div>

          <div className='example-box-sprite'>
            <div id='sprite-run'></div>
          </div>

        </div>
      </div>
      {window.addEventListener('selectstart', function(e) {
        e.preventDefault();
      })}
      {/* {window.addEventListener('contextmenu', function(e) {
        e.preventDefault();
      })} */}
    </div>
  );
}

export default StyleReference;