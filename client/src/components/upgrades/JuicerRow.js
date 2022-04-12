import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../utils/GlobalState';
import { ADD_JUICER, SET_JUICER } from '../../utils/mutations';
import { BUY_JUICER, UPDATE_JUICERS } from '../../utils/actions';
import { QUERY_ME } from '../../utils/queries';
import Juicer from './Juicer';
import BuyJuicer from './PlaceholderJuice';

export default function JuicersRow() {
  const { loading, data: itemData } = useQuery(QUERY_ME);
  const [addJuicer, { error }] = useMutation(ADD_JUICER);
  const [state, dispatch] = useGlobalContext();

  // destructure the items list from the global state object
  const { juicers } = state;
  console.log('GSTATE_JUICERS...', juicers);

  useEffect(() => {
    if (itemData) {
      console.log('SERVER_JUICERS...', itemData.me.juicers);

      const serverJuicers = itemData.me.juicers;

      dispatch({
        type: UPDATE_JUICERS,
        payload: serverJuicers
      });


    } else if (!loading) {

      console.log('loading');
    }
  }, [itemData, loading, dispatch]);


  const handlePurchase = async (event) => {
    event.preventDefault();

    console.log('purchased upgrade');

    // validate enough money

    let newJuicer;
    // dispatch ADD_JUICER
    try {
      const dur = state.gameVariables.makeJuiceTime
      // store returned data aliased as 'userData' from addJuicer mutation to server
      const { data: userData } = await addJuicer();
      const juicersArr = userData.addJuicer.juicers;
      newJuicer = juicersArr[juicers.length - 1];

      console.log('YOU JUST MADE A JUICER ON THE SERVER',newJuicer, newJuicer?.duration);
    } catch (e) {
      console.error(e);
    }
    if (newJuicer) {

      console.log('dispatching to GameState');
      try {
        const payload = {
          ...newJuicer,
          startedAtTime: new Date(),
          duration: 60
        };
        console.log('PAYLOAD...', payload);
        dispatch({
          type: BUY_JUICER,
          payload,
        });
      } catch (error) {
        console.log('error');
      }
    }

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
