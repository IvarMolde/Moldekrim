import { story } from './story.js';

// Game Configuration
const GAME_VERSION = '1.2'; // Increment this to force a reset for all players

// Audio Elements
// Using transcoded MP3 files which are more reliable for browser playback
const audioRain = new Audio('https://upload.wikimedia.org/wikipedia/commons/transcoded/e/e2/Sound_of_rain.ogg/Sound_of_rain.ogg.mp3');
const audioCafe = new Audio('https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a2/Cafe_ambiance.ogg/Cafe_ambiance.ogg.mp3');
const audioHarbor = new Audio('https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b0/Harbour_sounds.ogg/Harbour_sounds.ogg.mp3');
const audioOffice = new Audio('https://upload.wikimedia.org/wikipedia/commons/transcoded/2/23/Office_ambience.ogg/Office_ambience.ogg.mp3');

// Set loops and volumes
audioRain.loop = true;
audioCafe.loop = true;
audioHarbor.loop = true;
audioOffice.loop = true;

// Increased volume for better audibility
audioRain.volume = 0.5;
audioCafe.volume = 0.4;
audioHarbor.volume = 0.4;
audioOffice.volume = 0.3;

let audioEnabled = false;

// Game State
const initialState = {
    currentId: 'cover',
    inventory: [],
    notebook: [],
    timeline: [],
    history: ['cover'],
    flags: {},
    version: GAME_VERSION
};

let state = loadGame() || initialState;

// DOM Elements
const bookElement = document.getElementById('book');
const inventoryList = document.getElementById('inventory-list');
const notebookList = document.getElementById('notebook-list');
const timelineList = document.getElementById('timeline-list');
const timelineModal = document.getElementById('timeline-modal');
const prevBtn = document.getElementById('prev-btn');

function init() {
    renderPage(state.currentId);
    updateUI();

    // Rain effect
    const rain = document.createElement('div');
    rain.className = 'rain';
    document.body.appendChild(rain);

    // Audio Controls
    const audioBtn = document.createElement('div');
    audioBtn.id = 'audio-controls';
    audioBtn.innerText = '🔊 Lyd: Av';
    audioBtn.onclick = toggleAudio;
    document.body.appendChild(audioBtn);

    // Reset Button (Always available)
    const resetBtn = document.createElement('div');
    resetBtn.id = 'reset-btn';
    resetBtn.innerText = '🔄 Start på nytt';
    resetBtn.onclick = () => {
        if (confirm("Er du sikker på at du vil starte helt på nytt?")) {
            window.resetGame();
        }
    };
    document.body.appendChild(resetBtn);
}

function loadGame() {
    const saved = localStorage.getItem('mysteriet_save');
    if (!saved) return null;

    const parsed = JSON.parse(saved);
    // Check if save is from an old version
    if (parsed.version !== GAME_VERSION) {
        console.log("New version detected. Resetting game.");
        return null;
    }
    return parsed;
}

function saveGame() {
    localStorage.setItem('mysteriet_save', JSON.stringify(state));
}

function toggleAudio() {
    audioEnabled = !audioEnabled;
    const btn = document.getElementById('audio-controls');
    btn.innerText = audioEnabled ? '🔊 Lyd: På' : '🔇 Lyd: Av';

    if (audioEnabled) {
        btn.classList.add('audio-playing');
        playSceneAudio(state.currentId);
    } else {
        btn.classList.remove('audio-playing');
        stopAllAudio();
    }
}

function stopAllAudio() {
    audioRain.pause();
    audioCafe.pause();
    audioHarbor.pause();
    audioOffice.pause();
}

function playSceneAudio(pageId) {
    if (!audioEnabled) return;

    const pageData = story.find(p => p.id === pageId);
    stopAllAudio();

    if (!pageData) return;

    const audioType = pageData.audio || 'rain';
    let activeAudio = null;

    try {
        switch (audioType) {
            case 'cafe':
                activeAudio = audioCafe;
                break;
            case 'harbor':
                activeAudio = audioHarbor;
                break;
            case 'office':
                activeAudio = audioOffice;
                break;
            case 'rain':
            default:
                activeAudio = audioRain;
                break;
        }

        if (activeAudio) {
            const playPromise = activeAudio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio play failed (likely autoplay policy):", error);
                    // Visual feedback that audio failed
                    const btn = document.getElementById('audio-controls');
                    btn.innerText = '⚠️ Lydfeil (Klikk her)';
                    btn.classList.remove('audio-playing');
                    audioEnabled = false;
                });
            }
        }
    } catch (e) {
        console.log("Audio play failed", e);
    }
}

function renderPage(pageId) {
    const pageData = story.find(p => p.id === pageId);
    if (!pageData) return;

    // Update State
    if (state.currentId !== pageId) {
        state.history.push(pageId);
        state.currentId = pageId;
    }

    // Handle Audio
    playSceneAudio(pageId);

    // Handle Auto-Events
    if (pageData.clue && !state.inventory.find(i => i.id === pageData.clue.id)) {
        state.inventory.push(pageData.clue);
        showNotification(`Nytt bevis: ${pageData.clue.name}`);
    }
    if (pageData.note && !state.notebook.includes(pageData.note)) {
        state.notebook.push(pageData.note);
        showNotification(`Notat lagt til`);
    }
    if (pageData.timelineEvent && !state.timeline.find(e => e.id === pageData.timelineEvent.id)) {
        state.timeline.push(pageData.timelineEvent);
        state.timeline.sort((a, b) => a.time.localeCompare(b.time)); // Sort by time
        showNotification(`Tidslinje oppdatert: ${pageData.timelineEvent.time}`);
    }
    if (pageData.setFlag) {
        state.flags[pageData.setFlag] = true;
    }

    saveGame();

    // Render HTML
    bookElement.innerHTML = '';
    const pageEl = document.createElement('div');
    pageEl.className = 'page active';
    if (pageData.type === 'cover') pageEl.classList.add('cover');

    let contentHtml = '';

    if (pageData.type === 'cover') {
        contentHtml = `
            <div class="content">
                <h1>${pageData.title}</h1>
                <p>${pageData.text}</p>
                <div style="margin-top: 2rem;">
                    ${pageData.image ? `<img src="${pageData.image}" class="story-image cover-img">` : ''}
                </div>
                <button onclick="window.handleChoice('${pageData.next}')">Start Etterforskningen</button>
                <button onclick="window.resetGame()" style="margin-top: 10px; font-size: 0.8em; background: #333;">Nullstill spill</button>
            </div>
        `;
    } else if (pageData.type === 'deduction') {
        // Final Deduction Screen
        contentHtml = `
            <div class="page-content">
                <h2>${pageData.title}</h2>
                <p>${pageData.text}</p>
                <div class="deduction-container">
                    <div class="deduction-group">
                        <label>Hvem er morderen?</label>
                        <select id="deduction-killer">
                            <option value="">Velg person...</option>
                            <option value="berit">Berit (Kollega)</option>
                            <option value="olav">Olav (Sjefen)</option>
                            <option value="lars">Lars (Ekskjæreste)</option>
                            <option value="frank">Frank (Bakmannen)</option>
                        </select>
                    </div>
                    <div class="deduction-group">
                        <label>Hva var motivet?</label>
                        <select id="deduction-motive">
                            <option value="">Velg motiv...</option>
                            <option value="money">Penger / Gjeld</option>
                            <option value="jealousy">Sjalusi</option>
                            <option value="accident">Uhell</option>
                            <option value="silence">For å skjule en hemmelighet</option>
                        </select>
                    </div>
                    <div class="deduction-group">
                        <label>Hva er det fellende beviset?</label>
                        <select id="deduction-evidence">
                            <option value="">Velg bevis...</option>
                            <option value="button">Gullknappen</option>
                            <option value="diary">Dagboken</option>
                            <option value="ticket">Fergebilletten</option>
                            <option value="phone">Telefonloggen</option>
                        </select>
                    </div>
                    <button onclick="window.checkDeduction()">Avgi Rapport</button>
                    <p id="deduction-feedback" class="feedback"></p>
                </div>
            </div>
        `;
    } else {
        // Standard Page Logic (Choices/Challenges)
        let choicesHtml = '';

        if (pageData.challenge) {
            choicesHtml = `
                <div class="challenge-box">
                    <p><strong>🕵️ Oppdrag:</strong> ${pageData.challenge.question}</p>
                    <input type="text" id="challenge-input" placeholder="Skriv svaret her..." autocomplete="off">
                    <button onclick="window.checkAnswer('${pageData.id}')">Sjekk svar</button>
                    <p id="challenge-feedback" class="feedback"></p>
                </div>
            `;
        } else {
            choicesHtml = (pageData.choices || []).map(choice => {
                if (choice.requires) {
                    const hasItem = state.inventory.find(i => i.id === choice.requires);
                    const hasFlag = state.flags[choice.requires];
                    if (!hasItem && !hasFlag) return '';
                }
                return `<button onclick="window.handleChoice('${choice.target}')">${choice.text}</button>`;
            }).join('');
        }

        const nextHtml = pageData.next && !pageData.challenge ?
            `<button onclick="window.handleChoice('${pageData.next}')">Gå videre</button>` : '';

        let visualHtml = '';
        if (pageData.video) {
            visualHtml = `<div class="video-wrapper"><img src="${pageData.image}" alt="${pageData.title}"></div>`;
        } else if (pageData.image) {
            visualHtml = `<img src="${pageData.image}" class="story-image" alt="${pageData.title}">`;
        }

        contentHtml = `
            <div class="page-content">
                <h2>${pageData.title}</h2>
                ${visualHtml}
                <p>${pageData.text}</p>
                ${pageData.clue ? `<div class="clue-found">🔎 Du fant: ${pageData.clue.name}</div>` : ''}
                <div class="choices">
                    ${choicesHtml}
                    ${nextHtml}
                </div>
            </div>
        `;
    }

    pageEl.innerHTML = contentHtml;
    bookElement.appendChild(pageEl);
    updateUI();
}

// Timeline Functions
window.toggleTimeline = () => {
    timelineModal.classList.toggle('hidden');
    updateTimelineUI();
};

function updateTimelineUI() {
    timelineList.innerHTML = state.timeline.map(event => `
        <li>
            <span class="time-badge">${event.time}</span>
            ${event.description}
        </li>
    `).join('');
}

// Deduction Logic
window.checkDeduction = () => {
    const killer = document.getElementById('deduction-killer').value;
    const motive = document.getElementById('deduction-motive').value;
    const evidence = document.getElementById('deduction-evidence').value;
    const feedback = document.getElementById('deduction-feedback');

    // Correct Answers: Lars, Jealousy, Ticket (Timeline proof)
    if (killer === 'lars' && motive === 'jealousy' && evidence === 'ticket') {
        feedback.style.color = 'lightgreen';
        feedback.innerText = "Korrekt! Lars drepte henne i sjalusi og prøvde å skjule sporene.";
        setTimeout(() => window.handleChoice('solved'), 2000);
    } else {
        feedback.style.color = '#ff6b6b';
        feedback.innerText = "Noe stemmer ikke. Gå gjennom bevisene på nytt.";
    }
};

// Check Answer Logic
window.checkAnswer = (pageId) => {
    const pageData = story.find(p => p.id === pageId);
    const input = document.getElementById('challenge-input');
    const feedback = document.getElementById('challenge-feedback');
    const answer = input.value.toLowerCase().trim();

    // Check if answer matches (can be string or array of accepted answers)
    const correct = Array.isArray(pageData.challenge.answer)
        ? pageData.challenge.answer.includes(answer)
        : pageData.challenge.answer === answer;

    if (correct) {
        feedback.style.color = 'lightgreen';
        feedback.innerText = "Riktig! ✅";
        input.disabled = true;

        // Show the 'Next' button or choices now
        setTimeout(() => {
            window.handleChoice(pageData.challenge.correctTarget);
        }, 1000);
    } else {
        feedback.style.color = '#ff6b6b';
        feedback.innerText = "Feil svar. Prøv igjen. ❌";
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
    }
};

function updateUI() {
    // Inventory
    inventoryList.innerHTML = state.inventory.map(item => `
        <li><span class="clue-icon"></span>${item.name}</li>
    `).join('');

    // Notebook
    if (notebookList) {
        notebookList.innerHTML = state.notebook.map(note => `
            <li>📝 ${note}</li>
        `).join('');
    }

    // Navigation
    prevBtn.disabled = state.history.length <= 1;
    prevBtn.onclick = () => {
        if (state.history.length > 1) {
            state.history.pop();
            const prevId = state.history.pop();
            renderPage(prevId || 'cover');
        }
    };
}

function showNotification(msg) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.innerText = msg;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// Global Exports
window.handleChoice = (target) => {
    renderPage(target);
};

window.resetGame = () => {
    localStorage.removeItem('mysteriet_save');
    state = initialState;
    location.reload();
};

init();
