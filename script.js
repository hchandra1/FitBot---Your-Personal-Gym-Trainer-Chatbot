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

// Speech-to-text integration
const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognizer = new recognition();
recognizer.continuous = false;
recognizer.interimResults = false;

recognizer.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById('chat-input').value = transcript;
};

recognizer.onerror = function(event) {
    console.error('Speech recognition error:', event.error);
    displayMessage('Bot', 'Sorry, I could not understand your voice.');
};

// Start voice input
function startVoiceInput() {
    recognizer.start();
}

// Add voice button
const voiceBtn = document.createElement('button');
voiceBtn.innerText = '🎙️ Voice Input';
voiceBtn.className = 'btn';
voiceBtn.onclick = startVoiceInput;
document.body.appendChild(voiceBtn);

// Auto-logout after inactivity
let inactivityTimer;
document.addEventListener('mousemove', resetTimer);
document.addEventListener('keydown', resetTimer);

function resetTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        alert('Session timed out due to inactivity. Please refresh.');
        window.location.href = 'index.html';
    }, 300000); // 5 minutes
} resetTimer();

// Chatbot greeting message
window.addEventListener('load', function () {
    displayMessage('Bot', 'Welcome to FitBot! How can I assist you today?');
});

// Loading spinner for file uploads
function showLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.innerHTML = '⏳ Uploading...';
    document.body.appendChild(spinner);
    setTimeout(() => spinner.remove(), 3000); // Simulate 3 sec upload
}

document.getElementById('upload-btn').addEventListener('change', showLoadingSpinner);

// Play sound when bot responds
function playNotificationSound() {
    const audio = new Audio('notification.mp3');
    audio.play();
}
function displayMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('p');
    messageElement.textContent = `${sender}: ${message}`;
    messageElement.style.color = sender === 'Bot' ? 'gray' : 'black';
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    if (sender === 'Bot') playNotificationSound();
}

// Save chat history
function saveChatHistory() {
    const chatBox = document.getElementById('chat-box').innerHTML;
    localStorage.setItem('chatHistory', chatBox);
}

// Load chat history
function loadChatHistory() {
    const savedChat = localStorage.getItem('chatHistory');
    if (savedChat) {
        document.getElementById('chat-box').innerHTML = savedChat;
    }
}
window.addEventListener('load', loadChatHistory);
document.getElementById('send-btn').addEventListener('click', saveChatHistory);
