import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useGlobalContext } from "../../utils/GlobalState";
import { QUERY_ITEMS } from "../../utils/queries";
import { ADD_OVEN } from "../../utils/mutations";
import { BUY_OVEN, UPDATE_OVENS, APPLES_FOR_PIE } from "../../utils/actions";
import Oven from "./Oven";
import BuyOven from "./PlaceholderPie";

export default function OvensRow() {
  const [state, dispatch] = useGlobalContext();
  const [addOven] = useMutation(ADD_OVEN);
  // console.log(state);

  // destructure the items list from the global state object
  const { ovens } = state;
  // console.log('state', state, 'ovens', ovens);

  // get items data from db
  // const { loading, data: itemData } = useQuery(QUERY_ITEMS);

  useEffect(() => {
    // check for item data changes
    // dispatch item data if it exists with UPDATE_ITEMS action
    // put item data in indexedDB cache
    // if not loading, get cache and dispatch
  }, ["itemData", "loading", dispatch]);

  const handlePurchase = (event) => {
    console.log("purchased upgrade");

    const now = new Date();
    console.log("in handlePurchase of new oven, new time", now);
    dispatch({
      type: UPDATE_OVENS,
      payload: { ...oven, startedAtTime: now, duration },
    });
    dispatch({
      type: BUY_OVEN,
    });
    dispatch({
      type: APPLES_FOR_PIE,
    });
    console.log("dispatching startedAtTime", startedAtTime);
    setTime(duration);
  };

  //
  // should the responsibility be in the row or the item
  return (
    <div className="item-row">
      <span className="item-label">ovens</span>
      <div className="item-scroll">
        {/* map ovens here */}
        {ovens.map((oven, i) => {
          return (
            <div key={i} className="item-box">
              {oven._id ? (
                // <img src={require('../../assets/images/oven.png')}></img>
                <Oven props={{ oven, dispatch }} />
              ) : (
                // placeholder
                // <PlaceHolder />
                <div
                  style={{ width: "100%", height: "100%", background: "#dc3" }}
                >
                  <button
                    className="btn btn-shop"
                    onClick={() => {
                      handlePurchase();
                    }}
                  >
                    Purchase
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
