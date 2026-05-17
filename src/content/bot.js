// src/content/bot.js

let randOffset = 0;		// 40
let randMultiplier = 0;	// 30
let randSleep = 0;			// 50
let monkeytypeadvance = 0; 	// 10

let running = false;

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