// ===== PLATFORM INTEGRATION MODULE =====
// Use this to connect MatchTheShapeGame with your dashboard, chatbot, and alerts

/**
 * GameMetricsManager
 * Handles storing and retrieving game metrics across the platform
 */
class GameMetricsManager {
  /**
   * Save game result to localStorage and prepare for platform integration
   * @param {Object} gameResult - Result object from MatchTheShapeGame
   * @param {String} userId - Optional user ID
   */
  static saveGameResult(gameResult, userId = null) {
    const session = {
      ...gameResult,
      gameType: 'MatchTheShape',
      userId: userId || 'anonymous',
      timestamp: new Date().toISOString(),
      sessionId: Date.now(),
      deviceInfo: {
        userAgent: navigator.userAgent,
        screenSize: `${window.innerWidth}x${window.innerHeight}`
      }
    };

    // Save to localStorage
    const sessions = JSON.parse(localStorage.getItem('gameSessions') || '[]');
    sessions.push(session);
    localStorage.setItem('gameSessions', JSON.stringify(sessions));

    return session;
  }

  /**
   * Get all game sessions
   * @returns {Array} Array of game sessions
   */
  static getGameSessions(limit = null) {
    const sessions = JSON.parse(localStorage.getItem('gameSessions') || '[]');
    return limit ? sessions.slice(-limit) : sessions;
  }

  /**
   * Calculate user statistics
   * @returns {Object} Aggregated user stats
   */
  static calculateUserStats() {
    const sessions = this.getGameSessions();
    
    if (sessions.length === 0) {
      return {
        totalGamesPlayed: 0,
        averageAccuracy: 0,
        totalCreditsEarned: 0,
        totalTimeSpent: 0,
        bestAccuracy: 0,
        bestStreak: 0
      };
    }

    const totalGamesPlayed = sessions.length;
    const averageAccuracy = Math.round(
      sessions.reduce((sum, s) => sum + (s.metrics?.accuracy || 0), 0) / totalGamesPlayed
    );
    const totalCreditsEarned = sessions.reduce((sum, s) => sum + (s.metrics?.totalCredit || 0), 0);
    const totalTimeSpent = sessions.reduce((sum, s) => sum + (s.metrics?.totalTime || 0), 0);
    const bestAccuracy = Math.max(...sessions.map(s => s.metrics?.accuracy || 0));
    const bestStreak = Math.max(...sessions.map(s => s.metrics?.finalStreak || 0));

    return {
      totalGamesPlayed,
      averageAccuracy,
      totalCreditsEarned,
      totalTimeSpent,
      bestAccuracy,
      bestStreak
    };
  }

  /**
   * Update user profile with game metrics
   * @param {String} userId - User identifier
   * @param {Object} gameResult - Game result object
   */
  static updateUserProfile(userId, gameResult) {
    const profiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
    
    if (!profiles[userId]) {
      profiles[userId] = {
        userId,
        gamesPlayed: [],
        totalCredits: 0,
        currentLevel: 1,
        achievements: [],
        createdAt: new Date().toISOString()
      };
    }

    profiles[userId].gamesPlayed.push({
      gameType: 'MatchTheShape',
      result: gameResult,
      timestamp: new Date().toISOString()
    });

    profiles[userId].totalCredits += gameResult.metrics.totalCredit;
    profiles[userId].lastPlayedAt = new Date().toISOString();

    // Update level based on credits
    profiles[userId].currentLevel = Math.floor(profiles[userId].totalCredits / 100) + 1;

    localStorage.setItem('userProfiles', JSON.stringify(profiles));
    
    return profiles[userId];
  }
}

/**
 * AlertManager
 * Trigger alerts based on game performance
 */
class AlertManager {
  /**
   * Create alert event from game result
   * @param {Object} gameResult - Game result object
   * @returns {Object} Alert object
   */
  static createAlertFromResult(gameResult) {
    const accuracy = gameResult.metrics.accuracy;
    const wrongAttempts = gameResult.metrics.wrongAttempts;

    let alert = null;

    // Perfect score
    if (accuracy === 100) {
      alert = {
        type: 'success',
        title: '🌟 Perfect Game!',
        message: `Wow! You matched all shapes perfectly with no mistakes!`,
        icon: '⭐',
        level: 'high'
      };
    }
    // Excellent
    else if (accuracy >= 80) {
      alert = {
        type: 'success',
        title: '🎉 Excellent Job!',
        message: `Great accuracy! Only ${wrongAttempts} wrong attempt(s).`,
        icon: '👏',
        level: 'medium'
      };
    }
    // Good
    else if (accuracy >= 60) {
      alert = {
        type: 'info',
        title: '😊 Good Job!',
        message: 'You\'re learning! Keep practicing.',
        icon: '👍',
        level: 'low'
      };
    }
    // Keep trying
    else {
      alert = {
        type: 'info',
        title: '💪 Keep Trying!',
        message: 'The more you play, the better you\'ll get!',
        icon: '🎯',
        level: 'low'
      };
    }

    alert.timestamp = new Date().toISOString();
    alert.gameMetrics = gameResult.metrics;

    return alert;
  }

  /**
   * Dispatch alert event for platform
   * @param {Object} alert - Alert object
   */
  static dispatchAlert(alert) {
    // Save to alerts log
    const alerts = JSON.parse(localStorage.getItem('alerts') || '[]');
    alerts.push(alert);
    localStorage.setItem('alerts', JSON.stringify(alerts));

    // Dispatch custom event for components to listen
    window.dispatchEvent(new CustomEvent('gameAlert', {
      detail: alert
    }));
  }

  /**
   * Get all alerts
   * @returns {Array} Array of alerts
   */
  static getAlerts(limit = 10) {
    const alerts = JSON.parse(localStorage.getItem('alerts') || '[]');
    return alerts.slice(-limit).reverse();
  }
}

/**
 * DashboardDataProvider
 * Prepare data for dashboard display
 */
class DashboardDataProvider {
  /**
   * Get formatted data for dashboard
   * @returns {Object} Formatted dashboard data
   */
  static getDashboardData() {
    const stats = GameMetricsManager.calculateUserStats();
    const recentSessions = GameMetricsManager.getGameSessions(5);
    const alerts = AlertManager.getAlerts(5);

    return {
      summary: {
        ...stats,
        lastPlayedAt: recentSessions[recentSessions.length - 1]?.timestamp || null,
        today: this.getTodayStats()
      },
      recentGames: recentSessions.map(s => ({
        timestamp: s.timestamp,
        accuracy: s.metrics.accuracy,
        credits: s.metrics.totalCredit,
        time: s.metrics.totalTime,
        streak: s.metrics.finalStreak
      })),
      alerts: alerts,
      charts: this.prepareChartData()
    };
  }

  /**
   * Get statistics for today
   */
  static getTodayStats() {
    const sessions = GameMetricsManager.getGameSessions();
    const today = new Date().toDateString();

    const todaySessions = sessions.filter(s => 
      new Date(s.timestamp).toDateString() === today
    );

    return {
      gamesPlayedToday: todaySessions.length,
      creditsEarnedToday: todaySessions.reduce((sum, s) => sum + (s.metrics?.totalCredit || 0), 0),
      averageAccuracyToday: todaySessions.length > 0
        ? Math.round(todaySessions.reduce((sum, s) => sum + (s.metrics?.accuracy || 0), 0) / todaySessions.length)
        : 0
    };
  }

  /**
   * Prepare data for charts/graphs
   */
  static prepareChartData() {
    const sessions = GameMetricsManager.getGameSessions();

    return {
      accuracyOverTime: sessions.map(s => ({
        date: new Date(s.timestamp).toLocaleDateString(),
        accuracy: s.metrics.accuracy
      })),
      creditsOverTime: sessions.map(s => ({
        date: new Date(s.timestamp).toLocaleDateString(),
        credits: s.metrics.totalCredit
      })),
      speedOverTime: sessions.map(s => ({
        date: new Date(s.timestamp).toLocaleDateString(),
        avgTime: s.metrics.averageTimePerMatch
      }))
    };
  }
}

// ===== EXPORT FOR USE =====
export {
  GameMetricsManager,
  AlertManager,
  DashboardDataProvider
};
