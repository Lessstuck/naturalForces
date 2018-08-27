var tip = 0;
var frames = 240;
var framerate = 30;
var period = 1000/framerate;
var express = require('express');
var app = express();
const server = app.listen(3000);
var path = require("path");
const io = require("socket.io")(server);
var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://127.0.0.1");
client.on("connect", function() {
    client.publish("tip");
});
var osc = require('osc');
//app.use(express.static('./public'));
app.use("/public", express.static(__dirname + "/public"));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
// pass mqtt messages to socket
// client.on("message", function(topic, message) {
//     io.sockets.emit("data", String(message));
//     console.log(String(message));
// });
var oscServer = new osc.UDPPort({
  localAddress: "10.0.1.15",
    localPort: 8000
});
oscServer.open();
io.on("connection", function(socket) {
    var frame, frameIncrement;
    var loopDirection = "down";
    var loopFirstLoop = 1;
    // looper is updated each newLoop
    function looper(){
        tip = frame/frames;
        console.log(frame + "  " + tip);
        oscServer.send({
          address: '/tipper',
          args: tip
        }, '127.0.0.1', 9000);
        frame = frame + frameIncrement;
      };
    // First loop starts setInterval, subsequent loops change direction
    socket.on("newLoop", function(data) {
      console.log("newLoop");
      if (loopFirstLoop == 1) {
            loop = setInterval(looper, period);
            loopFirstLoop = 0;
      };
      switch (loopDirection) {
        case "up":
          frame = 0;
          frameIncrement = 1;
          loopDirection = "down";
          break;
        case "down":
          frame = 240;
          frameIncrement = -1;
          loopDirection = "up";
          break;
      };
      });
  });
    // // OSC messages to mqtt to control motor
    // client.publish("tip", String(messInt, 2));
    // // OSC messages to socket to control webVR animations
    // io.sockets.emit('data', mess);
    // console.log("OSC Message: ", mess);
// OSC messages to Mad Mapper
