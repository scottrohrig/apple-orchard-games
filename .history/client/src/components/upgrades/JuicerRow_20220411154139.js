import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../utils/GlobalState';
import { QUERY_ITEMS } from '../../utils/queries';
import { ADD_JUICER } from '../../utils/mutations';
import { BUY_JUICER, APPLES_FOR_JUICE } from '../../utils/actions';
import Juicer from './Juicer';
import BuyJuicer from './PlaceholderJuice';

export default function JuicersRow() {
  const [state, dispatch] = useGlobalContext();
  const [addJuicer] = useMutation(ADD_JUICER);
  // console.log(state);

  // destructure the items list from the global state object
  const { juicers } = state;

  // get items data from db
  // const { loading, data: itemData } = useQuery(QUERY_ITEMS);

  useEffect(() => {
    // check for item data changes
    // dispatch item data if it exists with UPDATE_ITEMS action
    // put item data in indexedDB cache
    // if not loading, get cache and dispatch
  }, ['itemData', 'loading', dispatch]);

  const handlePurchase = async (event) => {
    console.log('purchased upgrade');

    // validate enough money

    // dispatch ADD_JUICER

    console.log('dispatching to GameState');
    try {
      const payload = {
        _id: juicers.length + 1,
        startedAtTime: new Date(),
        duration: state.gameVariables.makeJuiceTime,
      };
      console.log(
        dispatch({
          type: BUY_JUICER,
          payload,
        })
      );
    } catch (error) {
      console.log('error');
    }

    // update user money && apples
    // try {
    //   const payload = {
    //     money: state.money + state.gameVariables.juiceSaleRevenue,
    //     appleCount: state.appleCount - state.gameVariables.makeJuiceApplesUsed,
    //   };
    // } catch (error) {}

    // add data to idbPromise('')
  };

  return (
    <div className="item-row">
      <span className="item-label">Juice!</span>
      <div className="item-scroll">
        {
          // map thru juicer objects from GlobalState to add to row
          juicers.map((juicer, i) => {
            return (
              <div key={i} className="item-box">
                {
                  // if object in map does not have `_id` show placeholder.
                  juicer._id ? (
                    <Juicer props={{ juicer, dispatch }} />
                  ) : (
                    // Placeholder
                    <BuyJuicer handlePurchase={handlePurchase} />
                  )
                }
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
