const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchmessage = document.getElementById("search-message");
const moviescontainer = document.getElementById("movies-container");
let page = 1;
let totalResults = 0;
async function getMovie(titre) {
    const response = await fetch(
        `https://www.omdbapi.com/?apikey=43d7f800&t=${encodeURIComponent(titre)}&plot=short`);
    return await response.json();}
function afficherFilm(film) {
    const card = document.createElement("article");
    card.classList.add("movie-card");
    card.style.cursor = "pointer";
    const poster = document.createElement("img");
    poster.src = film.Poster;
    poster.alt = "Affiche de " + film.Title;
    const title = document.createElement("h3");
    title.textContent = film.Title;
      const year = document.createElement("p");
    year.textContent = "Année : " + film.Year;
    const resume = document.createElement("p");
    resume.textContent = film.Plot;
    card.appendChild(poster);
    card.appendChild(title);
    card.appendChild(year);
    card.appendChild(resume);
    card.addEventListener("click", function() {
        window.location.href =
            "movie.html?title=" + encodeURIComponent(film.Title); });
    moviescontainer.appendChild(card);}
async function chargerFilms() {
    const search = searchInput.value.trim();
    Button.disabled = true;
    searchmessage.textContent = "Chargement des films...";
    try {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=43d7f800&s=${encodeURIComponent(search)}&type=movie&page=${page}`);
        const data = await response.json();
        if (data.Response === "False") {
            if (page === 1) {
                searchmessage.textContent = "Aucun film trouvé.";
            } else {
                searchmessage.textContent = "Aucun autre film trouvé.";
                page--; }
            Button.hidden = true;
            return;}
        totalResults = Number(data.totalResults);
        for (const film of data.Search) {
            const details = await getMovie(film.Title);
            if (details.Response === "True") {
                afficherFilm(details);} }
        searchmessage.textContent =
            "Films affichés : " + moviescontainer.children.length;
        if (moviescontainer.children.length >= totalResults) {
            Button.hidden = true;
        } else {
            Button.hidden = false; }} 
            catch (error) {
        searchmessage.textContent = "Erreur lors du chargement des films.";
        console.error(error);
        if (page > 1) {
            page--;} }
             finally {Button.disabled = false;}
}
async function showmovies() {
    const search = searchInput.value.trim();
    moviescontainer.innerHTML = "";
    page = 1;
    totalResults = 0;
    Button.hidden = true;
    if (search === "") {
        searchmessage.textContent = "Saisissez le titre d'un film.";
        return;
    }
    await chargerFilms();
}
async function chargerplus() {
    page++;
    await chargerFilms();
}
const Button = document.createElement("button");
Button.textContent = "Afficher plus";
Button.hidden = true;
moviescontainer.parentElement.appendChild(Button);
Button.addEventListener("click", chargerplus);
searchButton.addEventListener("click", showmovies);
searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        showmovies();
    }
});
