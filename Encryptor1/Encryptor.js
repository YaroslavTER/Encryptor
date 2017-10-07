const coeficients = {
    begin: 97, 
    end: 123,
    limit: 26 
};

const mod = (a, b) => (a % b + b) % b;
const shift = (charCode, key) => mod(charCode + key, coeficients.limit);
const isChar = (charCode) => charCode >= coeficients.begin &&
    charCode <= coeficients.end ? true : false;

const gcd = (a, b) => (a < b) ? 
    gcd(b, a) : ((a % b == 0) ? b : gcd(b, a % b));//наибольшый общий делитель

/*функции для проверки коефициентов*/
const isAValid = (a, m) => mod(a, 4) == 1 && a >= 0 && a < m;
//если наибольший целый делитель в числах равен единице, то они взаимопростые
const isBValid = (b, a, m) => b >= 0 && b < m && mod(b, 2) == 0 && gcd(a, b) == 1;
const isX0Valid = (x0, m) => x0 >= 0 && x0 < m;
const isMValid = (m, a, b, x0) => m >= 2 && m > a && m > b && m > x0;
/*!функции для проверки коефициентов*/

/*методы, которые используются в шифровании*/
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
/*методы, которые используются в шифровании*/

/*основной метод лабораторной роботы. Здесь и происходит генерация 
последовательности чисел для шифровки*/
function sequenceGeneration(a, b, m, x0) {
    let x = x0;
    let xi;
    let sequence = [x0];

    while(xi != x0) {
        xi = mod(a*x + b, m);
        x = xi;
        sequence.push(xi);
    }
    sequence.pop();
    return sequence;
}

/*обработка исключительных ситуаций. После проверки коефициентов, возращается объект, который показывает
все ли параметры подходят под требования. Если параметр нарушает условие, то он посылается в массив с названием 
параметра, значением и условием, которое етот параметр должен исполнять.*/
function isDataValid(encryptCoefs) {
    const numberOfValidParams = 4;
    let resultOfCheck = { 
        isDataValid: false, 
        invalidParams: [] 
    };
    let counterOfValidParams = 0;

    if(isAValid(encryptCoefs.a, encryptCoefs.m)) 
        counterOfValidParams++;
    else resultOfCheck.invalidParams.push({name: "a", value: encryptCoefs.a, mustBe: "mod(a, 4) == 1 && a >= 0 && a < m"});

    if(isBValid(encryptCoefs.b, encryptCoefs.a, encryptCoefs.m)) 
        counterOfValidParams++;
    else resultOfCheck.invalidParams.push({name: "b", value: encryptCoefs.b, mustBe: "b >= 0, b < m, b%2 == 0, gcd(a, b) == 1"});

    if(isMValid(encryptCoefs.m, encryptCoefs.a, encryptCoefs.b, encryptCoefs.x0)) 
        counterOfValidParams++;
    else resultOfCheck.invalidParams.push({name: "m", value: encryptCoefs.m, mustBe: "m >= 2, m > a, m > b, m > x0"});

    if(isX0Valid(encryptCoefs.x0, encryptCoefs.m)) 
        counterOfValidParams++;
    else resultOfCheck.invalidParams.push({name: "x0", value: encryptCoefs.x0, mustBe: "x0 >= 0 && x0 < m"}); 

    if(counterOfValidParams == numberOfValidParams)
        resultOfCheck.isDataValid = true;

    return resultOfCheck;
}

/*сложение сообщения об ошибке*/
function composeMessage(resultOfCheck) {
    let message = "The following conditions must be fulfilled: \n";

    for(let invalidParam of resultOfCheck.invalidParams) {
        message += invalidParam.mustBe + "\n";
    }

    return message;
}

/*функция, которая вызывается при клике на кнопки зашифровать или расшифровать. 
Сейчас она использует одину последовательность чисел для всего сообщения, пробелы не учитываются*/
const encryptCoefs = {
    a: 0,
    b: 0,
    m: 0,
    x0: 0
};

function findNextValidData() {
    do {
        encryptCoefs.a++;
    } while(!isAValid(encryptCoefs.a, encryptCoefs.m));

    do {
        encryptCoefs.b++;
    } while(!isBValid(encryptCoefs.b, encryptCoefs.a, encryptCoefs.m));

    do {
        encryptCoefs.m++;
    } while(!isMValid(encryptCoefs.m, encryptCoefs.a, encryptCoefs.b, encryptCoefs.x0));

    do {
        encryptCoefs.x0++;
    } while(!isX0Valid(encryptCoefs.x0, encryptCoefs.m));

}

function encrypt(isReverseKey) {
    let message = document.getElementById("messageId").value;
    let words = [];
    words = message.split(" ");
    let encryptedWords = [];

    encryptCoefs.a = Number(document.getElementById("a").value);
    encryptCoefs.b = Number(document.getElementById("b").value);
    encryptCoefs.m = Number(document.getElementById("m").value);
    encryptCoefs.x0 = Number(document.getElementById("x0").value);

    resultOfCheck = isDataValid(encryptCoefs);
    document.getElementById("sequencesId").value = "";
    if(resultOfCheck.isDataValid) {        
        for(let word of words) {
            
            let keys = sequenceGeneration(encryptCoefs.a, encryptCoefs.b, encryptCoefs.m, encryptCoefs.x0);
            
            encryptedWords.push(encryptMessage(isReverseKey, word, keys));
            document.getElementById("sequencesId").value += "{ " + keys + " } (" + keys.length + ")" + "\n";
            findNextValidData();
        }
        document.getElementById("encrypterMessageId").value = encryptedWords.join(" ");
    } else {
        window.alert(composeMessage(resultOfCheck));
    }
}

function encryptMessage(isReverseKey, message, keys) { 
    let alphabet = getAlphabet([]);
    let encryptedMessage = "";
    console.log(message);
    let charCodesOfMessage = convertMessageIntoIntArray(message);
    const keysLength = keys.length;
    const length = charCodesOfMessage.length;
    let shiftedCodes = [];
    let j = 0;

    
    for(let i = 0; i < length; i++) {
        let key = keys[mod(j++, keysLength)]; 
        shiftedCodes.push(shift(charCodesOfMessage[i], isReverseKey ? -key : key));
    };

    encryptedMessage = converCharCodesIntoLine(shiftedCodes);

    return encryptedMessage;       
    
}