"use strict";

window.onload = function(){
	
	var secret = Math.floor(Math.random()*100)+1;
	var guessCount = 0;

	var guess = function(number){
        
        
		if(number == secret)
        {
            guessCount++;
            return [true, "Grattis du vann! Det hemliga talet var " + secret + " och du behövde " + guessCount + " gissningar för att hitta det."];
        }
        else if(number < secret && number > 0)
        {
            guessCount++;
            return [false, "Det hemliga talet är högre!"];
		}
		else if(number > secret && number < 101)
        {
            guessCount++;
            return [false, "Det hemliga talet är lägre!"];
		}
		else
		{
            return [false, "Talet är utanför intervallet 1 - 100"];
		}
	};
	
	// ------------------------------------------------------------------------------



	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#number");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		var answer = guess(input.value) // Läser in talet från textrutan och skickar till funktionen "guess"
		p.innerHTML = answer[1];		// Skriver ut texten från arrayen som skapats i funktionen.	

		if(answer[0] === true){				// Om spelet är slut, avaktivera knappen.
			submit.disabled = true;
		}
	
	});
};