// Get the "Play" button and the game content
const playButton = document.getElementById('play-btn');
const gameContent = document.getElementById('game-content');
const startMenu = document.getElementById('start-menu');
const movingWordsContainer = document.getElementById('moving-words');
const imagePlaceholder = document.getElementById('image-placeholder');
const hoverImage = document.getElementById('hover-image');

// Change the text of the button on hover
playButton.addEventListener('mouseenter', function() {
    playButton.textContent = "GO!";  // Change the text when hovered
    triggerConfetti(); // Trigger confetti when hovered
});

playButton.addEventListener('mouseleave', function() {
    playButton.textContent = "READY?";  // Change the text back when hover ends
});

// When the "Play" button is clicked
playButton.addEventListener('click', function() {
    // Hide the start menu
    startMenu.style.display = 'none';

    // Show the game content
    gameContent.style.display = 'block';

    // Generate moving words/buttons
    generateMovingWords();
});

// Function to generate the moving words
function generateMovingWords() {
    const words = [
        'LOGO DESIGN', 'ANIMATIONS', 'CHARACTER DESIGN', 'COMICS', 'GAME DESIGN', 'PAINTINGS', 'POSTERS', 'VIDEOS', 'PHOTOGRAPHY', 'WEB DESIGN', 'ZINES',
        'BOOKLETS', 'PACKAGING'
    ];

    // Create a container for the words
    let wordsHTML = '';

    // Loop through the words and create buttons
    words.forEach(word => {
        wordsHTML += `<button class="moving-word" 
            onmouseover="showImage('${word.toLowerCase()}')" 
            onmouseleave="hideImage()"
            onclick="navigateToPage('${word.toLowerCase().replace(/\s+/g, '-')}')">${word}</button>`;
    });

    // Append the words to the moving-words container twice for continuous scrolling
    movingWordsContainer.innerHTML = wordsHTML + wordsHTML;  // Duplicate the words for seamless scroll

    // Set the animation for continuous scrolling
    setUpScrollingAnimation();
}

// Function to navigate to the page corresponding to the clicked word
function navigateToPage(word) {
    // Construct the URL dynamically based on the word (e.g., animations => animations.html)
    window.location.href = `${word}.html`;  // Navigate to the corresponding HTML page
}

// Function to show the image when hovering over the "Comics" button
function showImage(word) {
    if (word === 'comics') {
        // Change the image source based on the word (e.g., Comics)
        hoverImage.src = 'comics-image.png'; // Set the image URL here
        imagePlaceholder.style.display = 'block'; // Show the image placeholder
    }
}

// Function to hide the image when not hovering over the "Comics" button
function hideImage() {
    imagePlaceholder.style.display = 'none'; // Hide the image placeholder
}

// Function to set up the infinite scrolling effect
function setUpScrollingAnimation() {
    // Initially, set the transform of the movingWordsContainer to the start position
    movingWordsContainer.style.transform = "translateX(0)";

    // Create a CSS class that will trigger the animation after each loop
    movingWordsContainer.classList.remove("scrolling");  // Remove any previous animation
    movingWordsContainer.offsetHeight;  // Trigger reflow to restart animation
    movingWordsContainer.classList.add("scrolling");  // Add animation class to start it

    // Listen for when the animation ends to restart it immediately
    movingWordsContainer.addEventListener("animationiteration", function() {
        movingWordsContainer.style.transition = "none";  // Disable transition while we move instantly
        movingWordsContainer.style.transform = "translateX(0)";  // Reset position immediately
        movingWordsContainer.offsetHeight;  // Trigger reflow
        movingWordsContainer.style.transition = "";  // Re-enable transition after reset
    });
}

// Trigger confetti effect when hovering over the "READY?" button
function triggerConfetti() {
    // Randomly generate confetti in the viewport
    confetti({
        particleCount: 100, // Number of confetti pieces
        spread: 70,         // Spread of the confetti
        origin: { x: 0.5, y: 0.5 } // Confetti originates from the center
    });
}
