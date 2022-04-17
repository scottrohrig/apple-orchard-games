import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import './App.css';
import './StyleReference';

import Auth from './utils/auth';

import Splash from './pages/Splash';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Orchard from './pages/Orchard';
import Header from './components/Header';
import Marketplace from './components/Marketplace';
import NoMatch from './pages/NoMatch';

import { useGlobalContext } from './utils/GlobalState';
import { gql, useQuery } from '@apollo/client';
import { UPDATE_ALL_DATA } from './utils/actions';
import { QUERY_ME } from './utils/queries';

// query all data on app start or refresh
const QUERY_START_DATA = gql`
 query Me {

   me {
     username
     email
     _id
     appleCount
     money
     gemCount
     juicers {
       _id
       startedAtTime
       duration
     }
     trees {
       _id
       startedAtTime
       duration
     }
     mashers {
       _id
       startedAtTime
       duration
     }
     ovens {
       _id
       startedAtTime
       duration
     }
    }
  }
`;

function App() {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMarketplace, setShowMarketplace] = useState(false);

  const {data, loading, refetch: refetchData} = useQuery(QUERY_ME)

  const [state, dispatch] = useGlobalContext()

  useEffect(()=>{
    if (data) {
      console.log('me', data?.me || {money: 0, appleCount: 5});
      if (!loading) {
        dispatch({
          type: UPDATE_ALL_DATA,
          payload: {...data.me, loading},
        })
        console.log('refetching', loading);
      refetchData()
    }
    }
  },[loading, data])



  return (
    <Router>
      {Auth.loggedIn() && (
        <Header
          showLeaderboard={showLeaderboard}
          setShowLeaderboard={setShowLeaderboard}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
          showMarketplace={showMarketplace}
          setShowMarketplace={setShowMarketplace}
          state={state}
        />
      )}
      <div className="app app-content">
        {/* App Stuff */}
        <div style={{ margin: '2rem auto' }}>
          <div className="container">
            {/* Modals */}
            <Leaderboard
              showLeaderboard={showLeaderboard}
              setShowLeaderboard={setShowLeaderboard}
            />
            <Profile
              showProfile={showProfile}
              setShowProfile={setShowProfile}
            />
            <Marketplace
              showMarketplace={showMarketplace}
              setShowMarketplace={setShowMarketplace}
            />

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Splash />} />
              <Route path="/orchard/:id" element={<Orchard />} />
              <Route element={<NoMatch />} />
            </Routes>
          </div>
        </div>
        {window.addEventListener('selectstart', function (e) {
          e.preventDefault();
        })}
        {/* {window.addEventListener('contextmenu', function(e) {
        e.preventDefault();
      })} */}
      </div>
    </Router>
  );
}

export default App;
