// import
import { useGlobalContext } from '../utils/GlobalState';

import  { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';


import JuicersRow from '../components/upgrades/JuicerRow';
import MashersRow from '../components/upgrades/MasherRow';
import OvensRow from '../components/upgrades/OvenRow';

function Dashboard() {

  const [state] = useGlobalContext();

  function handleDBUpdateButton(evt) {
    evt.preventDefault();
    
    const {money, appleCount, gemCount, trees, juicers, mashers, ovens} = state;
    console.log(money+" "+appleCount+" "+gemCount+" "+trees+" "+juicers+" "+mashers+" "+ovens);
    
    // dispatch({type:PURCHASE_A_TREE});
                
  }

  // consider moving 👇 to 'Upgrade' component script
  // need event handler for upgrades
  const handleUpgradePurchase = (event) => {
    // upgrade spot empty? allow purchase if funds, else 'oops you need more 🍎 💸'

    // upgrade is timer ready? allow start countdown

  }

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

    <div className='' >
      <div>money: {state.money}</div>

      <div>
        appleCount: {state.appleCount}
      </div>

      <div>
        gemCount: {state.gemCount}
      </div>
      <button onClick={handleDBUpdateButton}>click here to send globalstate gameplay variables to server</button>

      <div className='form-label'>Dashboard</div>
      <div className='container'>
        Stats Container
        <div className='left'>

        </div>
        <div className='right'>

        </div>
      </div>

      {/* WIP juicers row */}
      <JuicersRow />
      <MashersRow />
      <OvensRow />

    </div>
  );
}

export default Dashboard;
