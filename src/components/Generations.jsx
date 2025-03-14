function GenerationSelector({ onSelectGeneration }) {
    const generations = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 
  
    return (
      <select onChange={(e) => onSelectGeneration(e.target.value)}>
        {generations.map((gen) => (
          <option key={gen} value={gen}>
            Generation {gen}
          </option>
        ))}
      </select>
    );
  }
  
  export default GenerationSelector;