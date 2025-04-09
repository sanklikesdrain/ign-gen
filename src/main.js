import './styles.css';

// Letter patterns and combinations
const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'y', 'z'];
const vowels = ['a', 'e', 'i', 'o', 'u'];
const easyEndings = ['n', 'm', 'r', 'l', 's', 't'];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

// DOM elements
const nameDisplay = document.getElementById('nameDisplay');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const placeholder = document.querySelector('.placeholder');

// Generate a random number between min and max (inclusive)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate a random letter from a given set
const randomLetter = (letters) => letters[randomInt(0, letters.length - 1)];

// Generate a syllable
const generateSyllable = () => {
    const pattern = Math.random();
    if (pattern < 0.4) {
        // CV pattern (consonant + vowel) - easiest to pronounce
        return randomLetter(consonants) + randomLetter(vowels);
    } else if (pattern < 0.7) {
        // CVC pattern with easy ending (consonant + vowel + consonant)
        return randomLetter(consonants) + randomLetter(vowels) + randomLetter(easyEndings);
    } else {
        // VC pattern (vowel + consonant)
        return randomLetter(vowels) + randomLetter(easyEndings);
    }
};

// Generate a random name
const generateName = () => {
    let name = '';
    const length = randomInt(2, 3); // Generate 2-3 syllables
    
    // Generate syllables
    for (let i = 0; i < length; i++) {
        name += generateSyllable();
    }
    
    // 10% chance to add a number at the end
    if (Math.random() > 0.9) {
        name += randomLetter(numbers);
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