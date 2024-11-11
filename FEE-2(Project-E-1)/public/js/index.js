const city = document.getElementById('city');
const crossBtn = document.getElementById('cross');
const cityPage = document.getElementById('cityPage');
const cityAbout =  document.querySelectorAll(".cityAbout"); 
const citySearchBox = document.getElementById('citySearch');
const nextBtn = document.getElementById('nextBtn');
const video = document.getElementById('video');
const movieName = document.getElementById('movie-name');
const movieDesc = document.getElementById('movie-desc');
const container = document.getElementById('container');
const theaterInfo = document.querySelectorAll(".theater-info");
const th = document.getElementById('th');
const trendingSection = document.querySelector("#trending");
const newReleaseSection = document.getElementById('newRelease');
const upCommingSection = document.getElementById('upComing');
const otherSection = document.getElementById("other");

const movies = [
    { index: 1, summary: `Deadpool is offered a place in the Marvel Cinematic Universe by the Time Variance Authority, but instead recruits a variant of Wolverine to save his universe from extinction.`, title:"Deadpool And Wolverine" },
    { index: 2, summary: "A soldier returns home from war to find his girlfriend missing, family broken, and neighborhood overrun by crime. Though reluctant, he becomes a hitman to protect loved ones.", title:"Gadar2" },
    { index: 3,  summary:"A prison warden recruits inmates to commit outrageous crimes that shed light on corruption and injustice - and that lead him to an unexpected reunion.", title:"Jawan"},
    { index: 4, title: "Avatar The way of water", summary: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home."},
    { index: 5, title:"Stree2", summary: "After the events of Stree, the town of Chanderi is being haunted again. This time, women are mysteriously abducted by a terrifying headless entity. Once again, it's up to Vicky and his friends to save their town and loved ones."}
];

let index = 1;

crossBtn.addEventListener("click", () => {
    city.style.display = "none";
});

cityPage.addEventListener("click", () => {
    city.style.display = "block";
});

cityAbout.forEach(about => {
    about.addEventListener("click", () => {
        cityPage.innerHTML = about.children[1].innerHTML;
        // city.style.display = "none";
    });
});


citySearchBox.addEventListener("input", () => {
    const searchVal = citySearchBox.value.toLowerCase();
    cityAbout.forEach(about => {
        cityVal = about.children[1].innerHTML.toLowerCase();
        if (cityVal.includes(searchVal)) {
            about.style.display = "block";
        } else {
            about.style.display = "none";
        }
});
});

nextBtn.addEventListener("click", () => {
    const movieAbout = document.getElementById("movie-about");
    
    video.classList.add("slide-out");
    movieAbout.classList.add("slide-out");
    container.classList.add("slide-out");

    setTimeout(() => {
        if (index == 4) {
            index = 0;
        } else {
            index++;
        }
        
        video.src = `/vedio/${movies[index].index}.mp4`;
        movieName.innerHTML = movies[index].title;
        movieDesc.innerHTML = movies[index].summary;

        console.log(`/vedio/${movies[index].index}.mp4`);

        video.classList.remove("slide-out");
        movieAbout.classList.remove("slide-out");
        container.classList.remove("slide-out");

        video.classList.add("slide-in");
        movieAbout.classList.add("slide-in");
        container.classList.add("slide-in");
        setTimeout(() => {
            video.classList.remove("slide-in");
            movieAbout.classList.remove("slide-in");
            container.classList.remove("slide-in");
        }, 200);
    }, 200);
});

container.addEventListener("mouseover", () => {
    nextBtn.style.display = "block";
});

container.addEventListener("mouseout", () => {
    nextBtn.style.display = "none";
    console.log("hello");

});

video.addEventListener("timeupdate", () => {
    if (video.currentTime == video.duration) {
        video.play();
    }
});

const cityAboutElements = document.querySelectorAll('.cityAbout');


cityAboutElements.forEach(city => {
    city.addEventListener('click', () => {
        const theaterInfo = city.querySelector('.theater-info');
        theaterInfo.style.display = theaterInfo.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (event) => {
        if (!city.contains(event.target)) {
            const theaterInfo = city.querySelector('.theater-info');
            theaterInfo.style.display = 'none';
        }
    });
});

theaterInfo.forEach(theater => { 
        Array.from(theater.getElementsByTagName('p')).forEach(p => {
            p.addEventListener('click', (e) => {
                // console.log(e.target.innerHTML);
                // theater.innerHTML = e.target.innerHTML;
                let val = e.target.innerHTML;
                // console.log(val);
                th.innerHTML = val;
        });
    });
});

async function fetchTop10TrendingMovies() {
    trendingSection.innerHTML = ``;
    const apiKey = '93d9faba58ff3f0ffe282ee139ad67c1';
    const baseUrl = 'https://api.themoviedb.org/3/trending/movie/week';
    const today = new Date().toISOString().split('T')[0];

    // Fetch trending movies over the past week
    const url = `${baseUrl}?api_key=${apiKey}&language=hi&region=IN&page=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            console.log('No trending movies found.');
            return; // If no results, stop
        }

        // Filter and limit to top 10 movies that are already released
        const top10Movies = data.results.filter(movie => movie.release_date <= today).slice(0, 10);

        top10Movies.forEach(movie => {
            let div = document.createElement("div");
            div.classList.add("wrapper");

            div.innerHTML = `<div class="card">
                    <div class="poster">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    </div>
                    <div class="details">
                        <h1>${movie.title}</h1>
                        <h2>${movie.release_date} • ${movie.runtime ? movie.runtime + ' mins' : 'Unknown'} • ${movie.adult ? 'Adult' : 'Non-Adult'}</h2>
                        <div class="rating">
                            ${generateStarRating(movie.vote_average)}
                            <span>${movie.vote_average}/10</span>
                        </div>
                        <div class="tags">
                            ${movie.genre_ids.map(id => getGenreName(id))
                                .slice(0, 3)  // Limit to 3 genres for simplicity
                                .map(genre => `<span class="tag">${genre}</span>`)
                                .join('')}
                        </div>
                    </div>
                </div>`;
            trendingSection.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

async function fetchNewReleases() {
    newReleaseSection.innerHTML = ``; // Clear existing content
    const apiKey = '93d9faba58ff3f0ffe282ee139ad67c1';
    const baseUrl = 'https://api.themoviedb.org/3/discover/movie';
    
    // Calculate the date three weeks ago
    const today = new Date();
    const threeWeeksAgo = new Date(today);
    threeWeeksAgo.setDate(today.getDate() - 21); // Subtracting 21 days

    // Format dates to YYYY-MM-DD
    const todayStr = today.toISOString().split('T')[0];
    const threeWeeksAgoStr = threeWeeksAgo.toISOString().split('T')[0];

    // Fetch new releases from the last three weeks
    const url = `${baseUrl}?api_key=${apiKey}&language=hi&region=IN&release_date.gte=${threeWeeksAgoStr}&release_date.lte=${todayStr}&sort_by=release_date.desc&page=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            console.log('No new releases found.');
            return; // If no results, stop
        }

        // Limit to only 5 new releases
        const newReleases = data.results.slice(0, 5);

        newReleases.forEach(movie => {
            let div = document.createElement("div");
            div.classList.add("wrapper");

            div.innerHTML = `<div class="card">
                    <div class="poster">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    </div>
                    <div class="details">
                        <h1>${movie.title}</h1>
                        <h2>${movie.release_date} • ${movie.runtime ? movie.runtime + ' mins' : 'Unknown'} • ${movie.adult ? 'Adult' : 'Non-Adult'}</h2>
                        <div class="rating">
                            ${generateStarRating(movie.vote_average)}
                            <span>${movie.vote_average}/10</span>
                        </div>
                        <div class="tags">
                            ${movie.genre_ids.map(id => getGenreName(id))
                                .slice(0, 3)  // Limit to 3 genres for simplicity
                                .map(genre => `<span class="tag">${genre}</span>`)
                                .join('')}
                        </div>
                    </div>
                </div>`;
            newReleaseSection.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching new releases:", error);
    }
}

async function fetchUpcomingMovies() {
    upCommingSection.innerHTML = ``; // Clear existing content
    const apiKey = '93d9faba58ff3f0ffe282ee139ad67c1';
    const baseUrl = 'https://api.themoviedb.org/3/movie/upcoming';

    // Fetch upcoming movies
    const url = `${baseUrl}?api_key=${apiKey}&language=hi&region=IN&page=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            console.log('No upcoming movies found.');
            return; // If no results, stop
        }

        // Limit to only 5 upcoming movies
        const upcomingMovies = data.results.slice(0, 5);

        upcomingMovies.forEach(movie => {
            let div = document.createElement("div");
            div.classList.add("wrapper");

            // Handle missing poster image
            const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'default_poster_path.jpg'; // Add a default image

            // Format the release date
            const releaseDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'TBA';

            // Display genres (limit to 3)
            const genreTags = movie.genre_ids.map(id => getGenreName(id))
                .slice(0, 3) // Limit to 3 genres for simplicity
                .map(genre => `<span class="tag">${genre}</span>`)
                .join('');

            // Add the movie card
            div.innerHTML = `<div class="card">
                    <div class="poster">
                        <img src="${posterPath}" alt="${movie.title}">
                    </div>
                    <div class="details">
                        <h1>${movie.title}</h1>
                        <h2>${releaseDate} • ${movie.runtime ? movie.runtime + ' mins' : 'Unknown'} • ${movie.adult ? 'Adult' : 'Non-Adult'}</h2>
                        <div class="rating">
                            ${generateStarRating(movie.vote_average)}
                            <span>${movie.vote_average}/10</span>
                        </div>
                        <div class="tags">
                            ${genreTags}
                        </div>
                    </div>
                </div>`;
                upCommingSection.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching upcoming movies:", error);
    }
}


async function fetchRandomMovies() {
    otherSection.innerHTML = ``; // Clear existing content
    const apiKey = '93d9faba58ff3f0ffe282ee139ad67c1';
    const baseUrl = 'https://api.themoviedb.org/3/discover/movie';

    // Generate a random page number between 1 and 500 (or any reasonable limit)
    const randomPageNumber = Math.floor(Math.random() * 500) + 1;

    // Fetch random movies from the discover endpoint
    const url = `${baseUrl}?api_key=${apiKey}&language=hi&region=IN&page=${randomPageNumber}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            console.log('No random movies found.');
            return; // If no results, stop
        }

        // Limit to only 5 random movies
        const randomMovies = data.results.slice(0, 5);

        randomMovies.forEach(movie => {
            let div = document.createElement("div");
            div.classList.add("wrapper");

            div.innerHTML = `<div class="card">
                    <div class="poster">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    </div>
                    <div class="details">
                        <h1>${movie.title}</h1>
                        <h2>${movie.release_date} • ${movie.runtime ? movie.runtime + ' mins' : 'Unknown'} • ${movie.adult ? 'Adult' : 'Non-Adult'}</h2>
                        <div class="rating">
                            ${generateStarRating(movie.vote_average)}
                            <span>${movie.vote_average}/10</span>
                        </div>
                        <div class="tags">
                            ${movie.genre_ids.map(id => getGenreName(id))
                                .slice(0, 3)  // Limit to 3 genres for simplicity
                                .map(genre => `<span class="tag">${genre}</span>`)
                                .join('')}
                        </div>
                    </div>
                </div>`;
            otherSection.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching random movies:", error);
    }
}


// Helper function to get genre name from genre id
function getGenreName(genreId) {
    const genreMap = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Science Fiction",
        10770: "TV Movie",
        53: "Thriller",
        10752: "War",
        37: "Western"
    };

    return genreMap[genreId] || "Unknown";
}

// Function to generate star rating
function generateStarRating(rating) {
    const fullStars = Math.floor(rating / 2);
    const halfStars = (rating % 2 >= 1) ? 1 : 0;

    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (halfStars) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = fullStars + halfStars; i < 5; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}


// Call functions to fetch data
fetchTop10TrendingMovies();
fetchNewReleases();
fetchUpcomingMovies();
fetchRandomMovies();