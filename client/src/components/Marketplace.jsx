import { useCallback, useEffect, useState } from 'react';
import { APPLES_FOR_MONEY } from '../utils/actions';
import { useGlobalContext } from '../utils/GlobalState';
import './shop.css';

import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

import { useIsMount } from '../utils/helpers';

export default function Marketplace({ showMarketplace, setShowMarketplace }) {

  const isMount = useIsMount()
  const [state, dispatch] = useGlobalContext();
  const { appleCount, gameVariables } = state;

  const [updateUser, {error}] = useMutation(UPDATE_USER)

  // for input field in apples to sell form
  const [applesToSell, setApplesToSell] = useState(0);
  const [success, setSuccess] = useState(false)

  // sell apples
  function handleSellApples(event) {

    const payload = Math.max(applesToSell,0)
    try {
      console.log('Update AppleCount Payload:',payload);
      dispatch({
        type: APPLES_FOR_MONEY,
        payload
      })
      setSuccess(!success)
    } catch (error) {
      console.error(error);
    }

  }

  useEffect( async () => {
    if (!isMount) {

      // doesn't occur on page load
      // if (!loading) {
        // SERVER-SIDE update the user's money and appleCount
        const {data} = await updateUser({variables: {money: state.money, appleCount}})
        console.log('SERVER updateUser called:', data.updateUser);
        // }
    }
  }, [success])

  // buy gems
  function handleBuyGems(event) {
    console.log('TODO: handleBuyingGems');


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
              <div className='gem-count'>
                <span><i className="fa-solid fa-angles-left"
                  onClick={() => setApplesToSell(Math.max(applesToSell - 25, 0))}
                ></i></span> {' '}
                <span><i className="fa-solid fa-caret-left"
                  onClick={() => setApplesToSell(Math.max(applesToSell - 5, 0))}
                ></i></span>{' '}
                <span className='apple-count'>{applesToSell}</span>{' '}
                <span><i className="fa-solid fa-caret-right"
                  onClick={() => setApplesToSell(Math.min(applesToSell + 5, appleCount))}
                ></i></span>{' '}
                <span><i className="fa-solid fa-angles-right"
                  onClick={() => setApplesToSell(Math.min(applesToSell + 25, appleCount))}
                ></i></span>
              </div>

              <p>
                <button className="btn btn-shop"
                onClick={()=> {handleSellApples()}}
                >Sell</button>
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
