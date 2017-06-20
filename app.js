var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var Redoid = require('redoid');


//initialize the lights with color white
var redoid = Redoid({
    color: '#ffffff',
    //specific to my config
    colorComponentPins: [4, 17, 23]
});

//some kind of a password system.  but this is a joke 
var secretkey="aGVsbG8gd29ybGQ=";
//is the light off?
var off=false;

//static file dir
app.use( express.static( __dirname + '/Public' ));
//specify json for body data encoding
app.use( bodyParser.json() );


// viewed at http://localhost:80
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'Public', 'index.html'));
});


//api endpoint for clients to get current status of the lights
app.get('/status', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    var color=redoid.getLastQueuedColorHexValue();

    //build our response
    var status=JSON.stringify({ off: off, color: color});
    console.log('sending status: '+status);
    
    res.send(status);
});


//http post endpoint for requesting a light status change
app.post('/submit', function(req, res) {
    //if the http post has a body
    if(req.body){
        //if the auth is valid
        if(req.body.secretkey===secretkey){
            console.log("recieved request: "+req.body);
            //if we are requested to turn lights off
            if(req.body.off){
                redoid.turnOff();
                off=true;
            }
            //if turn off was not requested
            else
            {
                //if the body data contains a color
                if(req.body.color){
                    if(redoid.isColorValid(req.body.color)){
                        redoid.transition(req.body.color, 1500);
                        off=false;
                    }
                }
            }
        }
    }
});


console.log("Server started on port 80. Logging all API requests/responses...");
//run off port 80 (http)
app.listen(80);