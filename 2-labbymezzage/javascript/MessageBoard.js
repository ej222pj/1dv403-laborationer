"use strict";
(function () {
    var submit = document.getElementById("submit"),
    input = document.querySelector("#readMessage");
    
    var MessageBoard = {
        
        messages: [],
   
     
        init: function (message){
            this.messages.push(new Message(message, new Date()));
            alert(MessageBoard.messages[0].getText());
        }
        
    };
     //window.onload = MessageBoard.init("dasd");
     
    //Denna functionen lyssnar på om man klickar på skicka knappen
    submit.addEventListener("onclick", function (e){
        e = e || event; //Event är för IE
        e.preventDefault();
        if((input.value).trim().length === 0){
            return;
        }
        MessageBoard.createMessage(input.value.trim());
        MessageBoard.renderMessages();
    }, false);
    
}());