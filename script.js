// Selects the first <textarea> element in the document and stores it in the 'textarea' variable
const textarea = document.querySelector("textarea");

// Selects the first <select> element in the document and stores it in the 'voiceList' variable
const voiceList = document.querySelector("select");

// Selects the first <button> element in the document and stores it in the 'speechBtn' variable
const speechBtn = document.querySelector("button");


// Creates a reference to the speech synthesis API and stores it in the 'synth' variable
let synth = speechSynthesis;

// Initializes a boolean variable 'isSpeaking' and sets it to true
let isSpeaking = true;


// Calls the function 'voices' to populate voice options
voices();

// Function to populate voice options
function voices() {
    // Iterates through the available voices from the Speech Synthesis API
    for (let voice of synth.getVoices()) {
        // Checks if the voice name matches "Google US English" and sets 'selected' attribute accordingly
        let selected = voice.name === "Google US English" ? "selected" : "";

        // Generates an HTML option element with voice name and language
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;

        // Inserts the generated option into the 'voiceList' (select element) in the DOM
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

// Event listener that listens for changes in available voices and calls the 'voices' function when voices change
synth.addEventListener("voiceschanged", voices);

// Function to convert text to speech
function textToSpeech(text) {
    // Creates a new SpeechSynthesisUtterance object with the specified text
    let utterance = new SpeechSynthesisUtterance(text);

    // Iterates through available voices to find the selected voice from the voiceList
    for (let voice of synth.getVoices()) {
        if (voice.name === voiceList.value) {
            // Sets the selected voice for the utterance
            utterance.voice = voice;
        }
    }

// Uses the Speech Synthesis API to speak the utterance with the selected voice
    synth.speak(utterance);
}

// Event listener for the "Convert To Speech" button click
speechBtn.addEventListener("click", e => {
    // Prevents the default behavior of the button click (form submission, page reload, etc.)
    e.preventDefault();

    // Checks if the textarea has content
    if (textarea.value !== "") {
        // Checks if the Speech Synthesis API is not currently speaking
        if (!synth.speaking) {
            // Calls the 'textToSpeech' function to convert the textarea content to speech
            textToSpeech(textarea.value);
        }

        // Checks if the textarea content is longer than 80 characters
        if (textarea.value.length > 80) {
            // Sets an interval to check if speech is no longer happening
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    // Updates 'isSpeaking' and button text when speech is finished
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                } else {
                    // Do nothing if speech is still happening or 'isSpeaking' is true
                }
            }, 500); // Interval set to 500 milliseconds (0.5 seconds)
// Continuation of the event listener for the "Convert To Speech" button click
if (isSpeaking) {
    // If speech is currently happening, resume the speech
    synth.resume();
    isSpeaking = false;
    speechBtn.innerText = "Pause Speech";
} else {
    // If speech is paused, pause the speech
    synth.pause();
    isSpeaking = true;
    speechBtn.innerText = "Resume Speech";
}
} else {
    // If the textarea is empty, update the button text
    speechBtn.innerText = "Convert To Speech";
}
}
});
