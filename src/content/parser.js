// src/content/parser.js

function getActiveWord() {
    const active = document.querySelector("#words .word.active");
    if (!active) return null;

    const letters = active.querySelectorAll("letter");
    if (!letters.length) return active.textContent.trim();

    return [...letters].map(l => l.textContent).join("");
}