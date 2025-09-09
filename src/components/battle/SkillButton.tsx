// components/battle/SkillButton.tsx
import React from 'react';
import type { Skill } from '../../types/pokemon';

interface SkillButtonProps {
  skill: Skill;
  index: number;
  canUse: boolean;
  onClick: () => void;
}

export const SkillButton: React.FC<SkillButtonProps> = ({
  skill,
  index,
  canUse,
  onClick
}) => (
  <button
    onClick={onClick}
    disabled={!canUse}
    style={{
      background: canUse ? '#f0e68c' : '#ccc',
      border: '2px solid #8B4513',
      borderRadius: '8px',
      padding: '8px',
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#2c5234',
      cursor: canUse ? 'pointer' : 'not-allowed',
      transition: 'all 0.2s',
      opacity: canUse ? 1 : 0.5
    }}
  >
    Skill {index + 1}
    <br />
    <span style={{ fontSize: '10px', fontWeight: 'normal' }}>
      {skill.name.replace(/-/g, ' ')}
    </span>
  </button>
);