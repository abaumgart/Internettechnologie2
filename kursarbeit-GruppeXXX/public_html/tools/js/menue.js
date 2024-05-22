// JavaScript Document

class MenuPunkt {
    constructor(bezeichnung, url, untermenuePunkte = []) {
        this.bezeichnung = bezeichnung;
        this.url = url;
        this.untermenuePunkte = untermenuePunkte; // Speichert Untermenüpunkte, falls vorhanden
    }
}

class Menue {
    constructor(containerId, menueStruktur) {
        this.container = document.getElementById(containerId);
        if (this.container) {
            this.container.classList.add('Menue'); // Stellt sicher, dass der Container die Klasse .Menue hat
        } else {
            console.error(`Container mit ID "${containerId}" konnte nicht gefunden werden.`);
            return;
        }
        this.menueStruktur = menueStruktur;
    }

    menueRendern() {
        const ul = this.kreiereMenueStruktur(this.menueStruktur);
        this.container.innerHTML = ''; // Löscht vorhandenen Inhalt, falls notwendig
        this.container.appendChild(ul);
    }

    kreiereMenueStruktur(menuePunkte) {
        const ul = document.createElement('ul');
        menuePunkte.forEach(punkt => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = punkt.url;
            a.textContent = punkt.bezeichnung;
            li.appendChild(a);

            if (punkt.untermenuePunkte && punkt.untermenuePunkte.length > 0) {
                const unterUl = this.kreiereMenueStruktur(punkt.untermenuePunkte); // Rekursiver Aufruf für Untermenüs
                li.appendChild(unterUl);
            }

            ul.appendChild(li);
        });

        return ul;
    }
}








/*
    class MenuPunkt {
        constructor(bezeichnung, url) {
            this.bezeichnung = bezeichnung;
            this.url = url;
        }
    }

    // Klassen-Definition für Menü
    class Menue {
        constructor(containerId) {
            this.containerId = containerId;
            this.menuePunkte = [];
        }

        // Methode zum Hinzufügen eines Menüpunktes
        menuePunktHinzufuegen(bezeichnung, url) {
            const menuePunkt = new MenuPunkt(bezeichnung, url);
            this.menuePunkte.push(menuePunkt);
        }

        // Methode zum Rendern des Menüs im angegebenen Container
        menueRendern() {
            const container = document.getElementById(this.containerId);
            const ul = document.createElement('ul');

            this.menuePunkte.forEach(({ bezeichnung, url }) => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = url;
                a.textContent = bezeichnung;
                li.appendChild(a);
                ul.appendChild(li);
            });

            container.appendChild(ul);
        }
    }
	
	*/
