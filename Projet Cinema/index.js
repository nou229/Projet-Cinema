// récupérer les éléments HTML 
const moviescontainer = document.getElementById("movies-container");
const loadMoreButton = document.getElementById("load-more");
const message = document.getElementById("message");
const filmsChoisis = [
    "Dune: Part Two",
    "The Rip",
    "Deadpool & Wolverine"];
let page = 1;
// récupérer les informations détaillées d'un film 
async function getMovie(titre) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=43d7f800&t=${encodeURIComponent(titre)}&plot=short` );
    return await response.json();
}
function afficherFilm(film) {
    const carte = document.createElement("article");
    carte.classList.add("movie-card");
//créer l'affiche du film
    const poster = document.createElement("img");
// Vérifier si l'affiche existe
    if (film.Poster && film.Poster !== "N/A") {
        poster.src = film.Poster;}
        else {
        poster.alt = "Affiche non disponible";}
    poster.alt = `Affiche de ${film.Title}`;
    const titre = document.createElement("h3");//créer element pour afficher le titre
    titre.textContent = film.Title;
    const resume = document.createElement("p");//créer élément pour afficher le résumé
    resume.textContent = film.Plot;
    const lien = document.createElement("a");//créer le lien vers la page de détails
    lien.href = `movie.html?title=${encodeURIComponent(film.Title)}`;
    lien.textContent = "En savoir plus";
//ajouter les éléments à la carte
    carte.appendChild(poster);
    carte.appendChild(titre);
    carte.appendChild(resume);
    carte.appendChild(lien);
    moviescontainer.appendChild(carte);
}
//afficher les trois films choisis
async function loadImages() {
    try { message.textContent = "Chargement des films...";
        for (const titre of filmsChoisis) {
            const film = await getMovie(titre);
            if (film.Response === "True") {
                afficherFilm(film);}
        }
        message.textContent = "";
    } catch (error) {
        message.textContent = "Erreur lors du chargement des films.";
        console.error(error);
    }
}
/// Film 2024
async function chargerFilms2024() {
    try { loadMoreButton.disabled = true;
        message.textContent = "Chargement des films de 2024";
        const response = await fetch( `https://www.omdbapi.com/?apikey=43d7f800&s=2024&type=movie&y=2024&page=${page}`);
        const data = await response.json();
        if (data.Response === "True"&& data.Search) {
            for (const film of data.Search) {
                const details = await getMovie(film.Title);
                if (details.Response === "True"&& details.Year === "2024") {
                    afficherFilm(details);}
            }
            page++;
            message.textContent = "Films chargés !";
        } else {
            message.textContent = "Aucun autre film trouvé.";
        }
    } catch (error) {
        message.textContent = "Erreur lors du chargement.";
        console.error(error);
    } finally {
        loadMoreButton.disabled = false;
    }
}
loadMoreButton.addEventListener("click", chargerFilms2024);
loadImages();
