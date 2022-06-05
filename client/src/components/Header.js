import React from 'react';
import '../style/header.css';
import gem from '../assets/images/gem.svg';
import basket from '../assets/images/basket.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  const {
    showLeaderboard,
    setShowLeaderboard,
    showProfile,
    setShowProfile,
    showMarketplace,
    setShowMarketplace,
    stateToLocalStorage,
    state: { money, gemCount, appleCount },
    state,
  } = props;

  return (
    <div className="page-links">
      <header className="component-header">
        <div className="info-boxes">
          <div className="disp-currency disp-currency-img">
            <img src={gem} alt="gem" />
            <span>{gemCount}</span>
          </div>

          <div className="disp-currency disp-currency-img">
            <img src={basket} alt="basket of apples" />
            <span>{appleCount}</span>
          </div>

          {/* uncomment the code below if you want to use the state to local storage button for development */}
          {/* <div className="disp-currency disp-currency-img">
            <button onClick={() => stateToLocalStorage(state)}>
              state to local storage
            </button>
          </div> */}

          <div className="disp-currency disp-currency-money">
            <p className="display-money">{money}</p>
          </div>

          <div className="disp-user">
            <button
              className="btn btn-leaderboard"
              onClick={() => {
                setShowLeaderboard(!showLeaderboard);
                setShowMarketplace(false);
                setShowProfile(false);
              }}
            >
              <i className="fa-solid fa-trophy"></i>
            </button>
            <button
              className="btn btn-profile"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowMarketplace(false);
                setShowLeaderboard(false);
              }}
            >
              <i className="fa-solid fa-circle-user"></i>
            </button>
          </div>
        </div>
      </header>

      <div className="nav-buttons">
        <Link to="/" className="btn btn-nav">
          <i className="fa-solid fa-house-chimney-window"></i>
          <span>Dashboard</span>
        </Link>
        <Link to="/orchard/1" className="btn btn-nav orchard-link">
          <i className="fa-solid fa-apple-whole"></i>
        </Link>
        <button
          className="btn btn-nav"
          onClick={() => {
            setShowMarketplace(!showMarketplace);
            setShowLeaderboard(false);
            setShowProfile(false);
          }}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          <span>Shop</span>
        </button>
      </div>
    </div>
  );
}

export default Header;
