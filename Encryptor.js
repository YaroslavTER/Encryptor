const coeficients = {
    begin: 97, 
    end: 123,
    limit: 26 
};

const mod = (a, b) => (a % b + b) % b;
const shift = (charCode, key) => mod(charCode + key, coeficients.limit) + coeficients.begin;
const isChar = (charCode) => charCode >= coeficients.begin &&
    charCode <= coeficients.end ? true : false;

function getAlphabet(alphabet) {
    for(let i = coeficients.begin; i < coeficients.end; i++) {
        alphabet.push(String.fromCharCode(i));
    }
    return alphabet;
}

function convertIntoIntArray(line) {
    const length = line.length;
    let numbers = [];

    for(let i = 0; i < length; i++) {
        console.log(line);
        if(isChar(line.charCodeAt(i))) 
            numbers.push(Number(line.charCodeAt(i)));
        else 
            return [Number(line)];
    }

    return numbers;
}

function encrypt() {
    let alphabet = getAlphabet([]);
    let message = document.getElementById("messageId").value;
    let keys = convertIntoIntArray(document.getElementById("keyId").value);
    let encryptedMessage = "";
    let j = 0;
    const length = message.length;

    for(let i = 0; i < length; i++) {
        let currentKey = keys[mod(j++, keys.length)];
        charCode = shift(message.charCodeAt(i), currentKey);
        encryptedMessage += String.fromCharCode(charCode);
    }

    document.getElementById("encrypterMessageId").value = encryptedMessage;
}
