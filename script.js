// script.js - Intro animation and navigation

document.addEventListener('DOMContentLoaded', function () {
    const intro = document.getElementById('intro');
    const mainContent = document.getElementById('main-content');
    const chatLink = document.getElementById('chat-link');

    // Intro Animation
    setTimeout(() => {
        document.getElementById('intro-text').style.opacity = 1;
    }, 500);

    setTimeout(() => {
        document.getElementById('intro-text-2').style.opacity = 1;
    }, 1500);

    setTimeout(() => {
        document.getElementById('courtesy').style.opacity = 1;
    }, 2500);

    setTimeout(() => {
        // Hide intro and show main content
        intro.style.display = 'none';
        mainContent.style.display = 'block';
    }, 4000); // 4-second delay for the intro

    // Link to the chat page
    chatLink.addEventListener('click', function () {
        window.location.href = 'chat.html'; // Redirect to the chat page
    });
});
