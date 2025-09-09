import React, { useEffect, useState } from "react";

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonDetails {
  id: number;
  name: string;
  sprites: { front_default: string | null };
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string } }[];
  species: { url: string };
  description?: string;
}

interface LibraryProps {
  onBack: () => void;
}

const ITEMS_PER_PAGE = 9; // 3 rows × 3 columns

const Library: React.FC<LibraryProps> = ({ onBack }) => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [filteredList, setFilteredList] = useState<PokemonListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setLoading(true);
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151") // fetch first-gen
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data.results);
        setFilteredList(data.results);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredList(pokemonList);
    } else {
      setFilteredList(
        pokemonList.filter((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    setCurrentPage(1); // reset to first page on search
  }, [searchTerm, pokemonList]);

  const fetchPokemonDetails = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    const speciesRes = await fetch(data.species.url);
    const speciesData = await speciesRes.json();
    const flavorText =
      speciesData.flavor_text_entries.find((e: any) => e.language.name === "en")
        ?.flavor_text?.replace(/\f|\n|\r/g, " ") || "No description available.";

    setSelectedPokemon({ ...data, description: flavorText });
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="library-container">
      <div className="library">
        <button onClick={onBack} className="btn btn-secondary back-link">
          ← Back
        </button>
        <h2 className="section-title">Pokémon Library</h2>

        {/* 🔍 Search Field */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading && <p className="muted">Loading Pokémons…</p>}

        <div className="cards">
          {currentItems.map((p) => (
            <button
              key={p.name}
              className="card"
              onClick={() => fetchPokemonDetails(p.url)}
              title={`View ${p.name}`}
            >
              <div className="card-media">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    p.url.split("/").filter(Boolean).pop()
                  }.png`}
                  alt={p.name}
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">{p.name}</h3>
              </div>
            </button>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          <button
            className="btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            ◀ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next ▶
          </button>
        </div>

        {/* Modal */}
        {selectedPokemon && (
          <div
            className="modal-backdrop"
            onClick={() => setSelectedPokemon(null)}
          >
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setSelectedPokemon(null)}
              >
                ✕
              </button>
              <div className="modal-header">
                <h2 className="modal-title">{selectedPokemon.name}</h2>
              </div>

              <div className="modal-content">
                <img
                  className="modal-sprite"
                  src={
                    selectedPokemon.sprites.front_default ||
                    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`
                  }
                  alt={selectedPokemon.name}
                />
                <p className="modal-description">
                  {selectedPokemon.description}
                </p>

                <div className="stats">
                  <h3>Stats</h3>
                  <ul>
                    {selectedPokemon.stats.map((s) => (
                      <li key={s.stat.name}>
                        <span className="stat-name">{s.stat.name}</span>
                        <span className="stat-value">{s.base_stat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="abilities">
                  <h3>Abilities</h3>
                  <ul>
                    {selectedPokemon.abilities.map((a) => (
                      <li key={a.ability.name} className="badge">
                        {a.ability.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn" onClick={() => setSelectedPokemon(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
