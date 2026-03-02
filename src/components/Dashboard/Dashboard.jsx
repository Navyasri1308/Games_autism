import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalGamesPlayed: 0,
    averageAccuracy: 0,
    totalCreditsEarned: 0,
    avgSpeed: 0
  });
  const [recentGames, setRecentGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = () => {
    const sessions = JSON.parse(localStorage.getItem('gameSessions') || '[]');
    
    if (sessions.length === 0) {
      setLoading(false);
      return;
    }

    const totalGamesPlayed = sessions.length;
    const averageAccuracy = Math.round(
      sessions.reduce((sum, s) => sum + (s.metrics?.accuracy || 0), 0) / totalGamesPlayed
    );
    const totalCreditsEarned = sessions.reduce((sum, s) => sum + (s.metrics?.totalCredit || 0), 0);
    const avgSpeed = Math.round(
      sessions.reduce((sum, s) => sum + (s.metrics?.averageTimePerMatch || 0), 0) / totalGamesPlayed
    ) / 1000;

    setStats({
      totalGamesPlayed,
      averageAccuracy,
      totalCreditsEarned,
      avgSpeed
    });

    const recent = sessions.slice(-5).map(s => ({
      timestamp: new Date(s.timestamp).toLocaleDateString(),
      accuracy: s.metrics.accuracy,
      credits: s.metrics.totalCredit,
      time: Math.round(s.metrics.totalTime / 1000)
    }));

    setRecentGames(recent.reverse());
    setLoading(false);
  };

  return (
    <div className="dashboard-container">
      <h1>📊 Dashboard</h1>
      
      {loading ? (
        <p className="loading">Loading your stats...</p>
      ) : stats.totalGamesPlayed === 0 ? (
        <p className="no-data">Play games to see your stats! 🎮</p>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="card-label">🎮 Games Played</div>
              <div className="card-value">{stats.totalGamesPlayed}</div>
            </div>
            <div className="stat-card">
              <div className="card-label">⭐ Avg Accuracy</div>
              <div className="card-value">{stats.averageAccuracy}%</div>
            </div>
            <div className="stat-card">
              <div className="card-label">💰 Total Credits</div>
              <div className="card-value">{stats.totalCreditsEarned}</div>
            </div>
            <div className="stat-card">
              <div className="card-label">⚡ Avg Speed</div>
              <div className="card-value">{stats.avgSpeed}s</div>
            </div>
          </div>

          {/* Recent Games */}
          <div className="recent-games">
            <h2>📈 Recent Games</h2>
            <table className="games-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Accuracy</th>
                  <th>Credits</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentGames.map((game, idx) => (
                  <tr key={idx}>
                    <td>{game.timestamp}</td>
                    <td>{game.accuracy}%</td>
                    <td>{game.credits}</td>
                    <td>{game.time}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
