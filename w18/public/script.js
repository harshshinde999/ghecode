// DOM Elements
const addSongForm = document.getElementById('addSongForm');
const songsList = document.getElementById('songsList');

// Add new song
addSongForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const songData = {
        songName: document.getElementById('songName').value,
        film: document.getElementById('film').value,
        musicDirector: document.getElementById('musicDirector').value,
        singer: document.getElementById('singer').value
    };

    try {
        const response = await fetch('/api/songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(songData)
        });

        if (response.ok) {
            addSongForm.reset();
            showAllSongs();
        }
    } catch (error) {
        console.error('Error adding song:', error);
    }
});

// Display songs in table
function displaySongs(songs) {
    songsList.innerHTML = '';
    if (!Array.isArray(songs)) {
        console.error('Expected array of songs but got:', songs);
        return;
    }
    songs.forEach(song => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${song.songName}</td>
            <td>${song.film}</td>
            <td>${song.musicDirector}</td>
            <td>${song.singer}</td>
            <td>${song.actor || '-'}</td>
            <td>${song.actress || '-'}</td>
            <td>
                <button class="action-btn update-btn" onclick="showUpdateForm('${song._id}')">Update Cast</button>
                <button class="action-btn delete-btn" onclick="deleteSong('${song._id}')">Delete</button>
            </td>
        `;
        songsList.appendChild(row);
    });
}

// Show all songs
async function showAllSongs() {
    try {
        const response = await fetch('/api/songs');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const songs = await response.json();
        displaySongs(songs);
    } catch (error) {
        console.error('Error fetching songs:', error);
        songsList.innerHTML = '<tr><td colspan="7" class="error">Error loading songs. Please try again.</td></tr>';
    }
}

// Show total count
async function showTotalCount() {
    try {
        const response = await fetch('/api/songs/count');
        const data = await response.json();
        alert(`Total number of songs: ${data.count}`);
    } catch (error) {
        console.error('Error fetching song count:', error);
    }
}

// Search by music director
async function searchByDirector() {
    const director = document.getElementById('directorSearch').value;
    if (!director) return;

    try {
        const response = await fetch(`/api/songs/director/${encodeURIComponent(director)}`);
        const songs = await response.json();
        displaySongs(songs);
    } catch (error) {
        console.error('Error searching by director:', error);
    }
}

// Search by music director and singer
async function searchByDirectorAndSinger() {
    const director = document.getElementById('directorSingerSearch').value;
    const singer = document.getElementById('singerSearch').value;
    if (!director || !singer) return;

    try {
        const response = await fetch(`/api/songs/director/${encodeURIComponent(director)}/singer/${encodeURIComponent(singer)}`);
        const songs = await response.json();
        displaySongs(songs);
    } catch (error) {
        console.error('Error searching by director and singer:', error);
    }
}

// Search by singer and film
async function searchBySingerAndFilm() {
    const singer = document.getElementById('singerFilmSearch').value;
    const film = document.getElementById('filmSearch').value;
    if (!singer || !film) return;

    try {
        const response = await fetch(`/api/songs/singer/${encodeURIComponent(singer)}/film/${encodeURIComponent(film)}`);
        const songs = await response.json();
        displaySongs(songs);
    } catch (error) {
        console.error('Error searching by singer and film:', error);
    }
}

// Update song with actor and actress
async function showUpdateForm(songId) {
    const actor = prompt('Enter actor name:');
    const actress = prompt('Enter actress name:');
    
    if (actor === null || actress === null) return;

    try {
        const response = await fetch(`/api/songs/${songId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ actor, actress })
        });

        if (response.ok) {
            showAllSongs();
        }
    } catch (error) {
        console.error('Error updating song:', error);
    }
}

// Delete song
async function deleteSong(songId) {
    if (confirm('Are you sure you want to delete this song?')) {
        try {
            const response = await fetch(`/api/songs/${songId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                showAllSongs();
            }
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    }
}

// Initialize with sample songs
async function initializeSongs() {
    try {
        const response = await fetch('/api/songs/init', {
            method: 'POST'
        });

        if (response.ok) {
            showAllSongs();
        }
    } catch (error) {
        console.error('Error initializing songs:', error);
    }
}

// Initial load
showAllSongs(); 