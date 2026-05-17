// src/content/content.js

chrome.storage.local.set({ enabled: false });

chrome.runtime.onMessage.addListener(
	(message) => {
    	console.log("Received message:", message);
		if (message.action === "setEnabled") {
			if (message.enabled) { startBot(); } else { stopBot(); }
		} 
	}
)