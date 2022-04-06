import "./App.css";
import Orchard from "./components/Orchard";
import Tree from "./components/Tree";
import Masher from "./components/Masher";
import Mashers from "./components/Mashers";
import Juicers from "./components/Juicers";
import { useState } from 'react';
import StyleReference from './StyleReference'

function App() {

  const [showStyle, setShowStyle] = useState(false)

  return (
    <div className="">
      <header className="App">
        <div>
          <h1>Apple Orchard Games</h1>
          <p>how bout them apples?</p>
        </div>
        <nav>
          <button className='btn btn-timer' onClick={()=>(
            setShowStyle(!showStyle)
          )}>Style Reference</button>
        </nav>
      </header>
      <div style={{margin: '2rem auto' }}>
        {showStyle
          ? (<StyleReference />)
          : (
            <div className='App'>
              <Juicers />
              <Mashers />
              <Orchard />
              <Masher />
              <Tree />
            </div>
          )}
      </div>
    </div>
  );
}

export default App;
