const symbolsData = { 
    symbols: [],
    messageLength: 0
};

function calculate() {
    let message = document.getElementById("message").value;
    symbolsData.messageLength = message.length;
    symbolsData.symbols = null;
    symbolsData.symbols = [];
    coutnNumberOfRepeats(message);
    console.log(symbolsData);
}

function coutnNumberOfRepeats(message) {
    message = message.split("").sort().join("");
    message = message.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    console.log(message);
    while(message) {
        let symbolToFind = message.charAt(0);
        let regex = new RegExp(symbolToFind, "g");
        let matchResult = message.match(regex);
        matchResult = matchResult || "";
        symbolsData.symbols.push({symbol: symbolToFind, numberOfRepeats: matchResult.length});
        message = message.replace(regex, "");
    }
    return symbolsData;
}