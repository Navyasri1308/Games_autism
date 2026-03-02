import React, { useState, useEffect, useRef } from 'react';
import './MatchTheShapeGame.css';

const SHAPES = {
  circle: { name: 'Circle', color: '#FF6B6B', colorName: 'Red', icon: '●' },
  square: { name: 'Square', color: '#4ECDC4', colorName: 'Teal', icon: '■' },
  triangle: { name: 'Triangle', color: '#FFE66D', colorName: 'Yellow', icon: '▲' },
  hexagon: { name: 'Hexagon', color: '#A8E6CF', colorName: 'Mint', icon: '⬡' },
  star: { name: 'Star', color: '#FFD93D', colorName: 'Gold', icon: '★' },
  diamond: { name: 'Diamond', color: '#B19CD9', colorName: 'Lavender', icon: '◆' },
  heart: { name: 'Heart', color: '#FF8A80', colorName: 'Coral', icon: '♥' },
  oval: { name: 'Oval', color: '#81C784', colorName: 'Green', icon: '⬭' }
};

const MatchTheShapeGame = ({ onGameComplete = null }) => {
  // State Management
  const [matched, setMatched] = useState({});
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [credit, setCredit] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing' or 'completed'
  const [draggedShape, setDraggedShape] = useState(null);
  const [wrongAttemptMessage, setWrongAttemptMessage] = useState('');
  
  // Metrics
  const startTimeRef = useRef(Date.now());
  const [timePerMatch, setTimePerMatch] = useState({});
  const matchStartTimeRef = useRef({});

  // Initialize match start times
  useEffect(() => {
    Object.keys(SHAPES).forEach(shape => {
      if (!matchStartTimeRef.current[shape]) {
        matchStartTimeRef.current[shape] = Date.now();
      }
    });
  }, []);

  // Calculate progress
  const totalMatches = Object.keys(SHAPES).length;
  const completedMatches = Object.keys(matched).length;
  const progress = (completedMatches / totalMatches) * 100;

  // Handle Drag Start
  const handleDragStart = (e, shapeKey) => {
    if (matched[shapeKey]) return;
    setDraggedShape(shapeKey);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', shapeKey);
  };

  // Handle Drag Over Drop Target
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  // Handle Drop
  const handleDrop = (e, targetKey) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    const shapeKey = e.dataTransfer.getData('text/plain');

    if (!shapeKey) return;

    if (shapeKey === targetKey && !matched[shapeKey]) {
      handleCorrectMatch(shapeKey);
    } else if (!matched[shapeKey]) {
      handleWrongMatch(shapeKey);
    }

    setDraggedShape(null);
  };

  // Correct Match Handler
  const handleCorrectMatch = (shapeKey) => {
    const matchTime = Date.now() - (matchStartTimeRef.current[shapeKey] || Date.now());
    setTimePerMatch(prev => ({
      ...prev,
      [shapeKey]: matchTime
    }));

    setMatched(prev => ({ ...prev, [shapeKey]: true }));
    setCredit(prev => prev + 1);
    setStreak(prev => prev + 1);
    setWrongAttempts(0);

    playCelebration(shapeKey);

    const element = document.getElementById(`shape-${shapeKey}`);
    if (element) {
      element.classList.add('locked');
    }

    if (Object.keys(matched).length + 1 === totalMatches) {
      setTimeout(() => {
        completeGame();
      }, 1500);
    }
  };

  // Wrong Match Handler
  const handleWrongMatch = (shapeKey) => {
    setWrongAttempts(prev => prev + 1);
    setStreak(0);
    setWrongAttemptMessage('Wrong Attempt! Try again.');

    const element = document.getElementById(`shape-${shapeKey}`);
    if (element) {
      element.classList.add('shake');
      setTimeout(() => {
        element.classList.remove('shake');
      }, 500);
    }

    // Clear the warning message after 2 seconds
    setTimeout(() => {
      setWrongAttemptMessage('');
    }, 2000);
  };

  // Celebration Animation
  const playCelebration = (shapeKey) => {
    const shape = SHAPES[shapeKey];

    // Create main celebration stars
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    celebration.style.color = shape.color;
    celebration.innerHTML = '✨ ⭐ ✨';

    const dropTarget = document.getElementById(`target-${shapeKey}`);
    if (dropTarget && dropTarget.parentElement) {
      dropTarget.parentElement.appendChild(celebration);
      setTimeout(() => celebration.remove(), 1000);
    }

    // Create balloon/confetti burst effect
    createBalloonBurst(shape.color, dropTarget);

    playSuccessSound();
  };

  // Balloon/Confetti Burst Effect
  const createBalloonBurst = (color, targetElement) => {
    if (!targetElement) return;

    const container = targetElement.parentElement;
    const burstElements = ['🎈', '🎉', '✨', '⭐', '🌟', '💫', '🎊', '🎆', '✨', '🌈', '🎇', '💥'];

    // Get target element position relative to container
    const targetRect = targetElement.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const relativeLeft = targetRect.left - containerRect.left;
    const relativeTop = targetRect.top - containerRect.top;
    const targetWidth = targetRect.width;
    const targetHeight = targetRect.height;
    const centerX = relativeLeft + targetWidth / 2;
    const centerY = relativeTop + targetHeight / 2;

    // Create 20 particles concentrated around the target
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'celebration-particle';
      particle.innerHTML = burstElements[Math.floor(Math.random() * burstElements.length)];
      particle.style.color = getRandomColor();

      // Create a radial burst pattern around the target center
      const angle = (Math.PI * 2 * i) / 20; // Distribute evenly in a circle
      const distance = 10 + Math.random() * 60; // Distance from center (10-70px)
      const randomOffset = (Math.random() - 0.5) * 20; // Add some randomness

      const left = centerX + Math.cos(angle) * distance + randomOffset;
      const top = centerY + Math.sin(angle) * distance + randomOffset;

      particle.style.left = `${left}px`;
      particle.style.top = `${top}px`;
      particle.style.animationDelay = `${Math.random() * 0.4}s`;
      particle.style.animationDuration = `${1.5 + Math.random() * 1}s`;

      container.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentElement) {
          particle.remove();
        }
      }, 2500);
    }
  };

  // Get random bright color for particles
  const getRandomColor = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FFD93D', '#B19CD9', '#FF8A80', '#81C784', '#FF5722', '#2196F3', '#9C27B0', '#FF9800'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Sound Effect
  const playSuccessSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      // Audio not supported
    }
  };

  // Complete Game
  const completeGame = () => {
    const endTime = Date.now();
    const totalTime = endTime - startTimeRef.current;
    const totalAttempts = wrongAttempts + completedMatches;
    const accuracy = (completedMatches / totalAttempts) * 100;

    const result = {
      success: true,
      metrics: {
        accuracy: Math.round(accuracy),
        totalMatches: completedMatches,
        wrongAttempts: wrongAttempts,
        totalAttempts: totalAttempts,
        totalTime: totalTime,
        averageTimePerMatch: Math.round(totalTime / completedMatches),
        finalStreak: streak,
        totalCredit: credit,
        timePerMatch: timePerMatch,
        startTime: startTimeRef.current,
        endTime: endTime
      }
    };

    setGameState('completed');

    if (onGameComplete) {
      onGameComplete(result);
    }
  };

  // Render Playing State
  if (gameState === 'playing') {
    return (
      <div className="match-game-container">
        <header className="game-header">
          <h1>🎮 Match The Shapes!</h1>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-label">✨ Credits</span>
              <span className="stat-value">{credit}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">🔥 Streak</span>
              <span className="stat-value">{streak}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">❌ Misses</span>
              <span className="stat-value">{wrongAttempts}</span>
            </div>
          </div>
        </header>

        <div className="progress-section">
          <div className="progress-label">
            Progress: {completedMatches}/{totalMatches} Matches
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {wrongAttemptMessage && (
          <div className="warning-message">
            ⚠️ {wrongAttemptMessage}
          </div>
        )}

        <div className="game-content">
          <div className="shapes-section">
            <h2>📦 Shapes</h2>
            <div className="shapes-container">
              {Object.entries(SHAPES).map(([key, shape]) => (
                <div
                  key={key}
                  id={`shape-${key}`}
                  className={`draggable-shape ${matched[key] ? 'matched' : ''}`}
                  draggable={!matched[key]}
                  onDragStart={(e) => handleDragStart(e, key)}
                  style={{
                    backgroundColor: matched[key] ? '#ddd' : shape.color,
                    opacity: matched[key] ? 0.5 : 1
                  }}
                >
                  <span className="shape-icon">{shape.icon}</span>
                  <span className="shape-name">{shape.name}</span>
                  <span className="shape-color">({shape.colorName})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="targets-section">
            <h2>🎯 Drop Here</h2>
            <div className="targets-container">
              {Object.entries(SHAPES).map(([key, shape]) => (
                <div
                  key={`target-${key}`}
                  id={`target-${key}`}
                  className={`drop-target ${matched[key] ? 'filled' : ''}`}
                  style={{
                    borderColor: shape.color,
                    backgroundColor: matched[key] ? `${shape.color}20` : 'transparent'
                  }}
                  onDragOver={(e) => !matched[key] && handleDragOver(e)}
                  onDragLeave={(e) => !matched[key] && handleDragLeave(e)}
                  onDrop={(e) => !matched[key] && handleDrop(e, key)}
                >
                  {matched[key] && (
                    <>
                      <span className="target-icon">{shape.icon}</span>
                      <span className="target-check">✓</span>
                    </>
                  )}
                  {!matched[key] && (
                    <span className="target-outline">?</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Completed State
  return (
    <div className="match-game-container completion-screen">
      <div className="completion-content">
        <div className="celebration-emoji">🎉 🎊 🌟</div>
        <h1>Great Job!</h1>
        
        <div className="results-stats">
          <div className="result-row">
            <span className="result-label">✨ All Shapes Matched!</span>
            <span className="result-value">3/3</span>
          </div>
          <div className="result-row">
            <span className="result-label">⭐ Accuracy</span>
            <span className="result-value">
              {Math.round((completedMatches / (completedMatches + wrongAttempts)) * 100)}%
            </span>
          </div>
          <div className="result-row">
            <span className="result-label">⏱️ Total Time</span>
            <span className="result-value">
              {Math.round((Date.now() - startTimeRef.current) / 1000)}s
            </span>
          </div>
          <div className="result-row">
            <span className="result-label">🔥 Best Streak</span>
            <span className="result-value">{streak}</span>
          </div>
          <div className="result-row">
            <span className="result-label">💰 Total Credits</span>
            <span className="result-value">{credit}</span>
          </div>
        </div>

        <button 
          className="completion-button"
          onClick={() => window.location.reload()}
        >
          Play Again 🎮
        </button>
      </div>
    </div>
  );
};

export default MatchTheShapeGame;
