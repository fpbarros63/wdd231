import { toggleFavorite, isFavorite } from './storage.mjs';
import './global.js';

const gameDataUrl = 'data/games.json';
let allGames = [];
let genres = [];

async function fetchGames() {
    try {
        const response = await fetch(gameDataUrl);
        if (!response.ok) throw new Error('Failed to fetch games data');
        const data = await response.json();
        allGames = data;
        
        // Extract unique genres for dynamic buttons using Array Map & Set
        genres = ['All', ...new Set(allGames.map(g => g.genre))];
        
        displayGames(allGames);
        setupFilters();
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('catalog-container').innerHTML = `<p>Error loading games. Please try again later.</p>`;
    }
}

function displayGames(games) {
    const container = document.getElementById('catalog-container');
    container.innerHTML = '';
    
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        
        const img = document.createElement('img');
        img.src = game.image;
        img.alt = game.title;
        img.loading = 'lazy';
        
        const title = document.createElement('h3');
        title.textContent = game.title;
        
        const info = document.createElement('p');
        info.className = 'card-info';
        info.innerHTML = `<strong>Platform:</strong> ${game.platform}<br><strong>Genre:</strong> ${game.genre}`;
        
        const actions = document.createElement('div');
        actions.className = 'actions';

        const favBtn = document.createElement('button');
        favBtn.className = isFavorite(game.id) ? 'fav-btn remove-fav' : 'fav-btn';
        favBtn.textContent = isFavorite(game.id) ? 'Remove Favorite' : 'Add to Favorites';
        favBtn.addEventListener('click', () => {
            toggleFavorite(game.id);
            favBtn.className = isFavorite(game.id) ? 'fav-btn remove-fav' : 'fav-btn';
            favBtn.textContent = isFavorite(game.id) ? 'Remove Favorite' : 'Add to Favorites';
        });

        const detailsBtn = document.createElement('button');
        detailsBtn.className = 'details-btn';
        detailsBtn.textContent = 'View Details';
        detailsBtn.addEventListener('click', () => openModal(game));

        actions.appendChild(detailsBtn);
        actions.appendChild(favBtn);
        
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(info);
        card.appendChild(actions);
        
        container.appendChild(card);
    });
}

function setupFilters() {
    const filterContainer = document.getElementById('filter-buttons');
    filterContainer.innerHTML = '';
    
    genres.forEach(genre => {
        const btn = document.createElement('button');
        btn.textContent = genre;
        if (genre === 'All') btn.classList.add('active');
        
        btn.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('#filter-buttons button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Core requirement: filter built-in array method
            const filtered = genre === 'All' ? allGames : allGames.filter(g => g.genre === genre);
            displayGames(filtered);
        });
        
        filterContainer.appendChild(btn);
    });
}

function openModal(game) {
    const modal = document.getElementById('game-modal');
    if(!modal) return;
    
    document.getElementById('modal-title').textContent = game.title;
    document.getElementById('modal-platform').textContent = game.platform;
    document.getElementById('modal-year').textContent = game.year;
    document.getElementById('modal-genre').textContent = game.genre;
    document.getElementById('modal-description').textContent = game.description;
    
    modal.showModal();
}

// Kick it off
fetchGames();
