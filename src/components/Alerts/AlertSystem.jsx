import React, { useState, useEffect } from 'react';
import '../styles/Alerts.css';

const AlertSystem = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Listen for game completion
    window.addEventListener('gameCompleted', handleGameComplete);
    return () => window.removeEventListener('gameCompleted', handleGameComplete);
  }, []);

  const handleGameComplete = (event) => {
    const { detail } = event;
    const accuracy = detail.metrics.accuracy;
    
    let alert = {
      id: Date.now(),
      type: 'success',
      title: '',
      message: '',
      emoji: ''
    };

    if (accuracy === 100) {
      alert.title = '🌟 Perfect Game!';
      alert.message = 'You matched all shapes perfectly!';
      alert.emoji = '⭐';
    } else if (accuracy >= 80) {
      alert.title = '🎉 Excellent Job!';
      alert.message = 'Great accuracy! Keep it up!';
      alert.emoji = '👏';
    } else if (accuracy >= 60) {
      alert.title = '😊 Good Job!';
      alert.message = 'You\'re improving! Keep playing!';
      alert.emoji = '👍';
    } else {
      alert.title = '💪 Keep Trying!';
      alert.message = 'The more you play, the better you\'ll get!';
      alert.emoji = '🎯';
    }

    showAlert(alert);
  };

  const showAlert = (alert) => {
    setAlerts([...alerts, alert]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeAlert(alert.id);
    }, 5000);
  };

  const removeAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div className="alerts-container">
      {alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          <span className="alert-emoji">{alert.emoji}</span>
          <div className="alert-content">
            <div className="alert-title">{alert.title}</div>
            <div className="alert-message">{alert.message}</div>
          </div>
          <button 
            className="alert-close"
            onClick={() => removeAlert(alert.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default AlertSystem;
