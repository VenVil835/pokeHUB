import React from "react";

interface LandingPageProps {
  onNavigate: (screen: "library" | "battle") => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="brand">
          {/* Put pokehub-logo.png in /public */}
          <img src="/image/logo.png" alt="PokeHUB" className="logo" />
        </div>

        <div className="nav-links">
          <button className="nav-link" onClick={() => onNavigate("library")}>
            Library of Pokemons
          </button>
          <button className="nav-link" onClick={() => onNavigate("battle")}>
            Minigame
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <h1 className="hero-title">Welcome to PokeHUB!</h1>
        <p className="hero-subtitle">
          Explore the Pokémon library or test your skills in the minigame.
        </p>
        <div className="hero-cta">
          <button className="btn" onClick={() => onNavigate("library")}>
            Browse Library
          </button>
          <button className="btn btn-outline" onClick={() => onNavigate("battle")}>
            Play Minigame
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
