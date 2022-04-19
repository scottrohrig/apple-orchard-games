import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useGlobalContext } from '../../utils/GlobalState';
import { useIsMount } from "../../utils/helpers";
import { ADD_OVEN, UPDATE_USER } from '../../utils/mutations';
import { BUY_OVEN, APPLES_FOR_PIE } from '../../utils/actions';
import Oven from './Oven';
import BuyOven from './PlaceholderPie';

export default function OvensRow() {
  const [state, dispatch] = useGlobalContext();
  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const loading = state?.loading;
  const ovens = state?.ovens || []
  const [addOven] = useMutation(ADD_OVEN);
  // console.log(state);

  // destructure the items list from the global state object

  // console.log('state', state, 'ovens', ovens);

  // get items data from db
  // const { loading, data: itemData } = useQuery(QUERY_ITEMS);

  useEffect(() => {
    // check for item data changes
    // dispatch item data if it exists with UPDATE_ITEMS action
    // put item data in indexedDB cache
    // if not loading, get cache and dispatch
  }, ['itemData', 'loading', dispatch]);

  const handlePurchase = async (event) => {

    // validate money
    if (state.money < state.gameVariables.ovenCost) {
      return
    }

    try {
      addOven();
    } catch (e) {
      console.error(e);
    }

    console.log('dispatching to GameState');

    try {
      const payload = {
        _id: ovens.length + 1,
        startedAtTime: new Date(),
        duration: state.gameVariables.makePieTime,
      };
      dispatch({
        type: BUY_OVEN,
        payload,
      });
    } catch (error) {
      console.log('error');
    }
  };

  //
  // should the responsibility be in the row or the item
  return (
    <div>
      <div className="item-row">
        {!loading && <div className="item-scroll">
          { // map thru juicer objects from GlobalState to add to row
            ovens.map((oven, i) => {
              return (
                <div key={i} className="item-box">
                  <Oven props={{
                    oven, dispatch,
                    applesUsed: state.applesUsed,
                    makePieApplesUsed: state.gameVariables.makePieApplesUsed, useIsMount, updateUser, money: state.money
                  }} />
                </div>
              )
            })}
          {(ovens.length < 5) &&
            <BuyOven 
              handlePurchase={handlePurchase} 
            />

          }
        </div>
        }
      </div>
      <div className='dash-label'>
        <span className="item-label">Pie</span>
        <div className='item-price'>
          <p className='item-price-buy'>Buy New: <span className='item-amount'>30</span></p>
          <p className='item-price-apples'>Uses: <span className='item-amount'>8</span></p>
        </div>
      </div>
    </div>
  );
}
