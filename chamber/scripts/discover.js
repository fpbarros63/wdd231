import { places } from '../data/discover.mjs';

document.addEventListener('DOMContentLoaded', () => {
    // Current year and last modified
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    
    const lastModifiedP = document.getElementById('lastModified');
    if (lastModifiedP) lastModifiedP.textContent = `Last Modification: ${document.lastModified}`;

    // Mobile Menu
    const menuBtn = document.getElementById('menuButton');
    const navMenu = document.getElementById('navMenu');
    
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            menuBtn.classList.toggle('open');
        });
    }

    // Setup local storage visit tracking
    const visitMessage = document.getElementById('visit-message');
    if (visitMessage) {
        const lastVisit = localStorage.getItem('lastVisit');
        const now = Date.now();
        
        if (!lastVisit) {
            visitMessage.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const timeDiff = now - parseInt(lastVisit);
            const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            
            if (daysDiff < 1) {
                visitMessage.textContent = "Back so soon! Awesome!";
            } else {
                visitMessage.textContent = `You last visited ${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago.`;
            }
        }
        
        localStorage.setItem('lastVisit', now);
    }

    // Generate Cards
    const discoverGrid = document.querySelector('.discover-grid');

    if (discoverGrid) {
        places.forEach(place => {
            const card = document.createElement('section');
            card.className = 'discover-card';
            
            card.innerHTML = `
                <h2>${place.title}</h2>
                <figure>
                    <img src="${place.figure}" alt="${place.title}" loading="lazy" width="300" height="200">
                </figure>
                <address>${place.address}</address>
                <p>${place.description}</p>
                <button class="learn-more">Learn More</button>
            `;
            
            discoverGrid.appendChild(card);
        });
    }
});
