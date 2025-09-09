import React from "react";
import NavBar from "./Navbar";

interface LandingPageProps {
  onNavigate: (screen: "library" | "battle") => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="page">
      {/* Navbar */}
      <NavBar onNavigate={onNavigate}/>

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
