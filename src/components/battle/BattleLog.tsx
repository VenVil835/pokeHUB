// components/battle/BattleLog.tsx
import React from 'react';

interface BattleLogProps {
  battleLog: string[];
}

export const BattleLog: React.FC<BattleLogProps> = ({ battleLog }) => (
  <div>
    <div style={{
      fontWeight: 'bold',
      color: '#2c5234',
      marginBottom: '4px',
      fontSize: '14px'
    }}>
      Log:
    </div>
    <div style={{
      background: 'rgba(255,255,255,0.8)',
      border: '1px solid #8B4513',
      borderRadius: '6px',
      padding: '8px',
      minHeight: '60px',
      maxHeight: '100px',
      overflowY: 'auto',
      fontSize: '11px',
      color: '#2c5234',
      fontFamily: 'monospace'
    }}>
      {battleLog.length === 0 ? (
        <div>• Battle begins!</div>
      ) : (
        battleLog.slice(0, 4).map((log, idx) => (
          <div key={idx} style={{ marginBottom: '2px' }}>
            • {log}
          </div>
        ))
      )}
    </div>
  </div>
);