import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useGlobalContext } from '../../utils/GlobalState';
import { QUERY_ITEMS } from '../../utils/queries';
import Masher from './Masher';

export default function MashersRow() {

  const [state, dispatch] = useGlobalContext();
  // console.log(state);

  // destructure the items list from the global state object
  const { mashers } = state;
  // console.log('state', state, 'mashers', mashers);

  // get items data from db
  // const { loading, data: itemData } = useQuery(QUERY_ITEMS);

  useEffect(() => {
    // check for item data changes


    // dispatch item data if it exists with UPDATE_ITEMS action
    // put item data in indexedDB cache

    // if not loading, get cache and dispatch
  }, ['itemData', 'loading', dispatch]);

  const handlePurchase = (event) => {

  }

  //
  // should the responsibility be in the row or the item
  return (
    <div className='item-row'>

      <span className='item-label'>Apple Sauce!</span>
      <div className='item-scroll'>
        {/* map mashers here */}
        {mashers.map((masher, i) => {
          return (
          <div key={i} className='item-box'>
            {masher._id ? (
              // <img src={require('../../assets/images/masher.png')}></img>
              <Masher props={{masher, dispatch}} />
              ): (
                // placeholder
                // <PlaceHolder />
              <div style={{width: '100%', height: '100%', background: '#dc3'}}>
                <button className='btn btn-shop' onClick={()=> {handlePurchase()}}>Purchase</button>
              </div>
            )
            }
          </div>

        )})}
      </div>
    </div>

  );
}
