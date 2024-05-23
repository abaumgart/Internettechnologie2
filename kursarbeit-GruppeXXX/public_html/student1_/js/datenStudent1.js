// JavaScript Document

const zentraleDatenStudent1 = [{
    Name: "Maria",
    Alter: 30,
    Größe: 156
  },
  {
    Name: "Johann",
    Alter: 22,
    Größe: 170
  },
  {
    Name: "Lena",
    Alter: 25,
    Größe: 164
  },
  {
    Name: "Andre",
    Alter: 34,
    Größe: 174
  },
 {
    Name: "Werner",
    Alter: 77,
    Größe: 170
  },
  {
    Name: "Andrea",
    Alter: 56,
    Größe: 165
  }
];

const menueStrukturStudent1 = [
    new MenuPunkt('Startseite', '../index.html'),
    new MenuPunkt('unsere Anwendungen', '', [
        new MenuPunkt('Anwendung Student 1', '../student1/index.html'),
        new MenuPunkt('Anwendung Student 2', '../student2/index.html'),
		new MenuPunkt('Anwendung Student 3', '../student3/index.html'),
		new MenuPunkt('Test', '../student3/index.html')
    ]),
];

/* Formularkonfiguration mittels objektorientierem Array. 
 Das Array wird bei Erzeugen des Objektes mit als Parameter übergeben.
 
 HINWEIS! :
 	- Elemente vom Typ Checkbox werden noch nicht unterstützt.
	- Das Attribut required wird noch nicht berücksichtigt.
 
 */

const formularElemente = [{
    htmlElement: 'input',
    type: 'text',
    name: 'nachname',
    id: 'nachname',
    cssKlasse: 'form-control',
    labelText: 'Nachname',
    value: '',
    // required: true
  },

  {
    htmlElement: 'input',
    type: 'text',
    name: 'vorname',
    id: 'vorname',
    cssKlasse: 'form-control',
    labelText: 'Vorname',
    value: '',
    required: true
  },

  {
    htmlElement: 'input',
    type: 'email',
    name: 'email',
    id: 'email',
    cssKlasse: 'form-control',
    labelText: 'E-Mail-Adresse',
    value: '',
    required: true
  },
  {
    htmlElement: 'input',
    type: 'number',
    name: 'age',
    id: 'age',
    cssKlasse: 'form-control',
    labelText: 'Alter',
    value: '',
    required: true
  },
  {
    htmlElement: 'select',
    name: 'studiengang',
    id: 'studiengang',
    cssKlasse: 'form-control',
    labelText: 'Studiengang: ',
    multiple: false,
    options: [{
        value: '1',
        text: 'Wirtschaftsingenieurwesen'
      },
      {
        value: '2',
        text: 'Wirtschaftsinformatik'
      },
      {
        value: '3',
        text: 'Medienwirtschaft Journalismus'
      },
	  {
        value: '4',
        text: 'Wirtschaft'
      }
    ],
    required: true
  },
  {
    htmlElement: 'select',
    name: 'interessen',
    id: 'interessen',
    cssKlasse: 'form-control',
    labelText: 'Deine Interessen:',
    multiple: true,
    options: [{
        value: '1',
        text: 'Lesen'
      },
      {
        value: '2',
        text: 'Recherchieren'
      },
		 {
        value: '3',
        text: 'Reisen'
      },
      {
        value: '4',
        text: 'Programmieren'
      }
    ],
    required: false
  },
  {
    htmlElement: 'input',
    type: 'range',
    name: 'zufriedenheit',
    id: 'zufriedenheit',
    cssKlasse: 'form-range',
    labelText: 'Zufriedenheit auf einer Skala von 0 bis 100',
    min: 0,
    max: 10,
    value: 5,
    required: false
  },
  {
    htmlElement: 'input',
    type: 'radio',
    name: 'geschlecht',
    id: 'maennlich',
    cssKlasse: 'form-check-input',
    labelText: 'Männlich',
    value: 'männlich',
    required: true
  },
  {
    htmlElement: 'input',
    type: 'radio',
    name: 'geschlecht',
    id: 'weiblich',
    cssKlasse: 'form-check-input',
    labelText: 'Weiblich',
    value: 'weiblich',
    required: true
  },					  
  {
    htmlElement: 'button',
    type: 'button',
    id: 'saveBtn',
    cssKlasse: 'btn btn-primary',
    text: 'Text auf Button'
  }
];