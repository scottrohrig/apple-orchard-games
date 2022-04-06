import "./App.css";
import Orchard from "./components/Orchard";
import Tree from "./components/Tree";
import Masher from "./components/Masher";
import Mashers from "./components/Mashers";
import Juicers from "./components/Juicers";
import Juices from "./components/Juices";
import Ovens from "./components/Ovens";
import Pies from "./components/Pies";
import Leaderboard from "./components/Leaderboard";
import { useState } from "react";
import StyleReference from "./StyleReference";

function App() {
  const [showStyle, setShowStyle] = useState(false);

  return (
    <div className="">
      <header className="App">
        <div>
          <h1>Apple Orchard Games</h1>
        </div>
        <nav>
          <button
            className="btn btn-timer"
            onClick={() => setShowStyle(!showStyle)}
          >
            {showStyle
              ? "Click to see Coded Components"
              : "Click to see Style Reference"}
          </button>
        </nav>
      </header>
      <div style={{ margin: "2rem auto" }}>
        {showStyle ? (
          <StyleReference />
        ) : (
          <div className="App">
            <Juices />
            <Juicers />
            <Mashers />
            <Orchard />
            <Ovens />
            <Pies />
            <Leaderboard />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
