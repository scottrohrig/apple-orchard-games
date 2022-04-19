import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useGlobalContext } from '../../utils/GlobalState';

import { useIsMount } from "../../utils/helpers";
import { ADD_OVEN, SET_OVEN } from '../../utils/mutations';
import { APPLES_FOR_PIE, BUY_OVEN, SELL_PIE, UPDATE_OVEN } from '../../utils/actions';

import Oven from './Oven';
import BuyOven from './PlaceholderPie';

export default function OvensRow() {
  const [state, dispatch] = useGlobalContext();

  const [addOven, { addOvenError }] = useMutation(ADD_OVEN);
  const [updateOven, { error: setOvenError }] = useMutation(SET_OVEN)

  // destructure the items list from the global state object
  const loading = state?.loading;

  const ovens = state?.ovens || [];

  if (loading) return <div><h1>LOADING....</h1></div>;

  const handleUpgradePurchased = async (event) => {
    // validate enough money
    if (state.money < state.gameVariables.ovenCost) {
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
      // get id or newly created juicer obj from the server to store in the BUY_JUICER payload
      newOven = ovensArr[ovensArr.length - 1];
    } catch (e) {
      console.error(e);
      console.error(addOvenError);
    }

    if (newOven) {
      dispatch({
        type: BUY_OVEN,
        payload: {
          _id: newOven._id,
          startedAtTime: newOven.startedAtTime,
          duration: newOven.duration
        }
      });
    }
  };

  //
  const handleOvenSellBtnPressed = ({ _id, duration }) => {
    if (state.appleCount < state.gameVariables.makePieApplesUsed) {
      return;
    }

    const now = new Date();
    try {
      dispatch({
        type: UPDATE_OVEN,
        payload: { _id, now, duration }
      });
      dispatch({
        type: SELL_PIE
      });
      dispatch({
        type: APPLES_FOR_PIE
      });
      updateOven({
        variables: {
          ovenId: _id,
          startedAtTime: now,
          duration
        }
      });
    } catch (error) {
      console.error(setOvenError);
    }
  };

  return (
    <div>
      <div className="item-row">
        {!loading && <div className="item-scroll">
          {
            // map thru oven objects from GlobalState to add to row
            ovens.map((oven, i) => {
              return (
                <div key={i} className="item-box">

                  <Oven
                    handleOvenSellBtnPressed={handleOvenSellBtnPressed}
                    oven={oven}
                    appleCount={state.appleCount}
                    useIsMount={useIsMount}
                    money={state.money}
                  />

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
