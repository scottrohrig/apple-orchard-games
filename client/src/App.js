import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import "./App.css";
import "./StyleReference";

import { GlobalProvider } from "./utils/GlobalState";
import Auth from "./utils/auth";

import { useStateToLocalStorage } from "./utils/helpers";

import Splash from "./pages/Splash";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Orchard from "./pages/Orchard";
import Header from "./components/Header";
import Marketplace from "./components/Marketplace";
import NoMatch from "./pages/NoMatch";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMarketplace, setShowMarketplace] = useState(false);

  return (
    <ApolloProvider client={client}>
      <GlobalProvider>
        <Router>
          {Auth.loggedIn() && (
            <Header
              showLeaderboard={showLeaderboard}
              setShowLeaderboard={setShowLeaderboard}
              showProfile={showProfile}
              setShowProfile={setShowProfile}
              showMarketplace={showMarketplace}
              setShowMarketplace={setShowMarketplace}
              useStateToLocalStorage={useStateToLocalStorage}
            />
          )}
          <div className="app app-content">
            {/* App Stuff */}
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
                />

                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/login" element={<Splash />} />
                  <Route path="/orchard/:id" element={<Orchard />} />
                  <Route element={<NoMatch />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </GlobalProvider>

      {window.addEventListener("selectstart", function (e) {
        e.preventDefault();
      })}
      {/* {window.addEventListener('contextmenu', function(e) {
        e.preventDefault();
      })} */}
    </ApolloProvider>
  );
}

export default App;
