import React, { useState } from 'react';
import MatchTheShapeGame from './components/Games/MatchTheShapeGame';
import ColorShapeMatchGame from './components/Games/ColorShapeMatchGame';
import GamesSelection from './components/Games/GamesSelection';
import Dashboard from './components/Dashboard/Dashboard';
import AlertSystem from './components/Alerts/AlertSystem';
import { GameMetricsManager, AlertManager } from './utils/PlatformIntegration';
import './App.css';
import './components/styles/GamesSelection.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameComplete = (result) => {
    // 1. Save game metrics (only for React games)
    if (result) {
      GameMetricsManager.saveGameResult(result);

      // 2. Create and dispatch alert
      const alert = AlertManager.createAlertFromResult(result);
      AlertManager.dispatchAlert(alert);
    }

    // Show game complete message or go back to games selection
    setTimeout(() => {
      setCurrentScreen('games-selection');
      setSelectedGame(null);
    }, result ? 3000 : 0);
  };

  const handleGameSelect = (gameId) => {
    setSelectedGame(gameId);
    setCurrentScreen('game-play');
  };

  return (
    <div className="app-container">
      <AlertSystem />

      {currentScreen === 'home' && (
        <div className="home-screen">
          <header className="app-header">
            <h1>🌟 Autism Learning Platform</h1>
            <p>Play games, learn, and have fun!</p>
          </header>

          <nav className="main-nav">
            <button
              className="nav-btn games-btn"
              onClick={() => setCurrentScreen('games-selection')}
            >
              <span className="btn-icon">🎮</span>
              <span className="btn-text">Play Games</span>
            </button>
            <button
              className="nav-btn dashboard-btn"
              onClick={() => setCurrentScreen('dashboard')}
            >
              <span className="btn-icon">📊</span>
              <span className="btn-text">Dashboard</span>
            </button>
          </nav>

          <div className="platform-info">
            <h2>Welcome! 👋</h2>
            <p>This platform helps you learn through fun games!</p>
            <div className="features">
              <div className="feature-item">
                <span>🎮</span> Play shape matching games
              </div>
              <div className="feature-item">
                <span>📊</span> Track your progress
              </div>
              <div className="feature-item">
                <span>🎉</span> Earn credits and celebrate wins
              </div>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'games-selection' && (
        <GamesSelection
          onGameSelect={handleGameSelect}
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {currentScreen === 'game-play' && selectedGame === 'match-shape' && (
        <div className="games-screen">
          <button
            className="back-btn"
            onClick={() => setCurrentScreen('games-selection')}
          >
            ← Back to Games
          </button>
          <MatchTheShapeGame onGameComplete={handleGameComplete} />
        </div>
      )}

      {currentScreen === 'game-play' && selectedGame === 'color-shape-match' && (
        <ColorShapeMatchGame onGameComplete={handleGameComplete} />
      )}

      {currentScreen === 'dashboard' && (
        <div className="dashboard-screen">
          <button 
            className="back-btn"
            onClick={() => setCurrentScreen('home')}
          >
            ← Back
          </button>
          <Dashboard />
        </div>
      )}
    </div>
  );
}

export default App;
