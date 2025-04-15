import "./App.css";
import NavigationBar from "./components/NavBar";

function App() {
  return (
    <div className="h-full grid grid-cols-[21.25rem_1fr]">
      <NavigationBar />
      <main className="bg-white">
        <div>
          <h1>Available balance</h1>
        </div>
      </main>
    </div>
  );
}

export default App;
