// JavaScript Document

// Menü für den Studenten 1 erstellen und Menüpunkte hinzufügen
let datenAusDemFormularStudent1; // Array enthält die Daten aus dem Formular
const formularStudent1 = new FormularManager('formularStudent1', formularElemente); // Erzeugt ein Formularobjekt
const menueStudent1 = new Menue('menuContainer', menueStrukturStudent1);
const diagrammErsteller = new DiagrammErsteller('diagramm'); // Erzeugt ein Diagrammobjekt

function init()
	{
		// Beispiel Menü erstellen
		menueStudent1.menueRendern();
		
		// Beispiel Tabelle ausgeben
		htmlTabelleAusgeben(zentraleDatenStudent1,'tableContainer');
		
		
		// Beispiel für Googlechat: PieChart generiert ein Kuchen-, BarChart ein Balkendiagramm
		diagrammErsteller.erstelleDiagramm(zentraleDatenStudent1, "Übersicht der Studenten", "PieChart");

		
		console.info('Init-function wurde aufgerufen. Dokument ist geladen');
	}
								  
								  
								  
document.addEventListener('DOMContentLoaded',init);


function datenAusFormular()
	{
		datenAusDemFormularStudent1= formularStudent1.holeFormulardaten();
		console.log(datenAusDemFormularStudent1);
	}
