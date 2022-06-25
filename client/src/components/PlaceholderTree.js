import { useGlobalContext } from "../utils/GlobalState";
import { PURCHASE_A_TREE } from "../utils/actions";

import emptyPlot from "../assets/images/empty-plot-with-leaf.svg";

export default function PlaceholderTree(props) {
  const { sendInventoryToDB } = props;

  // error checking: 1) this component shouldn't show if player has less than 3 apples, but I think this would happen at the parent component

  const [state, dispatch] = useGlobalContext();
  const { trees } = state;

  const handlePurchaseTreeClick = async (evt) => {
    if (state.appleCount < state.gameVariables.applesForNewTree) {
      return;
    }

    try {
      const payload = {
        _id: trees.length + 1,
        startedAtTime: new Date(),
        duration: state.gameVariables.appleGrowTime,
      };
      dispatch({
        type: PURCHASE_A_TREE,
        payload,
      });
    } catch (error) {
      console.log("error");
    }
    sendInventoryToDB(state);
  };

  return (
    <>
      <div className="item-box relative tree-item">
        <img src={emptyPlot} className="empty-plot" alt=""></img>
        <div className="">
          <button className="btn btn-harvest" onClick={handlePurchaseTreeClick}>
            Plant
          </button>
        </div>
      </div>
    </>
  );
}
