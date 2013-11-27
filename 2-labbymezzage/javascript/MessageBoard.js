"use strict";
(function () {
    var MessageBoard = {
        
        messages: [],
   
     
        init: function (message){
            this.messages.push(new Message(message, new Date()));
            alert(MessageBoard.messages[0].getText());
        }
        
    };
     window.onload = MessageBoard.init("dasd");
}());