import React, { useEffect, useRef } from 'react';

const ColorShapeMatchGame = ({ onGameComplete }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Listen for messages from the iframe (for game completion)
    const handleMessage = (event) => {
      // You can add message handling here if the game sends completion messages
      // For now, we'll just handle the back button
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleBack = () => {
    // Since this is an external game, we'll just call onGameComplete with null
    // to go back to the games selection
    if (onGameComplete) {
      onGameComplete(null);
    }
  };

  return (
    <div className="external-game-container">
      <div className="game-header">
        <button className="back-btn" onClick={handleBack}>
          ← Back to Games
        </button>
        <h1>🎨 Color & Shape Match Game</h1>
      </div>

      <div className="game-iframe-wrapper">
        <iframe
          ref={iframeRef}
          src="/autism_learning_game/index.html"
          title="Color & Shape Match Game"
          width="100%"
          height="600"
          frameBorder="0"
          allowFullScreen
          className="game-iframe"
        />
      </div>

      <div className="game-info">
        <p>🎮 This game runs in its own window. Play and have fun learning!</p>
        <p>📊 Your progress will be tracked when you return to the main platform.</p>
      </div>
    </div>
  );
};

export default ColorShapeMatchGame;