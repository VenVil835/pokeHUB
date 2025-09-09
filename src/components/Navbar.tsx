import React from "react";

interface NavbarProps {
  onNavigate: (screen: "library" | "battle") => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
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

    </div>
  );
};

export default Navbar;
