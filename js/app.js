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

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 50;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      // Retirer active de tous les liens
      navLinks.forEach(link => link.classList.remove('active'));
      // Ajouter active au lien correspondant
      if (correspondingNavLink) {
        correspondingNavLink.classList.add('active');
      }
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
        if (navLink) {
          navLink.classList.add('active');
        }
      } else {
        const navLink = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]` // Modifiez cette ligne
        );
        if (navLink) {
          navLink.classList.remove('active');
        }
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

// Vérifier que les éléments existent avant d'ajouter les event listeners
if (cursorDot && cursorOutline) {
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
}

/*
===============================================
CODE PRESTATIONS SUPPRIMÉ - 15 septembre 2025 
Cause d'erreur: elements prestations n'existent plus
===============================================
*/

// -------------- Gestion du menu hamburger ----------------
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu a'); // Sélectionner tous les liens du menu

// Ouvrir/fermer le menu
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active'); // Transforme le hamburger en croix
  menu.classList.toggle('active'); // Affiche ou masque le menu déroulant
});

// Fermer le menu lorsqu'un lien est cliqué
menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('active'); // Masque le menu
    menuToggle.classList.remove('active'); // Revenir au hamburger
  });
});

// -------------- Code de débogage supprimé ----------------

// ========================================
// GESTION DU SYSTÈME DE NAVIGATION PAR STACKS
// ========================================

// Gestion des dossiers/stacks technologiques
document.addEventListener('DOMContentLoaded', function() {
  const stackFolders = document.querySelectorAll('.stack-folder');
  const stackContents = document.querySelectorAll('.stack-content');
  
  stackFolders.forEach(folder => {
    folder.addEventListener('click', function() {
      const stackType = this.getAttribute('data-stack');
      const targetContent = document.querySelector(`[data-content="${stackType}"]`);
      
      // Vérifier si ce dossier est déjà actif
      const isCurrentlyActive = this.classList.contains('active');
      
      if (isCurrentlyActive) {
        // Si le dossier est déjà ouvert, le fermer avec animation
        this.classList.remove('active');
        if (targetContent) {
          // Délai pour permettre l'animation de fermeture
          setTimeout(() => {
            targetContent.classList.remove('active');
          }, 150);
        }
      } else {
        // Sinon, fermer tous les autres dossiers et ouvrir celui-ci
        
        // Retirer la classe active de tous les dossiers
        stackFolders.forEach(f => f.classList.remove('active'));
        
        // Masquer tous les contenus avec animation
        stackContents.forEach(content => {
          content.classList.remove('active');
        });
        
        // Ajouter la classe active au dossier cliqué
        this.classList.add('active');
        
        // Afficher le contenu correspondant avec un délai pour l'animation
        if (targetContent) {
          setTimeout(() => {
            targetContent.classList.add('active');
          }, 200); // Légèrement plus long pour laisser le temps à l'ancien de se fermer
        }
      }
    });
  });
  
  // Amélioration de l'effet hover sur les badges
  const badges = document.querySelectorAll('.badge');
  badges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    badge.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// Animation d'apparition des badges sur les vignettes
const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -50px 0px'
};

const badgeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const badges = entry.target.querySelectorAll('.badge');
      badges.forEach((badge, index) => {
        setTimeout(() => {
          badge.style.opacity = '1';
          badge.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }
  });
}, observerOptions);

// Observer toutes les vignettes de projets
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.vignette-projet');
  projectCards.forEach(card => {
    badgeObserver.observe(card);
    
    // Initialiser les badges en position cachée
    const badges = card.querySelectorAll('.badge');
    badges.forEach(badge => {
      badge.style.opacity = '0';
      badge.style.transform = 'translateY(20px)';
      badge.style.transition = 'all 0.4s ease';
    });
  });
});