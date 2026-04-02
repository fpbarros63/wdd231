document.addEventListener('DOMContentLoaded', () => {
    // Current Year Update
    const yearSpan = document.getElementById('current-year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Hamburger Menu
    const menuBtn = document.getElementById('menu-button');
    const primaryNav = document.querySelector('#primary-nav ul');

    if(menuBtn && primaryNav) {
        menuBtn.addEventListener('click', () => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', !isExpanded);
            primaryNav.classList.toggle('open');
            menuBtn.innerHTML = isExpanded ? '&#10005;' : '&#9776;';
        });
    }

    // Close Modal Logic (Shared)
    const modal = document.getElementById('game-modal');
    const closeBtn = document.getElementById('close-modal');
    
    if(modal && closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.close();
        });
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            const dialogDimensions = modal.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                modal.close();
            }
        });
    }
});
