let socket = io();

let name = "?"

function sendMessage() {
    if (name === "?") {
        let belowName = document.getElementById("belowName")
        belowName.innerHTML = "Please specify name."
    } else if (document.getElementById("messageBox").value === "") { document.getElementById("belowMessage").innerHTML = "Please enter a valid message." } else {
        let msg = document.getElementById("messageBox").value;
        let full = { name, msg }
        socket.emit("chat", full);
    }
}

function setName() {
    name = "<b>" + document.getElementById("nameBox").value + "</b>"
    let belowName = document.getElementById("belowName")
    belowName.innerHTML = ""
    let msg = "<b> has joined the chat.</b>"
    let full = { name, msg }
    socket.emit("chat", full)
}

socket.on("chat", function(message) {
    document.getElementById("chatBox").innerHTML += message.name + ": " + message.msg + "<br>"
    let n = message.name
    n = n.replace("<b>", "")
    n = n.replace("</b>", "")
        //console.log(n)
    let me = message.msg
    me = me.replace("<b>", "")
    me = me.replace("</b>", "")
    console.log(n === name)
    console.log(name)
    console.log(n)
    if (message.name != name) {
        var read = new SpeechSynthesisUtterance();
        read.text = n + ":" + me;
        window.speechSynthesis.speak(read);
    }
})

socket.on("history", function(history) {
    document.getElementById("chatBox").innerHTML = history
})