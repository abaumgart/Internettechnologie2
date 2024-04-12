// JavaScript Document
// Rechenquiz
// Einführung von Listenern

console.log('Seite geladen');
let emojiKorrekt=String.fromCodePoint(0x1F44D); // Symbol Daumen hoch der Variablen zuweisen
let emojiFalsch= String.fromCodePoint(0x1F44E); // Symbol Daumen runter der Variablen zuweisen

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
let hinweistext;
const ausgabetexte = [ 
			{
				txtFuerRichtigeAntworten:['Super','Toll!','Spitze','Wahnsinn!']
			},
			{
				txtFuerFalscheAntworten:['Ohje','Das war nichts','Das geht besser','Ich schaue weg']
			}	
		];

let hinweiseMin=0;
let posHinweiseMax=ausgabetexte[0].txtFuerRichtigeAntworten.length-1;
let negHinweiseMax=ausgabetexte[1].txtFuerFalscheAntworten.length-1;

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
		   hinweistext=ausgabetexte[0].txtFuerRichtigeAntworten[zufallszahl(hinweiseMin,posHinweiseMax)];
		   
		   	// Zeile wurde deaktiviert, um das Emoji auszugeben
		   document.getElementById('hinweis').value=hinweistext;
		   document.getElementById('meldung').value=emojiKorrekt;
	   }else
		   {
			console.log('Falsch!');
			hinweistext=ausgabetexte[1].txtFuerFalscheAntworten[zufallszahl(hinweiseMin,negHinweiseMax)];
		   	// Zeile wurde deaktiviert, um das Emoji auszugeben
		   document.getElementById('hinweis').value=hinweistext;
		   document.getElementById('meldung').value=emojiFalsch;
		   }
}
		
function init()
	{
		
		const chkButton=document.getElementById('checkButton');
		const userErgebnis=document.getElementById('userErgebnis');
		chkButton.addEventListener( 	// Den Event-Listener registrieren
									'click',
									check);
		userErgebnis.addEventListener( 	// Den Event-Listener registrieren
									'blur', // Wenn das Eingabefeld den Fokus verliert
									check);
		
		window.addEventListener('keydown', (event) => 
								{
								if(event.key!== undefined)
									{
										console.log('Taste: '+event.key+' wurde gedrückt');
										switch (event.key)
											{
												case 'Enter': 
																check();
																break;
											}
									}
								}
			
								)
		console.info('Init-function wurde aufgerufen. Dokument ist geladen');
	}

document.addEventListener('DOMContentLoaded',init);
