
let neueListe = document.createElement("ul");
let eintrag1 = document.createElement("li");
let eintrag2 = document.createElement("li");
eintrag1.textContent = "IT1 wird Kursarbeit";
eintrag2.textContent = "IT2 wird Kursarbeit";

neueListe.appendChild(eintrag1);
neueListe.appendChild(eintrag2);

let artikelliste = document.getElementById("artikelListe");
artikelliste.appendChild(neueListe);