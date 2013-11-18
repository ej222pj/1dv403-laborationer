"use strict";

window.onload = function(){

	
	var birthday = function(date){
	    
        var todaysDate = new Date();
        var nextBirthday = new Date(date);
        
        var dateFormat=/^\d{4}\-\d{2}\-\d{2}$/;    
        if(!date.match(dateFormat)) {
	        throw new Error ("Din inmatning är inte skriven med den rätta formen ÅÅÅÅ-MM-DD!"); 
	    }
        var yearsDiff =  todaysDate.getFullYear() - nextBirthday.getFullYear();//Tar fram hur många år användaren är.
        //Min födelsedag minus millisec sen 1970. plus mina år i millisec
        var diff = (nextBirthday.getTime() - todaysDate.getTime()) + (((((yearsDiff*365.25)*24)*60)*60)*1000);//year/day/hour/min/sec/milisec
        var diffInDays = ((((diff / 1000)/60)/60)/24);//sec/min/hour/day



        return Math.ceil(diffInDays)
         
        
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



}