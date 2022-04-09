import { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import "./App.css";
import StyleReference from "./StyleReference";

import { GlobalProvider } from './utils/GlobalState';

// pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Leaderboard from "./pages/Leaderboard";
import Orchard from './pages/Orchard';
// components
import Header from './components/Header';
// Marketplace
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

  return (
    <ApolloProvider client={client} >
      <Router>
        <GlobalProvider>
          <div className="app">
            <div className="game-background"></div>

            <header className="app-header">
              <div>
                <h1>Apple Orchard Games</h1>
              </div>

              <nav>
                <ul>
                  <li>
                    <Link className='a' to='/login'>Login</Link>
                  </li>
                  <li>
                    <Link className='a' to='/signup'>Signup</Link>
                  </li>
                  <li>
                    <Link className='a' to='/orchard/1'>Orchard</Link>
                  </li>
                  <li>
                    <Link className='a' to='/home'>Dashboard</Link>
                  </li>
                  <li>
                    <Link className='a' to='/highscore'>Leaderboards</Link>
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

            <div style={{ margin: "2rem auto" }}>
              <div className='container'>

                {showStyle ? (
                  <StyleReference />
                ) : (
                  <Switch >
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/home' component={Dashboard} />
                    <Route exact path='/orchard/:id' component={Orchard} />
                    <Route exact path='/highscore' component={Leaderboard} />
                    {/* <Route exact path='/shop' component={Shop} /> */}
                    <Route component={NoMatch} />
                  </Switch>
                )}
              </div>
            </div>
          </div>
        </GlobalProvider>
      </Router>
      
      {window.addEventListener('selectstart', function(e) {
        e.preventDefault();
      })}
      {/* {window.addEventListener('contextmenu', function(e) {
        e.preventDefault();
      })} */}

    </ApolloProvider>
  );
}

export default App;