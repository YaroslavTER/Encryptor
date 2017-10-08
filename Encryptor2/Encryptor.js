const specialSymbol = {
    open: "[",
    comma: ",",
    empty: "",
    close: "]",
    auxiliar: "_",
    newLine: "\n",
    space: " "
};
let encryptionMatrix;
let decryptionMatrix;

const getSeparator = (index, symbol, length) => index != length - 1 ? symbol : specialSymbol.empty;

function encryptMessage() {
    let number = Number(document.getElementById("n").value);

    encryptionMatrix = generateMatrix(number);
    document.getElementById("outputMatrix").value = matrixToString(encryptionMatrix);

    let sentence = document.getElementById("message").value.split(specialSymbol.space);

    document.getElementById("encryptedMessage").value = applyMatrixToSentence(sentence, encryptionMatrix);

    decryptionMatrix = getInverseMatrix(encryptionMatrix);
    document.getElementById("matrixForDecrypt").value = matrixToString(decryptionMatrix); 
}

function decryptMessage() {
    let sentence = document.getElementById("message").value.split(specialSymbol.space);
    document.getElementById("encryptedMessage").value = applyMatrixToSentence(sentence, decryptionMatrix);
}

function removeAuxiliarSymbol() {
    let message = document.getElementById("encryptedMessage").value.split(specialSymbol.empty);
    const length = message.length;
    for(let i = 0; i < length; i++) {
        if(message[i] == specialSymbol.auxiliar) {
            message.splice(i, 1);
            i--;
        }
    }
    document.getElementById("encryptedMessage").value = message.join(specialSymbol.empty);
}

function applyMatrixToSentence(sentence, matrix) {
    let encryptedWords = [];
    
    for(let word of sentence) {
        encryptedWords.push(applyMatrixToWord(word.split(specialSymbol.empty), matrix));
    }

    return encryptedWords.join(specialSymbol.space);
}

function applyMatrixToWord(word, matrix) {
    let partList = separateWordByMatrixLength(word, matrix);
    let encryptedWordList = [];
    
    for(let part of partList) {
        encryptedWordList.push(sortMatrix(part, 1));
    }    

    return joinList(encryptedWordList);
}

function joinList(list) {
    let line = "";
    for(let part of list) {
        line += part[0].join("");
    }
    return line;
}

function separateWordByMatrixLength(word, matrix) {
    const codeLength = matrix[1].length;
    const wordLength = word.length;
    let partList = [];

    if(wordLength > codeLength) {
        let part = [];
        let counter = 0;
        while(counter < wordLength) {
            part.push(word[counter]);
            if(part.length == codeLength) {
                partList.push([part, matrix[1].slice()]);
                part = null;
                part = [];
            }
            counter++;
        }      
        if(part.length != 0) {
            partList.push(getBalancedMatrix([part, matrix[1].slice()]));
        }
    } else {
        console.log(word);
        partList.push(getBalancedMatrix([word, matrix[1].slice()]))
    }

    return partList;
}

function getBalancedMatrix(matrix) {
    const numberOfAuxElements = matrix[1].length - matrix[0].length;
    let smallerArray = matrix[0];
    let counter = 0;
    while(counter < numberOfAuxElements) {
        smallerArray.push(specialSymbol.auxiliar);
        counter++;
    }
    return matrix;
}

function getInverseMatrix(matrix) {    
    let inverseMatrix = sortMatrix(matrix, 1);
    inverseMatrix = swap(0, 1, inverseMatrix);
    return inverseMatrix;
}

function sortMatrix(matrix, mainRowIndex) {
    let sortedMatrix = [[],[]];
    let tmpMatrix = matrix.slice();
    const length = tmpMatrix.length;
    let i = 0;
    do {
        let indexFromMinElement = getIndexFromMinElement(tmpMatrix[mainRowIndex]);
        while(i < length) {
            sortedMatrix[i].push(tmpMatrix[i][indexFromMinElement]);
            tmpMatrix[i].splice(indexFromMinElement, 1);
            i++;
        }
        i = 0;
    } while(tmpMatrix[0].length != 0);
    return sortedMatrix;
}

function getIndexFromMinElement(line) {
    let min = line[0];
    let index = 0;
    line.forEach(function(number, i) {
        if(number < min) {
            min = number;
            index = i;
        }
    });
    return index;
}

function matrixToString(matrix) {
    const matrixLength = matrix.length;
    let matrixString = "";
    matrixString += specialSymbol.open;
    matrixString += specialSymbol.newLine + specialSymbol.space;
    for(let i = 0; i < matrixLength; i++) {
        let line = matrix[i];
        const lineLength = line.length;
        matrixString += specialSymbol.open;        
        for(let j = 0; j < lineLength; j++) {            
            matrixString += line[j].toString();
            matrixString += getSeparator(j, specialSymbol.comma, lineLength);
        }
        matrixString += specialSymbol.close;
        matrixString += getSeparator(i, specialSymbol.comma, matrixLength);
        matrixString += getSeparator(i, specialSymbol.newLine + specialSymbol.space, matrixLength);
    }
    matrixString += specialSymbol.newLine;
    matrixString += specialSymbol.close;
    return matrixString;
}

function generateMatrix(number) {
    let matrix = [];
    let sequence = getSequence(number);
    matrix.push(sequence);
    matrix.push(mixSequence(sequence));
    return matrix;
}

function getSequence(number) {
    let sequence = [];
    let counter = 1;
    while(counter < number + 1) {
        sequence.push(counter);
        counter++;
    }
    return sequence;
}

function mixSequence(sequence) {
    const length = sequence.length;
    let mixedSequence = sequence.slice();
    for(let i = 0; i < length; i++) {
        mixedSequence = swap(i, getRandomIntBetween(1, length - 1), mixedSequence);
    }
    return mixedSequence;
}

function getRandomIntBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

function swap(firstIndex, secondIndex, sequence) {
    let tmp = sequence[firstIndex];
    sequence[firstIndex] = sequence[secondIndex];
    sequence[secondIndex] = tmp;
    return sequence;
}

function swapMessages() {
    let tmp = document.getElementById("message").value;
    document.getElementById("message").value = document.getElementById("encryptedMessage").value;
    document.getElementById("encryptedMessage").value = tmp;
}