// JavaScript Document

const zentraleDatenStudent2 = [
		{ modul: "Internettechnologie 1", punkte: 45 },
		{ modul: "Internettechnologie 2", punkte: 55 },
		{ modul: "Kommunikation 1", punkte: 25 }
	];

const menueStrukturStudent2 = [
    new MenuPunkt('Startseite', '../index.html'),
    new MenuPunkt('unsere Anwendungen', '', [
        new MenuPunkt('Anwendung Student 1', '../student1/index.html'),
        new MenuPunkt('Anwendung Student 2', '../student2/index.html'),
		new MenuPunkt('Anwendung Student 3', '../student3/index.html')
    ]),
];
