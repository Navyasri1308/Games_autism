# 🌟 Autism Learning Platform - React

A complete, integrat autism-friendly educational platform with games, dashboard, chatbot, and alerts system. Built with React for your team collaboration.

---

## 📋 Features

### 🎮 Games
- **Match The Shape Game** - Drag & drop shapes with celebration animations
- Comprehensive metrics tracking
- Autism-friendly UI with no flashing effects
- Real-time feedback

### 📊 Dashboard
- Track game statistics
- View recent games with accuracy data
- Total credits earned
- Average performance metrics

### 💬 Chatbot
- Contextual responses based on game performance
- Quick response buttons
- Motivational messages
- Real-time interaction

### 🎉 Alerts System
- Performance-based notifications
- Automatic celebrations for achievements
- Customizable alert types
- Auto-dismiss functionality

### 🔗 Platform Integration
- All components share data via localStorage
- Real-time event system
- Metrics persistence
- Easy data export

---

## 🚀 Installation

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Step 1: Navigate to Project
```bash
cd "C:\Users\Dell\Documents\Games_autism\react-platform"
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm start
```

The app will open automatically at `http://localhost:3000`

---

## 📁 Project Structure

```
react-platform/
├── public/
│   └── index.html                 # HTML entry point
├── src/
│   ├── components/
│   │   ├── Games/
│   │   │   ├── MatchTheShapeGame.jsx      # Main game component
│   │   │   └── MatchTheShapeGame.css      # Game styles
│   │   ├── Dashboard/
│   │   │   └── Dashboard.jsx              # Stats dashboard
│   │   ├── Chatbot/
│   │   │   └── Chatbot.jsx                # Chat interface
│   │   ├── Alerts/
│   │   │   └── AlertSystem.jsx            # Alert notifications
│   │   └── styles/
│   │       ├── Dashboard.css
│   │       ├── Chatbot.css
│   │       └── Alerts.css
│   ├── utils/
│   │   └── PlatformIntegration.js         # Data sharing & events
│   ├── App.jsx                            # Main app component
│   ├── App.css                            # Main styles
│   ├── index.js                           # React entry point
│   └── index.html
├── package.json                           # Dependencies
└── README.md                              # This file
```

---

## 🎮 Usage

### Starting the App
```bash
npm start
```

### Building for Production
```bash
npm run build
```

### Running Tests
```bash
npm test
```

---

## 🔌 Component Integration

### Game Component
```javascript
import MatchTheShapeGame from './components/Games/MatchTheShapeGame';

<MatchTheShapeGame onGameComplete={handleResults} />
```

### Using Platform Integration
```javascript
import {
  GameMetricsManager,
  AlertManager,
  ChatbotIntegration,
  DashboardDataProvider
} from './utils/PlatformIntegration';

// Save game results
GameMetricsManager.saveGameResult(result);

// Create alerts
const alert = AlertManager.createAlertFromResult(result);
AlertManager.dispatchAlert(alert);

// Get dashboard data
const data = DashboardDataProvider.getDashboardData();
```

---

## 📊 Data Flow

```
Game Completion
      ↓
GameMetricsManager.saveGameResult()
      ↓
LocalStorage (gameSessions)
      ↓
Dashboard reads & displays
Chatbot listens & responds
Alerts system shows notifications
```

---

## 🔧 Customization

### Change Game Shape
Edit `src/components/Games/MatchTheShapeGame.jsx`:
```javascript
const SHAPES = {
  circle: { name: 'Circle', color: '#FF6B6B', icon: '●' },
  square: { name: 'Square', color: '#4ECDC4', icon: '■' },
  // Add more shapes
};
```

### Customize Colors
Update colors in CSS files:
- Primary: `#667eea`
- Secondary: `#764ba2`
- Success: `#4ECDC4`

### Add Chat Responses
Edit `src/components/Chatbot/Chatbot.jsx`:
```javascript
const getBotResponse = (userText) => {
  const responses = {
    'your phrase': 'Your response here',
  };
  // ...
};
```

---

## 📱 Browser Support

✅ Chrome/Chromium
✅ Firefox
✅ Safari
✅ Edge
✅ Mobile browsers (iOS Safari, Android Chrome)

---

## 🎓 Educational Features

- **Shape Recognition** - Visual matching tasks
- **Positive Reinforcement** - Celebrations for correct answers
- **Progress Tracking** - Visible improvement over time
- **No Time Pressure** - Child-paced learning
- **Accessible Design** - Large buttons, clear icons, minimal text

---

## 🔐 Data Storage

All data stored locally in browser localStorage:
- Game sessions
- User profiles
- Alerts history
- Chat messages

No external server required! Data persists across sessions.

---

## 🤝 Team Integration

### For Dashboard Team:
- Read game data from `localStorage.getItem('gameSessions')`
- Format: `Array[{ metrics, timestamp, gameType }]`
- Access helper: `GameMetricsManager.getGameSessions()`

### For Chatbot Team:
- Listen to `gameCompleted` event
- Access data: `localStorage.getItem('lastGameEvent')`
- Analyze performance via `ChatbotIntegration.analyzePerformance()`

### For Alerts Team:
- Listen to `gameAlert` event
- Access alert queue: `AlertManager.getAlerts()`
- Dispatch custom alerts: `AlertManager.dispatchAlert(alert)`

---

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
# Use different port
PORT=3001 npm start
```

### Dependencies installation fails?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Game not loading?
- Clear browser cache (Ctrl+Shift+Delete)
- Check console for errors (F12)
- Try different browser

### Data not persisting?
- Check localStorage is enabled
- Clear old data: `localStorage.clear()`
- Restart app

---

## 📚 Documentation Files

- **MATCH_THE_SHAPE_DOCS.md** - Game component API
- **PlatformIntegration.js** - Data management API
- **MatchTheShapeGameExample.jsx** - Usage examples

---

## 🎯 Next Steps

1. ✅ **Install & Run**: `npm install && npm start`
2. ✅ **Play Game**: Test the shape matching game
3. ✅ **Check Dashboard**: View your game statistics
4. ✅ **Integrate with Team**: Share data with chatbot & dashboard teams
5. ✅ **Customize**: Update colors, add shapes, extend functionality

---

## 📝 Available Scripts

| Command | Purpose |
|---------|---------|
| `npm start` | Start development server |
| `npm build` | Create production build |
| `npm test` | Run test suite |
| `npm eject` | Eject from Create React App* |

*Note: Ejecting is permanent and not recommended

---

## 🔄 Continuous Improvement

The platform is built to be extended:
- Add more game modes
- Implement user authentication
- Create leaderboards
- Add difficulty levels
- Integrate with backend database

---

## 📄 License

Free to use and modify for educational purposes.

---

## 🎉 Success!

Your autism-friendly learning platform is now complete! 

**Quick Start:**
```bash
cd react-platform
npm install
npm start
```

**Then open:** `http://localhost:3000`

Enjoy! 🚀
