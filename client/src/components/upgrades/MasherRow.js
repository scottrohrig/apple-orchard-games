import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useGlobalContext } from '../../utils/GlobalState';
import { useIsMount } from "../../utils/helpers";
import { ADD_MASHER, UPDATE_USER } from '../../utils/mutations';
import { BUY_MASHER, APPLES_FOR_SAUCE } from '../../utils/actions';
import Masher from './Masher';
import BuyMasher from './PlaceholderMasher';

export default function MashersRow() {
  const [state, dispatch] = useGlobalContext();
  const [updateUser, { error }] = useMutation(UPDATE_USER);
  
  const [addMasher] = useMutation(ADD_MASHER);
  // console.log(state);

  // destructure the items list from the global state object
  const { mashers, appleCount } = state;
  // console.log('state', state, 'mashers', mashers);
  const makeSauceApplesUsed = state.gameVariables.makeSauceApplesUsed

  // get items data from db
  // const { loading, data: itemData } = useQuery(QUERY_ITEMS);

  useEffect(() => {
    // check for item data changes
    // dispatch item data if it exists with UPDATE_ITEMS action
    // put item data in indexedDB cache
    // if not loading, get cache and dispatch
  }, ['itemData', 'loading', dispatch]);

  const handlePurchase = async (event) => {

    // validate enough money
    if (state.money < state.gameVariables.masherCost){
      return
    }

    // dispatch ADD_MASHER
    try {
      addMasher();
    } catch (e) {
      console.error(e);
    }

    console.log('dispatching to GameState');
    try {
      const payload = {
        _id: mashers.length + 1,
        startedAtTime: new Date(),
        duration: state.gameVariables.makeSauceTime,
      };
      dispatch({
        type: BUY_MASHER,
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
        <div className="item-scroll">
          {
            // map thru juicer objects from GlobalState to add to row
            mashers.map((masher, i) => {
              return (
                <div key={i} className="item-box">
                  {
                    // if object in map does not have `_id` show placeholder.
                    masher._id ? (
                      <Masher props={{ masher, dispatch, makeSauceApplesUsed: state.gameVariables.makeSauceApplesUsed, appleCount: state.appleCount, useIsMount, updateUser, money: state.money }} />
                    ) : (
                      // Placeholder
                      <BuyMasher handlePurchase={handlePurchase} />
                    )
                  }
                </div>
              );
            })
          }
        </div>
      </div>
      <div className='dash-label'>
        <span className="item-label">Applesauce</span>
        <div className='item-price'>
          <p className='item-price-buy'>Buy New: <span className='item-amount'>14</span></p>
          <p className='item-price-apples'>Uses: <span className='item-amount'>4</span></p>
        </div>
      </div>
    </div>
  );
}
