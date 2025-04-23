/**
 * unified-page.js
 * Script responsável pela funcionalidade da página unificada do curso
 *
 * Este arquivo gerencia:
 * - Sistema de abas (tabs)
 * - Seções expansíveis/colapsáveis
 * - Funcionalidade de impressão
 * - Rolagem suave entre seções
 * - Animações de elementos ao rolar
 */

// Inicializa todas as funcionalidades quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o sistema de abas
    initTabs();

    // Configura as seções que podem ser expandidas/recolhidas
    initCollapsibleSections();

    // Configura o botão de impressão com tratamento especial
    initPrintButton();

    // Configura rolagem suave para links internos
    initSmoothScroll();

    // Configura animações de elementos ao entrar na viewport
    initScrollAnimations();
});

/**
 * Inicializa o sistema de abas (tabs)
 *
 * Esta função:
 * 1. Configura os eventos de clique nas abas
 * 2. Gerencia a exibição do conteúdo das abas
 * 3. Persiste a aba selecionada no localStorage
 * 4. Restaura a última aba ativa ao carregar a página
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    if (!tabButtons.length) return;

    // Configura os eventos de clique para cada botão de aba
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Remove classes ativas de todas as abas
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Ativa a aba selecionada e seu conteúdo
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');

            // Salva a seleção para persistência
            localStorage.setItem('activeTab', tabId);
        });
    });

    // Restaura a última aba ativa
    const lastActiveTab = localStorage.getItem('activeTab');
    if (lastActiveTab) {
        const lastActiveButton = document.querySelector(`.tab-button[data-tab="${lastActiveTab}"]`);
        if (lastActiveButton) {
            lastActiveButton.click();
        }
    }
}

/**
 * Inicializa as seções expansíveis/colapsáveis
 *
 * Esta função:
 * 1. Configura os eventos de clique nos cabeçalhos
 * 2. Gerencia a animação de expansão/colapso
 * 3. Atualiza os ícones de toggle
 * 4. Controla as alturas das seções dinamicamente
 */
function initCollapsibleSections() {
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');

    if (!collapsibleHeaders.length) return;

    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('expanded');
            const content = this.nextElementSibling;

            // Gerencia a animação de altura
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

            // Atualiza o ícone de toggle
            const toggleIcon = this.querySelector('.toggle-icon i');
            if (toggleIcon) {
                toggleIcon.classList.toggle('fa-chevron-down');
                toggleIcon.classList.toggle('fa-chevron-up');
            }
        });
    });
}

/**
 * Inicializa a funcionalidade de impressão
 *
 * Esta função:
 * 1. Configura o botão de impressão
 * 2. Expande todas as seções antes de imprimir
 * 3. Restaura o estado original após a impressão
 * 4. Gerencia os ícones durante o processo
 */
function initPrintButton() {
    const printBtn = document.querySelector('.print-btn');
    if (!printBtn) return;

    printBtn.addEventListener('click', function() {
        // Armazena as seções que precisam ser expandidas
        const collapsibleContents = document.querySelectorAll('.collapsible-content:not(.expanded)');
        const expandedSections = [];

        // Expande todas as seções para impressão
        collapsibleContents.forEach(content => {
            const header = content.previousElementSibling;
            if (header && header.classList.contains('collapsible-header')) {
                expandedSections.push({ header, content });
                content.classList.add('expanded');
                content.style.maxHeight = 'none';

                // Atualiza o ícone para expandido
                const toggleIcon = header.querySelector('.toggle-icon i');
                if (toggleIcon) {
                    toggleIcon.classList.remove('fa-chevron-down');
                    toggleIcon.classList.add('fa-chevron-up');
                }
            }
        });

        // Aciona a impressão
        window.print();

        // Restaura o estado original após a impressão
        setTimeout(() => {
            expandedSections.forEach(section => {
                section.content.classList.remove('expanded');

                // Restaura o ícone para colapsado
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
 * Inicializa a rolagem suave para links internos
 *
 * Esta função:
 * 1. Configura links que apontam para elementos na mesma página
 * 2. Calcula offset considerando menus fixos
 * 3. Realiza rolagem suave até o elemento
 * 4. Atualiza a URL sem recarregar a página
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // Calcula o offset total considerando menus fixos
                let offset = 80; // Altura base para menus fixos
                const secondaryNav = document.getElementById('secondary-nav');
                if (secondaryNav && window.getComputedStyle(secondaryNav).display !== 'none') {
                    offset += secondaryNav.offsetHeight;
                }

                // Realiza a rolagem suave
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });

                // Atualiza a URL mantendo o histórico
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Inicializa animações de elementos ao rolar
 *
 * Esta função:
 * 1. Identifica elementos que devem ser animados
 * 2. Configura estado inicial dos elementos
 * 3. Monitora a posição de rolagem
 * 4. Anima elementos quando entram na viewport
 */
function initScrollAnimations() {
    // Seleciona elementos que receberão animação
    const animatedElements = document.querySelectorAll(
        '.feature-card, .highlight-box, .lesson-card, .timeline-item, .info-box'
    );

    if (!animatedElements.length) return;

    // Configura estado inicial dos elementos
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Função que verifica e anima elementos visíveis
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

    // Monitora eventos de rolagem
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('resize', checkIfInView);

    // Verifica elementos visíveis no carregamento inicial
    checkIfInView();
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
