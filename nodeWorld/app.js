var tip = 0;
var frames = 240;
var framerate = 30;
var period = 1000/framerate;
var rampFrame = 0;
var rampPeriod = 1000 * (frames/framerate);
var express = require('express');
var fs = require('fs');
var https = require('https');
var app = express();
// we will pass our 'app' to 'https' server
const server = https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'Pa55w0rd'
}, app)
.listen(3000, () => console.log('listening on port 3000'));
// const server = https.createServer({
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.cert')
// }, app)
// .listen(3000, () => console.log('Listening on port 3000!'))
var path = require("path");
const io = require("socket.io")(server);
var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://127.0.0.1");
// disalbe
//var osc = require('osc');
app.use("/public", express.static(__dirname + "/public"));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
// disable
// var oscServer = new osc.UDPPort({
//     localAddress: "10.0.1.15",
//     localPort: 8000
// });
// disable
// oscServer.open();
io.on("connection", function(socket) {
    var frame = 0;
    var frameIncrement;
    var loopDirection = "down";
    var loopFirstLoop;
    function looper(){
        tip = frame/frames;
// disable
        // oscServer.send({
        //   address: '/tipper',
        //   args: tip
        //   }, '127.0.0.1', 9000);
        frame = frame + frameIncrement;
    };
    function rampLooper() {
      if (loopDirection == "down") {
         mqttip = 0;
       } else {
         mqttip = 20;
       };
      client.publish("tip", String(mqttip));
    };
    socket.on("beginLoop", function(data) {
      console.log("loopFirstLoop");
      loopFirstLoop = 1;
    });
    socket.on("newLoop", function(data) {
      console.log("newLoop");
      loop = looper();
      rampLoop = rampLooper();
       if (loopFirstLoop) {
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
