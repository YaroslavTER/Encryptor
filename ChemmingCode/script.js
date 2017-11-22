const mod = (a, b) => (a % b + b) % b;
const limit = 2;

const calcualteCoefs = (nameOfOutputCoef, nameOfInputCoef, numbersOfInputCoefs) => {
    document.getElementById(nameOfOutputCoef).value = mod(
        Number(document.getElementById(nameOfOutputCoef).value) +
            numbersOfInputCoefs.reduce((sum, value) => sum + 
                Number(document.getElementById(nameOfInputCoef + 
                    value.toString()).value), 0
    ), limit);
};

const resetCoefs = (coefsName, coefsNumbers) => 
    coefsNumbers.forEach((coefNumber) => 
        document.getElementById(coefsName + coefNumber).value = "");

function calculateK() {
    resetCoefs("k", [1, 2, 3]);

    calcualteCoefs("k1", "i", [2, 3, 4]);
    calcualteCoefs("k2", "i", [1, 3, 4]);
    calcualteCoefs("k3", "i", [1, 2, 4]);
}

function calculateSi() {
    resetCoefs("S", [1, 2, 3]);

    calcualteCoefs("S1", "i", [4]);
    calcualteCoefs("S1", "k", [1, 2, 3]);

    calcualteCoefs("S2", "i", [2, 3]);
    calcualteCoefs("S2", "k", [2, 3]);

    calcualteCoefs("S3", "i", [1, 3]);
    calcualteCoefs("S3", "k", [1, 3]);
}
/*
a4+a5+a6+a7
i4+k1+k2
*/