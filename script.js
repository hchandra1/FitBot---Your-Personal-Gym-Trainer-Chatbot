// script.js - Intro animation and navigation

document.addEventListener('DOMContentLoaded', function () {
    const intro = document.getElementById('intro');
    const mainContent = document.getElementById('main-content');
    const chatLink = document.getElementById('chat-link');
    const toggleThemeBtn = document.createElement('button');

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
        intro.style.display = 'none';
        mainContent.style.display = 'block';
    }, 4000);

    // Link to the chat page
    chatLink.addEventListener('click', function () {
        window.location.href = 'chat.html';
    });

    // Theme Toggle Button
    toggleThemeBtn.innerText = 'Toggle Theme';
    toggleThemeBtn.className = 'btn';
    toggleThemeBtn.onclick = toggleTheme;
    document.body.appendChild(toggleThemeBtn);
});

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Chat page functionality (Add typing indicator and upload feature)
async function sendMessage() {
    const messageInput = document.getElementById('chat-input');
    const userMessage = messageInput.value.trim();
    if (!userMessage) return;

    displayMessage('User', userMessage);
    showTypingIndicator();

    try {
        const response = await fetch('http://localhost:4567/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ message: userMessage })
        });

        const data = await response.json();
        hideTypingIndicator();
        displayMessage('Bot', data.response);
    } catch (error) {
        console.error('Error:', error);
        hideTypingIndicator();
        displayMessage('Bot', 'There was an issue connecting to the server.');
    }

    messageInput.value = '';
}

function displayMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('p');
    messageElement.textContent = `${sender}: ${message}`;
    messageElement.style.color = sender === 'Bot' ? 'gray' : 'black';
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTypingIndicator() {
    const chatBox = document.getElementById('chat-box');
    const typingIndicator = document.createElement('p');
    typingIndicator.id = 'typing-indicator';
    typingIndicator.textContent = 'Bot is typing...';
    typingIndicator.style.color = 'gray';
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) typingIndicator.remove();
}

// Image Upload Handling
document.getElementById('upload-btn').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        displayMessage('User', 'Uploaded: ' + file.name);
    }
});
