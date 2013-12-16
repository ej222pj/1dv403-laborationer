"use strict";
    var Memory = function(gameId, rows, cols) {

    // To save the random array from random.js.
    this.memoryCards = [];

    this.init = function () {
        var  that = this, nbrOfPicsUp = 0, secondChoice = null, nbrOfGuesses = 0, foundPairs = 0;
        
        // Skapar arrayen
        this.memoryCards = RandomGenerator.getPictureArray(rows, cols);
        
        // Skapar divven för information och knappen
        var p = document.createElement("p");
        var infoDiv = document.createElement("div");
        var newGame = document.createElement("button");
        var resetGame = document.createElement("button");
        var div = document.getElementById(gameId);
        
        infoDiv.setAttribute("id", gameId + "Info");
        
        infoDiv.appendChild(p);

        // skapar nytt spel/Reset spel
        resetGame.setAttribute("type", "button");
        newGame.setAttribute("type", "button");
        newGame.setAttribute("disabled", "disabled");
        
        resetGame.innerHTML = "Nollställ";
        newGame.innerHTML = "Nytt spel";
        
        newGame.onclick = function () {//Nytt spel knappen
            div.removeChild(table);
            div.removeChild(infoDiv);
            div.removeChild(newGame);
            div.removeChild(resetGame);
            that.init();
        };
        resetGame.onclick = function () {//Nollställ spel knappen
            div.removeChild(table);
            div.removeChild(infoDiv);
            div.removeChild(newGame);
            div.removeChild(resetGame);
            that.init();
        };
        
        // Om man klickar på a-taggen
        var flipCard = function(e){
            e = e || window.event;
            e.preventDefault();
            var firstChoice = e.currentTarget.getAttribute("id");
            if(secondChoice === firstChoice){/*Tom*/}//Om korten är samma. Gör inget. låt dom vara uppvända
            else{//Om korten inte är samma
                if(nbrOfPicsUp < 2){//Om antal uppvända bilder är under 2
                    that.flipUpCard(firstChoice);//vänd upp första bilden
                    nbrOfPicsUp++;//Räknar upp hur många bilder som är uppvända
                    if(!secondChoice){//Om secondChoice är null sett det till firstChoice
                        secondChoice = firstChoice;
                    }
                }
                if(nbrOfPicsUp >= 2){//Om antal uppvända bilder är över eller lika med 2
                    if(that.comparePics(firstChoice, secondChoice)){
                        that.makeUnclickable(firstChoice);//Gör valet oklickbart
                        that.makeUnclickable(secondChoice);
                        nbrOfPicsUp = 0;
                        secondChoice = null;
                        nbrOfGuesses++;
                        foundPairs++;
                        that.info("Antal par kvar: " + (that.memoryCards.length / 2 - foundPairs) + 
                        "<br />Gjorda gissningar: " + nbrOfGuesses);
                    } 
                    else{//Sätter timouten om bilderna inte är lika
                        setTimeout(function(){
                            that.flipDownCard(firstChoice);
                            that.flipDownCard(secondChoice);
                            nbrOfPicsUp = 0;
                            secondChoice = null;
                            nbrOfGuesses++;
                            that.info("Antal par kvar: " + (that.memoryCards.length / 2 - foundPairs) +
                                "<br />Gjorda gissningar: " + nbrOfGuesses);
                        }, 1000);
                    }
                }
            //Kollar om spelaren klarat alla par
            if(foundPairs == that.memoryCards.length / 2){
                newGame.removeAttribute("disabled");
                newGame.removeAttribute("class");
                resetGame.setAttribute("disabled", "disabled");
                that.info("GRATTIS! Du behövde " + nbrOfGuesses + " gissningar för att vinna!");
            }
        }
    };
        // Lägger ut bilderna i en tabbel
        var row, col, pictureId = 0, td, tr, img, a;
        var table = document.createElement("table");
        for(row = 1; row <= rows; row += 1){
            tr = document.createElement("tr");
            for(col = 1; col <= cols; col += 1){
                img = document.createElement("img");
                a = document.createElement("a");
                td = document.createElement("td");
                
                img.setAttribute("src", "pics/0.png");
                a.setAttribute("class", (this.memoryCards[pictureId] + " clickable") );
                a.setAttribute("id", pictureId + gameId);
                a.setAttribute("href", "#");
                
                a.appendChild(img);
                td.appendChild(a);
                tr.appendChild(td);

                pictureId++;
                //Lägger en onclick function på A taggen som kallar på flipCard.
                a.onclick = flipCard;
            }
            table.appendChild(tr);
        }
        div.appendChild(table);
        div.appendChild(infoDiv);
        div.appendChild(newGame);
        div.appendChild(resetGame);
        this.info("Antal par kvar: " + (this.memoryCards.length / 2 - foundPairs) + 
        "<br />Gjorda gissningar: " + nbrOfGuesses);
    };
    //Function för att vända upp ett kort
    this.flipUpCard = function (nodeId) {
        var node = document.getElementById(nodeId);
        var index = parseInt(node.getAttribute("class"), 10);
        node.firstChild.setAttribute("src", "pics/" + index + ".png");
    };
    //Function för att vända ner ett kort
    this.flipDownCard = function (nodeId) {
        var node = document.getElementById(nodeId);
        node.firstChild.setAttribute("src", "pics/0.png");
    };
    //Function för att jämföra 2 uppflippade kort
    this.comparePics = function (nodeId1, nodeId2) {
        var src1 = document.getElementById(nodeId1).firstChild.getAttribute("src");
        var src2 = document.getElementById(nodeId2).firstChild.getAttribute("src");
        return (src1 === src2);
    };
    //Function för att begränsa antalet gissningar till 2
    this.makeUnclickable = function (nodeId) {
        var node = document.getElementById(nodeId);
        node.setAttribute("class", (node.getAttribute("class").replace("clickable", "unclickable")) );
        node.onclick = null;
    };
    //Function för att visa info om spelet
    this.info = function (text) {
        var node = document.getElementById(gameId + "Info");
        node.firstChild.innerHTML = text;
    };
};
new Memory("game1", 4, 4).init();
new Memory("game2", 2, 3).init();
new Memory("game3", 2, 4).init();