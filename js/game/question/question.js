const questionZone = document.getElementById("questions_container");
const btnZone = document.getElementById("btn_container");
const lifeContainer = document.getElementById("life_counter"); // Conteneur des vies
const printScore = document.getElementById("score");

let progressBar = document.getElementById("progress");
let questionsData = [];
let usedIndexes = [];
let gameOver = false;
let anecdote = document.getElementById("response")
let anecdoteText = anecdote.appendChild(document.createElement("p"));




fetch('/question.json')
  .then(response => response.json())
  .then(data => {
    questionsData = data.questions;
    loadNewQuestion();
  })
  .catch(error => console.error('Erreur de chargement du fichier JSON:', error));

  function loadNewQuestion() {
    anecdoteText.innerHTML = "";
    anecdote.style.opacity = "0"; // Cacher l’anecdote en début de question
    anecdote.style.transition = "opacity 0.5s ease"; // Animation douce
  
    if (gameOver) return; // Stopper la partie si elle est terminée
    
    // Vérifier s'il reste des questions
    if (usedIndexes.length === questionsData.length) {
      endGame("Bravo, vous avez terminé le quiz !");
      return;
    }
  
    // Choisir une nouvelle question non utilisée
    let pickedIndex;
    do {
      pickedIndex = getRandomInt(0, questionsData.length - 1);
    } while (usedIndexes.includes(pickedIndex));
    usedIndexes.push(pickedIndex);
  
    // Récupérer la question
    let currentQuestion = questionsData[pickedIndex];
  
    // Mettre à jour l'affichage
    questionZone.innerHTML = `<p>${currentQuestion.question}</p>`;
    btnZone.innerHTML = ""; // Supprimer les anciens boutons
  
    // Créer les boutons
    currentQuestion.choices.forEach(choice => {
      let btn = document.createElement("button");
      btn.classList.add('btn_check');
      btn.innerHTML = choice;
      btnZone.appendChild(btn);
  
      btn.addEventListener("click", () => {
        if (gameOver) return; // Empêcher d'interagir après la fin
        const sonClic = new Audio('/sound/clic.mp3');
        sonClic.play();
  
        let isCorrect = verifyAnswer(choice, currentQuestion.answer);
        
        // Afficher l’anecdote quand un bouton est cliqué
        anecdoteText.innerHTML = currentQuestion.anecdote;
        anecdote.style.opacity = "1"; 

  
        // Désactiver tous les boutons après le premier clic
        document.querySelectorAll(".btn_check").forEach(button => {
          button.disabled = true;
          button.style.backgroundColor = verifyAnswer(button.innerHTML, currentQuestion.answer) ? "green" : "red";
        });
  
        if (!isCorrect) {
          let life = document.querySelectorAll(".life");
          let sound_error = new Audio('/sound/erreur.mp3');
          sound_error.play();
          if (life.length > 0) {
            life[life.length - 1].remove();
          }
        } else {
          let sound_correct = new Audio('/sound/correct.mp3');
          sound_correct.play();
          augmenterProgression();
        }
  
        // Vérifier si toutes les vies sont perdues
        if (document.querySelectorAll(".life").length === 0) {
          endGame("Vous avez perdu !");
          let sound_lose = new Audio('/sound/game_over.mp3');
          sound_lose.play();
          return;
        }
  
        if (progress.value === 10) {
          WinGame("Vous avez gagné !");
          let sound_win = new Audio('/sound/win.mp3');
          sound_win.play();
          return;
        }
  
        // Attendre 5 secondes puis changer de question et cacher l’anecdote
        setTimeout(() => {
          anecdote.style.opacity = "0"; // Cacher l’anecdote
          setTimeout(() => {
            loadNewQuestion();
          }, 1000);
          
        }, 4000);
      });
    });
  }
  

function augmenterProgression() {
      let valeur = localStorage.getItem("good_answer") ? parseInt(localStorage.getItem("good_answer")) : 0;
      valeur +=1 ;
      localStorage.setItem("good_answer", valeur);
      progressBar.value += 1;
      printScore.innerHTML = progress.value+"/10";
}

function resetProgression() {
  progressBar.value = 0;
}

function WinGame(message) {
  let valeur = localStorage.getItem("nbr_win") ? parseInt(localStorage.getItem("nbr_win")) : 0;
  valeur +=1 ;
  localStorage.setItem("nbr_win", valeur);
  questionZone.innerHTML = `<p>${message}</p>`;
}

function endGame(message) {
  gameOver = true;
  questionZone.innerHTML = `<p>${message}</p>`;
  btnZone.innerHTML = `
    <button onclick="restartGame()" id="btn_option">Recommencer</button>
    <button onclick="goToMenu()" id="btn_option">Menu Principal</button>
  `;
}

function restartGame() {
  gameOver = false;
  let sound_start = new Audio('/sound/start.mp3');
  sound_start.play();
  document.getElementById("setting").style.transform = "translateY(-100vh)";
  progress.value = 0;
  printScore.innerHTML = progress.value +"/10";

  usedIndexes = [];
  lifeContainer.innerHTML = `           
            <img src="/public/img/rocket-svgrepo-com.svg" alt="rocket icone" class="life">
            <img src="/public/img/rocket-svgrepo-com.svg" alt="rocket icone" class="life">
            <img src="/public/img/rocket-svgrepo-com.svg" alt="rocket icone" class="life">`; // Réinitialise les vies
  loadNewQuestion();
}

function goToMenu() {
  window.location.href = "index.html"; // Redirige vers le menu principal (modifie selon ton fichier)
}

// Générer un nombre aléatoire
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function verifyAnswer(choice, answer) {
  return choice === answer;
}
