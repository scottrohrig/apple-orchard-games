import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useGlobalContext } from '../../utils/GlobalState';
import { QUERY_ITEMS } from '../../utils/queries';
import Juicer from './Juicer';

export function JuicersRow() {

  const [state, dispatch] = useGlobalContext();
  // console.log(state);

  // destructure the items list from the global state object
  const { juicers } = state;
  // console.log('state', state, 'juicers', juicers);

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

      <span className='item-label'>Juicers</span>
      <div className='item-scroll'>
        {/* map juicers here */}
        {juicers.map((juicer, i) => {
          return (
          <div key={i} className='item-box'>
            {juicer._id ? (
              // <img src={require('../../assets/images/juicer.png')}></img>
              <Juicer props={{juicer, dispatch}} />
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
