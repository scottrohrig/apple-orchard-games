import React from 'react';
import gem from '../assets/images/gem.svg';
import basket from '../assets/images/basket.svg';
import { useGlobalContext } from '../utils/GlobalState';
import { Link } from 'react-router-dom';

function Header(props) {
  const {
    showLeaderboard,
    setShowLeaderboard,
    showProfile,
    setShowProfile,
    showMarketplace,
    setShowMarketplace,
  } = props;

  const [state, dispatch] = useGlobalContext();
  // const money = state.money
  const { money, gemCount, appleCount } = state;
  // const gemCount = state.gemCount
  // const appleCount = state.appleCount

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
