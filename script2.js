 
// Define API key and chatbot ID
const apiKey = 'aa1e632d-3fb6-4e67-b29f-17d9119f56a1';
const chatbotId = '--knIrsNLQlX1p56D8iCe';

// Initialize language and session history variables
let userLanguage = 'en'; // Default language
let chatHistory = []; // To store previous chat messages

// Initialize speech recognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.interimResults = false;
let audio;
let isPlaying = false;
let isSpeaking = false;
let WelcomeMessage;
let downloadHref;
let LabelText;
detectLanguage('');

// Function to update the welcome message based on the selected language
function updateWelcomeMessage(lang) {
    userLanguage = lang; // Set the detected language for session continuity

    switch (lang) {
        case 'te':
            WelcomeMessage = "హాయ్! నేను మీకు ఏమి సహాయం చేయగలను?";
            downloadHref = "./faqs/FAQ_Mission_Mirchi_Telugu.docx";
            LabelText = "FAQ's";
            break;
        case 'kn':
            WelcomeMessage = "ನಮಸ್ತೆ! ನಾನು ನಿಮಗೆ ಏನು ಸಹಾಯ ಮಾಡಬಹುದು?";
            downloadHref = "./faqs/FAQ_Mission_Mirchi_Kannada.docx";
            LabelText = "FAQ's";
            break;
        case 'hi':
            WelcomeMessage = "नमस्ते! आपकी क्या मदद कर सकता है?";
            downloadHref = "./faqs/FAQ_mission_mirchi_hindi.docx";
            LabelText = "FAQ's";
            break;
        case 'en':
        default:
            WelcomeMessage = "Hi! I am Grain Guru : Your AI companion for rice health";
            downloadHref = "./faqs/FAQ_mission_mirchi_english.docx";
            LabelText = "FAQ's";
            break;
    }
    displayWelcomeMessage(WelcomeMessage, downloadHref, LabelText);
}

// Function to display the welcome message
function displayWelcomeMessage(WelcomeMessage, downloadHref, LabelText) {
    $("#welcome-message").html('').text(WelcomeMessage);
    const chatWindow = document.getElementById('chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Voice recognition setup
function startVoiceRecognition() {
    let lastTranscript = "";
    const micButton = document.getElementById('mic-button');
    micButton.disabled = true;
    micButton.style.pointerEvents = 'none';

    if (isPlaying && audio) {
        audio.pause();
        isPlaying = false;  // Stop TTS playback
        micButton.disabled = false;  // Re-enable the mic button
        micButton.style.pointerEvents = 'auto';  // Allow clicks on mic button
    }


    recognition.start();

    recognition.onresult = (event) => {
        const transcript = Array.from(event.results).map(result => result[0].transcript).join('');
        const newText = transcript.substring(lastTranscript.length);

        if (newText.trim() !== "") {
            recognition.stop();
            lastTranscript = transcript;
            sendMessage(userLanguage, newText.trim()); // Use session language
        }
    };

    recognition.onerror = (event) => console.error("Speech Recognition Error:", event.error);

    setTimeout(() => {
        recognition.stop();
        micButton.disabled = false;
        micButton.style.pointerEvents = 'auto';
    }, 10000);
}

// Function to send a message to the chatbot
async function sendMessage(lang, text) {
    const messageInput = document.getElementById('message');
    const message = messageInput.value || text;
    const chatWindow = document.getElementById('chat-window');

    if (message.trim() === '') return;

    if (!lang) lang = userLanguage;

    appendMessageToChatWindow(chatWindow, 'user-message', message);
    messageInput.value = '';

    const botMessageDiv = appendMessageToChatWindow(chatWindow, 'bot-message', '');

    // Append to chat history for context
    chatHistory.push({ role: 'user', content: message });

    try {
        const response = await fetch('https://www.chatbase.co/api/v1/chat', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: chatHistory, // Send the entire chat history for context
                chatbotId: chatbotId,
                stream: true,
                temperature: 0.5,
                model: 'gpt-4o',
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let botMessage = '';

        function read() {
            reader.read().then(({ done, value }) => {
                if (done) {
                    speakText(botMessage, lang, botMessageDiv);
                    // saveInteractionToDB(message, botMessage);
                    return;
                }

                botMessage += decoder.decode(value);
                botMessageDiv.innerText = botMessage;
                chatWindow.scrollTop = chatWindow.scrollHeight;
                read();
            });
        }

        read();

        // Append bot response to chat history
        chatHistory.push({ role: 'assistant', content: botMessage });
    } catch (error) {
        console.error('Error sending message to chatbot:', error);
    }
}

// **New Function** to send user message and bot response to the backend
async function saveInteractionToDB(userMessage, botResponse) {
    try {
        const response = await fetch('http://localhost:8081/api/chatbot-interaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                requestText: userMessage,
                responseText: botResponse,
                username: "username",
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to store interaction');
        }

        console.log('Interaction stored successfully');
    } catch (error) {
        console.error('Error saving interaction:', error);
    }
}

// Function to append messages to chat window
function appendMessageToChatWindow(chatWindow, messageClass, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', messageClass);
    messageDiv.innerText = message;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return messageDiv;
}

// Function to speak text using Google Text-to-Speech
function speakText(text, lang, botMessageDiv) {
    console.log('lang : ', lang);

    const apiKey = 'AIzaSyCButc9XGLeUiaLvKp40bjoEJbjeOMO1SI';
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
    const requestData = {
        input: { text: text },
        voice: { languageCode: lang, ssmlGender: 'FEMALE', name: `en-IN-Wavenet-C` },
        audioConfig: { audioEncoding: 'MP3', speakingRate: 1.0, pitch: 0 },
    };

    if (isPlaying && audio) {
        audio.pause();
        isPlaying = false;
    }

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
    })
        .then(response => response.json())
        .then(data => {
            if (data.audioContent) {
                const allButtons = document.querySelectorAll('.play-pause-button');
                allButtons.forEach(button => button.remove());

                audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
                audio.play();
                isPlaying = true;

                const playPauseButton = document.createElement('button');
                playPauseButton.innerText = 'Pause';
                playPauseButton.classList.add('play-pause-button');
                botMessageDiv.appendChild(playPauseButton);

                playPauseButton.addEventListener('click', () => {
                    if (isPlaying) {
                        audio.pause();
                        playPauseButton.innerText = 'Play';
                    } else {
                        audio.play();
                        playPauseButton.innerText = 'Pause';
                    }
                    isPlaying = !isPlaying;
                });

                audio.addEventListener('ended', () => {
                    playPauseButton.innerText = 'Play';
                    isPlaying = false;
                    isSpeaking = false;
                });
            } else {
                console.error("Audio content not received.");
            }
        })
        .catch(error => console.error('Error:', error));
}

// Add event listener for the microphone button
$("#myModal").modal('show');
document.getElementById('mic-button').addEventListener('click', () => startVoiceRecognition(''));

// Function to detect language using Google Translation API
function detectLanguage(text) {
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get('state');
    const northIndianStates = ['Delhi', 'Haryana', 'Punjab', 'Uttar Pradesh', 'Bihar', 'Rajasthan', 'Madhya Pradesh', 'Uttarakhand'];

    if (state) {
        if (state.toLowerCase() === 'telangana' || state.toLowerCase() === 'andhrapradesh') {
            userLanguage = 'te';
        } else if (state.toLowerCase() === 'karnataka') {
            userLanguage = 'kn';
        } else if (northIndianStates.map(s => s.toLowerCase()).includes(state.toLowerCase())) {
            userLanguage = 'hi';
        } else {
            userLanguage = 'en';
        }
    }

    updateWelcomeMessage(userLanguage);
}

// Call detectLanguage initially to set language once for the session
detectLanguage('');

// Function to clear the chat window
function clearChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.innerHTML = '';
}
