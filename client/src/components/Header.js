import React from "react";
import gem from "../assets/images/gem.svg";
import basket from "../assets/images/basket.svg";

function Header() {
  return (
    <div className="page-links">
      <header className="component-header">
        <div className="info-boxes">

            <div className="disp-currency disp-currency-img">
              <img src={gem} alt="gem" />
              <span>10</span>
            </div>

            <div className="disp-currency disp-currency-img">
              <img src={basket} alt="basket of apples" />
              <span>530</span>
            </div>


            <div className="disp-currency disp-currency-money">
              <p className="display-money">100</p>
            </div>
            
            <div className="disp-user">
              <button className="btn btn-profile">
                <i className="fa-solid fa-circle-user"></i>
              </button>
            </div>

        </div>
      </header>

      <div className="nav-buttons">
        <button className="btn btn-nav">
          <i className="fa-solid fa-house-chimney-window"></i>
        </button>
        <button className="btn btn-nav">
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
    </div>
  );
}

export default Header;
