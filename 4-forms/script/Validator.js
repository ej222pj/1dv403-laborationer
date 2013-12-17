"use strict";
window.onload = function(){
    var form = document.getElementById("form");
    var fn = form.elements["fName"];
    fn.focus();
    var checkName = /^[A-ZÅÄÖa-zåäö]{1,}$/;

    var errorInfo = document.getElementById("fName");
    var p = document.createElement("p");
    errorInfo.appendChild(p);
    
    var blur = function(infoText) {
    if(!checkName.test(fn.value)){
            p.innerHTML = infoText;
        }
    };
   /* function blur(infoText) {
        if(!checkName.test(fn.value)){
            p.innerHTML = infoText;
        }
    };*/
    fn.onblur = blur;
    form.onsubmit = function(e){
        if(!checkName.test(fn.value)){
            return false;
        }
        //Returnera false om allt inte går igenom!      
    };
};


// /^\d{4}\-\d{2}\-\d{2}$/; 