// JavaScript Document
// Rechenquiz
// Alle Befehle, die folgen, werden automatisch ausgeführt
console.log('Seite geladen');
let emojiKorrekt=String.fromCodePoint(0x1F44D);
let emojiFalsch= String.fromCodePoint(0x1F44E);
let meldungFuerRichtigeLoesung='Wow! Das war super!';
let meldungFuerFalscheLoesung='Oh! Das kannst du bestimmt besser!';
let zahlenbereichMin=1;
let zahlenbereichMax=10;


let summand1=zufallszahl(zahlenbereichMin,zahlenbereichMax);
let summand2=zufallszahl(zahlenbereichMin,zahlenbereichMax);
let ergebnis = summand1+summand2;
let aufgabentext=summand1+'+'+summand2;
// Testweises Ausgeben der Aufgabe auf der Console
console.log(aufgabentext);
// Ausgabe der Aufgabe auf der Webseite
//  Zugriff auf das Element mit der ID=aufgabe
document.getElementById('aufgabe').value=aufgabentext;

function zufallszahl(min, max)
	{
		return Math.floor(Math.random()*(max-min))+min;
	}

function check()
{
	console.log('Funktion wurde aufgerufen!');
	// Wert auslesen, den der User eingetragen hat
	let userWert= document.getElementById('userErgebnis').value;
	console.log(userWert);
	// Werte vergleichen
	if(userWert==ergebnis)
	   {
	   		console.log('Richtig!');
		   	// Zeile wurde deaktiviert, um das Emoji auszugeben
		    // document.getElementById('meldung').value=meldungFuerRichtigeLoesung;
		   	   document.getElementById('meldung').value=emojiKorrekt;
	   }else
		   {
			console.log('Falsch!');
			// Zeile wurde deaktiviert, um das Emoji auszugeben
			// document.getElementById('meldung').value=meldungFuerFalscheLoesung;
			   document.getElementById('meldung').value=emojiFalsch;
		   }
}
