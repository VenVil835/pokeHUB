// components/battle/PokemonSprite.tsx
import React from 'react';
import type { Pokemon } from '../../types/pokemon';
import { PokemonStatsBox } from '../ui/PokemonStatsBox';

interface PokemonSpriteProps {
  pokemon: Pokemon;
  currentHp: number;
  maxHp: number;
  currentMana: number;
  isFlashing: boolean;
  position: 'player' | 'opponent';
}

export const PokemonSprite: React.FC<PokemonSpriteProps> = ({
  pokemon,
  currentHp,
  maxHp,
  currentMana,
  isFlashing,
  position
}) => {
  const isPlayer = position === 'player';
  
  const containerStyles = isPlayer 
    ? { bottom: '100px', left: '300px' }
    : { top: '200px', right: '400px' };
    
  const spriteTransform = isPlayer 
    ? 'scaleX(-1) scale(2)' 
    : 'scale(2)';

  return (
    <div style={{
      position: 'absolute',
      ...containerStyles,
      textAlign: 'center'
    }}>
      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        style={{
          width: '160px',
          height: '160px',
          transform: spriteTransform,
          filter: isFlashing 
            ? 'brightness(2) drop-shadow(0 0 20px #ffff00)' 
            : 'drop-shadow(4px 4px 8px rgba(0,0,0,0.5))',
          transition: 'filter 0.2s',
          imageRendering: 'pixelated'
        }}
      />
      
      <PokemonStatsBox
        pokemon={pokemon}
        currentHp={currentHp}
        maxHp={maxHp}
        currentMana={currentMana}
        position={isPlayer ? 'bottom-left' : 'top-right'}
      />
    </div>
  );
};