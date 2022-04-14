// import
import { useGlobalContext } from "../utils/GlobalState";
import { Navigate } from 'react-router-dom';

import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";

import Auth from "../utils/auth";

import JuicersRow from "../components/upgrades/JuicerRow";
import MashersRow from "../components/upgrades/MasherRow";
import OvensRow from "../components/upgrades/OvenRow";

const woodSign = '../assets/images/wood_sign.png';

function Dashboard() {

  const [state] = useGlobalContext();
  const [updateDB, { error }] = useMutation(UPDATE_USER);

  // redirect user to /login page if not logged in
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" replace={true} />;
  };

  const handleDBUpdateButton = async (evt) => {
    evt.preventDefault();

    const { money, appleCount, gemCount, trees, juicers, mashers, ovens } =
      state;
    console.log(
      money +
        " " +
        appleCount +
        " " +
        gemCount +
        " " +
        trees +
        " " +
        juicers +
        " " +
        mashers +
        " " +
        ovens
    );

    try {
      const { data } = await updateDB({
        variables: { money: money },
      });

      // Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  // consider moving 👇 to 'Upgrade' component script
  // need event handler for upgrades
  const handleUpgradePurchase = (event) => {
    // upgrade spot empty? allow purchase if funds, else 'oops you need more 🍎 💸'
    // upgrade is timer ready? allow start countdown
  };

  return (
    // ideally we want the dashboard to simply look like this
    /**
    <div className='container'>
      <Header /> // stat bar
      <element for page title>
      <OrchardRow />
      <MashersRow />
      <JuicerssRow />
      <OvensRow />
    </div>
     */

    <div className="">
      <button onClick={handleDBUpdateButton}>
        click here to send globalstate gameplay variables to server
      </button>

      <div className="form-label">Dashboard</div>
      
      {/* It would be great to use a background image for this link -- there is a wood sign image available, and code below that doesn't seem to do the trick. */}

      <Link style={{fontSize: 20, color: "red"}} to='/orchard/1'>Click Here To Go To Orchard</Link>

      {/* <Link style={{backgroundImage:`url$({woodSign}))`, backgroundRepeat:"no-repeat",backgroundSize:"contain", height: "100px"}} to='/orchard/1'>To Orchard</Link>
        */}
      
      

      
      <div className="container">
        Stats Container
        <div className="left"></div>
        <div className="right"></div>
      </div>

      {/* WIP juicers row */}
      <JuicersRow />
      <MashersRow />
      <OvensRow />
    </div>
  );
}

export default Dashboard;
