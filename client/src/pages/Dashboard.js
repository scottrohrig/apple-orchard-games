// import

import { JuicersRow } from '../components/upgrades';

function Dashboard() {


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
      <div className='form-label'>Oh I'm a page title</div>
      <div className='container'>
        Stats Container
        <div className='left'>

        </div>
        <div className='right'>

        </div>
      </div>

      {/* <Scroller kind={'orchard'} /> */}
      <div className='item'>
        <span className='item-label'>Orchard</span>

        <div className='item-scroll'>
          {/* map orchards here */}
          <div className='item-box' onClick={() => {handleUpgradePurchase()}}>
            <img src={require('../assets/images/tree.png')} alt="tree1" />
          </div>
          <div className='item-box'>
            <img src={require('../assets/images/tree.png')} alt="tree2" />
          </div>
          <div className='item-box'>
            <img src={require('../assets/images/tree.png')} alt="tree3" />
          </div>
          <div className='item-box'>
            <img src={require('../assets/images/tree.png')} alt="tree3" />
          </div>
          <div className='item-box'>
            <img src={require('../assets/images/tree.png')} alt="tree3" />
          </div>
          <div className='item-box'>
            <img src={require('../assets/images/tree.png')} alt="tree3" />
          </div>
          <div className='item-box'>
            <img src={require('../assets/images/tree.png')} alt="tree3" />
          </div>
        </div>

      </div>

      {/* WIP juicers row */}
      <JuicersRow />

      <div>
        <span className='item-label'>Mashers</span>
        <div className='item-scroll'>
          {/* map mashers here */}
          <div className='item-box'>
            <img src={require('../assets/images/masher.png')}></img>
          </div>
          <div className='item-box'>
            <img src={require('../assets/images/masher.png')} alt="tree3" />
          </div>
          <div className='item-box'>
            <img src={require('../assets/images/masher.png')} alt="tree3" />
          </div>
          <div className='item-box'>
            <img src={require('../assets/images/masher.png')} alt="tree3" />
          </div>
          <div className='item-box'>
            <img src={require('../assets/images/masher.png')} alt="tree3" />
          </div>
        </div>
      </div>

      <div>
        {'<OvensRow />'}
      </div>

    </div>
  );
}

export default Dashboard;
