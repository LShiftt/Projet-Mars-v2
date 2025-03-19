const missions = [
    { id: 1, name: "Débutant", description:"Faites 10 bonnes réponses au total", type: "good_answer", objectif: 10, recompense: "50 points" },
    { id: 2, name: "Intermédiaire", description:"Faites 20 bonnes réponses au total", type: "good_answer", objectif: 20, recompense: "200 points" },
    { id: 3, name: "Champion", description:"Gagner 5 parties", type: "nbr_win", objectif: 5, recompense: "500 points" },
  ];
let challenge = document.getElementById('defi_container');


window.addEventListener("DOMContentLoaded", function () {
    printMissions();
})

function printMissions() {
    let challenge = document.getElementById("defi_container"); // Ensure challenge exists
    challenge.innerHTML = ""; // Clear previous content

    missions.forEach((event) => {
        let storedValue = localStorage.getItem(event.type);
            challenge.innerHTML += `
                <div class="defi">
                    <div>        
                        <h2>${event.name}</h2>
                        <p>${event.description}</p>
                    </div>
                    <p>${parseInt(storedValue)} / ${event.objectif}</p>
                </div>
            `;
        
    });
}