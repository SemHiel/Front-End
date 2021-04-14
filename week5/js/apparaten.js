// Hier slaan we de instellingen voor alle gemaakt widgets op
let widgets = []

// Hier slaan de ingeladen apparaten uit de JSON file in op
let apparaten = [];

// Deze functie is de start
const startCalculator = () => {

  laadJSON('apparaten.json');

}

const laadJSON = (url) => {
  // het XMLHttpRequest object maken
  const aanvraag = new XMLHttpRequest();

  // omschrijf wat er moet gebeuren ALS je de data succesvol binnen hebt
  aanvraag.onreadystatechange = () => {
    if (aanvraag.readyState === 4 && aanvraag.status === 200) {
      let jsonText = aanvraag.responseText;
      apparaten = JSON.parse(jsonText);
      setupWidgets();
    }
  }

  // serveraanvraag specificeren
  aanvraag.open("GET", url, true);

  // aanvraag versturen
  aanvraag.send();

}

const setupWidgets = () => {

  //  Haal alle div's op met de class appliance-usage
  const containerDivs = document.querySelectorAll('.appliance-usage');

  // Loop er doorheen emt een forEach loop, en maak voor elke div een object aan met alle gegevens die nodig
  containerDivs.forEach(containerDiv => {

    const code = containerDiv.attributes['data-id'].value;

    const apparaat = apparaten.find(value => {
      return value.code === code;
    });

    let widget = {
      container: containerDiv,
      apparaat: apparaat,
      weergave: "kosten",
      prijs_kwh: 0.20
    }

    widgets.push(widget);
    toonVerbruikScherm(widget);
  });

}

const toonVerbruikScherm = (widget) => {

  const ladenDiv = widget.container.querySelector('.loader');
  const verbruikDiv = widget.container.querySelector('.usage');

  ladenDiv.classList.add('hidden');
  verbruikDiv.classList.remove('hidden');

  verbruikDiv.style.backgroundImage = `url(${widget.apparaat.image})`;

  const slider = verbruikDiv.querySelector('input');
  const minuten = verbruikDiv.querySelector('span');

  slider.addEventListener('input', (event) => {
    minuten.innerHTML = slider.value;
    updateGegevens(widget);
  })

  const knop = verbruikDiv.querySelector('button');
  knop.addEventListener('click', () => {
    if (knop.innerText === 'Toon verbruik') {
      widget.weergave = 'verbruik';
      knop.innerText = 'Toon kosten';
    } else {
      widget.weergave = 'kosten';
      knop.innerText = 'Toon verbruik';
    }
    updateGegevens(widget);
  })


  updateGegevens(widget);

}

const updateGegevens = (widget) => {
  // De afzonderlijke elementen ophalen
  const verbruikDiv = widget.container.querySelector('.usage');
  const titel = verbruikDiv.querySelector('h1');
  const nummer = verbruikDiv.querySelector('h2');
  const slider = verbruikDiv.querySelector('input');

  // Nu gegevens invullen van het apparaat!
  titel.innerHTML = widget.apparaat.naam;

  // Aantal minuten uitlezen
  const minutenPerDag = parseInt(slider.value);

  if (widget.weergave === 'kosten') {
    let jaarlijkseKosten = berekenJaarKosten(minutenPerDag, widget.apparaat.vermogen);
    nummer.innerHTML = '€ ' + jaarlijkseKosten + ' per jaar';
  } else {
    let jaarlijksVerbruik = berekenJaarVerbruik(minutenPerDag, widget.apparaat.vermogen);
    nummer.innerHTML = jaarlijksVerbruik + ' KwH';
  }

}

const berekenJaarVerbruik = (minuten, vermogen) => {

  const minutenPerJaar = minuten * 365;
  const urenPerJaar = minutenPerJaar / 60;
  const wattPerJaar = (urenPerJaar * vermogen);
  const kwhPerJaar = wattPerJaar / 1000;

  return kwhPerJaar.toFixed(2);

}

const berekenJaarKosten = (minuten, vermogen) => {

  const prijsPerKwH = 0.20;
  const kwhPerJaar = berekenJaarVerbruik(minuten, vermogen);
  const price = kwhPerJaar * prijsPerKwH;

  return price.toFixed(2);

}

//Hier begint alles.
window.addEventListener("DOMContentLoaded", startCalculator);
