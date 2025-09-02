// Game state
let currentGenre = '';
let currentStory = null;
let storyStep = 0;

// Voice-over state
let voiceEnabled = false;
let selectedVoice = null;
let voiceRate = 1.0;
let voicePitch = 1.0;
let lastUserActionTS = 0;
const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

// Fallback images per genre
const genreFallbacks = {
  Adventure: {
    story: 'https://source.unsplash.com/featured/1200x800?fantasy,forest',
    choice: 'https://source.unsplash.com/featured/600x400?fantasy,adventure',
  },
  Horror: {
    story: 'https://source.unsplash.com/featured/1200x800?haunted,house',
    choice: 'https://source.unsplash.com/featured/600x400?dark,spooky',
  },
  'Sci-Fi': {
    story: 'https://source.unsplash.com/featured/1200x800?space,galaxy',
    choice: 'https://source.unsplash.com/featured/600x400?futuristic,technology',
  },
  default: {
    story: 'https://source.unsplash.com/featured/1200x800?landscape',
    choice: 'https://source.unsplash.com/featured/600x400?nature',
  },
};

// Story data structure with images for steps and choices
const stories = {
  Adventure: {
    title: 'The Lost Kingdom',
    steps: [
      {
        text:
          'You stand at the edge of a mysterious forest. Legends speak of a lost kingdom hidden within. A worn path leads into the trees, a village smokes to the right, and the sun dips low behind you.',
        image:
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Follow the forest path',
            next: 1,
            image:
              'https://source.unsplash.com/featured/600x400?forest,path',
          },
          {
            text: 'Head to the village',
            next: 2,
            image:
              'https://source.unsplash.com/featured/600x400?village,evening',
          },
          {
            text: 'Set up camp and wait for morning',
            next: 3,
            image:
              'https://source.unsplash.com/featured/600x400?campfire,night',
          },
        ],
      },
      {
        text:
          'The path winds into shadow. You find a creaking bridge and the ruins of a watchtower beyond. A faint humming crystal lies on the ground, pointing somewhere unseen.',
        image:
          'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Cross the bridge to the tower',
            next: 4,
            image:
              'https://source.unsplash.com/featured/600x400?bridge,ruins',
          },
          {
            text: "Follow the crystal's pull",
            next: 'end',
            image:
              'https://source.unsplash.com/featured/600x400?crystal,magic',
          },
          {
            text: 'Return and find another route',
            next: 2,
            image:
              'https://source.unsplash.com/featured/600x400?trail,woods',
          },
        ],
      },
      {
        text:
          'The village elder shares tales of a guardian and secret trials. He reveals a map with three routes: courage, wisdom, and heart.',
        image:
          'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Take the path of courage',
            next: 4,
            image:
              'https://source.unsplash.com/featured/600x400?mountain,climb',
          },
          {
            text: 'Take the path of wisdom',
            next: 5,
            image:
              'https://source.unsplash.com/featured/600x400?library,ancient',
          },
          {
            text: 'Take the path of heart',
            next: 6,
            image:
              'https://source.unsplash.com/featured/600x400?emerald,light',
          },
        ],
      },
      {
        text:
          'At dawn, glowing lights reveal hidden trails. The forest hums with soft music and runes flicker to life on bark.',
        image:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Follow the lights',
            next: 5,
            image:
              'https://source.unsplash.com/featured/600x400?fairy,lights',
          },
          {
            text: "Seek the music's source",
            next: 6,
            image:
              'https://source.unsplash.com/featured/600x400?music,forest',
          },
          {
            text: 'Trace the runes with your fingers',
            next: 'end',
            image:
              'https://source.unsplash.com/featured/600x400?runes,stone',
          },
        ],
      },
      {
        text:
          'You reach an ancient watchtower. Inside: a journal about a benevolent dragon guardian and a crystal that responds to your heartbeat.',
        image:
          'https://images.unsplash.com/photo-1520637836862-4d197d17c55a?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Study the journal for clues',
            next: 5,
            image:
              'https://source.unsplash.com/featured/600x400?journal,ancient',
          },
          {
            text: 'Use the crystal to guide you onward',
            next: 'end',
            image:
              'https://source.unsplash.com/featured/600x400?crystal,glow',
          },
          {
            text: 'Search for hidden compartments',
            next: 6,
            image:
              'https://source.unsplash.com/featured/600x400?secret,door',
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
            image:
              'https://source.unsplash.com/featured/600x400?ruby,gems',
          },
          {
            text: 'Touch the sapphire (wisdom)',
            next: 'end',
            image:
              'https://source.unsplash.com/featured/600x400?sapphire,gem',
          },
          {
            text: 'Touch the emerald (heart)',
            next: 'end',
            image:
              'https://source.unsplash.com/featured/600x400?emerald,gem',
          },
        ],
      },
      {
        text:
          'The runes rearrange into words: ‘Aethros Valdium Nethys’. Magic gathers like dawn breaking.',
        image:
          'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Speak the ancient words',
            next: 'end',
            image:
              'https://source.unsplash.com/featured/600x400?spell,incantation',
          },
          {
            text: 'Press your palm to the runes',
            next: 'end',
            image:
              'https://source.unsplash.com/featured/600x400?hand,magic',
          },
          {
            text: 'Step back and observe',
            next: 2,
            image:
              'https://source.unsplash.com/featured/600x400?observer,watch',
          },
        ],
      },
      {
        text:
          'Congratulations, brave adventurer! You reach the heart of the lost kingdom. The guardian dragon greets you as a friend. The treasures were the choices you made—and the wisdom earned.',
        image:
          'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Start a new adventure',
            next: 'restart',
            image:
              'https://source.unsplash.com/featured/600x400?adventure,start',
          },
        ],
      },
    ],
  },
  Horror: {
    title: 'The Haunted Manor',
    steps: [
      {
        text:
          'Blackwood Manor looms in moonlight. The main door hangs ajar. A side path slips toward the servants’ entrance. The garden creaks with dead vines.',
        image:
          'https://images.unsplash.com/photo-1520637736862-4d197d17c55a?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Enter through the main door',
            next: 1,
            image:
              'https://source.unsplash.com/featured/600x400?mansion,door',
          },
          {
            text: "Try the servants' entrance",
            next: 2,
            image:
              'https://source.unsplash.com/featured/600x400?servants,entrance',
          },
          {
            text: 'Investigate the garden',
            next: 3,
            image:
              'https://source.unsplash.com/featured/600x400?overgrown,garden',
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
            image:
              'https://source.unsplash.com/featured/600x400?staircase,old',
          },
          {
            text: 'Examine the portrait',
            next: 2,
            image:
              'https://source.unsplash.com/featured/600x400?portrait,old',
          },
          {
            text: 'Search the ground floor',
            next: 'end',
            image:
              'https://source.unsplash.com/featured/600x400?hall,abandoned',
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
            image:
              'https://source.unsplash.com/featured/600x400?corridor,dark',
          },
          {
            text: 'Enter a hidden passage behind a portrait',
            next: 3,
            image:
              'https://source.unsplash.com/featured/600x400?hidden,passage',
          },
          {
            text: 'Find the main hall',
            next: 1,
            image:
              'https://source.unsplash.com/featured/600x400?hallway,old',
          },
        ],
      },
      {
        text:
          'An overgrown garden and a family mausoleum bear your name. A cellar door is scratched from inside.',
        image:
          'https://images.unsplash.com/photo-1573108037329-37aa135a142e?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Open the mausoleum',
            next: 'end',
            image:
              'https://source.unsplash.com/featured/600x400?mausoleum,grave',
          },
          {
            text: 'Descend into the cellar',
            next: 'end',
            image:
              'https://source.unsplash.com/featured/600x400?cellar,stairs',
          },
          {
            text: 'Return to the front',
            next: 1,
            image:
              'https://source.unsplash.com/featured/600x400?mansion,front',
          },
        ],
      },
      {
        text:
          'You survive Blackwood Manor and bring peace to its restless spirits. The house collapses with the dawn, and you step free—changed, and unafraid.',
        image:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Begin a new terrifying tale',
            next: 'restart',
            image:
              'https://source.unsplash.com/featured/600x400?ghost,night',
          },
        ],
      },
    ],
  },
  'Sci-Fi': {
    title: 'The Quantum Expedition',
    steps: [
      {
        text:
          'Year 2387. Aboard the Nexus Explorer, ARIA detects three anomalies: a pulsing blue signature, a geometric red construct, and a swirling purple vortex.',
        image:
          'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Investigate the blue signature',
            next: 1,
            image:
              'https://source.unsplash.com/featured/600x400?nebula,blue',
          },
          {
            text: 'Approach the red dodecahedron',
            next: 2,
            image:
              'https://source.unsplash.com/featured/600x400?geometry,red',
          },
          {
            text: 'Study the purple vortex',
            next: 3,
            image:
              'https://source.unsplash.com/featured/600x400?vortex,purple',
          },
        ],
      },
      {
        text:
          'A derelict alien ship. Crystalline beings stir in hibernation. Their leader reaches out with a thought: share knowledge, or pass in peace.',
        image:
          'https://images.unsplash.com/photo-1548375321-6ba84b6aa5c2?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Accept their knowledge',
            next: 'end',
            image:
              'https://source.unsplash.com/featured/600x400?crystal,alien',
          },
          {
            text: 'Help repair their ship',
            next: 'end',
            image:
              'https://source.unsplash.com/featured/600x400?spaceship,repair',
          },
          {
            text: 'Invite them to join you',
            next: 'end',
            image:
              'https://source.unsplash.com/featured/600x400?alliance,space',
          },
        ],
      },
      {
        text:
          'The red structure hums with math. A transmission encodes the rules of reality itself—promise and peril intertwined.',
        image:
          'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Decode and share widely',
            next: 'end',
            image:
              'https://source.unsplash.com/featured/600x400?code,mathematics',
          },
          {
            text: 'Protect and guard the knowledge',
            next: 'end',
            image:
              'https://source.unsplash.com/featured/600x400?lock,knowledge',
          },
          {
            text: 'Observe from a distance',
            next: 3,
            image:
              'https://source.unsplash.com/featured/600x400?observation,space',
          },
        ],
      },
      {
        text:
          'The purple vortex is a portal. Probes return vistas of a parallel universe where thought is energy.',
        image:
          'https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Send a crew through',
            next: 'end',
            image:
              'https://source.unsplash.com/featured/600x400?astronaut,portal',
          },
          {
            text: 'Establish cautious contact',
            next: 'end',
            image:
              'https://source.unsplash.com/featured/600x400?signal,contact',
          },
          {
            text: 'Retreat and log observations',
            next: 'end',
            image:
              'https://source.unsplash.com/featured/600x400?log,telemetry',
          },
        ],
      },
      {
        text:
          "Congratulations, Quantum Explorer! You've opened new frontiers and forged paths between worlds. The multiverse awaits your next decision.",
        image:
          'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&auto=format&fit=crop&q=60',
        choices: [
          {
            text: 'Begin a new space odyssey',
            next: 'restart',
            image:
              'https://source.unsplash.com/featured/600x400?spaceship,stars',
          },
        ],
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

// Voice UI (if present in index.html)
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

// Helpers: images
function fallbackFor(genre, type) {
  return (genreFallbacks[genre] && genreFallbacks[genre][type]) || genreFallbacks.default[type];
}
function safeSetImage(imgEl, url, fallbackUrl) {
  if (!imgEl) return;
  imgEl.referrerPolicy = 'no-referrer';
  imgEl.onerror = () => {
    if (imgEl.dataset.fallbackApplied === '1') return;
    imgEl.dataset.fallbackApplied = '1';
    imgEl.src = fallbackUrl;
  };
  imgEl.src = url || fallbackUrl;
}

// Attach listeners
genreButtons.forEach((button) => {
  button.addEventListener('click', () => selectGenre(button.dataset.genre, button));
});

startButton.addEventListener('click', () => {
  lastUserActionTS = Date.now();
  unlockSpeech(); // ensure speech allowed after user gesture
  startGame();
});
restartButton.addEventListener('click', () => {
  lastUserActionTS = Date.now();
  cancelSpeak();
  restartGame();
});

// Voice listeners (optional UI)
if (voiceToggle) {
  voiceToggle.addEventListener('change', () => {
    voiceEnabled = voiceToggle.checked && !!synth;
    if (!synth) {
      alert('Voice synthesis is not supported on this browser.');
      voiceToggle.checked = false;
      voiceEnabled = false;
      return;
    }
    lastUserActionTS = Date.now();
    unlockSpeech();
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
if (playVoiceBtn) playVoiceBtn.addEventListener('click', () => { lastUserActionTS = Date.now(); unlockSpeech(); speakCurrentStep(); });
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

  // Update image with fallback
  safeSetImage(storyImage, step.image, fallbackFor(currentGenre, 'story'));
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
        img.className = 'choice-thumb';
        safeSetImage(img, choice.image, fallbackFor(currentGenre, 'choice'));
        img.alt = choice.text;
        choiceButton.appendChild(img);
      } else {
        const img = document.createElement('img');
        img.className = 'choice-thumb';
        safeSetImage(img, null, fallbackFor(currentGenre, 'choice'));
        img.alt = choice.text;
        choiceButton.appendChild(img);
      }

      const label = document.createElement('span');
      label.className = 'choice-label';
      label.textContent = choice.text;
      choiceButton.appendChild(label);

      choiceButton.addEventListener('click', () => {
        lastUserActionTS = Date.now();
        makeChoice(choice.next);
      });
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

  // Voice-over for the step (only if recently interacted to satisfy gesture policies)
  if (voiceEnabled && Date.now() - lastUserActionTS < 30000) {
    speakCurrentStep(step);
  }
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
  storyImage.removeAttribute('data-fallback-applied');
  choicesContainer.innerHTML = '';

  // Switch back
  gameScreen.classList.remove('active');
  introScreen.classList.add('active');

  // Stop voice
  cancelSpeak();
}

/* Voice helpers */
function unlockSpeech() {
  if (!synth) return;
  try {
    // Nudge Chrome/iOS to allow speech after gesture
    const u = new SpeechSynthesisUtterance('');
    synth.speak(u);
    synth.cancel();
    synth.resume();
  } catch {}
}

function speak(text) {
  if (!voiceEnabled || !synth || !text) return;
  try {
    synth.cancel(); // stop any previous utterance
    const utter = new SpeechSynthesisUtterance(text);
    if (selectedVoice) utter.voice = selectedVoice;
    utter.rate = voiceRate;
    utter.pitch = voicePitch;
    synth.speak(utter);
    // Resume workaround (some browsers auto-pause)
    if (synth.paused) synth.resume();
  } catch {}
}

function cancelSpeak() {
  try {
    if (synth) synth.cancel();
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
function populateVoices() {
  if (!synth || !voiceSelect) return;
  const all = synth.getVoices();
  if (!all || all.length === 0) return; // wait for onvoiceschanged
  voiceSelect.innerHTML = '';
  const sorted = [...all].sort((a, b) => a.lang.localeCompare(b.lang) || a.name.localeCompare(b.name));
  sorted.forEach((v) => {
    const opt = document.createElement('option');
    opt.value = v.name;
    opt.textContent = `${v.name} (${v.lang})`;
    voiceSelect.appendChild(opt);
  });
  // Prefer English voice if available
  const preferred = sorted.find((v) => v.lang.toLowerCase().startsWith('en')) || sorted[0];
  if (preferred) {
    selectedVoice = preferred;
    voiceSelect.value = preferred.name;
  }
}

// Some browsers load voices async
if (synth) {
  populateVoices();
  if (typeof synth.onvoiceschanged !== 'undefined') {
    synth.onvoiceschanged = () => {
      populateVoices();
    };
  }
}

// Init log
console.log('Mythoria loaded with voice-over and robust image fallbacks');
