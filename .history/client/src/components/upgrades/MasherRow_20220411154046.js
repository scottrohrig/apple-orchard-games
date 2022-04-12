import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useGlobalContext } from '../../utils/GlobalState';
import { QUERY_ITEMS } from '../../utils/queries';
import { ADD_MASHER } from '../../utils/mutations';
import { BUY_MASHER, APPLES_FOR_SAUCE } from '../../utils/actions';
import Masher from './Masher';
import BuyMasher from './PlaceholderMasher';

export default function MashersRow() {
  const [state, dispatch] = useGlobalContext();
  const [addMasher] = useMutation(ADD_MASHER);
  // console.log(state);

  // destructure the items list from the global state object
  const { mashers } = state;
  // console.log('state', state, 'mashers', mashers);

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

    // dispatch ADD_MASHER

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
      console.log(dispatch())
      console.log('try statement success');
    } catch (error) {
      console.log('error');
    }
  };

  //
  // should the responsibility be in the row or the item
  return (
    <div className="item-row">
      <span className="item-label">Applesauce!</span>
      <div className="item-scroll">
        {
          // map thru juicer objects from GlobalState to add to row
          mashers.map((masher, i) => {
            return (
              <div key={i} className="item-box">
                {
                  // if object in map does not have `_id` show placeholder.
                  masher._id ? (
                    <Masher props={{ masher, dispatch }} />
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
  );
}
