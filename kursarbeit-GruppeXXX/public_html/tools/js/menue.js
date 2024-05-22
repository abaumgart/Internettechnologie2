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
