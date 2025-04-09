// Name generation components
const prefixes = ['z', 'x', 'k', 'v', 'm', 'n', 'r', 's', 't', 'w'];
const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
const suffixes = ['x', 'z', 'k', 'r', 'n', 'm', 's', 't'];

// DOM elements
const nameDisplay = document.getElementById('nameDisplay');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const placeholder = document.querySelector('.placeholder');

// Generate a random number between min and max (inclusive)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate a random name
const generateName = () => {
    let name = '';
    
    // 50% chance to start with a prefix
    if (Math.random() > 0.5) {
        name += prefixes[randomInt(0, prefixes.length - 1)];
    }
    
    // Generate 2-4 syllables
    const syllableCount = randomInt(2, 4);
    for (let i = 0; i < syllableCount; i++) {
        // Add consonant
        name += consonants[randomInt(0, consonants.length - 1)];
        // Add vowel
        name += vowels[randomInt(0, vowels.length - 1)];
    }
    
    // 30% chance to add a suffix
    if (Math.random() > 0.7) {
        name += suffixes[randomInt(0, suffixes.length - 1)];
    }
    
    // 20% chance to add a number (1-99)
    if (Math.random() > 0.8) {
        name += randomInt(1, 99);
    }
    
    return name;
};

// Update the display with a new name
const updateDisplay = (name) => {
    nameDisplay.classList.add('fade-out');
    setTimeout(() => {
        placeholder.textContent = name;
        nameDisplay.classList.remove('fade-out');
        copyBtn.disabled = false;
    }, 200);
};

// Copy name to clipboard
const copyToClipboard = async () => {
    const name = placeholder.textContent;
    try {
        await navigator.clipboard.writeText(name);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
    }
};

// Event listeners
generateBtn.addEventListener('click', () => {
    const newName = generateName();
    updateDisplay(newName);
});

copyBtn.addEventListener('click', copyToClipboard); 