import React, { useEffect } from 'react';
import gem from '../assets/images/gem.svg';
import basket from '../assets/images/basket.svg';
import { useGlobalContext } from '../utils/GlobalState';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_STATE } from '../utils/actions';

function Header(props) {
  const {
    showLeaderboard,
    setShowLeaderboard,
    showProfile,
    setShowProfile,
    showMarketplace,
    setShowMarketplace,
  } = props;

  const { loading, data } = useQuery(QUERY_ME)

  const [state, dispatch] = useGlobalContext();
  const money = state?.money || 0;
  const gemCount = state?.gemCount || 0;
  const appleCount = state?.appleCount || 0;

  useEffect(()=> {
    if (data) {

      dispatch({
        type: UPDATE_STATE,
        payload: {...data, appleCount: data.appleCount}
      })
    }
  }, [loading, state, dispatch])

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
              }}
            >
              <i className="fa-solid fa-trophy"></i>
            </button>
            <button
              className="btn btn-profile"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowMarketplace(false);
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
