const symbolsData = { 
    symbols: [],
    messageLength: 0
}; 

const graphCoefs = {
    begin: 0,
	step: 5,
    size: 20
};

var canvas = document.getElementById('canvasId');
var ctx = canvas.getContext('2d');

const canvasParams = {
	width: canvas.width,
	height: canvas.height
};

const cutDigitsAfterDot = (number, numberOfDigits) => Number(number.toString()
    .slice(0, numberOfDigits + getStringBefore(number, ".").length + 1)); 

const getStringBefore = (number, separator) => number.toString().split(separator)[0];

function calculate() {
    let message = document.getElementById("message").value;
    symbolsData.messageLength = message.length;
    symbolsData.symbols = null;
    symbolsData.symbols = [];
    coutnNumberOfRepeats(message);
    console.log(symbolsData);
    createAGraph();
}

function coutnNumberOfRepeats(message) {
    message = message.split("").sort().join("");
    console.log(message);
    while(message) {
        let symbolToFind = message.charAt(0);
        let regex = new RegExp(symbolToFind.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), "g");
        let matchResult = message.match(regex);
        matchResult = matchResult || "";
        let matchLength = matchResult.length;
        symbolsData.symbols.push(
            {
                symbol: symbolToFind, 
                numberOfRepeats: matchLength, 
                frequencyCoef: matchLength / symbolsData.messageLength
            }
        );
        message = message.replace(regex, "");
    }
    return symbolsData;
}

function createAGraph() {
	let retreat = graphCoefs.size;
	ctx.clearRect(0, 0, canvasParams.width, canvasParams.height);
    for(let element of symbolsData.symbols) {
		ctx.fillStyle = "black";
		ctx.fillRect(graphCoefs.begin, retreat, graphCoefs.size*element.numberOfRepeats, graphCoefs.size);
		ctx.fillStyle = "white";
		retreat += graphCoefs.size + graphCoefs.step;
		ctx.fillText(element.symbol, 0, retreat - graphCoefs.size / 2);
	}
}