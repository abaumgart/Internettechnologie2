// JavaScript Document
// Rechenquiz
console.log('Seite geladen');
let emojiKorrekt=String.fromCodePoint(0x1F44D); // Symbol Daumen hoch der Variablen zuweisen
let emojiFalsch= String.fromCodePoint(0x1F44E); // Symbol Daumen runter der Variablen zuweisen

let zahlenbereichMin=1;
let zahlenbereichMax=10;

let summand1;
let summand2;
let ergebnis;
let aufgabentext;
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

function quizStarten()
{
	
	aufgabeGenerieren();
	aufgabeAusgeben();
}


function aufgabeGenerieren()
	{
		summand1=zufallszahl(zahlenbereichMin,zahlenbereichMax);
		summand2=zufallszahl(zahlenbereichMin,zahlenbereichMax);
		ergebnis = summand1+summand2;
		aufgabentext=summand1+'+'+summand2;
	}

function aufgabeAusgeben()
	{
		htmlAusgabe('aufgabe', aufgabentext);
	}

function htmlAusgabe(elementID, auszugebenerText)
	{
		document.getElementById(`${elementID}`).value=auszugebenerText;
	}



function zufallszahl(min, max)
	{
		return Math.floor(Math.random()*(max-min))+min;
	}

function check()
{
	// Wert auslesen, den der User eingetragen hat
	let userWert= document.getElementById('userErgebnis').value;
	if(userWert==ergebnis)
	   {
	   	 // Wenn Ergebnis korrekt angegeben 
		 	// Wähle aus dem Array einen "positiven" Motivationstext aus
		   		hinweistext=ausgabetexte[0].txtFuerRichtigeAntworten[zufallszahl(hinweiseMin,posHinweiseMax)];
		   		htmlAusgabe('hinweis',hinweistext);
		   		htmlAusgabe('meldung',emojiKorrekt);
	   }else
		   {
		  // Wenn Ergebnis korrekt angegeben 
		 	// Wähle aus dem Array einen "negativen" Motivationstext aus
				hinweistext=ausgabetexte[1].txtFuerFalscheAntworten[zufallszahl(hinweiseMin,negHinweiseMax)];
		   		htmlAusgabe('hinweis',hinweistext);
			    htmlAusgabe('meldung',emojiKorrekt);
		   
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
		quizStarten();
		
	}

document.addEventListener('DOMContentLoaded',init);
