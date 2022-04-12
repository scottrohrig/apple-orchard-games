import { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import "./App.css";
import StyleReference from "./StyleReference";
import './dev.css';

import { GlobalProvider } from './utils/GlobalState';

// pages
// import Login from './components/Login';
// import Signup from './pages/Signup';
import Splash from "./pages/Splash";
import Dashboard from './pages/Dashboard';
import Leaderboard from "./pages/Leaderboard";
import Orchard from './pages/Orchard';
// components
import Header from './components/Header';
// Marketplace
import Marketplace from './components/Marketplace';
import NoMatch from './pages/NoMatch';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [showStyle, setShowStyle] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showMarketplace, setShowMarketplace] = useState(false);

  // Dev Stuff - Remove for Production
  const [showDevNav, setShowDevNav] = useState(false);

  return (
    <ApolloProvider client={client} >
      <Router>
        <GlobalProvider>
          <Header
            showLeaderboard={showLeaderboard} setShowLeaderboard={setShowLeaderboard}
            showMarketplace={showMarketplace} setShowMarketplace={setShowMarketplace}
          />
          <div className="app app-content">

            {/* Dev Stuff */}
            <button className="btn dev-btn" onClick={() => setShowDevNav(!showDevNav)}>Dev Navigation</button>
            <header  className={`app-header dev-nav modal ${showDevNav && 'modal-active'}`}>
              <div>
                <h1>Apple Orchard Games</h1>
              </div>

              <nav>
                <ul>
                  {/* <li>
                    <Link className='a' to='/login'>Login</Link>
                  </li>
                  <li>
                    <Link className='a' to='/signup'>Signup</Link>
                  </li> */}
                  <li>
                    <Link className='a' to='/login'>Login/Register</Link>
                  </li>
                  <li>
                    <Link className='a' to='/orchard/1'>Orchard</Link>
                  </li>
                  <li>
                    <Link className='a' to='/home'>Dashboard</Link>
                  </li>
                  <li>
                    {/* <Link className='a' to='/highscore'>Leaderboards</Link> */}
                    <button className="btn btn-timer"
                      onClick={() => setShowLeaderboard(!showLeaderboard)}
                    >Leaderboard</button>
                  </li>
                  <li>
                    <button
                      className="btn btn-timer"
                      onClick={() => setShowStyle(!showStyle)}
                    >
                      Style Ref
                    </button>
                  </li>
                </ul>
              </nav>
            </header>

            {/* App Stuff */}
            <div style={{ margin: "2rem auto" }}>
              <div className='container'>

                {/* Modals */}
                <Leaderboard showLeaderboard={showLeaderboard} setShowLeaderboard={setShowLeaderboard} />
                <Marketplace showMarketplace={showMarketplace} setShowMarketplace={setShowMarketplace} />

                {showStyle ? (
                  <StyleReference />
                ) : (
                  <Switch >
                    <Route exact path='/login' component={Splash} />
                    {/* <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} /> */}
                    <Route exact path='/home' component={Dashboard} />
                    <Route exact path='/orchard/:id' component={Orchard} />
                    {/* <Route exact path='/highscore' component={Leaderboard} /> */}
                    {/* <Route exact path='/shop' component={Shop} /> */}
                    <Route component={NoMatch} />
                  </Switch>
                )}
              </div>
            </div>
          </div>
        </GlobalProvider>
      </Router>

      {window.addEventListener('selectstart', function (e) {
        e.preventDefault();
      })}
      {/* {window.addEventListener('contextmenu', function(e) {
        e.preventDefault();
      })} */}

    </ApolloProvider>
  );
}

export default App;
