# mythoria-game
# 🎮 Mythoria - Interactive Story Game

An immersive, universally responsive adventure game built with HTML, CSS, and JavaScript. Play it on any device—mobile, tablet, desktop, or even smart TVs! ✨

---

## 🌟 Features

- **Interactive Storytelling**: Make choices to shape your adventure.
- **Voiceover Narration**: Text-to-speech with multiple voices and controls.
- **Universal Device Support**: Fully responsive and mobile-first.
- **Visual Experience**: Dynamic images for every scene.
- **Progressive Web App (PWA)**: Installable, offline-capable, and app-like.
- **Accessibility**: Keyboard, screen reader, and high-contrast support.
- **Multiple Endings**: Discover different outcomes based on your decisions.

---

## 🚀 How to Play

1. **Start**: Open the game in your browser or install as a PWA.
2. **Choose Genre**: Select your preferred adventure type.
3. **Navigate**: Enjoy narrated story, make choices, and explore.
4. **Controls**:
   - **Mouse/Touch**: Tap/click choices and controls.
   - **Keyboard**:  
     - `1`, `2`, `3` — select choices  
     - `R` — restart game  
     - `Space` — play/pause narration  
     - `S` — stop narration  
     - `V` — open voice settings

---

## 🛠️ Local Setup & Deployment

### Local Development

1. Clone the repository:
   ```
   git clone https://github.com/SEKHMDRAKIBULHOSSEN/mythoria-game.git
   ```
2. Open `index.html` in your browser.
3. Start playing!

### GitHub Pages Deployment

1. Go to your repository’s **Settings > Pages**.
2. Set source to the `main` branch.
3. Your game will be live at:  
   `https://SEKHMDRAKIBULHOSSEN.github.io/mythoria-game`

---

## 📁 File Structure

```
mythoria-game/
├── index.html           # Main game UI
├── styles.css           # Responsive styles and animations
├── script.js            # Game logic and voiceover
├── game-config.js       # Story data and branching
├── manifest.json        # PWA manifest
├── service-worker.js    # Offline support
└── README.md            # Documentation
```

---

## 🎨 Technical Details

- **Frontend**: HTML5, CSS3 (Grid/Flex), JavaScript (ES6+)
- **PWA**: Installable, offline, and mobile-optimized
- **Speech Synthesis**: Web Speech API for narration
- **Accessibility**: ARIA labels, keyboard support, high-contrast
- **Optimized**: Lazy loading, safe-area for notched devices, reduced motion

---

## 🔧 Customization

**To add new stories:**  
Edit `game-config.js` and add new nodes:

```js
your_new_path: {
  text: "Your story text...",
  image: "path/to/image.jpg",
  choices: [
    { text: "Choice 1", next: "next_node_1" },
    { text: "Choice 2", next: "next_node_2" }
  ]
}
```

**To change styles:**  
Edit `styles.css` for color, layout, and animation changes.

---

## 🐛 Troubleshooting

- **Images not loading?**: Images use [Picsum Photos](https://picsum.photos); check your internet.
- **No voiceover?**: Ensure your browser supports the Web Speech API.
- **Game not working?**: Clear browser cache, check console for errors, or try a different browser.

---

## 📱 Browser Compatibility

- ✅ Chrome / Safari / Firefox / Edge / Samsung Internet
- ✅ iOS, Android, Windows, macOS, Linux
- ✅ Mobile, tablet, desktop, smart TVs

---

## 🤝 Contributing

Pull requests for new stories, bug fixes, or UI/UX improvements are welcome!

---

## 📄 License

MIT License.

---

## 🎮 Enjoy Your Adventure!

Play, listen, and experience the magical world of Mythoria wherever you are!
