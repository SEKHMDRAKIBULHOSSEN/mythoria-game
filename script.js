// Game state
let currentGenre = '';
let currentStory = null;
let storyStep = 0;

// Voice-over state
let voiceEnabled = false;
let selectedVoice = null;
let voiceRate = 1.0;
let voicePitch = 1.0;
const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

// Story data structure, with per-choice images
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
          {
            text: 'Follow the forest path',
            next: 1,
            image: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Head to the village',
            next: 2,
            image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Set up camp and wait for morning',
            next: 3,
            image: 'https://images.unsplash.com/photo-1504280390368-3971f660c76a?w=600&auto=format&fit=crop&q=60',
          },
        ],
      },
      {
        text:
          "The path winds into shadow. You find a creaking bridge and the ruins of a watchtower beyond. A faint humming crystal lies on the ground, pointing somewhere unseen.",
        image:
          'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Cross the bridge to the tower',
            next: 4,
            image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: "Follow the crystal's pull",
            next: 'end',
            image: 'https://images.unsplash.com/photo-1520975922361-e58a2f66f9f4?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Return and find another route',
            next: 2,
            image: 'https://images.unsplash.com/photo-1533850595620-7b1711221751?w=600&auto=format&fit=crop&q=60',
          },
        ],
      },
      {
        text:
          "The village elder shares tales of a guardian and secret trials. He reveals a map with three routes: courage, wisdom, and heart.",
        image:
          'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Take the path of courage',
            next: 4,
            image: 'https://images.unsplash.com/photo-1542587226-947f2d7e5d36?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Take the path of wisdom',
            next: 5,
            image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Take the path of heart',
            next: 6,
            image: 'https://images.unsplash.com/photo-1520974735194-9b0b55a1ea8b?w=600&auto=format&fit=crop&q=60',
          },
        ],
      },
      {
        text:
          "At dawn, glowing lights reveal hidden trails. The forest hums with soft music and runes flicker to life on bark.",
        image:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Follow the lights',
            next: 5,
            image: 'https://images.unsplash.com/photo-1488229297570-58520851e868?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: "Seek the music's source",
            next: 6,
            image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Trace the runes with your fingers',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=600&auto=format&fit=crop&q=60',
          },
        ],
      },
      {
        text:
          "You reach an ancient watchtower. Inside: a journal about a benevolent dragon guardian and a crystal that responds to your heartbeat.",
        image:
          'https://images.unsplash.com/photo-1520637836862-4d197d17c55a?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Study the journal for clues',
            next: 5,
            image: 'https://images.unsplash.com/photo-1519681391309-9d95a2b4f4b5?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Use the crystal to guide you onward',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1520974735194-6b4b4915d6d5?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Search for hidden compartments',
            next: 6,
            image: 'https://images.unsplash.com/photo-1486578077620-8a022ddd481f?w=600&auto=format&fit=crop&q=60',
          },
        ],
      },
      {
        text:
          "A mountainside temple shows murals of the kingdom's fall. Three gems glow dimly: ruby, sapphire, emerald.",
        image:
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Touch the ruby (courage)',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Touch the sapphire (wisdom)',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1597423244030-1a2b8b7f3861?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Touch the emerald (heart)',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1611420656949-71a3792b5f6d?w=600&auto=format&fit=crop&q=60',
          },
        ],
      },
      {
        text:
          "The runes rearrange into words: ‘Aethros Valdium Nethys’. Magic gathers like dawn breaking.",
        image:
          'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Speak the ancient words',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1520367745676-3b2f9c7b0a4b?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Press your palm to the runes',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1495707902700-42f6f1af6fdc?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Step back and observe',
            next: 2,
            image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=600&auto=format&fit=crop&q=60',
          },
        ],
      },
      {
        text:
          "Congratulations, brave adventurer! You reach the heart of the lost kingdom. The guardian dragon greets you as a friend. The treasures were the choices you made—and the wisdom earned.",
        image:
          'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&auto=format&fit=crop&q=60',
        choices: [{ text: 'Start a new adventure', next: 'restart', image: 'https://images.unsplash.com/photo-1519681391309-9d95a2b4f4b5?w=600&auto=format&fit=crop&q=60' }],
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
          {
            text: 'Enter through the main door',
            next: 1,
            image: 'https://images.unsplash.com/photo-1502126829571-83575bb53040?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: "Try the servants' entrance",
            next: 2,
            image: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Investigate the garden',
            next: 3,
            image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=60',
          },
        ],
      },
      {
        text:
          "A grand staircase spirals upward. A portrait seems to watch you. From above, a child's laugh echoes where no child lives.",
        image:
          'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Follow the laughter upstairs',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Examine the portrait',
            next: 2,
            image: 'https://images.unsplash.com/photo-1520975992228-4f0f0fda8db7?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Search the ground floor',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=600&auto=format&fit=crop&q=60',
          },
        ],
      },
      {
        text:
          "Narrow corridors. Old photographs whisper. One shows your face as if you've always been here.",
        image:
          'https://images.unsplash.com/photo-1616585497209-11d3db2d5b0e?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Listen to the whispers',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1524222717473-730000096953?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Enter a hidden passage behind a portrait',
            next: 3,
            image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Find the main hall',
            next: 1,
            image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&auto=format&fit=crop&q=60',
          },
        ],
      },
      {
        text:
          "An overgrown garden and a family mausoleum bear your name. A cellar door is scratched from inside.",
        image:
          'https://images.unsplash.com/photo-1573108037329-37aa135a142e?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Open the mausoleum',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1520418573071-b0e1bac9f1b2?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Descend into the cellar',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1602253057119-44d9fa53a9d6?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Return to the front',
            next: 1,
            image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&auto=format&fit=crop&q=60',
          },
        ],
      },
      {
        text:
          "You survive Blackwood Manor and bring peace to its restless spirits. The house collapses with the dawn, and you step free—changed, and unafraid.",
        image:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop&q=60',
        choices: [{ text: 'Begin a new terrifying tale', next: 'restart', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&auto=format&fit=crop&q=60' }],
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
          {
            text: 'Investigate the blue signature',
            next: 1,
            image: 'https://images.unsplash.com/photo-1447433819943-74a20887a81e?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Approach the red dodecahedron',
            next: 2,
            image: 'https://images.unsplash.com/photo-1558980664-10fb62f4f7b0?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Study the purple vortex',
            next: 3,
            image: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=600&auto=format&fit=crop&q=60',
          },
        ],
      },
      {
        text:
          "A derelict alien ship. Crystalline beings stir in hibernation. Their leader reaches out with a thought: share knowledge, or pass in peace.",
        image:
          'https://images.unsplash.com/photo-1548375321-6ba84b6aa5c2?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Accept their knowledge',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Help repair their ship',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1520974735194-6b4b4915d6d5?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Invite them to join you',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=600&auto=format&fit=crop&q=60',
          },
        ],
      },
      {
        text:
          "The red structure hums with math. A transmission encodes the rules of reality itself—promise and peril intertwined.",
        image:
          'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Decode and share widely',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Protect and guard the knowledge',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1492305175270-7f6a79c23711?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Observe from a distance',
            next: 3,
            image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&auto=format&fit=crop&q=60',
          },
        ],
      },
      {
        text:
          "The purple vortex is a portal. Probes return vistas of a parallel universe where thought is energy.",
        image:
          'https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Send a crew through',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Establish cautious contact',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1581094453601-3b2c3d15b20f?w=600&auto=format&fit=crop&q=60',
          },
          {
            text: 'Retreat and log observations',
            next: 'end',
            image: 'https://images.unsplash.com/photo-1447433819943-74a20887a81e?w=600&auto=format&fit=crop&q=60',
          },
        ],
      },
      {
        text:
          "Congratulations, Quantum Explorer! You've opened new frontiers and forged paths between worlds. The multiverse awaits your next decision.",
        image:
          'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&auto=format&fit=crop&q=60',
        choices: [{ text: 'Begin a new space odyssey', next: 'restart', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=60' }],
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

// Voice DOM
const voiceToggle = document.getElementById('voiceToggle');
const voiceSelect = document.getElementById('voiceSelect');
const voiceRateInput = document.getElementById('voiceRate');
const voicePitchInput = document.getElementById('voicePitch');
const voiceRateVal = document.getElementById('voiceRateVal');
const voicePitchVal = document.getElementById('voicePitchVal');
const playVoiceBtn = document.getElementById('playVoice');
const pauseVoiceBtn = document.getElementById('pauseVoice');
const resumeVoiceBtn = document.getElementById('resumeVoice');
const stopVoiceBtn = document.getElementById('stopVoice');

// Attach listeners
genreButtons.forEach((button) => {
  button.addEventListener('click', () => selectGenre(button.dataset.genre, button));
});

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

// Voice listeners
if (voiceToggle) {
  voiceToggle.addEventListener('change', () => {
    voiceEnabled = voiceToggle.checked && !!synth;
    if (!synth) {
      alert('Voice synthesis is not supported on this browser.');
      voiceToggle.checked = false;
      voiceEnabled = false;
      return;
    }
    if (!voiceEnabled) cancelSpeak();
    else speakCurrentStep();
  });
}
if (voiceSelect) {
  voiceSelect.addEventListener('change', () => {
    const v = (synth?.getVoices() || []).find((vv) => vv.name === voiceSelect.value);
    if (v) selectedVoice = v;
    if (voiceEnabled) speakCurrentStep();
  });
}
if (voiceRateInput) {
  voiceRateInput.addEventListener('input', () => {
    voiceRate = parseFloat(voiceRateInput.value) || 1.0;
    if (voiceRateVal) voiceRateVal.textContent = voiceRate.toFixed(1);
  });
}
if (voicePitchInput) {
  voicePitchInput.addEventListener('input', () => {
    voicePitch = parseFloat(voicePitchInput.value) || 1.0;
    if (voicePitchVal) voicePitchVal.textContent = voicePitch.toFixed(1);
  });
}
if (playVoiceBtn) playVoiceBtn.addEventListener('click', speakCurrentStep);
if (pauseVoiceBtn) pauseVoiceBtn.addEventListener('click', () => synth?.pause());
if (resumeVoiceBtn) resumeVoiceBtn.addEventListener('click', () => synth?.resume());
if (stopVoiceBtn) stopVoiceBtn.addEventListener('click', cancelSpeak);

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
      choiceButton.setAttribute('aria-label', choice.text);

      if (choice.image) {
        const img = document.createElement('img');
        img.src = choice.image;
        img.alt = choice.text;
        img.className = 'choice-thumb';
        choiceButton.appendChild(img);
      }

      const label = document.createElement('span');
      label.className = 'choice-label';
      label.textContent = choice.text;
      choiceButton.appendChild(label);

      choiceButton.addEventListener('click', () => makeChoice(choice.next));
      choiceButton.addEventListener('mouseenter', () => {
        if (voiceEnabled) speak(`Option: ${choice.text}`);
      });
      choiceButton.addEventListener('focus', () => {
        if (voiceEnabled) speak(`Option: ${choice.text}`);
      });

      // Staggered animation via inline styles
      choiceButton.style.opacity = '0';
      choiceButton.style.transform = 'translateY(8px)';
      choicesContainer.appendChild(choiceButton);

      setTimeout(() => {
        choiceButton.style.transition = 'all 0.3s ease';
        choiceButton.style.opacity = '1';
        choiceButton.style.transform = 'translateY(0)';
      }, index * 100 + 400);
    });
  };

  // Give the typewriter a head start before showing buttons
  setTimeout(renderChoices, 600);

  // Voice-over for the step
  if (voiceEnabled) speakCurrentStep(step);
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

  // Stop voice
  cancelSpeak();
}

/* Voice helpers */
function speak(text) {
  if (!voiceEnabled || !synth || !text) return;
  cancelSpeak();
  const utter = new SpeechSynthesisUtterance(text);
  if (selectedVoice) utter.voice = selectedVoice;
  utter.rate = voiceRate;
  utter.pitch = voicePitch;
  synth.speak(utter);
}

function cancelSpeak() {
  try {
    if (synth && synth.speaking) synth.cancel();
  } catch {}
}

function speakCurrentStep(stepOverride) {
  const step = stepOverride || (currentStory?.steps?.[storyStep]);
  if (!step) return;
  const choicesText = (step.choices || []).map((c, i) => `Option ${i + 1}: ${c.text}`).join('. ');
  const full = choicesText ? `${step.text}. ${choicesText}.` : step.text;
  speak(full);
}

// Voice initialization
function loadVoices() {
  if (!synth || !voiceSelect) return;
  const all = synth.getVoices();
  voiceSelect.innerHTML = '';
  // Prefer English voices but leave all available
  const sorted = [...all].sort((a, b) => a.lang.localeCompare(b.lang) || a.name.localeCompare(b.name));
  sorted.forEach((v, idx) => {
    const opt = document.createElement('option');
    opt.value = v.name;
    opt.textContent = `${v.name} (${v.lang})`;
    voiceSelect.appendChild(opt);
    if (idx === 0) selectedVoice = v;
  });
  // Try to pick a reasonable default English voice if available
  const en = sorted.find((v) => v.lang.toLowerCase().startsWith('en'));
  if (en) {
    selectedVoice = en;
    voiceSelect.value = en.name;
  }
}

if (synth) {
  // Some browsers load voices async
  loadVoices();
  if (typeof synth.onvoiceschanged !== 'undefined') {
    synth.onvoiceschanged = loadVoices;
  }
}

// Init log
console.log('Mythoria: Interactive Story Game Loaded with Voice Over and Choice Images');
