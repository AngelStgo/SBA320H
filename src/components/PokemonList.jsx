import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";

// function getIdFromUrl(url) {
//     const parts = url.splite("/").filter(Boolean);
//     return parseInt(parts[parts.lenght - 1]);
// }

function PokemonList({ generation }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12; // You can adjust number

  useEffect(() => {
  setCurrentPage(1);
}, [generation]);

  // Fetch Pokémon when generation changes
  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/generation/${generation}/`);
        const speciesList = res.data.pokemon_species;
  
        const detailedData = await Promise.all(
          speciesList.map(async (species) => {
            try {
              const pokemonRes = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${species.name}/`
              );
              const speciesRes = await axios.get(
                `https://pokeapi.co/api/v2/pokemon-species/${species.name}/`
              );
  
              return {
                name: pokemonRes.data.name,
                id: pokemonRes.data.id,
                types: pokemonRes.data.types.map((t) => t.type.name),
                stats: pokemonRes.data.stats,
                sprite: pokemonRes.data.sprites.front_default,
                flavorText: speciesRes.data.flavor_text_entries.find(
                  (entry) => entry.language.name === "en"
                )?.flavor_text,
              };
            } catch (error) {
              console.warn(`Failed to fetch data for ${species.name}:`, error.message);
              return null; // Return null for failed fetches
            }
          })
        );
  
        // Filter out any null entries (failed fetches)
        setPokemonList(detailedData.filter((pokemon) => pokemon !== null));
      } catch (error) {
        console.error("Failed to fetch generation data", error);
      }
    }
  
    fetchPokemon();
  }, [generation]);

  // Pagination logic
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const totalPages = Math.ceil(pokemonList.length / pokemonsPerPage);

  return (
    <div>
      <div className="pokemon-list">
        {currentPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {/* Pagination */}
      {pokemonList.length > pokemonsPerPage && (
        <div className="pagination-controls">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev < totalPages ? prev + 1 : prev
              )
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default PokemonList;