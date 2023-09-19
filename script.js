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
