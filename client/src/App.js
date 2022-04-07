import "./App.css";
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { useState } from "react";
import StyleReference from "./StyleReference";

// pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Leaderboard from "./pages/Leaderboard";
// Marketplace
import NoMatch from './pages/NoMatch';

function App() {
  const [showStyle, setShowStyle] = useState(false);

  return (
    <Router>

      <div className="app">

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
              <Route exact path='/highscore' component={Leaderboard} />
              {/* <Route exact path='/shop' component={Shop} /> */}
              <Route component={NoMatch} />
            </Switch>
          )}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
