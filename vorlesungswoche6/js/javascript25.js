// JavaScript Document
// 

/*
Node (Knoten):
Der Begriff Node wird allgemein für jedes Objekt im DOM-Baum verwendet.
Es gibt verschiedene Arten von Nodes, einschließlich Element Nodes, Text Nodes, Attribute Nodes usw.
Jedes Element, Textstück oder Attribut im DOM-Baum ist ein Node.
Nodes haben Eigenschaften und Methoden, die für alle Knoten im DOM-Baum gemeinsam sind.
Die vier wichtigsten Knotentypen sind:
	- Dokumentknoten
	- Elementknoten
	- Attributknoten
	- Textknoten


Element:
Ein Element ist eine spezielle Art von Node, die ein bestimmtes HTML-Element im DOM-Baum repräsentiert. Sie sind die strukturierenden Bausteine von HTML-Dokumenten, z. B. <div>, <p>, <ul>, <li> usw. und haben zusätzliche Eigenschaften und Methoden, die spezifisch für HTML-Elemente sind, wie zum Beispiel das Ändern von Klassen, das Hinzufügen von Ereignishandlern usw.

Nicht alle Knoten im DOM-Baum sind Elemente, aber alle Elemente sind immer Knoten.
*/


// Beispiel für den Zugriff via ID 
const tabelleElementeSelektieren= document.getElementById('tblElementeSelektieren');
// Zuweisung der CSS-Klasse border
tabelleElementeSelektieren.className='border';



// Beispiel für getElementsByClassName()

// Zugriff auf alle geraden Tabellenreihen, welche der CSS-Klasse even zugeordnet sind.
const geradeTabellenreihen = document.getElementsByClassName('even');
console.log(geradeTabellenreihen);
// Ausgabe, wie viele Reihen gefunden wurden.
console.log(geradeTabellenreihen.length);
// Zugriff auf eine Reihe und setzen einer neuen Hintergrundfarbe
geradeTabellenreihen[1].style.backgroundColor='#c19ada';

// Beispiel für getElementsByTagName()
const tabellendaten = document.getElementsByTagName('td');
// Ausgabe des Ergebnisses auf der Console
console.log(tabellendaten);
if(tabellendaten.length>0)
	{
		for(let zellenzaehler=0; zellenzaehler<tabellendaten.length; zellenzaehler++)
			{
				// auf die aktuelle Zelle zugreifen
				 const tabellenZelle=tabellendaten[zellenzaehler];
				 console.log(tabellenZelle);
				 tabellenZelle.style.fontSize='9pt';
			}
}


// Beispiel für getElementsByName
const tabellenkopfreihe=document.getElementsByName('tabellenkopfreihe');
console.log(tabellenkopfreihe);


// Beispiel für querySelektor. Liefert das erste Element, das auf den Selektor zutrifft.
const queryTabellenzelle = document.querySelector('td:nth-child(2)');
console.log('document.querySelector:'+queryTabellenzelle);
queryTabellenzelle.style.border = 'thick solid red';

// Beispiel für querySelektorAll. Liefert alle Elemente, das auf den Selektor zutrifft.
const queryTabellenzellen = document.querySelectorAll('.testQSall');
console.log('document.querySelectorAll: '+queryTabellenzellen.length);
console.log('document.querySelectorAll: '+queryTabellenzellen);

if(queryTabellenzellen.length > 0) 
	{
		for(let i=0; i<queryTabellenzellen.length; i++) 
			{
				const tabellenzelle = queryTabellenzellen[i];
				tabellenzelle.style.border = 'thick solid blue';
			}
	}

// Das Elternelement eines Elements selektieren
const tabelle = document.querySelector('table');
console.log(tabelle.parentNode); // <main>
console.log(tabelle.parentElement); // <main>
