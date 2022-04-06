import "./App.css";
import Tree from "./components/Tree";
import ApplesauceMaker from "./components/ApplesauceMaker";

function App() {
  return (
    <div className="App">
      <h1> how about them apples? </h1>
      <ApplesauceMaker />
      <Tree></Tree>
    </div>
  );
}

export default App;
