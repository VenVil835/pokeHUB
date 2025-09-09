//PokemonBattle.tsx
import React from 'react';
import { PokemonSprite } from './battle/PokemonSprite';
import { BattleUI } from './battle/BattleUI';
import { Confetti } from './ui/Confetti';
import { LoadingScreen } from './ui/LoadingScreen';
import { usePokemonBattle } from '../hooks/usePokemonBattle';
import type { Pokemon } from '../types/pokemon';

interface PokemonBattleProps {
  selectedPokemon?: Pokemon | null; // Pokemon selected from main menu
  onBackToMenu?: () => void; // Optional prop for future navigation
}

const PokemonBattle: React.FC<PokemonBattleProps> = ({ selectedPokemon, onBackToMenu }) => {
  const {
    pokemons,
    currentHp,
    maxHp,
    currentMana,
    battleLog,
    winner,
    loading,
    turn,
    flash,
    showConfetti,
    handleSkillSelect,
    handleSkipTurn,
    handleRestart,
  } = usePokemonBattle(); // Pass selected Pokemon to the hook

  if (loading || pokemons.length < 2) {
    return <LoadingScreen />;
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundImage: 'url(/image/background.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {showConfetti && <Confetti />}
      
      {/* Back to menu button */}
      {onBackToMenu && (
        <button
          onClick={onBackToMenu}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: 'rgba(255, 248, 220, 0.9)',
            border: '2px solid #8B4513',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#2c5234',
            cursor: 'pointer',
            zIndex: 1000
          }}
        >
          ← Menu
        </button>
      )}

      {/* Display selected Pokemon info in top-right corner */}
      {selectedPokemon && (
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(255, 248, 220, 0.9)',
          border: '2px solid #8B4513',
          borderRadius: '8px',
          padding: '10px',
          fontSize: '12px',
          color: '#2c5234',
          zIndex: 1000,
          textAlign: 'center'
        }}>
          <div style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
            Your Pokemon: {selectedPokemon.name}
          </div>
        </div>
      )}
      
      <PokemonSprite
        pokemon={pokemons[0]}
        currentHp={currentHp[0]}
        maxHp={maxHp[0]}
        currentMana={currentMana[0]}
        isFlashing={flash[0]}
        position="player"
      />
      
      <PokemonSprite
        pokemon={pokemons[1]}
        currentHp={currentHp[1]}
        maxHp={maxHp[1]}
        currentMana={currentMana[1]}
        isFlashing={flash[1]}
        position="opponent"
      />
      
      <BattleUI
        playerPokemon={pokemons[0]}
        currentMana={currentMana[0]}
        turn={turn}
        winner={winner}
        battleLog={battleLog}
        onSkillSelect={handleSkillSelect}
        onSkipTurn={handleSkipTurn}
        onRestart={handleRestart}
      />
    </div>
  );
};

export default PokemonBattle;