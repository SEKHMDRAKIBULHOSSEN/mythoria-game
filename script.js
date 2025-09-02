// Game state
let currentGenre = '';
let currentStory = null;
let storyStep = 0;

// Story data structure (compact, consistent indices)
const stories = {
  Adventure: {
    title: 'The Lost Kingdom',
    steps: [
      {
        text:
          "You stand at the edge of a mysterious forest. Legends speak of a lost kingdom hidden within. A worn path leads into the trees, a village smokes to the right, and the sun dips low behind you.",
        image:
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&auto=format&fit=crop&q=60',
        choices: [
          { text: 'Follow the forest path', next: 1 },
          { text: 'Head to the village', next: 2 },
          { text: 'Set up camp and wait for morning', next: 3 },
        ],
      },
      {
        text:
          "The path winds into shadow. You find a creaking bridge and the ruins of a watchtower beyond. A faint humming crystal lies on the ground, pointing somewhere unseen.",
        image:
          'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&auto=format&fit=crop&q=60',
        choices: [
          { text: 'Cross the bridge to the tower', next: 4 },
          { text: "Follow the crystal's pull", next: 'end' },
          { text: 'Return and find another route', next: 2 },
        ],
      },
      {
        text:
          "The village elder shares tales of a guardian and secret trials. He reveals a map with three routes: courage, wisdom, and heart.",
        image:
          'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&auto=format&fit=crop&q=60',
        choices: [
          { text: 'Take the path of courage', next: 4 },
          { text: 'Take the path of wisdom', next: 5 },
          { text: 'Take the path of heart', next: 6 },
        ],
      },
      {
        text:
          "At dawn, glowing lights reveal hidden trails. The forest hums with soft music and runes flicker to life on bark.",
        image:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop&q=60',
        choices: [
          { text: 'Follow the lights', next: 5 },
          { text: "Seek the music's source", next: 6 },
          { text: 'Trace the runes with your fingers', next: 'end' },
        ],
      },
      {
        text:
          "You reach an ancient watchtower. Inside: a journal about a benevolent dragon guardian and a crystal that responds to your heartbeat.",
        image:
          'https://images.unsplash.com/photo-1520637836862-4d197d17c55a?w=1200&auto=format&fit=crop&q=60',
        choices: [
          { text: 'Study the journal for clues', next: 5 },
          { text: 'Use the crystal to guide you onward', next: 'end' },
          { text: 'Search for hidden compartments', next: 6 },
        ],
      },
      {
        text:
          "A mountainside temple shows murals of the kingdom's fall. Three gems glow dimly: ruby, sapphire, emerald.",
        image:
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&auto=format&fit=crop&q=60',
        choices: [
          { text: 'Touch the ruby (courage)', next: 'end' },
          { text: 'Touch the sapphire (wisdom)', next: 'end' },
          { text: 'Touch the emerald (heart)', next: 'end' },
        ],
      },
      {
        text:
          "The runes rearrange into words: ‘Aethros Valdium Nethys’. Magic gathers like dawn breaking.",
        image:
          'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&auto=format&fit=crop&q=60',
        choices: [
          { text: 'Speak the ancient words', next: 'end' },
          { text: 'Press your palm to the runes', next: 'end' },
          { text: 'Step back and observe', next: 2 },
        ],
      },
      {
        text:
          "Congratulations, brave adventurer! You reach the heart of the lost kingdom. The guardian dragon greets you as a friend. The treasures were the choices you made—and the wisdom earned.",
        image:
          'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&auto=format&fit=crop&q=60',
        choices: [{ text: 'Start a new adventure', next: 'restart' }],
      },
    ],
  },
  Horror: {
    title: 'The Haunted Manor',
    steps: [
      {
        text:
          "Blackwood Manor looms in moonlight. The main door hangs ajar. A side path slips toward the servants’ entrance. The garden creaks with dead vines.",
        image:
          'https://images.unsplash.com/photo-1520637736862-4d197d17c55a?w=1200&auto=format&fit=crop&q=60',
        choices: [
          { text: 'Enter through the main door', next: 1 },
          { text: "Try the servants' entrance", next: 2 },
          { text: 'Investigate the garden', next: 3 },
        ],
      },
      {
        text:
          "A grand staircase spirals upward. A portrait seems to watch you. From above, a child's laugh echoes where no child lives.",
        image:
          'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&auto=format&fit=crop&q=60',
        choices: [
          { text: 'Follow the laughter upstairs', next: 'end' },
          { text: 'Examine the portrait', next: 2 },
          { text: 'Search the ground floor', next: 'end' },
        ],
      },
      {
        text:
          "Narrow corridors. Old photographs whisper. One shows your face as if you've always been here.",
        image:
          'https://images.unsplash.com/photo-1616585497209-11d3db2d5b0e?w=1200&auto=format&fit=crop&q=60',
        choices: [
          { text: 'Listen to the whispers', next: 'end' },
          { text: 'Enter a hidden passage behind a portrait', next: 3 },
          { text: 'Find the main hall', next: 1 },
        ],
      },
      {
        text:
          "An overgrown garden and a family mausoleum bear your name. A cellar door is scratched from inside.",
        image:
          'https://images.unsplash.com/photo-1573108037329-37aa135a142e?w=1200&auto=format&fit=crop&q=60',
        choices: [
          { text: 'Open the mausoleum', next: 'end' },
          { text: 'Descend into the cellar', next: 'end' },
          { text: 'Return to the front', next: 1 },
        ],
      },
      {
        text:
          "You survive Blackwood Manor and bring peace to its restless spirits. The house collapses with the dawn, and you step free—changed, and unafraid.",
        image:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop&q=60',
        choices: [{ text: 'Begin a new terrifying tale', next: 'restart' }],
      },
    ],
  },
  'Sci-Fi': {
    title: 'The Quantum Expedition',
    steps: [
      {
        text:
          "Year 2387. Aboard the Nexus Explorer, ARIA detects three anomalies: a pulsing blue signature, a geometric red construct, and a swirling purple vortex.",
        image:
          'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1200&auto=format&fit=crop&q=60',
        choices: [
          { text: 'Investigate the blue signature', next: 1 },
          { text: 'Approach the red dodecahedron', next: 2 },
          { text: 'Study the purple vortex', next: 3 },
        ],
      },
      {
        text:
          "A derelict alien ship. Crystalline beings stir in hibernation. Their leader reaches out with a thought: share knowledge, or pass in peace.",
        image:
          'https://images.unsplash.com/photo-1548375321-6ba84b6aa5c2?w=1200&auto=format&fit=crop&q=60',
        choices: [
          { text: 'Accept their knowledge', next: 'end' },
          { text: 'Help repair their ship', next: 'end' },
          { text: 'Invite them to join you', next: 'end' },
        ],
      },
      {
        text:
          "The red structure hums with math. A transmission encodes the rules of reality itself—promise and peril intertwined.",
        image:
          'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200&auto=format&fit=crop&q=60',
        choices: [
          { text: 'Decode and share widely', next: 'end' },
          { text: 'Protect and guard the knowledge', next: 'end' },
          { text: 'Observe from a distance', next: 3 },
        ],
      },
      {
        text:
          "The purple vortex is a portal. Probes return vistas of a parallel universe where thought is energy.",
        image:
          'https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=1200&auto=format&fit=crop&q=60',
        choices: [
          { text: 'Send a crew through', next: 'end' },
          { text: 'Establish cautious contact', next: 'end' },
          { text: 'Retreat and log observations', next: 'end' },
        ],
      },
      {
        text:
          "Congratulations, Quantum Explorer! You've opened new frontiers and forged paths between worlds. The multiverse awaits your next decision.",
        image:
          'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&auto=format&fit=crop&q=60',
        choices: [{ text: 'Begin a new space odyssey', next: 'restart' }],
      },
    ],
  },
};

// DOM references
const introScreen = document.getElementById('introScreen');
const gameScreen = document.getElementById('gameScreen');
const genreButtons = document.querySelectorAll('.genre-btn');
const startButton = document.getElementById('startButton');
const currentGenreSpan = document.getElementById('currentGenre');
const storyImage = document.getElementById('storyImage');
const storyText = document.getElementById('storyText');
const choicesContainer = document.getElementById('choicesContainer');
const restartButton = document.getElementById('restartButton');

// Attach listeners
genreButtons.forEach((button) => {
  button.addEventListener('click', () => selectGenre(button.dataset.genre, button));
});

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

function selectGenre(genre, clickedBtn) {
  currentGenre = genre;
  // Toggle selected styles
  genreButtons.forEach((btn) => btn.classList.remove('selected'));
  if (clickedBtn) clickedBtn.classList.add('selected');
  // Enable start
  startButton.disabled = false;
}

function startGame() {
  if (!currentGenre || !stories[currentGenre]) return;
  currentStory = stories[currentGenre];
  storyStep = 0;
  // Switch screens
  introScreen.classList.remove('active');
  gameScreen.classList.add('active');
  // Set indicator
  currentGenreSpan.textContent = currentGenre;
  // First step
  displayStoryStep();
}

function displayStoryStep() {
  const step = currentStory.steps[storyStep];
  if (!step) return;

  const storyContent = document.querySelector('.story-content');
  if (storyContent) {
    storyContent.classList.add('story-transition');
    setTimeout(() => storyContent.classList.remove('story-transition'), 600);
  }

  // Update image
  storyImage.src = step.image || '';
  storyImage.alt = `${currentGenre} Scene ${storyStep + 1}`;

  // Update text with typewriter effect
  typeWriterEffect(storyText, step.text || '');

  // Clear and add choices after a slight delay
  choicesContainer.innerHTML = '';

  const renderChoices = () => {
    (step.choices || []).forEach((choice, index) => {
      const choiceButton = document.createElement('button');
      choiceButton.className = 'choice-btn';
      choiceButton.textContent = choice.text;
      choiceButton.addEventListener('click', () => makeChoice(choice.next));

      // Staggered animation via inline styles
      choiceButton.style.opacity = '0';
      choiceButton.style.transform = 'translateX(-20px)';
      choicesContainer.appendChild(choiceButton);

      setTimeout(() => {
        choiceButton.style.transition = 'all 0.3s ease';
        choiceButton.style.opacity = '1';
        choiceButton.style.transform = 'translateX(0)';
      }, index * 100 + 400);
    });
  };

  // Give the typewriter a head start before showing buttons
  setTimeout(renderChoices, 600);
}

function typeWriterEffect(element, text) {
  if (!element) return;
  element.textContent = '';
  let index = 0;
  const speed = 18; // ms per char

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }

  type();
}

function makeChoice(nextStep) {
  if (nextStep === 'restart') {
    restartGame();
    return;
  }

  if (nextStep === 'end') {
    storyStep = currentStory.steps.length - 1; // go to ending node
    displayStoryStep();
    return;
  }

  if (typeof nextStep === 'number' && nextStep >= 0 && nextStep < currentStory.steps.length) {
    storyStep = nextStep;
    displayStoryStep();
  } else {
    // Fallback to ending if something goes wrong
    storyStep = currentStory.steps.length - 1;
    displayStoryStep();
  }
}

function restartGame() {
  // Reset state
  currentGenre = '';
  currentStory = null;
  storyStep = 0;

  // Reset UI
  genreButtons.forEach((btn) => btn.classList.remove('selected'));
  startButton.disabled = true;
  currentGenreSpan.textContent = '';
  storyText.textContent = '';
  storyImage.src = '';
  choicesContainer.innerHTML = '';

  // Switch back
  gameScreen.classList.remove('active');
  introScreen.classList.add('active');
}

// Init log
console.log('Mythoria: Interactive Story Game Loaded');
