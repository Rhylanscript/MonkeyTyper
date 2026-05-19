// src/content/content.js

chrome.storage.local.set({ enabled: false });

chrome.storage.local.get(["speedIndex", "accuracyIndex"]).then(result => {
	// library of speed values
	const SPEEDS = [
		{ label: "Yawn",    randomOffset: 120, randomMultiplier: 90, randSleep: 140, monkeyTypeAdvance: 40 },
		{ label: "Slow",    randomOffset: 80,  randomMultiplier: 60, randSleep: 100, monkeyTypeAdvance: 20 },
		{ label: "Med",     randomOffset: 40,  randomMultiplier: 30, randSleep: 50,  monkeyTypeAdvance: 10 },
		{ label: "Fast",  	randomOffset: 10,  randomMultiplier: 10, randSleep: 20,  monkeyTypeAdvance: 5  },
		{ label: "Blitz", 	randomOffset: 0,   randomMultiplier: 0,  randSleep: 0,   monkeyTypeAdvance: 0  },
	];
	applySpeedSettings(SPEEDS[result.speedIndex ?? 2]);

	// library of accuracy values
	const ACCURACIES = [
		{ label: "Poor",  	mistakeChance: 0.30 },
		{ label: "Okay",    mistakeChance: 0.10 },
		{ label: "Good",    mistakeChance: 0.02 },
		{ label: "Perfect", mistakeChance: 0    },
	];
	applyAccuracySettings(ACCURACIES[result.accuracyIndex ?? 3]);
});

chrome.runtime.onMessage.addListener(
	(message) => {
    	console.log("Received message:", message);
		if (message.action === "setEnabled") {
			if (message.enabled) { startBot(); } else { stopBot(); }
		} 
		if (message.action === "setSpeed") {
			applySpeedSettings(message.speed);
		}
		if (message.action === "setAccuracy") {
			applyAccuracySettings(message.accuracy);
		}
	}
)

const observer = new MutationObserver(() => {
	const result = document.querySelector("#result");
	if (result && !result.classList.contains("hidden")) {
		stopBot();
		chrome.storage.local.set({ enabled: false });
		chrome.runtime.sendMessage({ action: "setEnabled", enabled: false });
	}
});

observer.observe(
	document.body, { 
		childList: true,
		subtree: true,
		attributes: true,
		attributeFilter: ["class"],
	}
);