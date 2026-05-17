const toggleBtn = document.getElementById("toggleBtn");
const statusText = document.getElementById("statusText")
const indicator = document.getElementById("indicator");

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

async function loadState() {
    const result = await chrome.storage.local.get("enabled");
    const isMonkeyType = await checkTab();
    if (isMonkeyType) updateUI(result.enabled || false);
}

function updateUI(enabled) {
    statusText.textContent = enabled ? "Enabled" : "Disabled";
    toggleBtn.textContent = enabled ? "Disable Bot" : "Enable Bot";
    indicator.style.background = enabled ? "#22ee22" : "#ff2222";
}

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

loadState();