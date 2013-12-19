"use strict";
(function () {
    var form = document.getElementById("form"),
        fName = form.elements["firstName"],
        lName = form.elements["lastName"],
        postal = form.elements["postalCode"],
        eMail = form.elements["emailAddress"];
    
    // Skapar ett error meddelande om man trycker på skicka
    var addError = function (node, text) {
        removeError(node);
        var label = document.getElementById(node.getAttribute("name")),
            explanation = document.createElement("small"),
            explanationText = document.createTextNode(text);

        explanation.setAttribute("class", "error");
        explanation.appendChild(explanationText);

        label.setAttribute("class", "error");
        node.setAttribute("class", node.getAttribute("class") + " error");
        node.parentNode.insertBefore(explanation, node.nextSibling);
    };

    // plockar bort error meddelandet om de inte behövs mer
    var removeError = function (node) {
        var label = document.getElementById(node.getAttribute("name")),
            explanation;

        if (node.getAttribute("class") === "name error" ||
                node.getAttribute("class") === "email error" ||
                node.getAttribute("class") === "postalCode error") {
            explanation = node.nextSibling;
            label.removeAttribute("class");
            node.setAttribute("class", node.getAttribute("class").replace(" error", ""));
            node.parentNode.removeChild(explanation);
        }
    };

    // Function som kör testet emot rätt input, returnerar true om de går igenom
    var controlInput = function (regex, input) {
        return regex.test(input);
    };

    // Kollar alla inputs returnerar true om allt är som det ska
    var controlInputs = function () {
        var allValid = true, i;

        for (i = 1; i <= form.elements.length - 3; i += 1) {
            // Kolla namnfälten
            if (form.elements[i].getAttribute("class").indexOf("name") !== -1) {
                if (!controlInput(/^.{1,}$/, form.elements[i].value)) {
                    allValid = false;
                    addError(form.elements[i], "Fältet får inte lämnas blankt.");
                }
            // Kolla postkodfältet
            } 
            else if (form.elements[i].getAttribute("class").indexOf("postalCode") !== -1) {
                if (!controlInput(/^(SE|se)?[\ ]?[\d]{3}(-|\ )?[\d]{2}$/, form.elements[i].value)) {
                    allValid = false;
                    addError(form.elements[i], "Fyll i ett korrekt postnummer.");
                } 
                else {//Byter ut SE och mellanslag mot inget
                    form.elements[i].value = form.elements[i].value.replace(/(SE|se|\ |-)/g, "");
                }
            // Kolla email fältet
            } 
            else if (form.elements[i].getAttribute("class").indexOf("email") !== -1) {
                if (!controlInput(/^\w+([\.\+]?\w+)*@([\w]+)\.([a-zA-Z]{2,8})$/, form.elements[i].value)) {
                    allValid = false;
                    addError(form.elements[i], "Fyll i en korrekt e-postadress.");
                }
            }
        }
        return allValid;
    };
    //Onblur functioner
    fName.onblur = function(){
        var allValid = true;
        if (!controlInput(/^.{1,}$/, form.elements[1].value)) {
            allValid = false;
            addError(form.elements[1], "Fältet får inte lämnas blankt.");
        }
        else{
            removeError(form.elements[1]);
            form.elements[1].value = form.elements[1].value.trim();
        }
        return allValid;
    };
    lName.onblur = function(){
        var allValid = true;
        if (!controlInput(/^.{1,}$/, form.elements[2].value)) {
            allValid = false;
            addError(form.elements[2], "Fältet får inte lämnas blankt.");
        }
        else{
            removeError(form.elements[2]);
            form.elements[2].value = form.elements[2].value.trim();
        }
        return allValid;
    };
    postal.onblur = function(){
        var allValid = true;
        if (!controlInput(/^(SE|se)?[\ ]?[\d]{3}(-|\ )?[\d]{2}$/, form.elements[3].value)) {
            allValid = false;
            addError(form.elements[3], "Fyll i ett korrekt postnummer.");
        }
        else{
            form.elements[3].value = form.elements[3].value.replace(/(SE|se|\ |-)/g, "");
        }
        if(controlInput(/^(SE|se)?[\ ]?[\d]{3}(-|\ )?[\d]{2}$/, form.elements[3].value)){
            removeError(form.elements[3]);
            form.elements[3].value = form.elements[3].value.trim();
        }
        return allValid;
    };
    eMail.onblur = function(){
        var allValid = true;
        if (!controlInput(/^\w+([\.\+]?\w+)*@([\w]+)\.([a-zA-Z]{2,8})$/, form.elements[4].value)) {
            allValid = false;
            addError(form.elements[4], "Fyll i en korrekt e-postadress.");
        }
        else{
            removeError(form.elements[4]);
            form.elements[4].value = form.elements[4].value.trim();
        }
        return allValid;
    }

    
    var createPopup = function () {
        var div0 = document.createElement("div"),
            div1 = document.createElement("div"),
            div2 = document.createElement("div"),
            header = document.createElement("header"),
            h2 = document.createElement("h2"),
            headerText = document.createTextNode("Vänligen bekräfta ditt köp"),
            div4 = document.createElement("div"),
            div5 = document.createElement("div"),
            accButton = document.createElement("button"),
            removeButton = document.createElement("button"),
            accButtonText = document.createTextNode("Bekräfta köp"),
            removeButtonText = document.createTextNode("Avbryt");

        div0.setAttribute("id", "overlay");
        div1.setAttribute("id", "popUp");
        

        // Läser data från formuläret till popupen
        for (var i = 1; i <= form.elements.length - 2; i += 1) {
            var p = document.createElement("p");
            p.setAttribute("class", "popupInfo");
            var text = document.createTextNode(document.getElementById(form.elements[i].name).textContent);
            p.appendChild(text);
            div4.appendChild(p);
            p = document.createElement("p");
            p.setAttribute("class", "popUptext");
            text = document.createTextNode(form.elements[i].value);
            p.appendChild(text);
            div4.setAttribute("class", "popUpInfoText");
            div4.appendChild(p);
        }
        accButton.setAttribute("type", "button");
        removeButton.setAttribute("type", "button");

        // Subimt formuläret ligger i popup fönstret
        accButton.addEventListener("click", function (e) {
            removePopup();
            setDisabledAllFields(false);
            form.submit();
            form.reset();
        }, false);
        // Tar bort popup fönstret
        removeButton.addEventListener("click", function (e) {
            removePopup();
            setDisabledAllFields(false);
        }, false);

        h2.appendChild(headerText);
        header.appendChild(h2);
        div2.appendChild(header);
        accButton.appendChild(accButtonText);
        removeButton.appendChild(removeButtonText);
        div5.appendChild(removeButton);
        div5.appendChild(accButton);
        div1.appendChild(div2);
        div1.appendChild(div4);
        div1.appendChild(div5);
        document.body.appendChild(div0);
        document.body.appendChild(div1);
    };

    // Ta bort popup
    var removePopup = function () {
        var div0 = document.getElementById("overlay"),
            div1 = document.getElementById("popUp");
        
        document.body.removeChild(div0);
        document.body.removeChild(div1);
    };

    // gör formuläret grått
    var setDisabledAllFields = function (bool) {
        for (var i = 1; i <= form.elements.length - 1; i += 1) {
            form.elements[i].disabled = bool;
        }
    };
    //Knappen som ligger på formuläret. 
    form.addEventListener("submit", function (e) {
        e = e || window.event;
        e.preventDefault();
        for(var i = 1; i < form.elements.length -2; i += 1){
            removeError(form.elements[i]);
            form.elements[i].value = form.elements[i].value.trim();
        }
        if (controlInputs()) {
            setDisabledAllFields(true);
            createPopup();
        }
    }, false);
}());