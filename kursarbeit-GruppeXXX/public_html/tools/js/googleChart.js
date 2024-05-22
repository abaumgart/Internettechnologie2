/* JavaScript Document

Seiten, die GoogleChart nutzen, müssen im HTML-Head angepasst werden. Alles Weitere steht hier:

https://developers.google.com/chart/interactive/docs/basic_load_libs?hl=de

*/

// DiagrammErsteller.js
class DiagrammErsteller {
    constructor(containerId) {
        this.containerId = containerId;
        google.charts.load('current', {'packages':['corechart', 'bar', 'line']}); // Mehrere Chart-Typen unterstützt
    }

    erstelleDiagramm(datenArray, diagrammTitel, diagrammTyp) {
        google.charts.setOnLoadCallback(() => {
            const daten = new google.visualization.DataTable();
          
            // Dynamische Spaltenerzeugung basierend auf den Schlüsseln des ersten Objekts
            if (datenArray.length > 0) {
                Object.keys(datenArray[0]).forEach((key, index) => {
                    let type = (index === 0) ? 'string' : 'number';
                    daten.addColumn(type, key);
                });

                // Hinzufügen der Datenzeilen aus dem Array
                datenArray.forEach(obj => {
                    const row = Object.keys(obj).map(key => obj[key]);
                    daten.addRow(row);
                });
            }

            const optionen = {
                title: diagrammTitel,
                width: 600,
                height: 400
            };

            let chart;
            const chartDiv = document.getElementById(this.containerId);
            switch (diagrammTyp.toLowerCase()) {
                case 'piechart':
                    chart = new google.visualization.PieChart(chartDiv);
                    break;
                case 'barchart':
                    chart = new google.visualization.BarChart(chartDiv);
                    break;
                // Weitere Fälle für verschiedene Diagrammtypen können hier hinzugefügt werden
                default:
                    console.error('Unbekannter Diagrammtyp:', diagrammTyp);
                    return;
            }

            chart.draw(daten, optionen);
        });
    }
}