let fastFallDuration = 3000; // Durata in millisecondi (3 secondi)
let startTime = Date.now(); // Tempo di inizio

function getMaxParticles() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Calcoliamo il numero massimo di particelle in base alla dimensione dello schermo
  return Math.max(10, Math.floor((screenWidth * screenHeight) / 50000));
}

function createParticle() {
  if (document.querySelectorAll('.particle').length < getMaxParticles()) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Maggiore probabilità di far comparire particelle a sinistra (prima metà dello schermo)
    const startX = Math.random() * window.innerWidth * 0.6; // Solo il 60% dello schermo per favorire la sinistra
    particle.style.left = `${startX}px`;
    particle.style.top = `-10px`; // Partono fuori dallo schermo

    // Dimensioni casuali
    const size = Math.random() * 6 + 3; // Tra 3px e 9px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    document.getElementById('particles').appendChild(particle);

    // Fade-in più morbido
    setTimeout(() => {
      particle.style.opacity = "1";
    }, 100);

    animateParticle(particle, startX);
  }
}

function animateParticle(particle, startX) {
  let y = -10; // Altezza iniziale
  let x = startX;
  let speed = (Math.random() * 1 + 0.5); // Velocità più lenta (dimezzata)
  let wind = (Math.random() - 0.5) * 0.1; // Movimento laterale più lieve
  let sway = Math.random() * Math.PI * 2; // Inizializza l'oscillazione in un punto casuale
  let swaySpeed = Math.random() * 0.01 + 0.005; // Oscillazione molto più lenta

  // Se sono passati meno di 3 secondi, aumentiamo la velocità
  let currentTime = Date.now();
  let elapsedTime = currentTime - startTime;
  if (elapsedTime < fastFallDuration) {
    speed *= 2; // Doppia velocità per i primi 3 secondi
  }

  function fall() {
    y += speed;
    sway += swaySpeed;
    x += Math.sin(sway) * 2 + wind; // Movimento laterale molto dolce

    particle.style.transform = `translate(${x}px, ${y}px)`;

    if (y < window.innerHeight) {
      requestAnimationFrame(fall);
    } else {
      particle.remove();
    }
  }

  requestAnimationFrame(fall);
}

// Creiamo nuove particelle ogni 500ms, adattando al numero massimo
setInterval(createParticle, 500);

// Funzione per gestire il click sul bottone Admin
document.getElementById('admin-btn').addEventListener('click', function() {
  // Mostra il banner per la password
  document.getElementById('password-banner').classList.add('show');
});

// Funzione per gestire la conferma della password
document.getElementById('password-input').addEventListener('input', function() {
  const password = document.getElementById('password-input').value;
  const confirmBtn = document.getElementById('confirm-btn');

  // Mostra il bottone di conferma solo quando è stata inserita una password
  if (password.length > 0) {
    confirmBtn.style.display = 'block';  // Mostra il bottone quando c'è un input
  } else {
    confirmBtn.style.display = 'none';  // Nascondi il bottone se non c'è input
  }
});

// Funzione per confermare la password
document.getElementById('confirm-btn').addEventListener('click', function() {
  const password = document.getElementById('password-input').value;
  
  if (password === 'admin') {
    // Se la password è corretta, reindirizza alla pagina admin
    window.location.href = 'admin.html';
  } else {
    // Se la password è errata, mostra un messaggio di errore
    alert('Password errata!');
    document.getElementById('password-input').value = '';  // Reset della password
    document.getElementById('confirm-btn').style.display = 'none';  // Nascondi il bottone di conferma
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const createGWBtn = document.getElementById("create-gw-btn");
  const modal = document.getElementById("gw-modal");
  const closeModal = document.getElementById("close-modal");

  if (createGWBtn) {
      createGWBtn.addEventListener("click", function () {
          console.log("Apertura del modale...");
          modal.style.display = "flex"; // Mostra il banner
      });
  }

  if (closeModal) {
      closeModal.addEventListener("click", function () {
          console.log("Chiusura del modale...");
          modal.style.display = "none"; // Nasconde il banner
      });
  }
});
