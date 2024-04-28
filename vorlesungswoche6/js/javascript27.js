// JavaScript Document
// 

const mainContent = document.getElementById('main-content');
let buttonBeschriftung;
const kontakte = [
  {
    vorname: 'Max ',
    nachname: 'Mustermann',
    email: 'max.mustermann@jade-hs.de.de'
  },
  {
    vorname: 'Moritz',
    nachname: 'Mustermann',
    email: 'moritz.mustermann@jade-hs.de'
  },
  {
    vorname: 'Peter ',
    nachname: 'Mustermann',
    email: 'peter.mustermann@jade-hs.de.de'
  }
];

function erstelleTabelle() {
  const tableBody = document.getElementById('kontakte');
  for(let i=0; i<kontakte.length; i++) {
    // Für den aktuellen Kontakt ...
    const contact = kontakte[i];
    // ... wird eine neue Zeile erzeugt.
    // (1)
    const tabellenReihe = document.createElement('tr');
    // Innerhalb der Zeile werden verschiedene Zellen erstellt ...
    // (2)
    const tabellenZelleVorname = document.createElement('td');
    // ... und jeweils mit Werten befüllt.
    // (3)
    const vorname= document.createTextNode(contact.vorname);
    // (4)
    tabellenZelleVorname.appendChild(vorname);
    // (5)
    const tabellenZelleNachname = document.createElement('td');
    // (6)
    const nachname = document.createTextNode(contact.nachname);
    // (7)
    tabellenZelleNachname.appendChild(nachname);
    // (8)
    const tabellenZelleMail = document.createElement('td');
    // (9)
    const email = document.createTextNode(contact.email);
    // (10)
    tabellenZelleMail.appendChild(email);
    // (11)
    tabellenReihe.appendChild(tabellenZelleVorname);
    // (12)
    tabellenReihe.appendChild(tabellenZelleNachname);
    // (13)
    tabellenReihe.appendChild(tabellenZelleMail);
    // (14)
    tableBody.appendChild(tabellenReihe);
  }
}

function tabellenReihenLoeschen()
{
	const tableBody = document.getElementById('kontakte');
  		while (tableBody.firstChild !== null) 
			{
				tableBody.removeChild(tableBody.firstChild);
  			}
}

function buttonErzeugen()
	{
		const tabellenReihenLoschenButton=document.createElement('button');
		tabellenReihenLoschenButton.setAttribute('id', 'reiheLoeschen');
		buttonBeschriftung=document.createTextNode('Tabelle löschen');
		
		tabellenReihenLoschenButton.appendChild(buttonBeschriftung);
		mainContent.appendChild(tabellenReihenLoschenButton);
	}

function init()
	{
		buttonErzeugen();
		const createTable=document.getElementById('createTableButton');
		const reiheLoeschen = document.getElementById('reiheLoeschen');
		
		createTable.addEventListener( 	// Den Event-Listener registrieren
									'click',
									erstelleTabelle);
		reiheLoeschen.addEventListener( 	// Den Event-Listener registrieren
									'click',
									tabellenReihenLoeschen);
							
		console.info('Init-function wurde aufgerufen. Dokument ist geladen');
	}
document.addEventListener('DOMContentLoaded',init);

