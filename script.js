// Game Data Structure
const gameData = {
    currentGenre: '',
    currentNode: 'start',
    
    // Story nodes with different content based on genre
    storyNodes: {
        start: {
            text: {
                Adventure: "You wake up in a mysterious enchanted forest. Ancient runes glow on nearby trees, and two paths diverge ahead of you.",
                Horror: "You awaken in a fog-shrouded cemetery at midnight. Ghostly whispers echo through the mist as two paths stretch into darkness.",
                'Sci-Fi': "You regain consciousness on an alien planet's surface. Strange crystalline formations pulse with energy, and two corridors lead deeper into the structure."
            },
            image: {
                Adventure: "https://source.unsplash.com/1600x900/?forest,fantasy,path",
                Horror: "https://source.unsplash.com/1600x900/?cemetery,fog,dark",
                'Sci-Fi': "https://source.unsplash.com/1600x900/?alien,planet,crystal"
            },
            choices: [
                { label: "Take the left path", next: "leftPath" },
                { label: "Take the right path", next: "rightPath" }
            ]
        },
        
        leftPath: {
            text: {
                Adventure: "A magnificent castle appears through the trees, its towers reaching toward the clouds. Guards patrol the walls.",
                Horror: "A decrepit mansion looms before you, its windows like hollow eyes. Strange lights flicker within its walls.",
                'Sci-Fi': "You discover a massive space station docking bay. Alien ships of unknown design rest in the metallic chambers."
            },
            image: {
                Adventure: "https://source.unsplash.com/1600x900/?castle,fantasy,medieval",
                Horror: "https://source.unsplash.com/1600x900/?mansion,haunted,gothic",
                'Sci-Fi': "https://source.unsplash.com/1600x900/?space,station,futuristic"
            },
            choices: [
                { label: "Approach boldly", next: "approach" },
                { label: "Sneak around", next: "sneak" }
            ]
        },
        
        rightPath: {
            text: {
                Adventure: "You reach a rushing river with a rickety bridge swaying in the wind. On the far side, you see a glowing treasure.",
                Horror: "A blood-red river blocks your path. The water seems to whisper your name as shadowy figures move beneath the surface.",
                'Sci-Fi': "An energy barrier hums before you, beyond which lies a control room with blinking consoles and holographic displays."
            },
            image: {
                Adventure: "https://source.unsplash.com/1600x900/?bridge,river,treasure",
                Horror: "https://source.unsplash.com/1600x900/?red,water,shadows",
                'Sci-Fi': "https://source.unsplash.com/1600x900/?control,room,hologram"
            },
            choices: [
                { label: "Cross carefully", next: "cross" },
                { label: "Find another way", next: "alternative" }
            ]
        },
        
        approach: {
            text: {
                Adventure: "The guards welcome you as a prophesied hero! They escort you to the throne room where the king awaits with a quest.",
                Horror: "The door creaks open on its own. Inside, portraits watch you with moving eyes as you're drawn deeper into the mansion's heart.",
                'Sci-Fi': "An AI hologram materializes: 'Welcome, traveler. We have been expecting you. The fate of the galaxy hangs in the balance.'"
            },
            image: {
                Adventure: "https://source.unsplash.com/1600x900/?throne,room,king",
                Horror: "https://source.unsplash.com/1600x900/?portrait,eyes,watching",
                'Sci-Fi': "https://source.unsplash.com/1600x900/?ai,hologram,futuristic"
            },
            choices: [
                { label: "Accept the quest/challenge", next: "victory" },
                { label: "Decline politely", next: "gameOver" }
            ]
        },
        
        sneak: {
            text: {
                Adventure: "You discover a secret passage! Inside, you find ancient artifacts and a map to legendary treasure.",
                Horror: "You slip through a broken cellar window into darkness. Something scuttles in the shadows as you hear footsteps above.",
                'Sci-Fi': "You hack into a maintenance shaft and discover classified alien technology that could change everything."
            },
            image: {
                Adventure: "https://source.unsplash.com/1600x900/?secret,passage,treasure",
                Horror: "https://source.unsplash.com/1600x900/?cellar,darkness,scary",
                'Sci-Fi': "https://source.unsplash.com/1600x900/?alien,technology,circuit"
            },
            choices: [
                { label: "Take the treasure/technology", next: "victory" },
                { label: "Leave quietly", next: "gameOver" }
            ]
        },
        
        cross: {
            text: {
                Adventure: "You successfully cross the bridge and claim the magical artifact! Its power courses through you as you become a legendary hero.",
                Horror: "Halfway across, the bridge collapses, but you're saved by mysterious spirits who recognize your brave heart. They grant you peace.",
                'Sci-Fi': "You successfully bypass the energy barrier and activate the ancient alien defense system, saving the galaxy from invasion."
            },
            image: {
                Adventure: "https://source.unsplash.com/1600x900/?artifact,magic,victory",
                Horror: "https://source.unsplash.com/1600x900/?spirits,salvation,light",
                'Sci-Fi': "https://source.unsplash.com/1600x900/?galaxy,defense,victory"
            },
            choices: [
                { label: "Begin a new adventure", next: "start" }
            ]
        },
        
        alternative: {
            text: {
                Adventure: "You find a hidden cave with an ancient wizard who teaches you powerful magic and sends you on an epic quest.",
                Horror: "You discover a forgotten chapel where you find holy relics that protect you from the darkness forever.",
                'Sci-Fi': "You locate an escape pod that takes you to a peaceful planet where you help establish a new colony."
            },
            image: {
                Adventure: "https://source.unsplash.com/1600x900/?wizard,cave,magic",
                Horror: "https://source.unsplash.com/1600x900/?chapel,holy,relics",
                'Sci-Fi': "https://source.unsplash.com/1600x900/?escape,pod,colony"
            },
            choices: [
                { label: "Start another adventure", next: "start" }
            ]
        },
        
        victory: {
            text: {
                Adventure: "Congratulations! You have completed your heroic quest and become a legend that will be remembered for generations!",
                Horror: "Against all odds, you have survived the supernatural horrors and emerged stronger, ready to face any darkness!",
                'Sci-Fi': "Mission accomplished! You've successfully saved the galaxy and unlocked the secrets of advanced alien civilization!"
            },
            image: {
                Adventure: "https://source.unsplash.com/1600x900/?victory,hero,celebration",
                Horror: "https://source.unsplash.com/1600x900/?survivor,dawn,hope",
                'Sci-Fi': "https://source.unsplash.com/1600x900/?space,victory,stars"
            },
            choices: [
                { label: "Play again", next: "start" }
            ]
        },
        
        gameOver: {
            text: {
                Adventure: "Your adventure ends here, but every hero's journey teaches valuable lessons. Thank you for playing!",
                Horror: "The darkness claims another soul... but death is not always the end. Will you dare to try again?",
                'Sci-Fi': "Mission failed, but the universe is vast and full of second chances. Your next adventure awaits!"
            },
            image: {
                Adventure: "https://source.unsplash.com/1600x900/?sunset,journey,end",
                Horror: "https://source.unsplash.com/1600x900/?darkness,death,gothic",
                'Sci-Fi': "https://source.unsplash.com/1600x900/?space,failure,nebula"
            },
            choices: [
                { label: "Try again", next: "start" }
            ]
        }
    }
};

// DOM Elements
const introScreen = document.getElementById('introScreen');
const gameScreen = document.getElementById('gameScreen');
const genreButtons = document.querySelectorAll('.genre-btn');
const startButton = document.getElementById('startButton');
const currentGenreSpan = document.getElementById('currentGenre');
const storyImage = document.getElementById('storyImage');
const storyText = document.getElementById('storyText');
const choicesContainer = document.getElementById('choicesContainer');
const restartButton = document.getElementById('restartButton');

// Event Listeners
genreButtons.forEach(button => {
    button.addEventListener('click', () => selectGenre(button.dataset.genre));
});

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

// Functions
function selectGenre(genre) {
    gameData.currentGenre = genre;
    
    // Update UI
    genreButtons.forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
    
    // Enable start button
    startButton.disabled = false;
}

function startGame() {
    if (!gameData.currentGenre) return;
    
    // Switch to game screen
    introScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    // Set current genre indicator
    currentGenreSpan.textContent = gameData.currentGenre;
    
    // Load the starting story node
    loadStoryNode('start');
}

function loadStoryNode(nodeId) {
    gameData.currentNode = nodeId;
    const node = gameData.storyNodes[nodeId];
    
    if (!node) {
        console.error('Story node not found:', nodeId);
        return;
    }
    
    // Update story content
    const storyContent = node.text[gameData.currentGenre] || node.text.Adventure;
    const imageUrl = node.image[gameData.currentGenre] || node.image.Adventure;
    
    storyText.textContent = storyContent;
    storyImage.src = imageUrl;
    storyImage.alt = `${gameData.currentGenre} scene`;
    
    // Create choice buttons
    choicesContainer.innerHTML = '';
    node.choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice.label;
        button.addEventListener('click', () => loadStoryNode(choice.next));
        choicesContainer.appendChild(button);
    });
    
    // Add scroll to top for better UX
    gameScreen.scrollTo({ top: 0, behavior: 'smooth' });
}

function restartGame() {
    // Reset game state
    gameData.currentGenre = '';
    gameData.currentNode = 'start';
    
    // Reset UI
    genreButtons.forEach(btn => btn.classList.remove('selected'));
    startButton.disabled = true;
    
    // Switch back to intro screen
    gameScreen.classList.remove('active');
    introScreen.classList.add('active');
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    console.log('Mythoria game loaded successfully!');
    console.log('Created by SEKH MD RAKIBUL HOSSEN');
});
