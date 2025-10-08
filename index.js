
// Marvel API configuration
const MARVEL_PUBLIC_KEY = '339e1842b552df3fdfb719066fca8583';
const MARVEL_BASE_URL = 'https://gateway.marvel.com/v1/public';

// Function to fetch Marvel characters
async function fetchMarvelCharacters() {
    try {
        console.log('Fetching Marvel characters...');
        
        // Fetch popular Marvel characters (limit to 20 for now)
        const response = await fetch(`${MARVEL_BASE_URL}/characters?apikey=${MARVEL_PUBLIC_KEY}&limit=20&orderBy=name`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Marvel API Response:', data);
        
        displayCharacters(data.data.results);
        
    } catch (error) {
        console.error('Error fetching Marvel data:', error);
        displayError('Unable to load Marvel characters. Please get your API key from developer.marvel.com');
    }
}

// Function to display characters on the page
function displayCharacters(characters) {
    const contentSection = document.getElementById('content');
    const dataDisplay = document.getElementById('data-display');
    
    // Update the heading
    contentSection.querySelector('h2').textContent = 'Marvel Characters';
    
    // Clear loading message
    dataDisplay.innerHTML = '';
    
    // Create character cards
    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.className = 'character-card';
        
        // Get character image (use standard_medium size)
        const imageUrl = `${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`;
        
        // Create character description (limit length)
        const description = character.description || 'No description available.';
        const shortDescription = description.length > 150 
            ? description.substring(0, 150) + '...' 
            : description;
        
        characterCard.innerHTML = `
            <img src="${imageUrl}" alt="${character.name}" class="character-image">
            <div class="character-info">
                <h3>${character.name}</h3>
                <p>${shortDescription}</p>
                <div class="character-stats">
                    <span>Comics: ${character.comics.available}</span>
                    <span>Series: ${character.series.available}</span>
                </div>
            </div>
        `;
        
        dataDisplay.appendChild(characterCard);
    });
}

// Function to display error message
function displayError(message) {
    const contentSection = document.getElementById('content');
    const dataDisplay = document.getElementById('data-display');
    
    contentSection.querySelector('h2').textContent = 'Error';
    dataDisplay.innerHTML = `<p class="error-message">${message}</p>`;
}

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Marvel API project loaded!');
    fetchMarvelCharacters();
});