import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useGlobalContext } from "../../utils/GlobalState";

import { useIsMount } from "../../utils/helpers";
// import { ADD_MASHER, SET_MASHER } from "../../utils/mutations";
import {
  BUY_MASHER,
  APPLES_FOR_SAUCE,
  SELL_SAUCE,
  UPDATE_MASHER,
} from "../../utils/actions";

import Masher from "./Masher";
import BuyMasher from "./PlaceholderMasher";

export default function MashersRow() {
  const [state, dispatch] = useGlobalContext();

  // const [addMasher] = useMutation(ADD_MASHER);
  // const [updateMasher] = useMutation(SET_MASHER);
  // console.log(state);

  // destructure the items list from the global state object
  const loading = state?.loading;
  const mashers = state?.mashers || [];

  if (loading)
    return (
      <div className="item-row">
        <h2>Loading...</h2>
      </div>
    );

  const handleUpgradePurchased = async (event) => {
    // validate enough money
    if (state.money < state.gameVariables.masherCost) {
      return;
    }

    // let newMasher;
    // // dispatch ADD_MASHER
    // try {
    //   const { data: userData } = await addMasher({
    //     variables: {
    //       duration: state.gameVariables.makeSauceTime
    //     }
    //   });
    //   const mashersArr = userData.addMasher.mashers;
    //   newMasher = mashersArr[mashersArr.length - 1];
    // } catch (e) {
    //   console.error(e);
    // }

    // if (newMasher) {
    dispatch({
      type: BUY_MASHER,
      payload: {
        _id: state.mashers.length + 1,
        startedAtTime: new Date(),
        duration: state.gameVariables.makeSauseTime,
      },
    });
    // }
  };

  const handleMasherSellBtnPressed = ({ _id, duration }) => {
    if (state.appleCount < state.gameVariables.makeSauceApplesUsed) {
      return;
    }
    const now = new Date();
    console.log(_id, now, duration);
    try {
      dispatch({
        type: UPDATE_MASHER,
        payload: { _id, now, duration: 10 },
      });
      dispatch({
        type: SELL_SAUCE,
      });
      dispatch({
        type: APPLES_FOR_SAUCE,
      });
      // updateMasher({
      //   variables: {
      //     masherId: _id,
      //     startedAtTime: now,
      //     duration
      //   }
      // })
    } catch (err) {
      // console.error(err);
    }
  };

  //
  // should the responsibility be in the row or the item
  return (
    <div>
      <div className="item-row">
        {!loading && (
          <div className="item-scroll">
            {
              // map thru juicer objects from GlobalState to add to row
              mashers.map((masher, i) => {
                return (
                  <div key={i} className="item-box">
                    <Masher
                      handleMasherSellBtnPressed={handleMasherSellBtnPressed}
                      masher={masher}
                      appleCount={state.appleCount}
                      useIsMount={useIsMount}
                      mone={state.money}
                    />
                  </div>
                );
              })
            }
            {mashers.length < 5 && (
              <BuyMasher handleUpgradePurchased={handleUpgradePurchased} />
            )}
          </div>
        )}
      </div>
      <div className="dash-label">
        <span className="item-label">Applesauce</span>
        <div className="item-price">
          <p className="item-price-buy">
            Buy New: <span className="item-amount">14</span>
          </p>
          <p className="item-price-apples">
            Uses: <span className="item-amount">4</span>
          </p>
        </div>
      </div>
    </div>
  );
}
