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
                console.log('got settings, '+xhr.responseText);
            }
        }
    }

    xhr.open("GET", "/status", true);
    xhr.send();
    return xhr.onreadystatechange();
}
function togglecolor(val){
    if(val){
        if(!colorcontrol.classList.contains("hidden")){
            colorcontrol.classList.add("hidden");
        }
    }
    else{
        if(colorcontrol.classList.contains("hidden")){
            colorcontrol.classList.remove("hidden");
        }
    }
}
function setSettings(resp){
    colorcontrol.jscolor.fromString(resp.color);
    offcontrol.checked=resp.off;
}


function submit(){
    var status=JSON.stringify({secretkey: "aGVsbG8gd29ybGQ=", off:offcontrol.checked, color: colorcontrol.jscolor.toHEXString()});
    console.log("submitting status: "+status);
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", "/submit");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(status);
    requestSettings();
}