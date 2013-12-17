"use strict";
(function () {
    var submit = document.querySelector("#submit"),
    showMessage = document.querySelector("#messagearea"),
    messageCount = document.querySelector("#count"),
    input = document.querySelector("form textarea");
    
    var MessageBoard = {
        
        messages: [],
   
     
        createMessage: function (text) {
            this.messages.push(new Message(text, new Date()));
        },
        
        renderMessage: function(messageID){
        var content = document.createElement("div");
        var mainMessage = document.createElement("div");
        var picsMessage = document.createElement("div");
        var footMessage = document.createElement("div");
        var text = document.createElement("p");
        var date = document.createElement("p");
        var deleteLink = document.createElement("a");
        var deleteImg = document.createElement("img");
        var timeLink = document.createElement("a");
        var timeImg = document.createElement("img");
        
        content.setAttribute("class", "contentMessage");
        content.setAttribute("id", messageID.toString());
        mainMessage.setAttribute("class", "mainMessage");
        picsMessage.setAttribute("class", "picsMessage");
        footMessage.setAttribute("class", "footMessage");
        deleteLink.setAttribute("href", "#");
        timeLink.setAttribute("href", "#");
        deleteImg.setAttribute("src", "pics/delete.png");
        timeImg.setAttribute("src", "pics/time.png");
        text.innerHTML = MessageBoard.messages[messageID].getHTMLText();
        date.innerHTML = MessageBoard.messages[messageID].getDateText();
        
        showMessage.appendChild(content);//Lägger content innuti IDt messagearea
        mainMessage.appendChild(text);//Lägger text i mainMessage classen
        deleteLink.appendChild(deleteImg);//Lägger deletebilden i deletelänken
        timeLink.appendChild(timeImg);//Lägger tidbilden i tid länken
        picsMessage.appendChild(deleteLink);//Lägger deletelänken i picsMessage classen
        picsMessage.appendChild(timeLink);//lägger timelänken i picsMessage classen
        footMessage.appendChild(date);//Lägger datum i tooMessage classen
        content.appendChild(mainMessage);//Lägger alla classer i ContenMessage classen som ligger i MessageArea
        content.appendChild(picsMessage);
        content.appendChild(footMessage);
        

        },
        renderMessages: function(){
            //Ta bort meddelanden
            showMessage.innerHTML = "";
            MessageBoard.EmptyTheTextField();
            //Skriver meddelanden
            for(var i = MessageBoard.messages.length -1; i >= 0; --i){
                MessageBoard.renderMessage(i);
            }
            messageCount.innerHTML = "Antal meddelanden: " + MessageBoard.messages.length;
            
        },
        deleteMessage: function(id){
            this.messages.splice(id, 1);
            this.renderMessages();
        },
        timeMessage: function(id){
            alert("Meddelandet skapades " + MessageBoard.messages[id].getDate().toLocaleString());
        },
        //Tömmer textfälted när denna functionen ropas på
        EmptyTheTextField: function(){
            input.value = "";
        }
    };
           
    //Denna functionen lyssnar på om man klickar på skicka knappen
    submit.addEventListener("click", function (e){
        e = e || event; //Event är för IE
        e.preventDefault();
        if((input.value).trim().length === 0){
            return;
        }
        MessageBoard.createMessage(input.value.trim());
        MessageBoard.renderMessages();
    }, false);
    
    //Lyssnar om man trycker på enter eller shift enter
    input.addEventListener("keypress", function (e){
        e = e || event; //Event är för IE
        if(e.keyCode !== 13 || e.shiftKey === true)
        {
            return;
        } 
        else
        {
        e.preventDefault();
            if(input.value.trim().length === 0)
            {
                MessageBoard.EmptyTheTextField();
                return;
            }
        MessageBoard.createMessage(input.value.trim());
        MessageBoard.renderMessages();
        }
        
    }, false);
    
    //Denna funktionen lyssnar på om man klickar på delete eller time bilderna
    showMessage.addEventListener("click", function (e) {
    e = e || window.event; // IE-fix
    e.preventDefault();
    var hit = e.target;
    var id;
    var confirm;
    if (hit.hasAttribute("src")) {
        id = hit.parentNode.parentNode.parentNode.getAttribute("id");
        // Raderar meddelandet om man trycker på delete.
        if (hit.getAttribute("src") === "pics/delete.png") {
            confirm = window.confirm("Är du säker på att du vill ta bort meddelandet?");
            if (confirm === false) {
                return;
            } else {
                MessageBoard.deleteMessage(id);
            }
        }
        // Visar tiden om man trycker på tid.
        else {
            MessageBoard.timeMessage(id);
        }
    }
}, false);
}());