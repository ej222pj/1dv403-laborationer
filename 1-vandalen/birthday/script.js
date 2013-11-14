"use strict";

window.onload = function(){

	
	var birthday = function(date){
        /*var mili = new Date().getTime();
        var sec = mili / 1000;
        var min = sec / 60;
        var hour = min / 60;
        var day = hour / 24;*/
        var todaysDate = new Date();
        var nextBirthday = new Date(date);
        /*var dateYear = "";
        var dateMon = "";
        var dateDay = "";
       for(var i = 0; i < date.length; i++)
        {
            if(i < 4)
                dateYear += date[i];
            else if(i > 4 && i < 7)
                dateMon += date[i];
            else if(i > 7)
                dateDay += date[i];
        }*/
        var yearsDiff =  todaysDate.getFullYear() - nextBirthday.getFullYear();
        var diff = (nextBirthday.getTime() - todaysDate.getTime()) + (((((yearsDiff*365.25)*24)*60)*60)*1000);
        var diffInDays = ((((diff / 1000)/60)/60)/24);

        return diffInDays
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