// JavaScript Document
// Übersicht der Attribute für SVG-Dateien: https://wiki.selfhtml.org/wiki/SVG/Attribut


const htmlformular = document.getElementById('formular');


const grafikStandardhoehe=50;
let grafikobject;
let zahnrad;


function init()
	{
		
		grafikobject=document.getElementById('grafik');
		grafikobject.style.height=  grafikStandardhoehe+'px';
		zahnrad = grafikobject.getElementById('zahnrad');
		
		htmlformular.addEventListener('change', aendereGrafik);
		console.info('Init-function wurde aufgerufen. Dokument ist geladen');
		
	}

function forminfo()
	{
		console.log(htmlformular.elements);
		console.log(htmlformular.elements["transparenz"].value);
		console.log(htmlformular.elements["hoehe"].value);
	}

function aendereGrafik()
	{
		forminfo();
		console.log(grafikobject);
		console.log(zahnrad);
		grafikobject.style.height=  htmlformular.elements["hoehe"].value+'px';
		grafikobject.style.opacity =  htmlformular.elements["transparenz"].value;
		zahnrad.classList.add('zahnrad');	
	}
document.addEventListener('DOMContentLoaded',init);



