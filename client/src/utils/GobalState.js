import React, { createContext, useContext } from 'react'
import { useAppReducer } from './reducers'

const GlobalContext = createContext()
const { Provider } = GlobalContext;

const GlobalProvider = ({ value=[], ...props})=>{
  const [state, dispatch] = useAppReducer({
    mashers: [{},{},{},{},{}],
    juicers: [{_id: 1},{},{},{},{}],
    ovens: [{},{},{},{},{}],
    trees: [{},{},{},{},{}],
    orchards: [
      {
        _id: 1,
        trees: []
      },
    ],
    currentOrchard: [],
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext}
