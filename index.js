let socketio = require("socket.io");
let express = require("express");
fs = require('fs');

let app = express();
app.use(express.static("web"));
let web = app.listen(3000, function() {
    console.log("Running");
})

let io = socketio(web)
let history
io.on("connection", function(socket) {
    console.log("connected to" + socket.id)
    fs.readFile("text.txt", 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        //console.log(data)
        history = data
    })
    socket.emit("history", history)

    socket.on("chat", function(message) {
        io.emit("chat", message);

        fs.appendFile('text.txt', message.name + ": " + message.msg + "<br>", function(err) {
            if (err) return console.log(err);
        });
    });


    socket.on("disconnet", function() {
        console.log("disconnected from " + socket.id);
    });
})