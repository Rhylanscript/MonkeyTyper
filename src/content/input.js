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

    if (char === "Backspace") {
        input.value = input.value.slice(0, -1);
        // keydown
        input.dispatchEvent(
            new KeyboardEvent( "keydown", {
                key: "Backspace", 
                bubbles: true, 
                cancelable: true 
            })
        );

        // input event
        input.dispatchEvent(
            new InputEvent("input", {
                inputType: "deleteContentBackward",
                bubbles: true,
                cancelable: true
            })
        );

        // keyup
        input.dispatchEvent(
            new KeyboardEvent( "keyup", {
                key: "Backspace", 
                bubbles: true, 
                cancelable: true 
            })
        );

        return true;
    }

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