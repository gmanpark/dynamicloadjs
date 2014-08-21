
/**
 * define document.querySelector & document.querySelectorAll for IE7
 *
 * A not very fast but small hack. The approach is taken from
 * http://weblogs.asp.net/bleroy/archive/2009/08/31/queryselectorall-on-old-ie-versions-something-that-doesn-t-work.aspx
 *
 */

(function () {
    var style = document.createStyleSheet(),
        select = function (selector, maxCount) {
            var
                all = document.all,
                l = all.length,
                i,
                resultSet = [];

            style.addRule(selector, "foo:bar");
            for (i = 0; i < l; i += 1) {
                if (all[i].currentStyle.foo === "bar") {
                    resultSet.push(all[i]);
                    if (resultSet.length > maxCount) {
                        break;
                    }
                }
            }
            style.removeRule(0);
            return resultSet;
        };

    //  be rly sure not to destroy a thing!
    if (document.querySelectorAll || document.querySelector) {
        return;
    }

    document.querySelectorAll = function (selector) {
        return select(selector, Infinity);
    };
    document.querySelector = function (selector) {
        return select(selector, 1)[0] || null;
    };
}());

function dynamicLoad(sID, sURL) {
    var xhr = getXMLHttpRequest();
    if(xhr.overrideMimeType){
        xhr.overrideMimeType('text/plain; charset=utf-8');
    }
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

function getParameterByName(name){
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function chkLang(sEnglish, sKorean){
    if(getParameterByName('lang') === 'global'){
        document.write(sEnglish);
    }else{
        document.write(sKorean);
    }
}

function removeScriptNode(sClassName){
    for(var i=0;i<=document.querySelectorAll(sClassName).length;i++) {
        document.querySelector(sClassName).parentNode.removeChild(document.querySelectorAll(sClassName)[0]);
    }
}
