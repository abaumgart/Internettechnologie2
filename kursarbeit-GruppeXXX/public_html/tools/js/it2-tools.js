// JavaScript Document

class Tabelle {
    constructor(informationen) {
        this.informationen = informationen;
    }

    tabelleErstellen() {
        let html = "<table><tr>";
        
        // Überschriften der Tabelle erstellen, basierend auf den Schlüsseln des ersten Objekts
        Object.keys(this.informationen[0]).forEach(schluessel => {
            html += `<th>${schluessel}</th>`;
        });
        html += "</tr>";

        // Zeilen der Tabelle erstellen
        this.informationen.forEach(obj => {
            html += "<tr>";
            Object.values(obj).forEach(wert => {
                html += `<td>${wert}</td>`;
            });
            html += "</tr>";
        });

        html += "</table>";

        return html;
    }

    tabelleAnzeigen(containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = this.tabelleErstellen();
    }
}

function htmlTabelleAusgeben(ArrayName, ID_Zielelement)
	{
		const tabellenObjekt = new Tabelle(ArrayName);
		tabellenObjekt.tabelleAnzeigen(`${ID_Zielelement}`);
	}


class FormularManager {
    constructor(containerId, formularElemente) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container mit ID "${containerId}" konnte nicht gefunden werden.`);
            return;
        }
        this.formularElemente = formularElemente;
        this.formularDaten = [];
        this.initFormular();
    }

    initFormular() {
        const form = document.createElement('form');

        this.formularElemente.forEach(el => {
            if (el.htmlElement === 'button') {
                form.appendChild(this.erstelleButton(el));
            } else {
                const wrapper = this.erstelleElementWrapper(el);
                form.appendChild(wrapper);
            }
        });

        this.container.appendChild(form);
    }

    erstelleElementWrapper(el) {
        const wrapper = document.createElement('div');
        const label = document.createElement('label');
        label.textContent = el.labelText;
        label.htmlFor = el.id;

        let element;

        switch (el.htmlElement) {
            case 'input':
                // Erweiterung für Slider-Elemente mit "Bubble" zur Wertanzeige
                if(el.type === 'range') {
                    element = this.createRangeWithBubble(el, wrapper);
                    break; // Verhindert, dass das default input Element hier erstellt wird
                } else {
                    element = document.createElement('input');
                    element.type = el.type;
                }
                break;
            case 'select':
                element = document.createElement('select');
                el.options.forEach(opt => {
                    const option = document.createElement('option');
                    option.text = opt.text;
                    option.value = opt.value;
                    if (opt.selected) option.selected = true;
                    element.appendChild(option);
                });
                break;
            default:
                console.error(`Elementtyp "${el.htmlElement}" wird nicht unterstützt.`);
                return wrapper; // Return des wrapper div bei Fehler, um nicht den Flow zu stören
        }

        if(element) {
            element.id = el.id;
            element.name = el.name;
            element.className = el.cssKlasse;
            element.required = el.required;
            element.value = el.value;

            element.addEventListener('change', (e) => this.aktualisiereDaten(e.target.name, e.target.value, el.type));

            wrapper.appendChild(label);
            wrapper.appendChild(element);
        }

        return wrapper;
    }

    createRangeWithBubble(el, container) {
        const element = document.createElement('input');
        element.type = 'range';
        element.id = el.id;
        element.name = el.name;
        element.className = el.cssKlasse;
        
        const bubble = document.createElement('span');
        bubble.className = 'slider-bubble';
        // Setze den Anfangswert des Bubbles
        bubble.textContent = el.value;
        
        container.appendChild(bubble);
        
        element.oninput = function() {
            bubble.textContent = this.value;
            // Aktualisiere die "formularDaten" jedes Mal, wenn der Slider geändert wird
        };

        return element;
    }

    erstelleButton(el) {
        const button = document.createElement('button');
        button.textContent = el.text;
        button.className = el.cssKlasse;
        button.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(this.formularDaten); // oder andere Logik
        });
        return button;
    }

    aktualisiereDaten(name, value, type) {
        if (type === 'checkbox') {
            this.formularDaten = this.formularDaten.filter(data => data.name !== name); // Alte Checkbox-Werte entfernen
            this.formularDaten.push({ name, value }); // Neue Werte hinzufügen
        } else {
            const index = this.formularDaten.findIndex(data => data.name === name);
            if (index >= 0) {
                this.formularDaten[index].value = value;
            } else {
                this.formularDaten.push({ name, value });
            }
        }
    }
	
	holeFormulardaten() {
        return this.formularDaten;
    }
}
