var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var Redoid = require('redoid');
var redoid = Redoid({
    color: '#ffffff'
});
var off=false;
app.use( express.static( __dirname + '/Public' ));
app.use( bodyParser.json() );
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'Public', 'index.html'));
});

app.get('/status', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    var color=redoid.getLastQueuedColorHexValue();
    var status=JSON.stringify({ off: off, color: color});
    console.log('sending status: '+status);
    
    res.send(status);
});

app.post('/submit', function(req, res) {
    console.log(req.body);
    if(req.body.off){
        redoid.turnOff();
        off=true;
    }
    else
    {
        if(req.body.color){
            if(redoid.isColorValid(req.body.color)){
                redoid.transition(req.body.color, 1500);
                off=false;
            }
        }
    }
});

app.listen(8080);