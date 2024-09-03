
// script.js

document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.stars span');
    const averageRatingDisplay = document.getElementById('average-rating');
    let currentRating = 8.5; // Initial average rating
    let totalRatings = 100; // Number of ratings (for calculation)

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const userRating = parseInt(this.getAttribute('data-value'));

            // Update total ratings and calculate new average
            totalRatings += 1;
            currentRating = ((currentRating * (totalRatings - 1)) + userRating) / totalRatings;

            // Update the displayed average rating
            averageRatingDisplay.textContent = currentRating.toFixed(1);

            // Highlight selected stars
            stars.forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
        });

        star.addEventListener('mouseover', function() {
            // Highlight stars up to the hovered one
            const hoverValue = parseInt(this.getAttribute('data-value'));
            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-value')) <= hoverValue) {
                    s.classList.add('selected');
                } else {
                    s.classList.remove('selected');
                }
            });
        });

        star.addEventListener('mouseout', function() {
            // Reset stars to only show the user's selected rating
            stars.forEach(s => s.classList.remove('selected'));
        });
    });
});





// JavaScript to filter activities based on selected filters
document.addEventListener('DOMContentLoaded', function () {
    const applyFiltersButton = document.getElementById('apply-filters');
    const dateFilter = document.getElementById('date-filter');
    const categoryFilter = document.getElementById('category-filter');
    const moreFilters = document.getElementById('more-filters');
    const activityCards = document.querySelectorAll('.activity-card');

    applyFiltersButton.addEventListener('click', () => {
        const selectedDate = dateFilter.value;
        const selectedCategory = categoryFilter.value;
        const selectedMoreFilter = moreFilters.value;

        activityCards.forEach(card => {
            const cardDate = card.getAttribute('data-date');
            const cardCategory = card.getAttribute('data-category');
            const cardMoreFilter = card.getAttribute('data-filter');

            // Filter logic
            const isDateMatch = selectedDate === "" || cardDate === selectedDate;
            const isCategoryMatch = selectedCategory === "all" || cardCategory === selectedCategory;
            const isMoreFilterMatch = selectedMoreFilter === "all" || cardMoreFilter === selectedMoreFilter;

            if (isDateMatch && isCategoryMatch && isMoreFilterMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});





let slider = document.getElementById('slider');
let slideIndex = 0;
const totalSlides = slider.children.length / 2;

function moveNext() {
    slideIndex++;
    if (slideIndex >= totalSlides) {
        slider.style.transition = 'none';
        slideIndex = 0;
        slider.style.transform = `translateX(0)`;
        setTimeout(() => {
            slider.style.transition = 'transform 0.5s ease-in-out';
            slideIndex++;
            slider.style.transform = `translateX(-${slideIndex * 25}%)`;
        }, 0);
    } else {
        slider.style.transform = `translateX(-${slideIndex * 25}%)`;
    }
}

function movePrev() {
    if (slideIndex <= 0) {
        slider.style.transition = 'none';
        slideIndex = totalSlides - 1;
        slider.style.transform = `translateX(-${slideIndex * 25}%)`;
        setTimeout(() => {
            slider.style.transition = 'transform 0.5s ease-in-out';
            slideIndex--;
            slider.style.transform = `translateX(-${slideIndex * 25}%)`;
        }, 0);
    } else {
        slideIndex--;
        slider.style.transform = `translateX(-${slideIndex * 25}%)`;
    }
}












document.querySelector('.movie-poster').addEventListener('click', function() {
    document.getElementById('video-overlay').classList.add('active');
    document.getElementById('movie-trailer').play();
});

document.getElementById('video-overlay').addEventListener('click', function(e) {
    if (e.target === this || e.target.tagName === 'VIDEO') {
        document.getElementById('movie-trailer').pause();
        document.getElementById('movie-trailer').currentTime = 0;
        document.getElementById('video-overlay').classList.remove('active');
    }
});
document.getElementById('close-video').addEventListener('click', function() {
    document.getElementById('video-overlay').classList.remove('active');
});
