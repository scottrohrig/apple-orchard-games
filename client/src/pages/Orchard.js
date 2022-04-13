// Orchard.js
import Tree from "../components/Tree";
import PlaceholderTree from "../components/PlaceholderTree";

export default function Orchard() {
  let disabled = true;

  // const handlePurchaseTree = () => {
  //   console.log('purchasing a tree');
  // }

  return (
    <div>
      <h2 className="page-title">
        <div className="display-banner text-center">Orchard Page</div>
      </h2>

      <div
        className="tree-container"
        style={{
          width: "90vw",
          margin: "2rem auto",
          display: "flex",
          flexWrap: "wrap",
          border: "1px solid var(--btn-harvest-main)",
          borderRadius: ".5rem",
        }}
      >
        <Tree />
        <PlaceholderTree />
        {/* <PlaceholderTree onClick={()=>{handlePurchaseTree()}} /> */}
      </div>
    </div>
  );
}
