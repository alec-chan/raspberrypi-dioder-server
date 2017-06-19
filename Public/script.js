var colorcontrol = document.getElementById("color");
var offcontrol = document.getElementById("off");

window.onload=function(){
    requestSettings();
};

function requestSettings(){
    console.log('requesting settings');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState===XMLHttpRequest.DONE){
            if(xhr.status===200){
                var status = JSON.parse(xhr.responseText);
                setSettings(status);
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


function submit(){
    console.log("submitting status: "+JSON.stringify({off:offcontrol.checked, color: colorcontrol.jscolor}));
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", "/submit");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
    requestSettings();
}