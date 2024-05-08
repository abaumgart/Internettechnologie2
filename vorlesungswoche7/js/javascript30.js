// JavaScript Document
// Definition der Klasse ToDoList
class ToDoListe {
	#aufgaben=[];
  constructor() {
    
  }

  // Methode zum Hinzufügen einer Aufgabe zur Liste
  aufgabeHinzufuegen(aufgabe) {
    this.#aufgaben.push(aufgabe);
  }

  // Methode zum Entfernen einer Aufgabe aus der Liste
  aufgabeEntfernen(index) {
    if (index >= 0 && index < this.#aufgaben.length) {
      this.#aufgaben.splice(index, 1);
    } else {
      console.log("Ungültiger Index");
    }
  }

  // Methode zum Anzeigen aller Aufgaben in der Liste
  aufgabenAnzeigen() {
    console.log("ToDo-Liste:");
    this.#aufgaben.forEach((aufgabe, index) => {
      console.log(`${index + 1}. ${aufgabe}`);
    });
  }
}

// Erstellen einer Instanz der Klasse ToDoListe
const meineListe = new ToDoListe();
const ullisListe = new ToDoListe();

// Hinzufügen von Aufgaben zur Liste
meineListe.aufgabeHinzufuegen("Einkaufen gehen");
meineListe.aufgabeHinzufuegen("Wäsche waschen");
meineListe.aufgabeHinzufuegen("Meeting um 10 Uhr");


ullisListe.aufgabeHinzufuegen("Klausureinsicht");
ullisListe.aufgabeHinzufuegen("Kaffeebesuch");
ullisListe.aufgabeHinzufuegen("Meeting um 18 Uhr");

// Anzeigen aller Aufgaben in der Liste
meineListe.aufgabenAnzeigen();
ullisListe.aufgabenAnzeigen();

// Entfernen einer Aufgabe aus der Liste
meineListe.aufgabeEntfernen(1);
ullisListe.aufgabeEntfernen(2);

// Anzeigen der aktualisierten Liste
meineListe.aufgabenAnzeigen();
ullisListe.aufgabenAnzeigen();
