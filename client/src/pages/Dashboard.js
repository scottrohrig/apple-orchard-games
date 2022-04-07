// import

function Dashboard() {
  return (
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
        <span className='item-label'>Sample Orchard Row Container</span>
        <div className='item-scroll'>
          <div className='item-box'>
            <img src={require('../assets/images/tree.jpg')} alt="tree1" />
          </div>
          <div className='item-box'>
            <img src={require('../assets/images/tree.jpg')} alt="tree2" />
          </div>
          <div className='item-box'>
            <img src={require('../assets/images/tree.jpg')} alt="tree3" />
          </div>
          <div className='item-box'>
            <img src={require('../assets/images/tree.jpg')} alt="tree3" />
          </div>
          <div className='item-box'>
            <img src={require('../assets/images/tree.jpg')} alt="tree3" />
          </div>
          <div className='item-box'>
            <img src={require('../assets/images/tree.jpg')} alt="tree3" />
          </div>
          <div className='item-box'>
            <img src={require('../assets/images/tree.jpg')} alt="tree3" />
          </div>
        </div>

      </div>

      <div>
        Upgrade Row (Mashers)
      </div>

      <div>
        Upgrade Row (Juicers)
      </div>

      <div>
        Upgrade Row (Ovens)
      </div>

      <div>
        <h1>For component testing</h1>
      </div>

    </div>
  );
}

export default Dashboard;
