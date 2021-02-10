const Uitvoer = document.getElementById('Uitvoer');
let dataObject;

const geefDagWeek = (num) => {
    switch (num) {
        case 0: return 'Zondag'; break;
        case 1: return 'Maandag'; break;
        case 2: return 'Dinsdag'; break;
        case 3: return 'Woensdag'; break;
        case 4: return 'Donderdag'; break;
        case 5: return 'Vrijdag'; break;
        case 6: return 'Zaterdag'; break;
        default: return num;
    }
}
const maandNaam = (num) => {
    switch (num) {
        case 0: return 'Januari'; break;
        case 1: return 'Februari'; break;
        case 2: return 'Maart'; break;
        case 3: return 'April'; break;
        case 4: return 'Mei'; break;
        case 5: return 'Juni'; break;
        case 6: return 'Juli'; break;
        case 7: return 'Augustus'; break;
        case 8: return 'September'; break;
        case 9: return 'Oktober'; break;
        case 10: return 'November'; break;
        case 11: return 'December'; break;
        default: return num;
    }
}

const maakDatum = (num) => {
    // Zet de String van de JS Datum om in een betere vorm
    let datum = new Date(num);

    let dagWeek = datum.getDay();
    let dagMaand = datum.getDate();
    let Maand = datum.getMonth();
    let Jaar = datum.getFullYear();
    let Uren = datum.getHours();
    if (Uren < 10) {
        Uren = '0' + Uren;
    }
    let Minuten = datum.getMinutes();
    if (Minuten < 10) {
        Minuten = '0' + Minuten;
    }

    return `${geefDagWeek(dagWeek)} <br>
    ${dagMaand} ${maandNaam(Maand)} ${Jaar} ${Uren}:${Minuten}`;
}

const uitvoeren = () => {
    // Deze functie voert de data uit in de div met de ID Uitvoer
    let html = "";
    dataObject.forEach(obj => {
        html += `<div class="rij">`;
        html += `<div>${maakDatum(obj.tijd)}</div>`;
        html += `<div>${obj.tempBuiten} &deg;C</div>`;
        html += `<div>${obj.tempBinnen} &deg;C</div>`;
        html += `<div>${obj.tempGewenst} &deg;C</div>`;
        if (obj.tempGewenst > obj.tempBinnen) {
            html += `<div> <img class="Icon" src="Icons/vlam.svg" alt="CV Aan"> </div>`;
        } else {
            html += `<div> <img class="Icon" src="Icons/vlamUIt.svg" alt="CV Uit"> </div>`;
        }
        if (obj.lichtKamer) {
            html += `<div> <img class="Icon" src="Icons/lampAan.svg" alt="Lamp Aan"> </div>`;
        } else {
            html += `<div> <img class="Icon" src="Icons/lampUIt.svg" alt="Lamp Uit"> </div>`;
        }
        if (obj.lichtBuiten) {
            html += `<div> <img class="Icon" src="Icons/lampAan.svg" alt="Lamp Aan"> </div>`;
        } else {
            html += `<div> <img class="Icon" src="Icons/lampUIt.svg" alt="Lamp Uit"> </div>`;
        }
        html += "</div>";
    });
    Uitvoer.innerHTML = html;



}

const starten = () => {
    // De data array in onze dataObject stoppen
    dataObject = energieData;
    // De data uitvoeren
    uitvoeren();
}

document.addEventListener('DOMContentLoaded', starten);