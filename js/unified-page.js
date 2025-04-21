// unified-page.js - Script específico para a página unificada

document.addEventListener('DOMContentLoaded', function() {
  // Sistema de tabs
  initTabs();

  // Inicializar seções expansíveis
  initCollapsibleSections();

  // Configurar botão de impressão
  initPrintButton();

  // Configurar navegação suave entre seções
  initSmoothScroll();

  // Animar elementos quando eles entram na viewport
  initScrollAnimations();
});

/**
* Inicializa o sistema de tabs
*/
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  if (!tabButtons.length) return;

  tabButtons.forEach(button => {
      button.addEventListener('click', function() {
          const tabId = this.getAttribute('data-tab');

          // Remover classes ativas
          tabButtons.forEach(btn => btn.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));

          // Adicionar classe ativa no botão e conteúdo correspondente
          this.classList.add('active');
          document.getElementById(tabId).classList.add('active');

          // Salvar a tab ativa no localStorage para persistência
          localStorage.setItem('activeTab', tabId);
      });
  });

  // Restaurar a última tab ativa
  const lastActiveTab = localStorage.getItem('activeTab');
  if (lastActiveTab) {
      const lastActiveButton = document.querySelector(`.tab-button[data-tab="${lastActiveTab}"]`);
      if (lastActiveButton) {
          lastActiveButton.click();
      }
  }
}

/**
* Inicializa as seções expansíveis
*/
function initCollapsibleSections() {
  const collapsibleHeaders = document.querySelectorAll('.collapsible-header');

  if (!collapsibleHeaders.length) return;

  collapsibleHeaders.forEach(header => {
      header.addEventListener('click', function() {
          this.classList.toggle('expanded');
          const content = this.nextElementSibling;

          if (content.classList.contains('expanded')) {
              content.style.maxHeight = '0';
              setTimeout(() => {
                  content.classList.remove('expanded');
              }, 10);
          } else {
              content.classList.add('expanded');
              content.style.maxHeight = content.scrollHeight + 'px';
              setTimeout(() => {
                  content.style.maxHeight = '';
              }, 500);
          }

          // Atualizar o ícone de toggle
          const toggleIcon = this.querySelector('.toggle-icon i');
          if (toggleIcon) {
              toggleIcon.classList.toggle('fa-chevron-down');
              toggleIcon.classList.toggle('fa-chevron-up');
          }
      });
  });
}

/**
* Inicializa o botão de impressão
*/
function initPrintButton() {
  const printBtn = document.querySelector('.print-btn');
  if (!printBtn) return;

  printBtn.addEventListener('click', function() {
      // Expandir todas as seções colapsadas antes de imprimir
      const collapsibleContents = document.querySelectorAll('.collapsible-content:not(.expanded)');
      const expandedSections = [];

      // Expandir todas as seções para impressão
      collapsibleContents.forEach(content => {
          const header = content.previousElementSibling;
          if (header && header.classList.contains('collapsible-header')) {
              expandedSections.push({ header, content });
              content.classList.add('expanded');
              content.style.maxHeight = 'none';

              // Atualizar ícone
              const toggleIcon = header.querySelector('.toggle-icon i');
              if (toggleIcon) {
                  toggleIcon.classList.remove('fa-chevron-down');
                  toggleIcon.classList.add('fa-chevron-up');
              }
          }
      });

      // Imprimir
      window.print();

      // Restaurar estado anterior após a impressão
      setTimeout(() => {
          expandedSections.forEach(section => {
              section.content.classList.remove('expanded');

              // Restaurar ícone
              const toggleIcon = section.header.querySelector('.toggle-icon i');
              if (toggleIcon) {
                  toggleIcon.classList.add('fa-chevron-down');
                  toggleIcon.classList.remove('fa-chevron-up');
              }
          });
      }, 1000);
  });
}

/**
* Inicializa o scroll suave para links de âncora
*/
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              e.preventDefault();

              // Calcular offset considerando menus fixos
              let offset = 80; // Ajustar conforme altura dos menus fixos
              const secondaryNav = document.getElementById('secondary-nav');
              if (secondaryNav && window.getComputedStyle(secondaryNav).display !== 'none') {
                  offset += secondaryNav.offsetHeight;
              }

              window.scrollTo({
                  top: targetElement.offsetTop - offset,
                  behavior: 'smooth'
              });

              // Atualizar URL sem recarregar a página
              history.pushState(null, null, targetId);
          }
      });
  });
}

/**
* Inicializa animações ao scroll
*/
function initScrollAnimations() {
  // Elementos que serão animados
  const animatedElements = document.querySelectorAll(
      '.feature-card, .highlight-box, .lesson-card, .timeline-item, .info-box'
  );

  if (!animatedElements.length) return;

  // Adicionar classe inicial
  animatedElements.forEach(element => {
      element.classList.add('animate-on-scroll');
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Função que verifica se o elemento está visível
  function checkIfInView() {
      animatedElements.forEach(element => {
          if (isElementInViewport(element) && element.style.opacity === '0') {
              setTimeout(() => {
                  element.style.opacity = '1';
                  element.style.transform = 'translateY(0)';
              }, 100);
          }
      });
  }

  // Verificar inicialmente e adicionar listener para scroll
  checkIfInView();
  window.addEventListener('scroll', checkIfInView);
  window.addEventListener('resize', checkIfInView);
}

/**
* Verifica se um elemento está visível na viewport
*/
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
      rect.bottom >= 0
  );
}

/**
* Detecta quando a página terminou de carregar completamente
*/
window.addEventListener('load', function() {
  // Remover preloader se existir
  const preloader = document.getElementById('preloader');
  if (preloader) {
      preloader.classList.add('loaded');
      setTimeout(() => {
          preloader.style.display = 'none';
      }, 500);
  }

  // Animar hero section
  const hero = document.querySelector('.hero');
  if (hero) {
      hero.classList.add('loaded');
  }
});

/**
* Oculta elementos não visíveis no viewport para melhorar performance
*/
function lazyLoadElements() {
  // Implementar se necessário para melhorar performance em dispositivos mais lentos
}

// Exportar funções para uso em outros scripts se necessário
window.unifiedPage = {
  initTabs,
  initCollapsibleSections,
  initPrintButton,
  initSmoothScroll,
  initScrollAnimations
};
