function PokemonCard({ pokemon }) {
    return (
      <div className="pokemon-card">
        <h2>
          #{pokemon.id} {pokemon.name.toUpperCase()}
        </h2>
        <img src={pokemon.sprite} alt={pokemon.name} />
        <p><strong>Types:</strong> {pokemon.types.join(", ")}</p>
        <p><strong>Stats:</strong></p>
        <ul>
          {pokemon.stats.map((stat, index) => (
            <li key={index}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
        <p><strong>Dex Entry:</strong> {pokemon.flavorText}</p>
      </div>
    );
  }
  
  export default PokemonCard;