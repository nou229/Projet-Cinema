const titre = document.getElementById("movie-title");
const poster = document.getElementById("movie-poster");
const resume = document.getElementById("movie-plot");
const genre = document.getElementById("movie-genre");
const acteurs = document.getElementById("movie-actors");
const notes = document.getElementById("movie-ratings");
const dvd = document.getElementById("movie-dvd");
const message = document.getElementById("movie-message");

const url = new URLSearchParams(window.location.search);
const nomFilm = url.get("title");
async function afficherFilm() {
    if (nomFilm === null) {
        message.textContent = "Aucun film sélectionné.";
        return; }
    try {
        message.textContent = "Chargement du film...";
        const reponse = await fetch( `https://www.omdbapi.com/?apikey=43d7f800&t=${encodeURIComponent(nomFilm)}&plot=full` );
        const film = await reponse.json();
        if (film.Response === "True") {
            titre.textContent = film.Title;
            poster.src = film.Poster;
            poster.alt = film.Title;
            resume.textContent = film.Plot;
            genre.textContent = film.Genre;
            acteurs.textContent = film.Actors;
            if (film.Ratings.length > 0) {
                notes.textContent = film.Ratings[0].Value; }
                 else {notes.textContent = "Aucune note disponible.";}
                 
            if (film.DVD && film.DVD !== "N/A") {
                const date = new Date(film.DVD);
                dvd.textContent = date.toLocaleDateString("fr-FR");
            } else {
                dvd.textContent = "Date DVD non disponible.";
            }
            message.textContent = "";}
            else {
            message.textContent = "Film introuvable.";}}
            catch (erreur)
             {message.textContent = "Erreur lors du chargement du film.";
        console.log(erreur);}
}
afficherFilm();
