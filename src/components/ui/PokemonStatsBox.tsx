// components/ui/PokemonStatsBox.tsx
import React from 'react';
import type { Pokemon } from '../../types/pokemon';
import { HealthBar } from './HealthBar';
import { GAME_CONFIG } from '../../constants/gameConstants';

interface PokemonStatsBoxProps {
  pokemon: Pokemon;
  currentHp: number;
  maxHp: number;
  currentMana: number;
  position: 'top-right' | 'bottom-left';
}

export const PokemonStatsBox: React.FC<PokemonStatsBoxProps> = ({
  pokemon,
  currentHp,
  maxHp,
  currentMana,
  position
}) => {
  const isTopRight = position === 'top-right';
  
  const positionStyles = isTopRight 
    ? { top: '-80px', right: '-20px' }
    : { bottom: '-80px', left: '-20px' };

  return (
    <div style={{
      position: 'absolute',
      ...positionStyles,
      background: 'rgba(255, 248, 220, 0.95)',
      border: '3px solid #8B4513',
      borderRadius: '12px',
      padding: '8px 12px',
      minWidth: '200px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
    }}>
      <div style={{
        fontWeight: 'bold',
        color: '#2c5234',
        marginBottom: '4px',
        textTransform: 'capitalize',
        fontSize: '14px'
      }}>
        {pokemon.name}
      </div>
      
      <div style={{ 
        fontSize: '12px', 
        color: '#4a5c36', 
        marginBottom: '2px' 
      }}>
        Element type: {pokemon.types.join(', ')}
      </div>
      
      <div style={{ marginBottom: '4px' }}>
        <HealthBar current={currentHp} max={maxHp} type="health" />
      </div>
      
      <div>
        <HealthBar 
          current={currentMana} 
          max={GAME_CONFIG.INITIAL_MANA} 
          type="mana" 
        />
      </div>
    </div>
  );
};