// JavaScript Document
// Rechenquiz
// Alle Befehle, die folgen, werden automatisch ausgeführt
console.log('Seite geladen');
let summand1=5;
let summand2=10;
let ergebnis = summand1+summand2;
let aufgabentext=summand1+'+'+summand2;
// Testweises Ausgeben der Aufgabe auf der Console
console.log(aufgabentext);
// Ausgabe der Aufgabe auf der Webseite
//  Zugriff auf das Element mit der ID=aufgabe
document.getElementById('aufgabe').value=aufgabentext;

function check()
{
	console.log('Funktion wurde aufgerufen!');
	// Wert auslesen, den der User eingetragen hat
	let userWert= document.getElementById('userErgebnis').value;
	console.log(userWert);
}
