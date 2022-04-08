import React, { createContext, useContext } from 'react'
import { useAppReducer } from './reducers'

const GlobalContext = createContext()
const { Provider } = GlobalContext;

const GlobalProvider = ({ value=[], ...props})=>{
  const [state, dispatch] = useAppReducer({
    mashers: [],
    juicers: [],
    ovens: [],
    trees: [],
    // example of 2D array to allow for rows and items inside the rows
    items: [
      [],
      [
        {
        _id: 1,
        type: 'masher',
        rowId: 1,
        startedAtTime: Date.now()
      },
        {
        _id: 1,
        type: 'masher',
        rowId: 1,
        startedAtTime: Date.now()
      }
    ],
      [
        {
        _id: 2,
        type: 'tree',
        rowId: 2,
        startedAtTime: Date.now()
      },
        {
        _id: 3,
        type: 'tree',
        rowId: 2,
        startedAtTime: Date.now()
      }
    ],
    ], //
    orchards: [],
    currentOrchard: [],
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext}
