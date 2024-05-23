// JavaScript Document



const menueStrukturIndex = [
    new MenuPunkt('Startseite', 'index.html'),
    new MenuPunkt('unsere Anwendungen', '', [
        new MenuPunkt('Anwendung Student 1', 'student1/index.html'),
        new MenuPunkt('Anwendung Student 2', 'student2/index.html'),
		new MenuPunkt('Anwendung Student 3', 'student3/index.html')
    ]),
    new MenuPunkt('Aufgabenbeschreibung', 'aufgabenbeschreibung.html'),
	new MenuPunkt('Jade HS', 'aufgabenbeschreibung.html'),

];

const menueIndexSeite = new Menue('menuContainer', menueStrukturIndex);

function init()
	{
		menueIndexSeite.menueRendern();	
		htmlTabelleAusgeben(zentraleDatenStudent1,'indexTblStudent1');
		htmlTabelleAusgeben(zentraleDatenStudent2,'indexTblStudent2');
		console.info('Init-function wurde aufgerufen. Dokument ist geladen');
	}



document.addEventListener('DOMContentLoaded',init);