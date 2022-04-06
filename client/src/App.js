import "./App.css";
import Orchard from "./components/Orchard";
import Tree from "./components/Tree";
import Masher from "./components/Masher";
import Mashers from "./components/Mashers";
import Juicers from "./components/Juicers";

function App() {
  return (
    <div className="App">
      <h1> how bout them apples? </h1>
      <Juicers />
      <Mashers />
      <Orchard />
      <Masher />
      <Tree />
    </div>
  );
}

export default App;
