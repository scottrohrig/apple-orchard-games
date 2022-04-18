import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useGlobalContext } from '../../utils/GlobalState';

import { useIsMount } from "../../utils/helpers";
import { ADD_JUICER, SET_JUICER } from '../../utils/mutations';
import { BUY_JUICER, UPDATE_JUICERS } from '../../utils/actions';

import Juicer from './Juicer';
import BuyJuicer from './PlaceholderJuice';

export default function JuicersRow() {
  const [state, dispatch] = useGlobalContext();

  const [addJuicer, { addJuicerError }] = useMutation(ADD_JUICER);
  const [updateJuicer, {error: setJuicerError}] = useMutation(SET_JUICER);

  // destructure the items list from the global state object
  const loading = state?.loading;

  const juicers = state?.juicers || [];

  // useEffect(() => {
  //   if (itemData) {

  //     dispatch({
  //       type: UPDATE_JUICERS,
  //       payload: itemData.me.juicers
  //     });

  //   } else if (!loading) {

  //     console.log('loading.');
  //     dispatch({
  //       type: UPDATE_JUICERS,
  //       payload: juicers
  //     });
  //   }
  // }, [itemData, loading, dispatch]);

  if (loading) return <div><h1>LOADING....</h1></div>

  const handleUpgradePurchased = async (event) => {

    // console.log('data: updateData', updateData);
    // validate enough money
    const money = state.money;
    const juicerCost = state.gameVariables.juicerCost;
    if (money < juicerCost) {
      return;
    }

    let newJuicer;
    // dispatch ADD_JUICER
    try {
      // store returned data aliased as 'userData' from addJuicer mutation to server
      const { data: userData } = await addJuicer({
        variables: {
          duration: state.gameVariables.makeJuiceTime
        }
      });
      const juicersArr = userData.addJuicer.juicers;
      // get id or newly created juicer obj from the server to store in the BUY_JUICER payload
      newJuicer = juicersArr[juicersArr.length - 1];
    } catch (e) {
      console.error(e);
      console.error(addJuicerError);
    }

    if (newJuicer) {
      try {
        const payload = {
          _id: newJuicer._id,
          startedAtTime: newJuicer.startedAtTime,
          duration: newJuicer.duration
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

  // console.log(juicers);

  return (
    <div>
    <div className="item-row">
        {!loading && <div className="item-scroll">
          {
            // map thru juicer objects from GlobalState to add to row
            juicers.map((juicer, i) => {
              return (
                <div key={i} className="item-box">

                  <Juicer props={{
                    juicer,
                    dispatch,
                    updateJuicer,
                    appleCount: state.appleCount,
                    makeJuiceApplesUsed: state.gameVariables.makeJuiceApplesUsed,
                    useIsMount,
                    money: state.money
                    }} />

                </div>
              );
            })
          }
          {(juicers.length < 5) &&
            <BuyJuicer handleUpgradePurchased={handleUpgradePurchased} />
          }
        </div>}
    </div>
    <div className='dash-label'>
      <span className="item-label">Juice</span>
      <div className='item-price'>
        <p className='item-price-buy'>Buy New: <span className='item-amount'>10</span></p>
        <p className='item-price-apples'>Uses: <span className='item-amount'>2</span></p>
      </div>
    </div>
    </div>
  );
}
