// JavaScript Document

const menueStudent3 = new Menue('menuContainer', menueStrukturStudent3);

function init()
	{
		
		menueStudent3.menueRendern();			
		console.info('Init-function wurde aufgerufen. Dokument ist geladen');
	}
document.addEventListener('DOMContentLoaded',init);