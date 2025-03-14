import { useState } from "react";
import PokemonList from "./components/PokemonList";
import Generation from "./components/Generations";

function App() {
  const [generation, setGeneration] = useState(1); // Default to Gen 1
//   const [currentPage, setCurrentPage] = useState(1);
// useEffect(() => {
//   setCurrentPage(1);
// }, [generation]);

  return (
    <div className="App">
      <h1>Pokédex</h1>
      <Generation onSelectGeneration={setGeneration} />
      <PokemonList generation={generation} />
    </div>
  );
}

export default App;