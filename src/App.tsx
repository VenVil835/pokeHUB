import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import Library from "./components/Library";
import PokemonBattle from "./components/PokemonBattle";
import "./styles/global.css";

type AppScreen = "landing" | "library" | "battle";

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("landing");

  const renderScreen = () => {
    switch (currentScreen) {
      case "library":
        return <Library onBack={() => setCurrentScreen("landing")} />;
      case "battle":
        return <PokemonBattle onBackToMenu={() => setCurrentScreen("landing")} />;
      default:
        return <LandingPage onNavigate={setCurrentScreen} />;
    }
  };

  return <div className="app">{renderScreen()}</div>;
}

export default App;
