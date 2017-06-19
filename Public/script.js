var color='#ffffff';
var off=true;

var colorcontrol = document.getElementById("color");
var offcontrol = document.getElementById("off");

window.onload=function(){
    requestSettings(setSettings());
};

function requestSettings(callback){
    console.log('requesting settings');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState===XMLHttpRequest.DONE){
            if(xhr.status===200){
                var status = JSON.parse(xhr.responseText);
                callback(status);
                console.log('got settings, '+status);
            }
        }
    }

    xhr.open("GET", "/status", true);
    xhr.send();
    return xhr.onreadystatechange();
}

function setSettings(resp){
    colorcontrol.jscolor.fromString(resp.color);
    offcontrol.checked=resp.off;
}


function update(jscolor) {
    color='#' + jscolor;
}

function toggleOff(cb){
    off=cb.checked;
}


function submit(){
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", "/submit");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({off:off, color: color}));
    requestSettings();
}