import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./style/index.css";
import "./style/modal.css";

import Auth from "./utils/auth";

import { stateToLocalStorage } from "./utils/helpers";

import Splash from "./pages/Splash";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Orchard from "./pages/Orchard";
import Header from "./components/Header";
import Marketplace from "./components/Marketplace";
import NoMatch from "./pages/NoMatch";

import { dispatch, useGlobalContext } from "./utils/GlobalState";
import { gql, useQuery, useMutation } from "@apollo/client";
import { UPDATE_ALL_DATA, UPDATE_LASTUPDATETIME } from "./utils/actions";
import { UPDATE_INVENTORY_ALL } from "./utils/mutations";

// TODO - should this be with the other queries?
// query all data on app start or refresh
const QUERY_START_DATA = gql`
  query Me {
    me {
      username
      email
      _id
      inventoryJSON
      appleCount
      money
      gemCount
      trees {
        _id
        startedAtTime
        duration
      }
      juicerCount
      juicers {
        _id
        startedAtTime
        duration
      }
      masherCount
      mashers {
        _id
        startedAtTime
        duration
      }
      ovenCount
      ovens {
        _id
        startedAtTime
        duration
      }
    }
  }
`;

function AppDD() {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMarketplace, setShowMarketplace] = useState(false);

  const { data, loading, refetch: refetchData } = useQuery(QUERY_START_DATA);

  const [state, dispatch] = useGlobalContext();
  const [updateInventoryAll, { error }] = useMutation(UPDATE_INVENTORY_ALL);

  const sendInventoryToDB = async (state) => {
    console.log("in sendInventoryToDB");
    dispatch({
      type: UPDATE_LASTUPDATETIME,
    });
    try {
      await updateInventoryAll({
        variables: { inventoryJSON: JSON.stringify(state) },
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(data);
    if (data) {
      console.log("Dispatching UPDATE_ALL_DATA");
      console.log(JSON.parse(data.me.inventoryJSON));
      // console.log("inventory then state");
      // console.log(JSON.parse(data.me.inventoryJSON).lastUpdateTime);
      console.log(state.lastUpdateTime);
      // if (
      //   JSON.parse(data.me.inventoryJSON).lastUpdateTime > state.lastUpdateTime
      // ) {
      if (!loading) {
        console.log("not loading");
        dispatch({
          type: UPDATE_ALL_DATA,
          payload: { ...JSON.parse(data.me.inventoryJSON), loading },
        });
        // console.log("refetching", loading);
        // TODO should refetchData be part of an else?
        console.log("refetcing");
        refetchData();
      }
      // }
    }
  }, [
    loading,
    // , data
  ]);

  return (
    <Router>
      {/* Header */}
      {Auth.loggedIn() && (
        <Header
          showLeaderboard={showLeaderboard}
          setShowLeaderboard={setShowLeaderboard}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
          showMarketplace={showMarketplace}
          setShowMarketplace={setShowMarketplace}
          stateToLocalStorage={stateToLocalStorage}
          state={state}
          dispatch={dispatch}
          sendInventoryToDB={sendInventoryToDB}
        />
      )}
      {/* App Stuff */}
      <div className="app app-content">
        <div style={{ margin: "2rem auto" }}>
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
              sendInventoryToDB={sendInventoryToDB}
            />

            {/* Routes */}
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    sendInventoryToDB={sendInventoryToDB}
                    testVar="test123"
                  />
                }
              />
              <Route path="/login" element={<Splash />} />
              <Route
                path="/orchard/:id"
                element={<Orchard sendInventoryToDB={sendInventoryToDB} />}
              />
              <Route element={<NoMatch />} />
            </Routes>
          </div>
        </div>
        {/* Disable highlighting and right click */}
        {window.addEventListener("selectstart", function (e) {
          e.preventDefault();
        })}
        {/* {window.addEventListener('contextmenu', function(e) {
        e.preventDefault();
      })} */}
      </div>
    </Router>
  );
}

export default AppDD;
