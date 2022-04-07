import React from "react";

function Header() {
  return (
    <header className="component-header">
      <div>
        <div className="count-boxes">
          <div className="gem-count">
            <i class="fa-solid fa-gem"></i>10
          </div>
          <div className="apple-count">
            <i class="fa-solid fa-apple-whole"></i>100
          </div>
        </div>

        <div className="">
          <button className="btn btn-shop">Shop!</button>
          <p className="display-money">100</p>
        </div>
      </div>

      <div>
        <button className="btn btn-profile">
          <i class="fa-solid fa-user"></i>
        </button>
      </div>
    </header>
  );
}

export default Header;
