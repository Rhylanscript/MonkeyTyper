// src/content/bot.js

let randOffset;
let randMultiplier;
let randSleep;
let monkeytypeadvance;

let running = false;

function applySpeedSettings(speed) {
	randOffset 			= speed.randomOffset;
	randMultiplier 		= speed.randomMultiplier;
	randSleep			= speed.randSleep;
	monkeytypeadvance	= speed.monkeyTypeAdvance;
}

async function startBot() {
	if (running) return;
	running = true;

	console.log("Bot started");

	while (running) {
		const word = getActiveWord();

		if (!word) {
			await sleep(randSleep);
			continue;
		}

		console.log("Typing:", word);

		for (const char of word) {
			if (!running) return;

			typeCharacter(char);
			await sleep(randomDelay());
		}

		const previousWord = word;

		typeCharacter(" ");

		// wait until monkeytype advances
		while (running && getActiveWord() === previousWord) {
			await sleep(monkeytypeadvance);
		}

		await sleep(randomDelay() + randSleep);
	}
}

function stopBot() {
	running = false;
	console.log("Bot stopped"); 
}

function randomDelay() { return randOffset + Math.random() * randMultiplier; }
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }