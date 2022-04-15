import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../utils/GlobalState";
import { ADD_JUICER, SET_JUICER } from "../../utils/mutations";
import { BUY_JUICER, UPDATE_JUICERS } from "../../utils/actions";
import { QUERY_ME } from "../../utils/queries";
import Juicer from "./Juicer";
import BuyJuicer from "./PlaceholderJuice";

export default function JuicersRow() {
  const { loading, data: itemData } = useQuery(QUERY_ME);
  const [addJuicer, { addJuicerError }] = useMutation(ADD_JUICER);
  const [
    updateJuicer,
    { data: updateData, loading: updateLoading, error: updateJuicerError },
  ] = useMutation(SET_JUICER, {
    refetchQueries: [QUERY_ME, "Me"],
  });

  const [state, dispatch] = useGlobalContext();

  // destructure the items list from the global state object
  const { juicers } = state;

  useEffect(() => {
    if (itemData) {
      // itemData.me.juicers.map(j => console.log('SERVER _Id', j?._id));
      dispatch({
        type: UPDATE_JUICERS,
        payload: itemData.me.juicers,
      });
      // TODO implement idbPromise

      // juicers.map(j => console.log('STATE _Id', j?._id));
    } else if (!loading) {
      console.log("loading.");
      dispatch({
        type: UPDATE_JUICERS,
        payload: juicers,
      });
      // TODO implement idbPromise
    }
  }, [itemData, loading, dispatch]);

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
          duration: state.gameVariables.makeJuiceTime,
        },
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
          duration: newJuicer.duration,
        };
        console.log("PAYLOAD...", payload);
        dispatch({
          type: BUY_JUICER,
          payload,
        });
        // TODO implement idbPromise
      } catch (error) {
        console.log("error");
      }
    }
  };

  // console.log(juicers);

  return (
    <div className="item-row">
      <span className="item-label">Juice!</span>
      {!loading && (
        <div className="item-scroll">
          {
            // map thru juicer objects from GlobalState to add to row
            juicers.map((juicer, i) => {
              return (
                <div key={i} className="item-box">
                  <Juicer props={{ juicer, dispatch, updateJuicer }} />
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
  );
}
