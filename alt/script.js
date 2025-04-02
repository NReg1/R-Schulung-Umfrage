function addEntry() {
    let name = document.getElementById('name').value;
    let option1 = document.getElementById('option1').value;
    let option2 = document.getElementById('option2');

    if (name.trim() === '') {
        alert('Bitte einen Namen eingeben!');
        return;
    }

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

    // Falls option2 NICHT deaktiviert ist, hinzufügen
    if (!option2.disabled) {
        let option2Div = document.createElement('div');
        option2Div.classList.add('entry');
        option2Div.textContent = option2.value;
        entryGroup.appendChild(option2Div);
    }

    document.getElementById('entries').appendChild(entryGroup);

    // Eingaben zurücksetzen
    document.getElementById('name').value = '';
    document.getElementById('option1').value = 'Handout';
    document.getElementById('option2').value = 'April';
    document.getElementById('option2').disabled = true; // Sicherstellen, dass es deaktiviert bleibt
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

// Funktion zum Deaktivieren von option2 direkt beim Laden der Seite
window.onload = function () {
    let option1 = document.getElementById('option1');
    let option2 = document.getElementById('option2');

    if (option1.value === "Handout") {
        option2.disabled = true;
        option2.value = "April"; // Auswahl zurücksetzen
    }
};
