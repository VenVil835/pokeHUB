// components/ui/Confetti.tsx
import React from 'react';

export const Confetti: React.FC = () => (
  <div style={{
    position: 'fixed',
    top: 0, left: 0, width: '100vw', height: '100vh',
    pointerEvents: 'none', zIndex: 9999,
    fontSize: 40, textAlign: 'center',
  }}>
    {Array.from({length: 30}).map((_, i) => (
      <span
        key={i}
        style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          color: ['#f44336','#ffeb3b','#4caf50','#2196f3','#ff9800','#e91e63'][i%6],
          transform: `rotate(${Math.random()*360}deg)`,
        }}
      >
        🎉
      </span>
    ))}
  </div>
);