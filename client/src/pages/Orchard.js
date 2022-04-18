// Orchard.js
import Tree from "../components/Tree";
import PlaceholderTree from "../components/PlaceholderTree";

import { useGlobalContext } from "../utils/GlobalState";

import barn from "../assets/images/barn.png";

export default function Orchard() {
  // let disabled = true;

  const [state, dispatch] = useGlobalContext();

  const loading = state?.loading;

  const trees = state?.trees || [];
  if (loading) return <div><h1>LOADING....</h1></div>;

  return (
    <div className="orchard-wrapper">
      <img src={barn} className="orchard-barn" alt="" />
      <h2 className="page-title">
        <div className="display-banner text-center">My Orchard</div>
      </h2>
      <div className="orchard">
        <div className="orchard-row">
          <div className="tree-container">
            <PlaceholderTree />
            {
              trees.map((tree, i) => {
                return (
                  <div key={i} className="orchard-box">
                    <Tree
                      _id={tree._id}
                      tree={tree}
                      dispatchParent={dispatch}
                    />

                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
