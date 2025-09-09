// types/pokemon.ts
export interface Stat {
  name: string;
  value: number;
}

export interface Skill {
  name: string;
  power: number;
  accuracy: number;
  type: string;
  manaCost: number;
}

export interface Pokemon {
  id: number;
  name: string;
  stats: Stat[];
  types: string[];
  weaknesses: string[];
  skills: Skill[];
  sprite: string;
}

export interface BattleResult {
  damage: number;
  crit: boolean;
  dodged: boolean;
  emoji: string;
}
