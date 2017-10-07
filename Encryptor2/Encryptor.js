const spetialSymbol = {
    open: "[",
    comma: ",",
    empty: "",
    close: "]"
};
let encryptionMatrix;
let decryptionMatrix;

const getSeparator = (index, symbol, length) => index != length - 1 ? symbol : spetialSymbol.empty;

function encryptMessage() {
    let number = Number(document.getElementById("n").value);

    encryptionMatrix = generateMatrix(number);
    document.getElementById("outputMatrix").value = matrixToString(encryptionMatrix); 

    decryptionMatrix = getInverseMatrix(encryptionMatrix);
    document.getElementById("matrixForDecrypt").value = matrixToString(decryptionMatrix); 
}

function getInverseMatrix(matrix) {
    let inverseMatrix = [[],[]];
    let tmpMatrix = matrix.slice();
    const length = tmpMatrix.length;
    let i = 0;
    tmpMatrix = swap(0, 1, tmpMatrix);
    do {
        let indexFromMinElement = getIndexFromMinElement(tmpMatrix[0]);
        while(i < length) {
            inverseMatrix[i].push(tmpMatrix[i][indexFromMinElement]);
            tmpMatrix[i].splice(indexFromMinElement, 1);
            i++;
        }
        i = 0;
    } while(tmpMatrix[0].length != 0);
    return inverseMatrix;
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
    matrixString += spetialSymbol.open;
    matrixString += "\n ";
    for(let i = 0; i < matrixLength; i++) {
        let line = matrix[i];
        const lineLength = line.length;
        matrixString += spetialSymbol.open;        
        for(let j = 0; j < lineLength; j++) {            
            matrixString += line[j].toString();
            matrixString += getSeparator(j, spetialSymbol.comma, lineLength);
        }
        matrixString += spetialSymbol.close;
        matrixString += getSeparator(i, spetialSymbol.comma, matrixLength);
        matrixString += getSeparator(i, "\n ", matrixLength);
    }
    matrixString += "\n";
    matrixString += spetialSymbol.close;
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

function decryptMessage() {

}