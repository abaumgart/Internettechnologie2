
let artikelListe = [];

function artikelHinzufuegen() {
    const titel = document.getElementById('titel').value;
    const quelle = document.getElementById('quelle').value;
    const datum = document.getElementById('datum').value;
    const istFakeNews = document.getElementById('istFakeNews').checked;

    const artikel = {
        titel: titel,
        quelle: quelle,
        datum: datum,
        istFakeNews: istFakeNews
    };

    artikelListe.push(artikel);

    // Ausgabe des aktuellen Inhalts des Arrays in der Konsole
    console.log("Aktueller Inhalt des Arrays:");
    for (let i = 0; i < artikelListe.length; i++) {
        console.log(artikelListe[i]);
    }

    artikelAnzeigen();

    // Optional: Formular nach der Eingabe zurücksetzen
    document.getElementById('artikelFormular').reset();
}

function artikelAnzeigen() {
    const artikelListeElement = document.getElementById('artikelListe');
    artikelListeElement.innerHTML = ''; // Liste leeren

    for (let i = 0; i < artikelListe.length; i++) {
        const artikel = artikelListe[i];
        const listenEintrag = document.createElement('li');
        listenEintrag.textContent = `Titel: ${artikel.titel}, Quelle: ${artikel.quelle}, Datum: ${artikel.datum}, Fake News: ${artikel.istFakeNews ? 'Ja' : 'Nein'}`;

        if (artikel.istFakeNews) {
            listenEintrag.classList.add('fake-news');
        }

        artikelListeElement.appendChild(listenEintrag);
    }
}