function dynamicLoad(sID, sURL) {
    var xhr = getXMLHttpRequest();
    xhr.overrideMimeType('text/plain; charset=utf-8');
    xhr.open("GET", sURL, true);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                document.getElementById(sID).innerHTML = xhr.responseText;
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.send(null);
}

function getXMLHttpRequest(){
    var xhr = null;
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest();
        }
    } else {
        alert("Your browser doesn't support XMLHTTPRequest...");
        return null;
    }
    return xhr;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function isGlobal(){
    return  getParameterByName('lang') === 'global';
}

function removeScriptNode(sClassName){
    for(var i=0;i<=document.querySelectorAll(sClassName).length;i++) {
        document.querySelector(sClassName).parentNode.removeChild(document.querySelectorAll(sClassName)[0]);
    }
}