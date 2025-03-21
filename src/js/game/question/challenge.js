const missions = [
    { id: 1, name: "Débutant", description:"Faites 10 bonnes réponses au total", type: "good_answer", objectif: 10, recompense: "microscope" },
    { id: 2, name: "Intermédiaire", description:"Faites 20 bonnes réponses au total", type: "good_answer", objectif: 20, recompense:"antenne"},
    { id: 3, name: "Champion", description:"Gagner 5 parties", type: "nbr_win", objectif: 5, recompense: "mooncake" },
  ];
let challenge = document.getElementById('defi_container');

let obj_accesible = ["boite","perseverance"];


window.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("obj_accessible")) {
        localStorage.setItem("obj_accessible", JSON.stringify(obj_accesible));
    }
    printMissions();
})

function printMissions() {
    let challenge = document.getElementById("defi_container"); // Ensure challenge exists
    challenge.innerHTML = ""; // Clear previous content

    missions.forEach((event) => {
        let storedValue = localStorage.getItem(event.type);
        if (parseInt(storedValue) < event.objectif) {
            challenge.innerHTML += `
            <div class="defi">
                <div>        
                    <h2>${event.name}</h2>
                    <p>${event.description}</p>
                </div>
                <p>${parseInt(storedValue)} / ${event.objectif}</p>
                <p>Récompense: ${event.recompense}<p>
            </div>
        `;
        }
        else{
            obj_accesible.push(event.recompense);
            localStorage.setItem("obj_accessible", JSON.stringify(obj_accesible));
            challenge.innerHTML += `
            <div class="defi">
                <div>        
                    <h2>${event.name}</h2>
                    <p>${event.description}</p>
                </div>
                <p>Vous avez accompli l'objectif !</p>
                
            </div>
        `;
        }

        
    });
}