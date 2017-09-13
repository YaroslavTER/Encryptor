const coeficients = {
    begin: 97, 
    end: 123,
    limit: 26 
};

const mod = (a, b) => (a % b + b) % b;
const shift = (charCode, key) => mod(charCode + key, coeficients.limit);
const isChar = (charCode) => charCode >= coeficients.begin &&
    charCode <= coeficients.end ? true : false;

function getAlphabet(alphabet) {
    for(let i = coeficients.begin; i < coeficients.end; i++) {
        alphabet.push(String.fromCharCode(i));
    }
    return alphabet;
}

function convertKeyIntoIntArray(line) {
    const length = line.length;
    let numbers = [];

    for(let i = 0; i < length; i++) {
        if(isChar(line.charCodeAt(i))) 
            numbers.push(Number(line.charCodeAt(i)) - coeficients.begin);
        else 
            return [Number(line)];
    }

    return numbers;
}

function convertMessageIntoIntArray(message) {
    const length = message.length;
    let charCodesOfMessage = [];
    for(let i = 0; i < length; i++) {
        charCodesOfMessage.push(message.charCodeAt(i) - coeficients.begin);
    }
    return charCodesOfMessage;
}

function converCharCodesIntoLine(codes) {
    let line = "";
    for(let code of codes) {
        line += String.fromCharCode(code + coeficients.begin);
    }
    return line;
}

function encrypt(isReverseKey) {
    let alphabet = getAlphabet([]);
    let message = document.getElementById("messageId").value;
    let keys = convertKeyIntoIntArray(document.getElementById("keyId").value);
    let encryptedMessage = "";
    let j = 0;
    let charCodesOfMessage = convertMessageIntoIntArray(message);
    const keysLength = keys.length;
    const length = charCodesOfMessage.length;
    let shiftedCodes = [];

    for(let i = 0; i < length; i++) {
        let key = keys[mod(j++, keysLength)];
        shiftedCodes.push(shift(charCodesOfMessage[i], isReverseKey ? -key : key )); 
    };

    encryptedMessage = converCharCodesIntoLine(shiftedCodes);
    document.getElementById("encrypterMessageId").value = encryptedMessage;
}
