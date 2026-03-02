# 🎮 Autism Learning Game - Color & Shape Match

A colorful, interactive educational game designed to help children with autism learn through play. The game features simple mechanics, bright colors, and positive reinforcement to create a friendly learning environment.

---

## 📋 Features

### Game Modes:
1. **Shape Match** - Learn and match different shapes
2. **Color Match** - Identify and match colors
3. **Count Numbers** - Practice basic counting (1-6)

### Key Features for Autism-Friendly Learning:
- ✅ Simple, clear instructions
- ✅ Non-violent, positive feedback system
- ✅ Bright, appealing colors and emojis
- ✅ No time pressure - learn at own pace
- ✅ Scoring and level progression system
- ✅ Smooth animations without flashing
- ✅ Easy navigation with clear buttons
- ✅ Responsive design (works on phones, tablets, laptops)

---

## 🚀 How to Use

### Step 1: Open the Game
1. Navigate to the `autism_learning_game` folder
2. Open `index.html` in any web browser (Chrome, Firefox, Edge, Safari)
   - Simply double-click `index.html`
   - Or right-click → Open with → Your Browser

### Step 2: Select a Game Mode
- Click on one of the three game buttons:
  - 🔷 **Shape Match**
  - 🎨 **Color Match**
  - 🔢 **Count Numbers**

### Step 3: Play the Game
1. Look at the item shown in the box at the top
2. Click on the matching item from the options below
3. Get instant feedback - correct answers show ✓ and incorrect show ✗
4. Continue playing (10 questions per game)
5. View your results:
   - Total Score
   - Level Reached
   - Accuracy Percentage

### Step 4: Play Again
Click **Play Again** button to return to the menu and try another game mode

---

## 📁 Project Structure

```
autism_learning_game/
├── index.html          # Main game file (open this!)
├── style.css           # Styling and layout
├── game.js            # Game logic and functionality
└── README.md          # This file
```

---

## 🎯 Game Rules

### General Rules:
- Match the target item with one of the given options
- Correct answers earn more points
- Wrong answers still earn some points (2) and allow learning
- Play 10 questions per session
- Level up by earning 50 points

### Scoring System:
- Correct Answer: 10 + (Level - 1) × 5 points
- Incorrect Answer: 2 points
- Every 50 points = Level Up

---

## 🎨 Customization Tips

### To Change Colors:
```css
/* Open style.css and modify these gradients */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```
Replace hex colors (#667eea, #764ba2) with:
- Red: #ff0000
- Green: #00ff00
- Blue: #0000ff
- Yellow: #ffff00

### To Change Questions Count:
```javascript
/* Open game.js line ~205 and change: */
if (gameState.questionsAnswered < 10) {  // Change 10 to your number
```

### To Add More Items:
```javascript
/* Open game.js and add to gameData object: */
{ icon: '🆕', name: 'New Item' }
```

---

## 💡 Autism-Friendly Design Principles

This game is designed with the following principles in mind:

✅ **Clarity**: Simple, direct instructions without confusing text
✅ **Consistency**: Same mechanics across all game modes
✅ **Positive Feedback**: Encouraging messages and celebration of progress
✅ **No Time Pressure**: Players can take as long as they need
✅ **Calming Colors**: Soft, soothing color palette
✅ **Predictable Flow**: Same sequence every time (select mode → play → results)
✅ **Sensory Friendly**: Gentle animations, no flashing effects
✅ **Big, Clear Buttons**: Easy to tap on any device
✅ **Immediate Feedback**: Know right away if answer is correct
✅ **Learning, Not Punishment**: Wrong answers still gain points

---

## 🖥️ System Requirements

- Any modern web browser (Chrome, Firefox, Edge, Safari)
- Keyboard or touch interface (mouse, touch screen, or keyboard)
- Internet connection NOT required (game is fully offline)
- Works on:
  - Windows 10/11 PC
  - Mac
  - iPad/Tablets
  - Android tablets
  - Smartphones

---

## 🔧 Troubleshooting

### Game won't load?
- Make sure all three files are in the same folder:
  - index.html
  - style.css
  - game.js
- Try a different browser
- Clear your browser cache (Ctrl+Shift+Delete)

### Buttons not responding?
- Make sure JavaScript is enabled in your browser
- Try refreshing the page (Ctrl+R)
- Use a different browser

### Looks broken/stretched?
- This is normal on small screens
- Zoom out your browser (Ctrl+Minus)
- Try on a tablet or larger device

---

## 📚 Educational Benefits

Children can learn:
- **Visual Recognition**: Identifying shapes and colors
- **Memory Skills**: Remembering patterns and matching
- **Counting**: Basic numbers 1-6
- **Positive Reinforcement**: Handling success and trying again
- **Fine Motor Skills**: Clicking/tapping on targets
- **Focus & Attention**: Sustained engagement with tasks

---

## 🎓 Teacher/Therapist Notes

- **Ideal Duration**: 10-15 minutes per session
- **Frequency**: 3-4 times per week
- **Progression**: Game gets slightly harder at higher levels
- **Scaffolding**: Start with Shape Match (simplest)
- **Celebration**: Celebrate levels reached and high scores
- **No Frustration**: If child gets frustrated, take a break

---

## 🔒 Privacy & Safety

✅ No data collection
✅ No accounts required
✅ No internet connection needed
✅ Completely offline and self-contained
✅ Safe for children to use independently

---

## 📝 Notes

- Scores and levels reset when closing the browser (by design for a fresh start)
- The game is designed for children ages 5-12
- Works best on screens 10 inches or larger for younger children
- Can be installed on any computer or shared via USB drive

---

## 🤝 Support & Feedback

If you have suggestions for improvements or additional game modes, you can:
1. Add more items to the gameData object in game.js
2. Create new game modes following the existing pattern
3. Modify colors and styling in style.css

---

## 📄 License

This game is created to help children with autism learn and grow. Feel free to use, modify, and share it freely.

---

**Happy Learning! 🌟**

For questions or modifications, feel free to edit the code files or reach out for support.
