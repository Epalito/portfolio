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

// -------------- Ancien système d'onglets supprimé ----------------
// L'ancien système d'onglets a été remplacé par les modales modernes

// Ajoute un écouteur d'événements au bouton de retour (gardé pour compatibilité)
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

// ========================================
// SYSTÈME DE MODALES POUR LES PROJETS
// ========================================

class ProjectModal {
  constructor() {
    this.modal = document.getElementById('modal-overlay');
    this.modalContainer = this.modal?.querySelector('.modal-container');
    this.closeBtn = this.modal?.querySelector('.modal-close');
    this.prevBtn = this.modal?.querySelector('.modal-nav-prev');
    this.nextBtn = this.modal?.querySelector('.modal-nav-next');
    this.modalTitle = this.modal?.querySelector('.modal-title');
    this.modalBadges = this.modal?.querySelector('.modal-badges');
    this.modalCompetenceBadge = this.modal?.querySelector('.modal-competence-badge');
    this.modalText = this.modal?.querySelector('.modal-text');
    this.modalGallery = this.modal?.querySelector('.modal-gallery-grid');
    
    this.currentProject = null;
    this.projects = [];
    this.currentIndex = 0;
    
    this.init();
  }
  
  init() {
    if (!this.modal) return;
    
    // Charger les données des projets
    this.loadProjectData();
    
    // Ajouter les event listeners
    this.bindEvents();
    
    // Marquer les vignettes comme pouvant ouvrir des modales
    this.attachModalTriggers();
  }
  
  loadProjectData() {
    // Données des projets avec toutes les informations nécessaires
    this.projects = [
      {
        id: 'projet1',
        title: 'Site Vitrine WordPress - Luthière',
        badges: ['WordPress', 'PHP', 'MySQL', 'CSS3'],
        competence: 'Maîtrise',
        description: `Ce projet consistait à créer un site vitrine pour une luthière artisanale. 
        L'objectif était de présenter son travail de manière élégante et professionnelle, 
        en mettant en valeur ses créations d'instruments de musique traditionnels.
        
        Le site inclut une galerie d'images, une présentation de l'artisane, 
        et un système de contact pour les commandes personnalisées.
        
        Technologies utilisées : WordPress avec thème personnalisé, PHP pour les fonctionnalités 
        spécifiques, MySQL pour la base de données, et CSS3 pour un design responsive moderne.`,
        images: [
          'images/screenshots/mh_1.png',
          'images/screenshots/mh.png'
        ]
      },
      {
        id: 'projet2',
        title: 'Gestionnaire de Backlog Jeux Vidéo',
        badges: ['React', 'Node.js', 'MongoDB', 'Express'],
        competence: 'Avancé',
        description: `Application MERN complète pour gérer sa collection de jeux vidéo et son backlog.
        Cette application permet aux joueurs de suivre leurs jeux en cours, terminés, 
        et ceux qu'ils souhaitent jouer.
        
        Fonctionnalités principales :
        • Ajout et gestion de jeux dans différentes catégories
        • Système de notation et commentaires
        • Statistiques de progression
        • Interface responsive et moderne
        • Authentification utilisateur sécurisée
        
        Stack technique : React pour l'interface utilisateur, Node.js et Express pour l'API REST,
        MongoDB pour la persistance des données, avec authentification JWT.`,
        images: [
          'images/screenshots/weatherapp.png'
        ]
      },
      {
        id: 'projet3',
        title: 'Projet Symfony/PostgreSQL',
        badges: ['Symfony', 'PHP', 'PostgreSQL'],
        competence: 'Apprentissage',
        description: `Application web développée avec le framework Symfony, utilisant PostgreSQL 
        comme système de gestion de base de données. Ce projet vise à approfondir les concepts 
        du développement backend avec un framework professionnel.
        
        Objectifs d'apprentissage :
        • Maîtrise de l'architecture MVC avec Symfony
        • Gestion des entités et relations avec Doctrine ORM
        • Création d'API REST sécurisées
        • Implémentation de fonctionnalités d'authentification
        • Tests unitaires et d'intégration
        
        Le projet simule une application de gestion métier avec différents rôles utilisateurs,
        permissions granulaires, et interface d'administration complète.`,
        images: []
      },
      {
        id: 'projet4',
        title: 'API REST Pokémon',
        badges: ['Node.js', 'Express', 'MySQL'],
        competence: 'Avancé',
        description: `API REST développée en Node.js pour la gestion d'une base de données Pokémon.
        Ce projet approfondit les compétences en développement backend et architecture API.
        
        Fonctionnalités de l'API :
        • CRUD complet pour les Pokémons
        • Système d'authentification avec JWT
        • Middleware de validation des données
        • Gestion des erreurs et logging
        • Documentation automatique avec Swagger
        • Tests d'intégration avec Jest
        
        Outils utilisés : Express.js, Sequelize ORM, bcrypt pour le hachage, 
        jsonwebtoken pour l'authentification, et nodemon pour le développement.
        Base de données MySQL avec relations complexes entre les entités.`,
        images: [
          'images/screenshots/NodeJS_pokemon/code.png',
          'images/screenshots/NodeJS_pokemon/code2.png',
          'images/screenshots/NodeJS_pokemon/insomnia.png',
          'images/screenshots/NodeJS_pokemon/phpmyadmin.png'
        ]
      },
      {
        id: 'projet5',
        title: 'Site e-commerce JSAmazona',
        badges: ['React', 'Node.js', 'MongoDB', 'Express'],
        competence: 'Avancé',
        description: `Plateforme e-commerce complète développée avec la stack MERN, inspirée d'Amazon.
        Ce projet couvre tous les aspects d'une boutique en ligne moderne.
        
        Fonctionnalités principales :
        • Catalogue produits avec recherche et filtres
        • Panier d'achat et processus de commande
        • Gestion des utilisateurs et profils
        • Interface d'administration pour les vendeurs
        • Système de paiement intégré
        • Gestion des stocks et inventaire
        • Système de reviews et ratings
        
        Architecture technique : Frontend React avec hooks et context API,
        backend Express.js avec API REST, base de données MongoDB,
        authentification JWT, intégration PayPal, et déploiement sur cloud.`,
        images: [
          'images/screenshots/jsamazona/jsamazona_1.png',
          'images/screenshots/jsamazona/jsamazona_2.png',
          'images/screenshots/jsamazona/jsamazona_3.png'
        ]
      },
      {
        id: 'projet6',
        title: 'Les Connexions - site associatif',
        badges: ['WordPress', 'PHP', 'MySQL'],
        competence: 'Maîtrise',
        description: `Site web pour une association locale, développé en étroite collaboration 
        avec le client pour répondre à leurs besoins spécifiques de communication et gestion.
        
        Objectifs du projet :
        • Présentation claire des activités de l'association
        • Système d'inscription aux événements
        • Galerie photo et actualités
        • Espace membres avec contenu privé
        • Interface d'administration simplifiée
        
        Gestion de projet :
        • Discussions régulières avec le client
        • Prototypage avec Figma
        • Développement itératif avec validation
        • Formation du client à l'administration
        
        Technologies : WordPress personnalisé, thème sur mesure, 
        plugins spécifiques, optimisation SEO et performance.`,
        images: [
          'images/screenshots/les_connexions/les_connexions_1.png',
          'images/screenshots/les_connexions/les_connexions_2.png',
          'images/screenshots/les_connexions/les_connexions_3.png'
        ]
      }
    ];
  }
  
  attachModalTriggers() {
    // Ajouter les event listeners aux vignettes avec data-modal="true"
    const modalTriggers = document.querySelectorAll('.vignette-projet[data-modal="true"]');
    
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const projectId = trigger.getAttribute('data-projet');
        this.openModal(projectId);
      });
      
      // Ajouter un indicateur visuel que la vignette peut ouvrir une modale
      trigger.style.cursor = 'pointer';
      trigger.title = 'Cliquer pour voir les détails du projet';
    });
  }
  
  bindEvents() {
    // Fermeture de la modale
    this.closeBtn?.addEventListener('click', () => this.closeModal());
    
    // Fermeture en cliquant sur l'overlay
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });
    
    // Navigation entre projets
    this.prevBtn?.addEventListener('click', () => this.previousProject());
    this.nextBtn?.addEventListener('click', () => this.nextProject());
    
    // Gestion du clavier
    document.addEventListener('keydown', (e) => {
      if (!this.modal?.classList.contains('active')) return;
      
      switch (e.key) {
        case 'Escape':
          this.closeModal();
          break;
        case 'ArrowLeft':
          this.previousProject();
          break;
        case 'ArrowRight':
          this.nextProject();
          break;
      }
    });
  }
  
  openModal(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return;
    
    this.currentProject = project;
    this.currentIndex = this.projects.indexOf(project);
    
    this.populateModal(project);
    this.showModal();
  }
  
  populateModal(project) {
    // Titre et badges
    if (this.modalTitle) {
      this.modalTitle.textContent = project.title;
    }
    
    // Badges techniques avec mapping correct des noms de classes
    if (this.modalBadges) {
      const badgeClassMap = {
        'React': 'react',
        'Node.js': 'node',
        'MongoDB': 'mongo',
        'Express': 'express',
        'WordPress': 'wordpress',
        'PHP': 'php',
        'MySQL': 'mysql',
        'CSS3': 'css',
        'Symfony': 'symfony',
        'PostgreSQL': 'postgresql'
      };
      
      this.modalBadges.innerHTML = project.badges.map(badge => {
        const cssClass = badgeClassMap[badge] || badge.toLowerCase().replace(/[^a-z0-9]/g, '');
        return `<span class="badge badge-${cssClass}">${badge}</span>`;
      }).join('');
    }
    
    // Badge de compétence
    if (this.modalCompetenceBadge) {
      const competenceClass = project.competence.toLowerCase();
      this.modalCompetenceBadge.innerHTML = 
        `<span class="competence-badge competence-${competenceClass}">${project.competence}</span>`;
    }
    
    // Description
    if (this.modalText) {
      this.modalText.innerHTML = project.description.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
    }
    
    // Galerie d'images
    if (this.modalGallery) {
      this.modalGallery.innerHTML = project.images.map(image => 
        `<div class="modal-gallery-item">
          <img src="${image}" alt="${project.title}" loading="lazy">
        </div>`
      ).join('');
    }
  }
  
  showModal() {
    if (!this.modal) return;
    
    // Empêcher le scroll du body
    document.body.style.overflow = 'hidden';
    
    // Afficher la modale avec animation
    this.modal.classList.add('active');
    
    // Focus sur le bouton de fermeture pour l'accessibilité
    setTimeout(() => {
      this.closeBtn?.focus();
    }, 400);
  }
  
  closeModal() {
    if (!this.modal) return;
    
    // Restaurer le scroll du body
    document.body.style.overflow = 'auto';
    
    // Masquer la modale avec animation
    this.modal.classList.remove('active');
    
    this.currentProject = null;
  }
  
  previousProject() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.projects.length - 1;
    }
    
    const project = this.projects[this.currentIndex];
    this.currentProject = project;
    this.populateModal(project);
  }
  
  nextProject() {
    if (this.currentIndex < this.projects.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    
    const project = this.projects[this.currentIndex];
    this.currentProject = project;
    this.populateModal(project);
  }
}

// Initialiser le système de modales quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  // Petit délai pour s'assurer que tous les autres event listeners sont attachés
  setTimeout(() => {
    new ProjectModal();
  }, 100);
});