# MonkeyTyper
An automatic typing bot for [Monkeytype][mt].

---

### Installation

Download this repository or grab one of the [releases][releases], then install it as an unpacked Chrome extension:

1. Go to `chrome://extensions`
2. Enable **Developer mode** (top right toggle slider)
3. Click **Load unpacked** and select the root folder of this project

> If you downloaded a zip, unzip it first and then follow the steps above.

---

### How to Use

Click the MonkeyTyper extension in your browser extensions to open the popup. The extension only works on [monkeytype.com][monkeytype].

**Controls:**

| Control | Description |
|---|---|
| Enable / Disable | Toggles the bot on and off |
| Speed | Controls how fast the bot types - from *Yawn* to *Blitz* |
| Accuracy | Controls how often the bot makes (and corrects) mistakes - from *Sloppy* to *Perfect* |

The bot will automatically stop when a test finishes.

> Due to the randomness built into the bot, speed and accuracy will not be perfectly consistent between runs - this makes tests look more human.

---

### Notes

- Settings persist between sessions
- The bot is always disabled when the page loads, it will never auto-start
- At **Blitz** speed, delays between keystrokes are near zero - use with caution as some browsers may struggle to keep up
- Bot will auto-disable upon test completion

<!-- LINKS -->
[monkeytype]: https://monkeytype.com
[releases]: https://github.com/Rhylanscript/MonkeyTyper/releases