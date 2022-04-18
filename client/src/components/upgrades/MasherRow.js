import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { useGlobalContext } from '../../utils/GlobalState';

import { useIsMount } from "../../utils/helpers";
import { ADD_MASHER, SET_MASHER } from '../../utils/mutations';
import { BUY_MASHER, APPLES_FOR_SAUCE } from '../../utils/actions';

import Masher from './Masher';
import BuyMasher from './PlaceholderMasher';

export default function MashersRow() {
  const [state, dispatch] = useGlobalContext();

  const [addMasher, { addMasherError }] = useMutation(ADD_MASHER);
  const [updateMasher, { error: setMasherError }] = useMutation(SET_MASHER);

  // destructure the items list from the global state object
  const loading = state?.loading;

  const mashers = state?.mashers || [];
  console.log('state', state);
  console.log('done loading', loading);
  //  useEffect(() => {
  // check for item data changes
  // dispatch item data if it exists with UPDATE_ITEMS action
  // put item data in indexedDB cache
  // if not loading, get cache and dispatch
  // }, ['itemData', 'loading', dispatch]);

  // const handlePurchase = async (event) => {

  //   // validate enough money
  //   if (state.money < state.gameVariables.masherCost) {
  //     return
  //   }

  //   // dispatch ADD_MASHER
  //   try {
  //     addMasher();

  if (loading) return <div><h1>LOADING....</h1></div>

  const handleUpgradePurchased = async (event) => {

    // console.log('data: updateData', updateData);
    // validate enough money
    const money = state.money;
    const masherCost = state.gameVariables.masherCost;
    if (money < masherCost) {
      return;
    }

    let newMasher;
    // dispatch ADD_MASHER
    try {
      // store returned data aliased as 'userData' from addMasher mutation to server
      const { data: userData } = await addMasher({
        variables: {
          duration: state.gameVariables.makeSauceTime
        }
      });
      const mashersArr = userData.addMasher.mashers;
      // get id or newly created masher obj from the server to store in the BUY_JUICER payload
      newMasher = mashersArr[mashersArr.length - 1];
    } catch (e) {
      console.error(e);
      console.error(addMasherError);
    }

    if (newMasher) {
      try {
        const payload = {
          _id: newMasher._id,
          startedAtTime: newMasher.startedAtTime,
          duration: newMasher.duration
        };
        console.log('PAYLOAD...', payload);
        dispatch({
          type: BUY_MASHER,
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
            // map thru masher objects from GlobalState to add to row
            mashers.map((masher, i) => {
              return (
                <div key={i} className="item-box">

                  <Masher props={{
                    masher,
                    dispatch,
                    updateMasher,
                    appleCount: state.appleCount,
                    makeSauceApplesUsed: state.gameVariables.makeSauceApplesUsed,
                    useIsMount,
                    money: state.money
                  }} />

                </div>
              );
            })
          }
          {(mashers.length < 5) &&
            <BuyMasher handleUpgradePurchased={handleUpgradePurchased} />
          }
        </div>}
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
