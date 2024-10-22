const city = document.getElementById('city');
const crossBtn = document.getElementById('cross');
const cityPage = document.getElementById('cityPage');
const cityAbout =  document.querySelectorAll(".cityAbout"); 
const citySearchBox = document.getElementById('citySearch');
const nextBtn = document.getElementById('nextBtn');
const video = document.getElementById('video');

const movies = [2, 3, 4];// movie-Trailer names

let index = 2;

crossBtn.addEventListener("click", () => {
    city.style.display = "none";
});

cityPage.addEventListener("click", () => {
    city.style.display = "block";
});

cityAbout.forEach(about => {
    about.addEventListener("click", () => {
        cityPage.innerHTML = about.children[1].innerHTML;
        city.style.display = "none";
    });
});

nextBtn.addEventListener("click", () => {

})

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
    if (index == 5) {
        index = 1;
        video.src = `../Files/vedio/${index}.mp4`;
    }
    else {
        video.src = `../Files/vedio/${index}.mp4`;
    }
    index++;
});