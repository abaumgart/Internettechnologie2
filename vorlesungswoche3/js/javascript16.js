// JavaScript Document
// Arbeiten mit functions

let seiteA=15;
let seiteB=20;

let umfang;
let flaeche;
let diagonale;

umfang=seiteA*seiteB;
ausgabeKonsole(umfang);

flaeche=seiteA*seiteB;
ausgabeKonsole(flaeche);

diagonale= berechneDiagonale(seiteA,seiteB);
ausgabeKonsole(diagonale);

function ausgabeKonsole(meldungstext)
	{
			console.warn(meldungstext);
	}

function berechneDiagonale(a,b)
	{
			return Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
	}
