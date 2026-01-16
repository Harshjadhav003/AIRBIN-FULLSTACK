const stars = document.querySelectorAll(".star");
const ratingText = document.getElementById("rating-text");
const hiddenRating = document.getElementById("hiddenRating");
const reviewForm = document.querySelector("form[action*='reviews']");

let currentRating = 0;

stars.forEach((star) => {
    star.addEventListener("mouseover", () => {
        resetStars();
        highlightStars(star.dataset.value);
    });

    star.addEventListener("click", () => {
        currentRating = star.dataset.value;
        setActiveStars(currentRating);
        ratingText.innerText = `You rated: ${currentRating}/5`;
        hiddenRating.value = currentRating;
    });
});

if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
        if (currentRating === 0) {
            e.preventDefault();
            alert("Please select a rating before submitting.");
        }
    });
}

function highlightStars(limit) {
    stars.forEach((s) => {
        if (s.dataset.value <= limit) {
            s.style.color = "#ffb400";
        }
    });
}

function resetStars() {
    stars.forEach((s) => {
        if (s.dataset.value > currentRating) {
            s.style.color = "#ccc";
        }
    });
}

function setActiveStars(limit) {
    stars.forEach((s) => {
        s.classList.remove("active");
        if (s.dataset.value <= limit) {
            s.classList.add("active");
        }
    });
}