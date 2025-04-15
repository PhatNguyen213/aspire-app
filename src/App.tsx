import "./App.css";
import Cards from "./components/Cards";
import NavigationBar from "./components/NavBar";

function App() {
  return (
    <div className="h-full grid grid-cols-[21.25rem_1fr]">
      <NavigationBar />
      <Cards />
    </div>
  );
}

export default App;
