import React from "react";

function Header() {
  return (
    <header className="component-header">
      <div className="info-boxes">
        <div className="count-boxes">
          <div className="gem-count">
            <i className="fa-solid fa-gem"></i>10
          </div>
          <div className="apple-count">
            <i className="fa-solid fa-apple-whole"></i>100
          </div>
        </div>

        <div className="money-info">
          <div>
            <button className="btn btn-shop">Shop!</button>
          </div>
          <div>
            <p className="display-money">100</p>
          </div>
        </div>
      </div>

      <div className="profile-link">
        <button className="btn btn-profile">
          <i className="fa-solid fa-user"></i>
        </button>
      </div>
    </header>
  );
}

export default Header;
