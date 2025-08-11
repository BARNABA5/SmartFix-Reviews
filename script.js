// Load saved reviews on page load
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("smartfix_reviews");
  if (saved) {
    const reviews = JSON.parse(saved);
    reviews.forEach(displayReview);
  }
});

// Handle form submission
document.getElementById("reviewForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const rating = parseInt(document.getElementById("rating").value);
  const comment = document.getElementById("comment").value.trim();

  if (!name || !comment || !rating) {
    alert("Please fill in all fields.");
    return;
  }

  const review = { name, rating, comment };

  // Save to localStorage
  const stored = localStorage.getItem("smartfix_reviews");
  const allReviews = stored ? JSON.parse(stored) : [];
  allReviews.push(review);
  localStorage.setItem("smartfix_reviews", JSON.stringify(allReviews));

  // Display review
  displayReview(review);

  // 🔊 Voice output
  const voice = `${name} rated ${rating} stars and said: ${comment}`;
  const utterance = new SpeechSynthesisUtterance(voice);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);

  // Reset form
  document.getElementById("reviewForm").reset();
});

// Render a single review
function displayReview(review) {
  const emojis = {
    5: "🔥💯",
    4: "😊👍",
    3: "🙂",
    2: "😐",
    1: "😓"
  };

  const reviewHTML = `
    <div class="review">
      <strong>${review.name}</strong> – ${"⭐️".repeat(review.rating)} ${emojis[review.rating]}<br/>
      <p>${review.comment}</p>
    </div>
  `;

  document.getElementById("reviewsList").innerHTML += reviewHTML;

  // Scroll to the new review
  document.getElementById("reviewsList").scrollIntoView({ behavior: "smooth", block: "end" });
}
