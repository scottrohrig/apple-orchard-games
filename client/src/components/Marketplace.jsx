import { useState } from 'react';
import { useGlobalContext } from '../utils/GlobalState';
import './shop.css'

export default function Marketplace({ showMarketplace, setShowMarketplace }) {

  const [state, dispatch] = useGlobalContext();
  const { gameVariables } = state;

  // for input field in apples to sell form
  const [applesToSell, setApplesToSell] = useState('');

  // sell apples
  function handleSellApples(evt) {
    evt.preventDefault();

    // consider using buttons instead of input field for selling apples (buttons could relate to how many apples are in basket).  If we use an input field, we'll need to error-check and reject bad inputs which isn't fun for the user
    console.log(
      "Error check, then remove " +
      applesToSell +
      " apples from inventory, increase gameDollars by $" +
      applesToSell * gameVariables.appleSaleRevenue +
      ", and deactivate this button if there are no apples left."
    );
  }

  // sell juice
  function handleSellJuice(evt) {
    evt.preventDefault();

    console.log(
      "remove " +
      state.juices +
      " juices from inventory, increase gameDollars by $" +
      state.juices * gameVariables.juiceSaleRevenue +
      ", and deactivate this button."
    );
  }

  //sell sauce
  function handleSellSauce(evt) {
    evt.preventDefault();

    console.log(
      "remove " +
      state.sauces +
      " juices from inventory, increase gameDollars by $" +
      state.sauces * gameVariables.sauceSaleRevenue +
      ", and deactivate this button."
    );
  }

  // sell pies
  function handleSellPies(evt) {
    evt.preventDefault();

    console.log(
      "remove " +
      state.pies +
      "  pies from inventory, increase gameDollars by $" +
      state.pies * gameVariables.pieSaleRevenue +
      ", and deactivate this button."
    );
  }

  // buy juicer
  function handleBuyJuicer(evt) {
    evt.preventDefault();

    console.log(
      "add 1 juicer to inventory, reduce gameDollars by $" +
      gameVariables.juicerCost +
      "."
    );
  }

  //buy masher
  function handleBuyMasher(evt) {
    evt.preventDefault();

    console.log(
      "add 1 masher to inventory, reduce gameDollars by $" +
      gameVariables.masherCost +
      "."
    );
  }

  // buy oven
  function handleBuyOven(evt) {
    evt.preventDefault();

    console.log(
      "add 1 oven to inventory, reduce gameDollars by $" +
      gameVariables.ovenCost +
      "."
    );
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
        onClick={() => setShowMarketplace(!showMarketplace)}
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
            <div className='item-row'>
              <div className="item-label">Buy Gems</div>
              <div className="item-scroll">
                <div className="item-box">
                  <div className="card">

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
