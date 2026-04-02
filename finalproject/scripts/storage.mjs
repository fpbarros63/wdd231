export function getFavorites() {
    const favs = localStorage.getItem('retroGamesFavs');
    return favs ? JSON.parse(favs) : [];
}

export function saveFavorites(favs) {
    localStorage.setItem('retroGamesFavs', JSON.stringify(favs));
}

export function toggleFavorite(gameId) {
    let favs = getFavorites();
    if (favs.includes(gameId)) {
        favs = favs.filter(id => id !== gameId); // Removes item
    } else {
        favs.push(gameId); // Adds item
    }
    saveFavorites(favs);
}

export function isFavorite(gameId) {
    const favs = getFavorites();
    return favs.includes(gameId);
}
