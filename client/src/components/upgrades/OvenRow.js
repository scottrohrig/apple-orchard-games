import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useGlobalContext } from "../../utils/GlobalState";
import { QUERY_ITEMS } from "../../utils/queries";
import { ADD_OVEN } from "../../utils/mutations";
import { BUY_OVEN, APPLES_FOR_PIE } from "../../utils/actions";
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

  const handlePurchase = async (event) => {
    console.log("purchased upgrade");
    console.log("dispatching to GameState");

    try {
      const payload = {
        _id: ovens.length + 1,
        startedAtTime: new Date(),
        duration: state.gameVariables.makePieTime,
      };
      dispatch({
        type: BUY_OVEN,
        payload,
      });
    } catch (error) {
      console.log("error");
    }
  };

  //
  // should the responsibility be in the row or the item
  return (
    <div className="item-row">
      <span className="item-label">Pie!</span>
      <div className="item-scroll">
        {
          // map thru juicer objects from GlobalState to add to row
          ovens.map((oven, i) => {
            return (
              <div key={i} className="item-box">
                {
                  // if object in map does not have `_id` show placeholder.
                  oven._id ? (
                    <Oven props={{ oven, dispatch }} />
                  ) : (
                    // Placeholder
                    <BuyOven handlePurchase={handlePurchase} />
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
