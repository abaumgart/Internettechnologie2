// JavaScript Document
// Rechenquiz

let emojiKorrekt=String.fromCodePoint(0x1F44D); // Symbol Daumen hoch der Variablen zuweisen
let emojiFalsch= String.fromCodePoint(0x1F44E); // Symbol Daumen runter der Variablen zuweisen

let zahlenbereichMin=1;
let zahlenbereichMax=10;
let operand1;
let operand2;
let summand1=zufallszahl(zahlenbereichMin,zahlenbereichMax); // wird zukünftig nicht mehr benötigt
let summand2=zufallszahl(zahlenbereichMin,zahlenbereichMax);// wird zukünftig nicht mehr benötigt
let ergebnis;
let aufgabentext;
let hinweistext;
const aufgabe = [];

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
let anzahlAufgaben=10;
let aktuelleAufgabe=0; // index, mit dem sich durch das Aufgabenarray bewegt wird.
/* 
	Der Aufgabentyp wird zufällig bestimmt.
	1 = Additionsaufgabe
	2 = Multiplikationsaufgabe
	3 = Divisionsaufgabe
	4 = Subtraktionsaufgabe
*/
quizStarten();

function quizStarten()
	{
			aufgabenGenerieren();
			console.log(aufgabe);
	}

// document.getElementById('aufgabe').value=aufgabentext;
/* Funktion realisiert die Generierung der Matheaufgaben
	anzahlAufgaben- Aufgaben werden erstellt
	Aufgabentyp wir bei jedem Schleifendurchlauf 
	per Zufall festgelegt.
	Entsprechend der Zufallszahl wird eine funktion aufgerufen,
	welche die spezifische Matheaufgabe erstellt.
				*/
function aufgabenGenerieren()
		{
				for (let schleifenZaehler=0; schleifenZaehler<=anzahlAufgaben; schleifenZaehler++)
					{
						let operator = zufallszahl(1,5); // Bestimmung der Aufgabenart
						
						switch(operator)
							   {
								   case 1:
									   addition();
								   break;
								   case 2:
									   multiplikation();
								   break;
								   case 3:
									   division();
								   break;
								   case 4:
									   subtraktion();
								   break;
							   }
					}
		}

function addition ()
	{
		operand1=zufallszahl(zahlenbereichMin, zahlenbereichMax);
		operand2=zufallszahl(zahlenbereichMin, zahlenbereichMax);
		ergebnis=operand1+operand2;
		aufgabentext=operand1+'+'+operand2;
		let eintrag = 
			{
				o1: operand1,
				o2: operand2,
				ergebnis: ergebnis,
				aufgabentext: aufgabentext
			}

		aufgabe.push(eintrag);
		
	}

function subtraktion ()
	{
		operand1=zufallszahl(zahlenbereichMin, zahlenbereichMax);
		operand2=zufallszahl(zahlenbereichMin, zahlenbereichMax);
		ergebnis=operand1-operand2;
		aufgabentext=operand1+'-'+operand2;
		let eintrag = 
			{
				o1: operand1,
				o2: operand2,
				ergebnis: ergebnis,
				aufgabentext: aufgabentext
			}

		aufgabe.push(eintrag);
	}

function division()
	{
		operand1=zufallszahl(zahlenbereichMin, zahlenbereichMax);
		operand2=zufallszahl(zahlenbereichMin, zahlenbereichMax);
		ergebnis=operand1/operand2;
		aufgabentext=operand1+'/'+operand2;
		let eintrag = 
			{
				o1: operand1,
				o2: operand2,
				ergebnis: ergebnis,
				aufgabentext: aufgabentext
			}

		aufgabe.push(eintrag);
	}

function multiplikation()
	{
		operand1=zufallszahl(zahlenbereichMin, zahlenbereichMax);
		operand2=zufallszahl(zahlenbereichMin, zahlenbereichMax);
		ergebnis=operand1*operand2;
		aufgabentext=operand1+'*'+operand2;
		let eintrag = 
			{
				o1: operand1,
				o2: operand2,
				ergebnis: ergebnis,
				aufgabentext: aufgabentext
			}

		aufgabe.push(eintrag);
	}


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
			hinweistext=ausgabetexte[1].txtFuerFalscheAntworten[zufallszahl(hinweiseMin,posHinweiseMax)];
		   	// Zeile wurde deaktiviert, um das Emoji auszugeben
		   document.getElementById('hinweis').value=hinweistext;
		   document.getElementById('meldung').value=emojiFalsch;
		   }
}
