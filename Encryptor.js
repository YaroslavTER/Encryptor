function CaesarCipher(){
    var inputText = document.getElementById("messageId").value
    var shift = Number(document.getElementById("keyId").value)
    var charCode = 0
    var outputText = ""
    for(var index = 0; index < inputText.length; index++){
        charCode = (inputText.charCodeAt(index) + shift)
        outputText += String.fromCharCode(charCode)
        console.log(charCode)
        console.log(String.fromCharCode(charCode))
    }
    document.getElementById("encrypterMessageId").value = outputText
}
