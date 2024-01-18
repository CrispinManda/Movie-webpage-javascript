// Inside script.js

document.addEventListener("DOMContentLoaded", function () {
  const movieList = document.getElementById("movie-list");
  const addMovieForm = document.getElementById("add-movie");

  addMovieForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    const movieInput = addMovieForm.querySelector("input[type=text]");
    const movieTitle = movieInput.value.trim();
    const currentDate = new Date().toLocaleDateString();

    if (movieTitle !== "") {
      // Create movie object
      const movie = { title: movieTitle, date: currentDate };

      // Get movies from local storage or initialize an empty array
      const movies = JSON.parse(localStorage.getItem("movies")) || [];

      // Add the new movie to the array
      movies.push(movie);

      // Save the updated array back to local storage
      localStorage.setItem("movies", JSON.stringify(movies));

      // Clear the input field
      movieInput.value = "";

      // Refresh the movie list
      displayMovies();
    }
  });

  movieList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete")) {
      // Find the index of the movie to delete
      const movieIndex = Array.from(
        event.target.parentElement.parentElement.children
      ).indexOf(event.target.parentElement);

      // Get movies from local storage
      const movies = JSON.parse(localStorage.getItem("movies")) || [];

      // Remove the movie from the array
      movies.splice(movieIndex, 1);

      // Save the updated array back to local storage
      localStorage.setItem("movies", JSON.stringify(movies));

      // Refresh the movie list
      displayMovies();
    }
  });

  function displayMovies() {
    // Get movies from local storage
    const movies = JSON.parse(localStorage.getItem("movies")) || [];

    // Render the movies in the UI
    const movieListItems = movies
      .map(
        (movie) =>
          `<li>
                        <span class="name">${movie.title}</span>
                        <span class="date">Added on: ${movie.date}</span>
                        <span class="delete">delete</span>
                    </li>`
      )
      .join("");

    movieList.innerHTML = `<h2 class="title">Movies to Watch</h2><ul>${movieListItems}</ul>`;
  }

  // Initial display of movies when the page loads
  displayMovies();
});
