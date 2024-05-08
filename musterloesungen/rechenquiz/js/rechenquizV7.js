// JavaScript Document
// Rechenquiz
let emojiKorrekt=String.fromCodePoint(0x1F44D); // Symbol Daumen hoch der Variablen zuweisen
let emojiFalsch= String.fromCodePoint(0x1F44E); // Symbol Daumen runter der Variablen zuweisen
let zahlenbereichMin=1;
let zahlenbereichMax=11;
let operand1;
let operand2;
let operator;
let ergebnis;
let aufgabentext;
let hinweistext;
let anzahlAufgaben=5; // Gesamtanzahl der Aufgaben, die gelöst werden sollen.
let aktuelleAufgabe=0 // index, mit dem sich durch das Aufgabenarray bewegt wird.
const ausgabetexte = [ 
			{
				txtFuerRichtigeAntworten:['Super','Toll!','Spitze','Wahnsinn!']
			},
			{
				txtFuerFalscheAntworten:['Ohje','Das war nichts','Das geht besser','Ich schaue weg']
			}	
		];
let aufgaben = [];

let hinweiseMin=0;
let posHinweiseMax=ausgabetexte[0].txtFuerRichtigeAntworten.length-1;
let negHinweiseMax=ausgabetexte[1].txtFuerFalscheAntworten.length-1;

function aufgabeInArraySchreiben(o1,o2,ergebnis,ausgabe)
	{
		let eintrag= {
					o1: o1,
					o2: o2,
					ergebnis:ergebnis,
					ausgabe: ausgabe
				}
		aufgaben.push(eintrag);
	}

function quizStarten()
{
	aufgabeGenerieren();
	aufgabeAusgeben();
}

function aufgabeGenerieren()
	{
		// generiere 10 Aufgaben
		for(let aufgabenZaehler=1; aufgabenZaehler<=anzahlAufgaben;aufgabenZaehler++ )
			{
				operator=zufallszahl(1,5);
				/* 
					Der Aufgabentyp wird zufällig bestimmt.
					1 = Additionsaufgabe
					2 = Multiplikationsaufgabe
					3 = Divisionsaufgabe
					4 = Subtraktionsaufgabe
				*/
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
		console.log(aufgaben);	
	}

function addition()
	{
		operand1=zufallszahl(zahlenbereichMin,zahlenbereichMax);
		operand2=zufallszahl(zahlenbereichMin,zahlenbereichMax);
		ergebnis = operand1+operand2;
		aufgabentext=operand1+'+'+operand2;
		aufgabeInArraySchreiben(operand1,operand2, ergebnis, aufgabentext);
	}

function subtraktion()
	{
		operand1=zufallszahl(zahlenbereichMin,zahlenbereichMax);
		operand2=zufallszahl(zahlenbereichMin,zahlenbereichMax);
		// Sicherstellung, dass operand2 immer kleiner als operand 1 ist
		if(operand1<operand2) // Wenn o1 kleiner o2 ist, dann die Werte tauschen
		   {
		   		// Wert von o1 merken
			   let x = operand1;
			   // o1 bekommt den größeren Wert von o2 
			   operand1=operand2;
			   // o2 bekommt den Wert von o1. Dieser ist in x gespeichert
			   operand2=x;
		   }
		ergebnis = operand1-operand2;
		aufgabentext=operand1+'-'+operand2;
		aufgabeInArraySchreiben(operand1,operand2, ergebnis, aufgabentext);
	}

function division()
/*
	Erzeugt eine Divisionsaufgabe
	Aktuell kann der Divisor größer als der Dividend sein. 
	Das führt dazu, dass die Aufgaben als Ergebnis Gleitkomazahlen ergeben.
	- ToDo: Prüfen, das der Divisor immer kleiner als der Dividend ist.
	
	Lösungserklärung am Beispiel:
	9 / 5 = 1.8 
	3 / 7 = 0.43
	2 / 5 = 0.4
	
	8 / 4 = 2 
	6 / 3 = 2
	9 / 3 = 3
	
	Wir suchen eine Kombination, bei denen es keine Nachkommastellen gibt. 
	Also keinen Rest. Um dies zu ermitteln, gibt es den Modulo-Operator 
	Mit ihm können wir den Rest einer Divison ermitteln.
	Benutzt wird dafür das Prozentzeichen % anstatt dem /
	
	9%5 -----> 9 modulo 5 ist gleich 4.
	3%7 -----> 3 modulo 7 ist gleich 3.
	2%5 -----> 2 modulo 5 ist gleich 2.
	8%4 -----> 8 modulo 4 ist gleich 0.
	
	
	Unsere Bedingung ist, dass das Ergebnis der Modulo-Operation gleich Null sein muss.
	Entsprechend können wir mit einer Schleife das Generieren so lange wiederholen, bis
	der Rest der Modulo-Operation gleich Null ist.
	
*/
	{
		do{
			operand1=zufallszahl(zahlenbereichMin,zahlenbereichMax);
			operand2=zufallszahl(zahlenbereichMin,zahlenbereichMax);
		}while(operand1%operand2!=0);
		ergebnis = operand1/operand2;
		aufgabentext=operand1+'/'+operand2;
		aufgabeInArraySchreiben(operand1,operand2, ergebnis, aufgabentext);
	}

function multiplikation()
	{
		operand1=zufallszahl(zahlenbereichMin,zahlenbereichMax);
		operand2=zufallszahl(zahlenbereichMin,zahlenbereichMax);
		ergebnis = operand1*operand2;
		aufgabentext=operand1+'x'+operand2;
		aufgabeInArraySchreiben(operand1,operand2, ergebnis, aufgabentext);
	}

function htmlAusgabe(elementID, auszugebenerText)
/*	Funktion kapselt die Zeile mit getElementByID durch eine allgemeine 
	Funktion, der nur die zwei Parameter übergeben werden.
	
*/
	{
		document.getElementById(`${elementID}`).innerText=auszugebenerText;
	}

function aufgabeAusgeben()
/*  Funktion ruft direkt htmlAusgabe auf und übergibt als 
	Parameter 1 die ID der Ausgabe-Elements und als zweiten 
	Parameter den auszugebenen Text. Hier handelt es sich um den Text,
	der im Array zur aktuellen Aufgabe gespeichert ist. 
*/
	{
		htmlAusgabe('aufgabe', aufgaben[aktuelleAufgabe].ausgabe);
	}

function zufallszahl(min, max)
	{
		return Math.floor(Math.random()*(max-min))+min;
	}

function check()
{
	// Wert auslesen, den der User eingetragen hat
	let userWert= document.getElementById('userErgebnis').value;
	// Korrektes Ergebnis für den Vergleich aus dem Array lesen. 
	ergebnis = aufgaben[aktuelleAufgabe].ergebnis;
	
	if(userWert==ergebnis)
	   {
	   	 // Wenn Ergebnis korrekt angegeben 
		 	// Wähle aus dem Array einen "positiven" Motivationstext aus
		   		hinweistext=ausgabetexte[0].txtFuerRichtigeAntworten[zufallszahl(hinweiseMin,posHinweiseMax)];
		   		htmlAusgabe('hinweis',hinweistext);
		   		htmlAusgabe('meldung',emojiKorrekt);
		   // Erhöhe den index für das Aufgabenarray um 1 
		   		aktuelleAufgabe= aktuelleAufgabe+1;
		   // Rufe die Funktion auf und zeige die neue Aufgabe an.
		   		aufgabeAusgeben();
		   // Im Input-Feld steht noch das alte Ergebnis. Dieses muss gelöscht werden
		   		document.getElementById('userErgebnis').value='';  
	   }else
		   {
		  // Wenn Ergebnis korrekt angegeben 
		 	// Wähle aus dem Array einen "negativen" Motivationstext aus
				hinweistext=ausgabetexte[1].txtFuerFalscheAntworten[zufallszahl(hinweiseMin,negHinweiseMax)];
		   		htmlAusgabe('hinweis',hinweistext);
			    htmlAusgabe('meldung',emojiFalsch);  
		   }
}
		
function init()
	{
		
		const chkButton=document.getElementById('checkButton');
		//const userErgebnis=document.getElementById('userErgebnis');
		chkButton.addEventListener( 	// Den Event-Listener registrieren
									'click',
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
