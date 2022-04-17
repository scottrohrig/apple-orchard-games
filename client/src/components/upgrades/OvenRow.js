import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { useGlobalContext } from '../../utils/GlobalState';

import { useIsMount } from "../../utils/helpers";
import { ADD_OVEN, SET_OVEN } from '../../utils/mutations';
import { BUY_OVEN, UPDATE_OVENS } from '../../utils/actions';

import Oven from './Oven';
import BuyOven from './PlaceholderPie';

export default function OvensRow() {
  const [state, dispatch] = useGlobalContext();

  const [addOven, { addOvenError }] = useMutation(ADD_OVEN);
  const [updateOven, { error: setOvenError }] = useMutation(SET_OVEN);

  // destructure the items list from the global state object
  const loading = state?.loading;

  const ovens = state?.ovens || [];
  console.log('state', state);
  console.log('done loading', loading);
  // useEffect(() => {
  // check for item data changes
  // dispatch item data if it exists with UPDATE_ITEMS action
  // put item data in indexedDB cache
  // if not loading, get cache and dispatch
  // }, ['itemData', 'loading', dispatch]);

  // const handlePurchase = async (event) => {

  //   // validate money
  //   if (state.money < state.gameVariables.ovenCost) {
  //     return
  //   }

  //   try {
  //     addOven();
  //   } catch (e) {

  if (loading) return <div><h1>LOADING....</h1></div>

  const handleUpgradePurchased = async (event) => {

    // console.log('data: updateData', updateData);
    // validate enough money
    const money = state.money;
    const ovenCost = state.gameVariables.ovenCost;
    if (money < ovenCost) {
      return;
    }

    let newOven;
    // dispatch ADD_OVEN
    try {
      // store returned data aliased as 'userData' from addOven mutation to server
      const { data: userData } = await addOven({
        variables: {
          duration: state.gameVariables.makePieTime
        }
      });
      const ovensArr = userData.addOven.ovens;
      // get id or newly created oven obj from the server to store in the BUY_JUICER payload
      newOven = ovensArr[ovensArr.length - 1];
    } catch (e) {
      console.error(e);
      console.error(addOvenError);
    }

    if (newOven) {
      try {
        const payload = {
          _id: newOven._id,
          startedAtTime: newOven.startedAtTime,
          duration: newOven.duration
        };
        console.log('PAYLOAD...', payload);
        dispatch({
          type: BUY_OVEN,
          payload,
        });
      } catch (error) {
        console.log('error');
      }
    }
  };

  // should the responsibility be in the row or the item

  return (
    <div>
      <div className="item-row">
        {!loading && <div className="item-scroll">
          {
            // map thru oven objects from GlobalState to add to row
            ovens.map((oven, i) => {
              return (
                <div key={i} className="item-box">

                  <Oven props={{
                    oven,
                    dispatch,
                    updateOven,
                    appleCount: state.appleCount,
                    makePieApplesUsed: state.gameVariables.makePieApplesUsed,
                    useIsMount,
                    money: state.money
                  }} />

                </div>
              );
            })
          }
          {(ovens.length < 5) &&
            <BuyOven handleUpgradePurchased={handleUpgradePurchased} />
          }
        </div>}
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
