import { useEffect } from "react";
// import { useMutation } from "@apollo/client";
import { useGlobalContext } from "../utils/GlobalState";

import { useIsMount } from "../utils/helpers";

// import { ADD_JUICER, SET_JUICER } from "../../utils/mutations";
import {
  APPLES_FOR_JUICE,
  BUY_JUICER,
  SELL_JUICE,
  UPDATE_JUICER,
} from "../utils/actions";

import Juicer from "./upgrades/Juicer";
import BuyJuicer from "./upgrades/PlaceholderJuice";

export default function JuicersRow() {
  const [state, dispatch] = useGlobalContext();

  // const [addJuicer, { addJuicerError }] = useMutation(ADD_JUICER);
  // const [updateJuicer, { error: setJuicerError }] = useMutation(SET_JUICER);

  // destructure the items list from the global state object
  const loading = state?.loading;

  const juicers = state?.juicers || [];

  if (loading)
    return (
      <div>
        <h1>LOADING....</h1>
      </div>
    );

  const handleUpgradePurchased = async (event) => {
    // validate enough money
    if (state.money < state.gameVariables.juicerCost) {
      return;
    }

    // let newJuicer;
    // // dispatch ADD_JUICER
    // try {
    //   // store returned data aliased as 'userData' from addJuicer mutation to server
    //   const { data: userData } = await addJuicer({
    //     variables: {
    //       duration: state.gameVariables.makeJuiceTime
    //     }
    //   });
    //   const juicersArr = userData.addJuicer.juicers;
    //   // get id or newly created juicer obj from the server to store in the BUY_JUICER payload
    //   newJuicer = juicersArr[juicersArr.length - 1];
    // } catch (e) {
    //   console.error(e);
    //   console.error(addJuicerError);
    // }

    // if (newJuicer) {
    dispatch({
      type: BUY_JUICER,
      payload: {
        _id: state.juicers.length + 1,
        startedAtTime: new Date(),
        duration: state.gameVariables.makeJuiceTime,
      },
    });
    // }
  };

  //
  const handleJuicerSellBtnPressed = ({ _id, duration }) => {
    if (state.appleCount < state.gameVariables.makeJuiceApplesUsed) {
      return;
    }

    const now = new Date();
    try {
      dispatch({
        type: UPDATE_JUICER,
        payload: { _id, now, duration: 10 },
      });
      dispatch({
        type: SELL_JUICE,
      });
      dispatch({
        type: APPLES_FOR_JUICE,
      });
      // updateJuicer({
      //   variables: {
      //     juicerId: _id,
      //     startedAtTime: now,
      //     duration,
      //   },
      // });
    } catch (error) {
      // console.error(setJuicerError);
    }
  };

  return (
    <div>
      <div className="item-row">
        {!loading && (
          <div className="item-scroll">
            {
              // map thru juicer objects from GlobalState to add to row
              juicers.map((juicer, i) => {
                return (
                  <div key={i} className="item-box">
                    <Juicer
                      handleJuicerSellBtnPressed={handleJuicerSellBtnPressed}
                      juicer={juicer}
                      appleCount={state.appleCount}
                      useIsMount={useIsMount}
                      money={state.money}
                    />
                  </div>
                );
              })
            }
            {juicers.length < 5 && (
              <BuyJuicer handleUpgradePurchased={handleUpgradePurchased} />
            )}
          </div>
        )}
      </div>
      <div className="dash-label">
        <span className="item-label">Item</span>
        <div className="item-price">
          <p className="item-price-buy">
            Buy New: <span className="item-amount">10</span>
          </p>
          <p className="item-price-apples">
            Uses: <span className="item-amount">2</span>
          </p>
        </div>
      </div>
    </div>
  );
}
