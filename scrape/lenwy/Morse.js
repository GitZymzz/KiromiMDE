const axios = require('axios');

    // Peta kode Morse
    const morseCodeMap = {
        'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',   'E': '.',     'F': '..-.',
        'G': '--.',   'H': '....',  'I': '..',    'J': '.---',  'K': '-.-',   'L': '.-..',
        'M': '--',    'N': '-.',    'O': '---',   'P': '.--.',  'Q': '--.-',  'R': '.-.',
        'S': '...',   'T': '-',     'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',
        'Y': '-.--',  'Z': '--..',  '1': '.----', '2': '..---', '3': '...--', '4': '....-', 
        '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
        ' ': '/'
    };

    async function convertToMorse(text) {
        const upperText = text.toUpperCase();
        let morseCode = '';

        for (let char of upperText) {
            if (morseCodeMap[char]) {
                morseCode += morseCodeMap[char] + ' ';
            } else {
                morseCode += '? ';
            }
        }
        return morseCode.trim();
    }

module.exports = convertToMorse;