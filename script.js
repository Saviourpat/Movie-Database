const apiKey = '4587b4c832eebc56bccee3a6f2b873f2'; // Replace with your TMDb API key
const movieContainer = document.getElementById('movieContainer');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('search');

async function fetchMovies(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
        movieContainer.innerHTML = 'Error fetching data.';
    }
}

function displayMovies(movies) {
    movieContainer.innerHTML = ''; // Clear previous results
    if (movies.length === 0) {
        movieContainer.innerHTML = 'No movies found.';
        return;
    }
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.innerHTML = `
            <h3>${movie.title}</h3>
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <p>${movie.overview}</p>
        `;
        movieContainer.appendChild(movieDiv);
    });
}

// Event listener for search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        fetchMovies(query);
    }
});

// Optional: Allow searching by pressing Enter key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});
