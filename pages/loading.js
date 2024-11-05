// components/LoadingScreen.js
import React from 'react';

const LoadingScreen = () => {
  return (
    <div style={styles.container}>
      <img
        src="https://weddingbanquets.in/logo.png"
        alt="Loading"
        style={styles.loader}
      />
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#870808',
    zIndex: 9999,
    opacity: 1,
    transition: 'opacity 0.5s ease-in-out',
  },
  loader: {
    width: '300px',
    height: '75px',
    // animation: 'spin 2s linear infinite',
  },
};

export default LoadingScreen;
