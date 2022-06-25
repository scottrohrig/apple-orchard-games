// import
import { useGlobalContext } from "../utils/GlobalState";
import { Navigate, Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";

import "../style/dashboard.css";

import Auth from "../utils/auth";

import ItemsRow from "../components/ItemsRow";
import JuicersRow from "../components/upgrades/JuicerRow";
import MashersRow from "../components/upgrades/MasherRow";
import OvensRow from "../components/upgrades/OvenRow";

import treeBare from "../assets/images/tree-short.svg";
import treeApples from "../assets/images/tree-with-apples-short.svg";
import barn from "../assets/images/barn.png";

function Dashboard(props) {
  const { sendInventoryToDB, testVar } = props;
  const [state] = useGlobalContext();

  // redirect user to /login page if not logged in
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" replace={true} />;
  }

  // consider moving 👇 to 'Upgrade' component script
  // need event handler for upgrades
  const handleUpgradePurchase = (event) => {
    // upgrade spot empty? allow purchase if funds, else 'oops you need more 🍎 💸'
    // upgrade is timer ready? allow start countdown
  };

  return (
    <div className="">
      <Link to="/orchard/1">
        <div className="dash-orchard">
          <img src={treeBare} alt="" className="dash-tree tree-left" />
          <img src={treeBare} alt="" className="dash-tree tree-right" />
          <img src={treeApples} alt="" className="dash-tree tree-middle" />
          <h2 className="page-title">
            <p className="btn btn-shop btn-to-orchard">Go To My Orchard</p>
          </h2>
          <img src={barn} alt="" className="dash-barn" />
        </div>
      </Link>
      <div className="dash-label">
        <span className="item-label">Apples</span>
        <div className="item-price">
          <p className="item-price-apples">
            New Tree Cost: <span className="item-amount">3</span>
          </p>
        </div>
      </div>

      {/* <Link style={{backgroundImage:`url$({woodSign}))`, backgroundRepeat:"no-repeat",backgroundSize:"contain", height: "100px"}} to='/orchard/1'>To Orchard</Link>
       */}

      {/* <div className="container">
        Stats Container
        <div className="left"></div>
        <div className="right"></div>
      </div> */}

      <ItemsRow sendInventoryToDB={sendInventoryToDB} testVar={testVar} />
      {/* <JuicersRow /> */}
      {/* <MashersRow /> */}
      {/* <OvensRow /> */}
    </div>
  );
}

export default Dashboard;
