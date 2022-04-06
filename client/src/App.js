import { useState } from 'react';
import './App.css';
import StyleReference from './StyleReference'

function App() {

  const [showStyle, setShowStyle] = useState(false)

  return (
    <div className="">
      <header className="App">
        <div>
          <h1>Apple Orchard Games</h1>
          <p>subtitle</p>
        </div>
        <nav>
          <button className='btn btn-timer' onClick={()=>(
            setShowStyle(!showStyle)
          )}>Style Reference</button>
        </nav>
      </header>
      <div style={{margin: '2rem auto' }}>
        {showStyle && (<StyleReference />)}
      </div>
    </div>
  );
}

export default App;
