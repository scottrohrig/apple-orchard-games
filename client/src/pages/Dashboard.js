// import

import { JuicersRow } from '../components/upgrades';

function Dashboard(props) {
console.log("visibility prop passed to Dashboard is " + props.dashVis)

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

    <div className={props.dashVis ? "dashboard-display-block" : "dashboard-display-none"}>
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

    </div>
  );
}

export default Dashboard;
