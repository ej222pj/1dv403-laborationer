"use strict";
// Skriv din kod här.... Skapa funktion "makePerson" som en global funktion.
var makePerson = function(persArr){
    var result = {};
    
    if(!persArr instanceof Array){
        throw new Error("FEL! Du måste skicka en array som argument!");
    }
    if(!persArr[0]){
        throw new Error("FEL! Du måste skicka med objekt i Arrayen!");
    }
    if(persArr.every(function(names){ 
        if('name' in names && typeof names.name === 'string'){
            return false;
        }
        else{
            return true;
        }
        
    })){
        throw new Error("FEL! Objekten i arrayen måste ha egenskapen name!");
    }
    if(persArr.every(function (age){
        if('age' in age && typeof age.age === 'number'){
            return false;
        }
        else if('born' in age && typeof age.born === 'string'){
            return false;
        } 
        else{
            return true;
        }
    })){
        throw new Error("FEL! Objekten i arrayen måste innehålla egenskaperna born och age!");  
    }
    // Tar ut alla namn, sorterar med och lägger den i en stäng.
    var sortNames = persArr.map(function(names){ return names.name }).sort(function(a, b) { return a.localeCompare(b); });//Plockar ut namnen 
    var sortedNames = sortNames.reduce(function (name1, name2) { return name1 + ", " + name2 });//Sorterar namnen i bokstavsordning
    
    // Tar fram den högsta och den minsta åldern samt medelåldern.
    persArr.sort(function(pers1, pers2) { return pers1.age - pers2.age; });
    var minAge = persArr[0].age;
    var maxAge = persArr[persArr.length - 1].age;
    var averageAge = Math.round(persArr.map(function(human) { return human.age }).reduce( function (a, b) { return a + b }) / persArr.length);    

    
    result = { minAge: minAge, maxAge: maxAge, averageAge: averageAge, names: sortedNames };
    return result;
};


var data = [{name: "Evelina Nilsson", age: 19}, {name: "Simon Jennerstrand", age: 15}, {name: "Eric Sjöström", age: 20}, {name: "Adam Weinfors", age: 45}];

var result = makePerson(data);

console.log(result);



