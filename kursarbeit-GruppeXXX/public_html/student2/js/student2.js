// JavaScript Document

const menueStudent2 = new Menue('menuContainer', menueStrukturStudent2);

function init()
	{
		
		menueStudent2.menueRendern();	
		const modulTabelle = new Tabelle(zentraleDatenStudent2);
		modulTabelle.tabelleAnzeigen("punktebereich");
		
		const diagrammErsteller = new DiagrammErsteller('diagramm');
		
		// PieChart generiert ein Kuchen-, barchart ein Balkendiagramm
		diagrammErsteller.erstelleDiagramm(zentraleDatenStudent2, "Punkteübersicht", "PieChart");
		
		
		
		console.info('Init-function wurde aufgerufen. Dokument ist geladen');
	}
document.addEventListener('DOMContentLoaded',init);

