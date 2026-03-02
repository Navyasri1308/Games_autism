import React from 'react';
import '../styles/GamesSelection.css';

const GamesSelection = ({ onGameSelect, onBack }) => {
  const games = [
    {
      id: 'match-shape',
      name: 'Match The Shape',
      description: 'Drag and drop shapes to match them with their targets. Features colorful shapes and celebration effects!',
      icon: '🎯',
      difficulty: 'Easy',
      features: ['8 Shapes', 'Drag & Drop', 'Celebration Effects', 'Progress Tracking']
    },
    {
      id: 'color-shape-match',
      name: 'Color & Shape Match',
      description: 'Match colors and shapes, or practice counting. Multiple game modes in one!',
      icon: '🎨',
      difficulty: 'Easy',
      features: ['Shape Match', 'Color Match', 'Counting Game', 'Score System']
    }
  ];

  return (
    <div className="games-selection-container">
      <div className="games-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Home
        </button>
        <h1>🎮 Choose Your Game</h1>
        <p>Select a game to start learning and having fun!</p>
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <div className="game-icon">
              <span className="icon-large">{game.icon}</span>
            </div>

            <div className="game-info">
              <h2 className="game-title">{game.name}</h2>
              <p className="game-description">{game.description}</p>

              <div className="game-details">
                <div className="difficulty">
                  <span className="difficulty-label">Difficulty:</span>
                  <span className="difficulty-value">{game.difficulty}</span>
                </div>

                <div className="features">
                  <span className="features-label">Features:</span>
                  <div className="features-list">
                    {game.features.map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              className="play-btn"
              onClick={() => onGameSelect(game.id)}
            >
              <span className="play-icon">▶️</span>
              <span className="play-text">Play Now</span>
            </button>
          </div>
        ))}
      </div>

      <div className="games-footer">
        <div className="stats-preview">
          <h3>📊 Your Progress</h3>
          <p>Track your scores and improvement across all games!</p>
        </div>
      </div>
    </div>
  );
};

export default GamesSelection;