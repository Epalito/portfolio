function setActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link'); // Modifiez cette ligne
  var titreNav = document.querySelector('.titre-nav a');

  // Ajoute un écouteur d'événements au titre
  titreNav.addEventListener('click', function () {
    // Réactive le défilement de la page principale
    document.body.style.overflow = 'auto';

    // Masque tous les onglets
    var onglets = document.querySelectorAll('.onglet-projet');
    onglets.forEach(function (onglet) {
      onglet.classList.remove('actif');
    });
  });

  // Ajoute un écouteur d'événements à chaque lien de navigation
  navLinks.forEach((navLink) => {
    navLink.addEventListener('click', () => {
      // Réactive le défilement de la page principale
      document.body.style.overflow = 'auto';

      // Masque tous les onglets
      var onglets = document.querySelectorAll('.onglet-projet');
      onglets.forEach(function (onglet) {
        onglet.classList.remove('actif');
      });
    });
  });

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop - 50;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      navLinks[index].classList.add('active');
    } else {
      navLinks[index].classList.remove('active');
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const navLink = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]` // Modifiez cette ligne
        );
        navLink.classList.add('active');
      } else {
        const navLink = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]` // Modifiez cette ligne
        );
        navLink.classList.remove('active');
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('section').forEach((section) => {
  observer.observe(section);
});

document.addEventListener('scroll', setActiveNav);

// -------------- Gestion des onglets de la section Projets ----------------

// Sélectionne toutes les vignettes de projets
var vignettes = document.querySelectorAll('.vignette-projet');

// Sélectionne le contenu de la page
var contenu = document.getElementById('contenu');

// Ajoute un écouteur d'événements à chaque vignette
vignettes.forEach(function (vignette) {
  vignette.addEventListener('click', function () {
    // Récupère l'ID du projet correspondant
    var projetId = this.dataset.projet;

    // Masque tous les onglets
    var onglets = document.querySelectorAll('.onglet-projet');
    onglets.forEach(function (onglet) {
      onglet.classList.remove('actif');
    });

    // Affiche l'onglet correspondant
    var onglet = document.getElementById(projetId);
    onglet.classList.add('actif');

    // Désactive le défilement de la page principale
    document.body.style.overflow = 'hidden';
  });
});

// Ajoute un écouteur d'événements au bouton de retour
var boutonsRetour = document.querySelectorAll('.retour');
boutonsRetour.forEach(function (bouton) {
  bouton.addEventListener('click', function (event) {
    // Arrête la propagation de l'événement
    event.stopPropagation();

    // Masque tous les onglets
    var onglets = document.querySelectorAll('.onglet-projet');
    onglets.forEach(function (onglet) {
      onglet.classList.remove('actif');
    });

    // Réactive le défilement de la page principale
    document.body.style.overflow = 'auto';
  });
});

document.querySelectorAll('.suivant').forEach((button, index, buttons) => {
  button.addEventListener('click', () => {
    const currentProject = button.parentElement;
    currentProject.classList.remove('actif');

    const nextProject = buttons[(index + 1) % buttons.length].parentElement;
    nextProject.classList.add('actif');
  });
});

// -------------- Gestion du gradient dynamique ----------------

import { Gradient } from './Gradient.js';

// Create your instance
const gradient = new Gradient();

// Call `initGradient` with the selector to your canvas
gradient.initGradient('#gradient-canvas');

// -------------- Gestion du custom cursor ----------------

const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;
  cursorOutline.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`,
    },
    { duration: 300, fill: 'forwards' }
  );
});

// -------------- Gestion de la section Prestation ----------------
function closeActiveDetail() {
  const activeDetail = document.querySelector('.prestation-details.active');
  if (activeDetail) {
    activeDetail.classList.remove('active');
    document
      .querySelector('.prestation-container')
      .classList.remove('blur-background');
  }
}

document
  .getElementById('solution-simple')
  .addEventListener('click', function (event) {
    event.stopPropagation(); // Empêche la propagation de l'événement de clic
    closeActiveDetail(); // Ferme la vignette active avant d'ouvrir une nouvelle
    document.getElementById('details-simple').classList.add('active');
    document
      .querySelector('.prestation-container')
      .classList.add('blur-background');
  });

document
  .getElementById('solution-personnalisee')
  .addEventListener('click', function (event) {
    event.stopPropagation(); // Empêche la propagation de l'événement de clic
    closeActiveDetail(); // Ferme la vignette active avant d'ouvrir une nouvelle
    document.getElementById('details-personnalisee').classList.add('active');
    document
      .querySelector('.prestation-container')
      .classList.add('blur-background');
  });

document.querySelectorAll('.prestation-details').forEach(function (detail) {
  detail.addEventListener('click', function (event) {
    event.stopPropagation(); // Empêche la propagation de l'événement de clic
    detail.classList.remove('active');
    document
      .querySelector('.prestation-container')
      .classList.remove('blur-background');
  });
});

// Fermer la vignette en cliquant en dehors de la vignette
document.addEventListener('click', function (event) {
  const activeDetail = document.querySelector('.prestation-details.active');
  if (activeDetail && !activeDetail.contains(event.target)) {
    activeDetail.classList.remove('active');
    document
      .querySelector('.prestation-container')
      .classList.remove('blur-background');
  }
});
