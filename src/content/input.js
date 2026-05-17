// src/content/input.js

function getInputField() {
    return document.querySelector("#wordsInput");
}

function typeCharacter(char) {
    const input = getInputField();

    if (!input) {
        console.log("No input found!");
        return false;
    }

    input.focus();

    // keydown
    input.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: char,
            bubbles: true,
            cancelable: true
        })
    );

    // beforeinput
    input.dispatchEvent(
        new InputEvent("beforeinput", {
            inputType: "insertText",
            data: char,
            bubbles: true,
            cancelable: true
        })
    );

    // directly append value
    input.value += char;

    // input
    input.dispatchEvent(
        new InputEvent("input", {
            inputType: "insertText",
            data: char,
            bubbles: true,
            cancelable: true
        })
    );

    // keyup
    input.dispatchEvent(
        new KeyboardEvent("keyup", {
            key: char,
            bubbles: true,
            cancelable: true
        })
    );

    return true;
}