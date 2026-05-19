// src/content/bot.js

let randOffset;
let randMultiplier;
let randSleep;
let monkeytypeadvance;

let mistakeChance = 0;

let running = false;

function applySpeedSettings(speed) {
	randOffset 			= speed.randomOffset;
	randMultiplier 		= speed.randomMultiplier;
	randSleep			= speed.randSleep;
	monkeytypeadvance	= speed.monkeyTypeAdvance;
}

function applyAccuracySettings(accuracy) {
	mistakeChance = accuracy.mistakeChance;
}

function randomChar() {
	const chars = "abcdefghijklmnopqrstuvwxyz";
	return chars[Math.floor(Math.random() * chars.length)];
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

			if (mistakeChance > 0 && Math.random() < mistakeChance) {
				const wrongChar = randomChar();
				typeCharacter(wrongChar);
				await sleep(randomDelay());

				if (wrongChar == char) continue;

				typeCharacter("Backspace");
				await sleep(randomDelay());
			}

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