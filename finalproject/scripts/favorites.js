import { getFavorites, toggleFavorite } from './storage.mjs';
import './global.js';

const gameDataUrl = 'data/games.json';

async function loadFavorites() {
    try {
        const response = await fetch(gameDataUrl);
        if (!response.ok) throw new Error('Failed to fetch games data');
        const allGames = await response.json();
        
        const favIds = getFavorites();
        
        // Filter out only the favorite games
        const favGames = allGames.filter(game => favIds.includes(game.id));
        
        displayFavorites(favGames);
    } catch (error) {
        console.error('Error loading favorites:', error);
    }
}

function displayFavorites(games) {
    const container = document.getElementById('favorites-container');
    const noFavMsg = document.getElementById('no-favorites-msg');
    
    container.innerHTML = '';
    
    if (games.length === 0) {
        noFavMsg.style.display = 'block';
        return;
    }
    
    noFavMsg.style.display = 'none';
    
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        
        card.innerHTML = `
            <img src="${game.image}" alt="${game.title}" loading="lazy">
            <h3>${game.title}</h3>
            <p class="card-info"><strong>Platform:</strong> ${game.platform}<br><strong>Year:</strong> ${game.year}</p>
        `;
        
        const actions = document.createElement('div');
        actions.className = 'actions';
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'fav-btn remove-fav';
        removeBtn.textContent = 'Remove from Favorites';
        
        removeBtn.addEventListener('click', () => {
            toggleFavorite(game.id);
            // Re-render by removing the node
            card.remove();
            
            // Check if empty
            if(getFavorites().length === 0) {
                noFavMsg.style.display = 'block';
            }
        });
        
        actions.appendChild(removeBtn);
        card.appendChild(actions);
        container.appendChild(card);
    });
}

// kick it off
loadFavorites();
