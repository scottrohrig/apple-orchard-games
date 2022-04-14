import { useState } from 'react';
import { APPLES_FOR_MONEY } from '../utils/actions';
import { useGlobalContext } from '../utils/GlobalState';
import './shop.css';

import apple from '../assets/images/apple.svg';

export default function Marketplace({ showMarketplace, setShowMarketplace }) {

  const [state, dispatch] = useGlobalContext();
  const { appleCount, gameVariables } = state;


  // for input field in apples to sell form
  const [applesToSell, setApplesToSell] = useState(0);

  // sell apples
  function handleSellApples(evt) {



    let success = false
    console.log(
      "Error check, then remove " +
      applesToSell +
      " apples from inventory, \nincrease gameDollars by $" +
      applesToSell * gameVariables.appleSaleRevenue +
      ", \nand deactivate this button if there are no apples left."
    );

    const payload = Math.max(applesToSell,0)
    console.log('payload',payload);
    dispatch({
      type: APPLES_FOR_MONEY,
      payload
    })

    if (success) {
      setApplesToSell(Math.max(appleCount, 0));
    }

  }


  // buy gems
  function handleBuyGems(evt) {
    evt.preventDefault();

    console.log(
      "go to stripe, charge $" +
      gameVariables.gemPurchaseCost +
      ". If sale is confirmed, add " +
      gameVariables.gemsFromPurchase +
      " gems to the inventory."
    );
  }

  return (
    <div >
      <div className={`modal-background ${showMarketplace && 'modal-background-active'}`}
      // onClick={() => setShowMarketplace(!showMarketplace)}
      >
        <div className={`leaderboard modal ${showMarketplace && 'modal-active'}`}>

          <button
            className="btn btn-modal"
            onClick={() => setShowMarketplace(!showMarketplace)}>
            <i className="fa-solid fa-xmark"></i>
          </button>

          <h2 className='page-title'><p className="display-banner">Farmers Marketplace</p></h2>
          <h3 className='sub-title'
            style={{ textAlign: 'center', marginTop: '1rem' }}
          >Buy Upgrades & Gems</h3>

          <div style={{ marginTop: '2rem' }}>

            {/* SELL APPLES FOR CURRENCY */}
            <div className='sell-apples'>
              <div className="item-label">Sell Apples</div>
              <div className="card-label">Apples to Sell:</div>
              <div className='apple-increment'>
                <span className='increment-btn by-25 decrement'
                    onClick={() => setApplesToSell(Math.max(applesToSell - 25, 0))}>
                    <i className="fa-solid fa-angles-left"></i>
                </span>
                <span className='increment-btn by-5 decrement'
                    onClick={() => setApplesToSell(Math.max(applesToSell - 5, 0))}>
                  <i className="fa-solid fa-minus"></i>
                </span>
                <span className='apple-count'><img src={apple} alt='apple' /></span>
                <span className='increment-btn by-5 increment'
                    onClick={() => setApplesToSell(Math.min(applesToSell + 5, appleCount))}>
                  <i className="fa-solid fa-plus"></i>
                </span>
                <span className='increment-btn by-25 increment'
                    onClick={() => setApplesToSell(Math.min(applesToSell + 25, appleCount))}>
                    <i className="fa-solid fa-angles-right"></i>
                </span>
              </div>

              <p>
                <button className="btn btn-timer"
                onClick={()=> {handleSellApples()}}
                >Sell {applesToSell} Apples!</button>
              </p>

            </div>

            {/* $USD PURCHASES FOR GEMS */}
            <div className='item-row'>
              <div className="item-label">Buy Gems</div>
              <div className="item-scroll">
                <div className="item-box">
                  <div className="card usd" style={{ width: '250px' }}>
                    <div className='card-label usd-label'>5 gem deal</div>
                    <div className='card-body'>
                      <p>buy 5 gems for $5</p>
                      <button className='btn btn-buy' onClick={() => { handleBuyGems(); }}>Buy</button>
                    </div>
                  </div>
                </div>
                <div className="item-box">
                  <div className="card usd" style={{ width: '250px' }}>
                    <div className='card-label usd-label'>textLabel</div>
                    <div className='card-body'>
                      <p>body</p>
                      <button className='btn btn-buy'>Buy</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className='item-row'>
              <div className="item-label">Purchase Upgrades!</div>
              <div className="item-scroll">
                <div className="item-box">
                  <div className="card" style={{ width: '250px' }}>
                    <div className='card-label'>textLabel</div>
                    <div className='card-body'>
                      <p>body</p>
                      <button className='btn btn-shop'>Buy</button>
                    </div>
                  </div>
                </div>
                <div className="item-box">
                  <div className="card" style={{ width: '250px' }}>
                    <div className='card-label'>textLabel</div>
                    <div className='card-body'>
                      <p>body</p>

                      <button className='btn btn-shop'>Buy</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
