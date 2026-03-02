# 🚀 QUICK START - React Platform Setup

## ⚡ 5-Minute Setup

### Step 1: Open PowerShell
```powershell
cd "C:\Users\Dell\Documents\Games_autism\react-platform"
```

### Step 2: Install Dependencies
```powershell
npm install
```
*(Takes 2-3 minutes)*

### Step 3: Start the App
```powershell
npm start
```

### Step 4: Open Browser
Browser will open automatically at:
```
http://localhost:3000
```

---

## ✅ What You Get

✅ **Shape Matching Game** - Drag & drop with celebration animations
✅ **Dashboard** - Track stats and progress
✅ **Chatbot** - Interactive assistance (click 💬 button)
✅ **Alerts** - Performance notifications
✅ **Full Data Integration** - All components connected

---

## 🎮 Try It Out

1. Click **"🎮 Play Games"**
2. Play the Shape Matching game
3. Match all 3 shapes
4. See your stats in **Dashboard**
5. Check **Chatbot** for feedback

---

## 📁 Project Files

All files are in:
```
C:\Users\Dell\Documents\Games_autism\react-platform\
```

Key files:
- `src/components/Games/MatchTheShapeGame.jsx` - Game logic
- `src/components/Dashboard/Dashboard.jsx` - Stats display
- `src/components/Chatbot/Chatbot.jsx` - Chat interface
- `src/utils/PlatformIntegration.js` - Data connection
- `src/App.jsx` - Main app structure

---

## 🛑 Stop the Server

In PowerShell:
```
Ctrl + C
```

Then confirm with `Y`

---

## 🔄 Restart Server

```powershell
npm start
```

---

## 📱 Access from Mobile

Same WiFi network?

1. Find your PC IP: `ipconfig` → IPv4 Address
2. On mobile: `http://[IP]:3000`

Example: `http://192.168.1.100:3000`

---

## 🤝 Team Integration

### Share with Chatbot Team:
```
Share: src/utils/PlatformIntegration.js
They can use: ChatbotIntegration class
```

### Share with Dashboard Team:
```
Share: GameMetricsManager class
Data stored in: localStorage('gameSessions')
```

### Share with Alerts Team:
```
Share: AlertManager class
Listen to: 'gameAlert' event
Data format in: localStorage('alerts')
```

---

## 🐛 Issues?

**Port 3000 taken?**
```powershell
PORT=3001 npm start
```

**Dependencies error?**
```powershell
rm -r node_modules
npm install
```

**Game not loading?**
- Press F12 (Developer Tools)
- Check Console for errors
- Try different browser

---

## 📚 Full Documentation

See `README.md` in the project folder for complete docs.

---

## ✨ You're All Set!

**Next time you want to run it:**
```powershell
cd "C:\Users\Dell\Documents\Games_autism\react-platform"
npm start
```

Enjoy! 🎉
