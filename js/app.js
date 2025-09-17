function setActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  var titreNav = document.querySelector('.titre-nav a');

  titreNav.addEventListener('click', function () {
    document.body.style.overflow = 'auto';
  });

  navLinks.forEach((navLink) => {
    navLink.addEventListener('click', () => {
      document.body.style.overflow = 'auto';
    });
  });

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 50;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      navLinks.forEach(link => link.classList.remove('active'));
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
          `.nav-link[href="#${entry.target.id}"]`
        );
        if (navLink) {
          navLink.classList.add('active');
        }
      } else {
        const navLink = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]`
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

// Gradient dynamique
import { Gradient } from './Gradient.js';

const gradient = new Gradient();
gradient.initGradient('#gradient-canvas');

// Custom cursor
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

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

// Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu a');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  menu.classList.toggle('active');
});

menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

// Navigation par stacks
document.addEventListener('DOMContentLoaded', function() {
  const stackFolders = document.querySelectorAll('.stack-folder');
  const stackContents = document.querySelectorAll('.stack-content');
  
  stackFolders.forEach(folder => {
    folder.addEventListener('click', function() {
      const stackType = this.getAttribute('data-stack');
      const targetContent = document.querySelector(`[data-content="${stackType}"]`);
      const isCurrentlyActive = this.classList.contains('active');
      
      if (isCurrentlyActive) {
        this.classList.remove('active');
        if (targetContent) {
          setTimeout(() => {
            targetContent.classList.remove('active');
          }, 150);
        }
      } else {
        stackFolders.forEach(f => f.classList.remove('active'));
        stackContents.forEach(content => {
          content.classList.remove('active');
        });
        
        this.classList.add('active');
        
        if (targetContent) {
          setTimeout(() => {
            targetContent.classList.add('active');
          }, 200);
        }
      }
    });
  });
  
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

document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.vignette-projet');
  projectCards.forEach(card => {
    badgeObserver.observe(card);
    
    const badges = card.querySelectorAll('.badge');
    badges.forEach(badge => {
      badge.style.opacity = '0';
      badge.style.transform = 'translateY(20px)';
      badge.style.transition = 'all 0.4s ease';
    });
  });
});

/* Système de modales */
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
    this.modalProjectLinks = this.modal?.querySelector('.modal-project-links');
    
    this.currentProject = null;
    this.projects = [];
    this.currentIndex = 0;
    
    this.init();
  }
  
  init() {
    if (!this.modal) return;
    
    this.loadProjectData();
    this.bindEvents();
    this.attachModalTriggers();
  }
  
  loadProjectData() {
    this.projects = [
      {
        id: 'projet1',
        title: 'Site Vitrine - Luthière Artisanale',
        badges: ['WordPress', 'PHP', 'MySQL', 'CSS3'],
        competence: 'Maîtrise',
        description: `Site vitrine pour une luthière artisanale avec galerie d'images, présentation de l'artisane et système de contact pour commandes personnalisées. Développé avec WordPress personnalisé et design responsive.`,
        link: 'https://clementineweber.com/',
        images: [
          'images/screenshots/clementineweber/clementineweber_1.png',
          'images/screenshots/clementineweber/clementineweber_2.png',
          'images/screenshots/clementineweber/clementineweber_3.png'
        ]
      },
      {
        id: 'projet2',
        title: 'Gestionnaire de Backlog Jeux Vidéo',
        badges: ['React', 'Node.js', 'MongoDB', 'Express'],
        competence: 'Avancé',
        description: `Application MERN pour gérer sa collection de jeux vidéo et son backlog. Gestion de jeux par catégories, système de notation, statistiques de progression et authentification sécurisée.`,
        images: [
          'images/screenshots/weatherapp.png'
        ]
      },
      {
        id: 'projet3',
        title: 'Plateforme de Gestion de Cours',
        badges: ['Symfony', 'PHP', 'PostgreSQL'],
        competence: 'Apprentissage',
        description: `Mini-clone de plateforme universitaire développé avec Symfony et PostgreSQL. Gestion des cours, étudiants et enseignants avec architecture MVC, Doctrine ORM, API REST sécurisée et système d'authentification par rôles (admin/professeur/étudiant).`,
        images: []
      },
      {
        id: 'projet4',
        title: 'API REST Pokémon',
        badges: ['Node.js', 'Express', 'MySQL'],
        competence: 'Avancé',
        description: `API REST Node.js pour gestion d'une base de données Pokémon. CRUD complet, authentification JWT, middleware de validation, documentation Swagger et tests d'intégration.`,
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
        description: `Plateforme e-commerce MERN inspirée d'Amazon. Catalogue produits, panier d'achat, gestion utilisateurs, interface d'administration, système de paiement PayPal et gestion des stocks.`,
        images: [
          'images/screenshots/jsamazona/jsamazona_1.png',
          'images/screenshots/jsamazona/jsamazona_2.png',
          'images/screenshots/jsamazona/jsamazona_3.png'
        ]
      },
      {
        id: 'projet6',
        title: 'Site Associatif - Les Connexions',
        badges: ['WordPress', 'PHP', 'MySQL'],
        competence: 'Maîtrise',
        description: `Site web pour association locale développé en collaboration client. Présentation des activités, système d'inscription aux événements, galerie photo, espace membres et interface d'administration.`,
        images: [
          'images/screenshots/les_connexions/les_connexions_1.png',
          'images/screenshots/les_connexions/les_connexions_2.png',
          'images/screenshots/les_connexions/les_connexions_3.png'
        ]
      }
    ];
  }
  
  attachModalTriggers() {
    const modalTriggers = document.querySelectorAll('.vignette-projet[data-modal="true"]');
    
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const projectId = trigger.getAttribute('data-projet');
        this.openModal(projectId);
      });
      
      trigger.style.cursor = 'pointer';
      trigger.title = 'Cliquer pour voir les détails du projet';
    });
  }
  
  bindEvents() {
    this.closeBtn?.addEventListener('click', () => this.closeModal());
    
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });
    
    this.prevBtn?.addEventListener('click', () => this.previousProject());
    this.nextBtn?.addEventListener('click', () => this.nextProject());
    
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
    if (this.modalTitle) {
      this.modalTitle.textContent = project.title;
    }
    
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
    
    if (this.modalText) {
      this.modalText.innerHTML = project.description.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
    }
    
    if (this.modalGallery) {
      this.modalGallery.innerHTML = project.images.map(image => 
        `<div class="modal-gallery-item">
          <img src="${image}" alt="${project.title}" loading="lazy">
        </div>`
      ).join('');
    }
    
    if (this.modalProjectLinks && project.link) {
      this.modalProjectLinks.innerHTML = `
        <div class="project-links">
          <a href="${project.link}" target="_blank" rel="noopener">🔗 Voir le site en ligne</a>
        </div>
      `;
    } else if (this.modalProjectLinks) {
      this.modalProjectLinks.innerHTML = '';
    }
  }
  
  showModal() {
    if (!this.modal) return;
    
    document.body.style.overflow = 'hidden';
    this.modal.classList.add('active');
    
    setTimeout(() => {
      this.closeBtn?.focus();
    }, 400);
  }
  
  closeModal() {
    if (!this.modal) return;
    
    document.body.style.overflow = 'auto';
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

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    new ProjectModal();
  }, 100);

  // Rendre les cartes contact entièrement cliquables
  const contactCards = document.querySelectorAll('.contact-card');
  contactCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Éviter le double-clic si on clique directement sur le lien
      if (e.target.tagName === 'A') return;
      
      // Trouver le lien dans la carte et le suivre
      const link = card.querySelector('a');
      if (link) {
        if (link.href.startsWith('mailto:')) {
          // Pour les liens email, ouvrir directement
          window.location.href = link.href;
        } else {
          // Pour les liens externes, ouvrir dans un nouvel onglet
          window.open(link.href, '_blank');
        }
      }
    });
  });
});