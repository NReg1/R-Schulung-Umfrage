// Supabase-Client initialisieren
const { createClient } = window.supabase;
const supabaseUrl = "https://ipyuatcitoljmlzedfyl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlweXVhdGNpdG9sam1semVkZnlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MDczNzMsImV4cCI6MjA1ODk4MzM3M30.fwAxEHOj1tK_l4Q1PxdDHpsBjU0hhqoXSc74Mg5tVlg";
//const supabase = supabase.createClient(supabaseUrl, supabaseKey);
const supabase = createClient(supabaseUrl, supabaseKey);
// Supabase-Client erstellen
// const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
console.log("Supabase geladen:", supabase);

async function addEntry() {
    let name = document.getElementById('name').value;
    let option1 = document.getElementById('option1').value;
    let option2 = document.getElementById('option2').value;

    if (name.trim() === '') {
        alert('Bitte einen Namen eingeben!');
        return;
    }

    // Falls "Handout" ausgewählt ist, option2 NICHT speichern
    let entryData = { name: name, option1: option1 };
    if (option1 !== "Handout") {
        entryData.option2 = option2;
    }
    
    // Daten in Supabase speichern
    const { data, error } = await supabase
        .from('RUmfrage') // Tabellenname in Supabase
        //.insert([
        //    { name: name, option1: option1, option2: option2 }
        .insert([entryData]);

    if (error) {
        //console.error("Fehler beim Speichern:", error);
        //alert("Eintrag konnte nicht gespeichert werden.");
        console.error("Fehler beim Speichern:", error.message);
        alert("Fehler beim Speichern: " + error.message);
        return;
    }

    // Eintrag in der Oberfläche anzeigen
    // displayEntry(name, option1, option2);
    displayEntry(name, option1, option1 === "Handout" ? null : option2);

    // Eingaben zurücksetzen
    document.getElementById('name').value = '';
    document.getElementById('option1').value = 'Handout';
    document.getElementById('option2').value = 'April';
    document.getElementById('option2').disabled = true;
}

function displayEntry(name, option1, option2) {

    console.log(`Anzeige: ${name}, ${option1}, ${option2}`); // Debugging
    
    let entryGroup = document.createElement('div');
    entryGroup.classList.add('entry-group');

    let nameDiv = document.createElement('div');
    nameDiv.classList.add('entry');
    nameDiv.textContent = name;

    let option1Div = document.createElement('div');
    option1Div.classList.add('entry');
    option1Div.textContent = option1;

    entryGroup.appendChild(nameDiv);
    entryGroup.appendChild(option1Div);

    if (option2 !== null) {
        let option2Div = document.createElement('div');
        option2Div.classList.add('entry');
        option2Div.textContent = option2;
        entryGroup.appendChild(option2Div);
    }

    document.getElementById('entries').appendChild(entryGroup);
}


// Event Listener für option1
document.getElementById('option1').addEventListener('change', function() {
    let option2 = document.getElementById('option2');

    if (this.value === "Handout") {
        option2.disabled = true;
        option2.value = "April"; // Setzt die Auswahl auf leer
    } else {
        option2.disabled = false;
    }
});


async function loadEntries() {
    console.log("loadEntries() wurde aufgerufen");  // Debugging
    document.getElementById('entries').innerHTML = ""; // Alte Einträge entfernen

    const { data, error } = await supabase
        .from('RUmfrage') // Tabellenname in Supabase
        .select('*');

    if (error) {
        console.error("Fehler beim Laden der Einträge:", error);
        return;
    }

    console.log("Daten aus Supabase:", data); // Prüfen, ob Daten vorhanden sind

    data.forEach(entry => {
        displayEntry(entry.name, entry.option1, entry.option2);
    });
}

// Beim Laden der Seite Daten abrufen
// Funktion zum Deaktivieren von option2 direkt beim Laden der Seite
window.onload = function () {
    loadEntries(); // Supabase-Daten aus der Datenbank laden

    // Falls Handout gewählt ist, option2 deaktivieren
    let option1 = document.getElementById('option1');
    let option2 = document.getElementById('option2');

    if (option1.value === "Handout") {
        option2.disabled = true;
        option2.value = "April"; // Auswahl zurücksetzen
    }
};
