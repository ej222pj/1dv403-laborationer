"use strict";
window.onload = function(){
    var form = document.getElementById("form");
    var fn = form.elements["fName"];
    var ln = form.elements["lName"];
    
    var checkName = /^[A-ZÅÄÖa-zåäö]{1,}$/;

    var firstNameInfo = document.getElementById("firstName");
    var lastNameInfo = document.getElementById("lastName");
    var firstNameP = document.createElement("p");
    var lastNameP = document.createElement("p");
    firstNameInfo.appendChild(firstNameP);
    lastNameInfo.appendChild(lastNameP);
    
    fn.onblur = function() {
    if(!checkName.test(fn.value)){
            firstNameP.innerHTML = "Skriv in ditt förnamn";
        }
    },
    ln.onblur = function() {
    if(!checkName.test(ln.value)){
            lastNameP.innerHTML = "Skriv in ditt efternamn";
        }
    },

    form.onsubmit = function(e){
        if(!checkName.test(fn.value) && !checkName.test(ln.value)){
            return false;
        }
        //Returnera false om allt inte går igenom!      
    };
};


// /^\d{4}\-\d{2}\-\d{2}$/; 