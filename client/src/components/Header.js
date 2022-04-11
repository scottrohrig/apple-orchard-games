import React from "react";
import gem from "../assets/images/gem.svg";
import basket from "../assets/images/basket.svg";
import { useGlobalContext } from '../utils/GlobalState';
import {Link} from 'react-router-dom'

function Header() {

  const [state, dispatch] = useGlobalContext()
  // const money = state.money
  const {money, gemCount, appleCount} = state
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
              <button className="btn btn-profile">
                <i className="fa-solid fa-circle-user"></i>
              </button>
            </div>

        </div>
      </header>

      <div className="nav-buttons">
        <Link to='/home' className="btn btn-nav">
          <i className="fa-solid fa-house-chimney-window"></i>
        </Link >
        <Link to='/marketplace' className="btn btn-nav">
          <i className="fa-solid fa-cart-shopping"></i>
        </Link >
      </div>
    </div>
  );
}

export default Header;
