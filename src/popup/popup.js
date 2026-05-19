// get elements
const toggleBtn = document.getElementById("toggleBtn");
const statusText = document.getElementById("statusText")
const indicator = document.getElementById("indicator");

const speedSlider = document.getElementById("speedSlider");
const speedLabel = document.getElementById("speedLabel");

const accuracySlider = document.getElementById("accuracySlider");
const accuracyLabel = document.getElementById("accuracyLabel");

// library of speed values
const SPEEDS = [
    { label: "Yawn",    randomOffset: 120, randomMultiplier: 90, randSleep: 140, monkeyTypeAdvance: 40 },
    { label: "Slow",    randomOffset: 80,  randomMultiplier: 60, randSleep: 100, monkeyTypeAdvance: 20 },
    { label: "Med",     randomOffset: 40,  randomMultiplier: 30, randSleep: 50,  monkeyTypeAdvance: 10 },
    { label: "Fast",    randomOffset: 10,  randomMultiplier: 10, randSleep: 20,  monkeyTypeAdvance: 5  },
    { label: "Blitz",   randomOffset: 0,   randomMultiplier: 0,  randSleep: 0,   monkeyTypeAdvance: 0  },
];

// library of accuracy values
const ACCURACIES = [
    { label: "Sloppy",  mistakeChance: 0.30 },
    { label: "Okay",    mistakeChance: 0.10 },
    { label: "Good",    mistakeChance: 0.02 },
    { label: "Perfect", mistakeChance: 0    },
];

// apply a given index of the SPEEDS library to the bot
function applySpeed(index) {
    speedLabel.textContent = SPEEDS[index].label;
    speedSlider.value = index;
}

// apply a given index of the ACCURACIES library to the bot
function applyAccuracy(index) {
    accuracyLabel.textContent = ACCURACIES[index].label;
    accuracySlider.value = index;
}

// check the current tab is monkeytype.com
async function checkTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const isMonkeyType = tab.url?.includes("monkeytype.com");

    toggleBtn.disabled = !isMonkeyType;
    if (!isMonkeyType) {
        statusText.textContent = "Not available for this site";
        indicator.style.background = "#888";
    }
    return isMonkeyType;
}

// load the ui
async function loadState() {
    const result = await chrome.storage.local.get(["enabled", "speedIndex", "accuracyIndex"]);
    const isMonkeyType = await checkTab();
    if (isMonkeyType) updateUI(result.enabled || false);

    const savedSpeedIdx = result.speedIndex ?? 2;
    applySpeed(savedSpeedIdx);

    const savedAccIdx = result.accuracyIndex ?? 3;
    applyAccuracy(savedAccIdx);
}

// update the popup ui
function updateUI(enabled) {
    statusText.textContent = enabled ? "Enabled" : "Disabled";
    toggleBtn.textContent = enabled ? "Disable Bot" : "Enable Bot";
    indicator.style.background = enabled ? "#22ee22" : "#ff2222";
}

// handle button clicks
toggleBtn.onclick = async () => {
    if (!await checkTab()) return;

    const result = await chrome.storage.local.get("enabled");
    const enabled = !result.enabled;

    await chrome.storage.local.set({
        enabled
    });

    updateUI(enabled);

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.tabs.sendMessage(tab.id, {
        action: "setEnabled",
        enabled
    });
};

// input handler for the speed slider
speedSlider.oninput = async () => {
    const idx = parseInt(speedSlider.value);
    applySpeed(idx);
    await chrome.storage.local.set({ speedIndex: idx });

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: "setSpeed", speed: SPEEDS[idx] });
}

// input handler for the accuracy slider
accuracySlider.oninput = async () => {
    const idx = parseInt(accuracySlider.value);
    applyAccuracy(idx);
    await chrome.storage.local.set({ accuracyIndex: idx });

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: "setAccuracy", accuracy: ACCURACIES[idx] });
}

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "setEnabled") {
        updateUI(message.enabled);
    }
});

// load the state of the popup
loadState();