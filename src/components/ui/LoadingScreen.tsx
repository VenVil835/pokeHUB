// components/ui/LoadingScreen.tsx
import React from 'react';

export const LoadingScreen: React.FC = () => (
  <div style={{
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(/image/background.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
  }}>
    Loading battle...
  </div>
);