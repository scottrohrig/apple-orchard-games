import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useGlobalContext } from '../../utils/GobalState';
import { QUERY_ITEMS } from '../../utils/queries';

export function ItemRow() {

  const [state, dispatch] = useGlobalContext();
  console.log(state);

  // destructure the items list from the global state object
  const { items } = state;

  // get items data from db
  // const { loading, data: itemData } = useQuery(QUERY_ITEMS);

  useEffect(() => {
    // check for item data changes


    // dispatch item data if it exists with UPDATE_ITEMS action
    // put item data in indexedDB cache

    // if not loading, get cache and dispatch
  }, ['itemData', 'loading', dispatch]);

  //
  const trees = items.filter(({type}) => type==='tree')

  
  // should the responsibility be in the row or the item
  return (
    <div>
      {items.map((row, i) => (

        <div className='item'>ItemRow
          <div className='flex jc-sb'> _ RowBtnContainer
            <button onClick={()=>{console.log(i)}}>harvest</button>
          </div>
          <div className='item-scroll'>_ ItemScroll
            {row.map((item)=>(
              <Item item={item}/>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}

export function Item({item}) {
  console.log(item)

  return (
    <div className='item-box'>__ Item square
      <div >___ Item relative layout container
          <p className='form-label'>{item.type}</p>
        <button className='btn btn-timer'>item button</button>
      </div>
    </div>
  );
}
