// navigation.js - Script de navegação melhorado corrigido
document.addEventListener('DOMContentLoaded', function() {
    // Verifique se estamos carregando o componente dinamicamente
    if (document.getElementById('navigation-container')) {
        loadNavigationComponent();
    } else {
        // Se o componente já estiver no DOM, inicialize as funções
        initializeNavigation();
    }
});

/**
 * Carrega o componente de navegação dinamicamente
 */
function loadNavigationComponent() {
    const container = document.getElementById('navigation-container');
    if (!container) return;

    // Determina o caminho base baseado na URL atual
    const currentPath = window.location.pathname;
    let basePath = './';

    // Ajusta caminho base para diferentes níveis de profundidade
    if (currentPath.includes('/aulas/aula')) {
        // Página dentro de uma aula específica (ex: /aulas/aula1/visoes.html)
        basePath = '../../';
    } else if (currentPath.includes('/aulas/')) {
        // Página de aula (ex: /aulas/aula1.html)
        basePath = '../';
    }

    fetch(basePath + 'components/navigation.html')
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html;

            // Ajusta os links do menu para o contexto correto
            adjustNavigationLinks(basePath);

            // Inicializa a navegação
            initializeNavigation();
        })
        .catch(error => {
            console.error('Erro ao carregar o componente de navegação:', error);
        });
}

/**
 * Ajusta os links de navegação para o caminho base correto
 */
function adjustNavigationLinks(basePath) {
    // Ajusta os links principais
    const homeLink = document.getElementById('home-link');
    if (homeLink) homeLink.href = basePath + 'index.html';

    const introLink = document.getElementById('intro-link');
    if (introLink) introLink.href = basePath + 'introducao.html';

    // CORREÇÃO: Verificar o ID correto e usar o link absoluto para recursos.html
    const resourcesLink = document.getElementById('resources-link');
    if (resourcesLink) {
        // Use caminho absoluto para o arquivo recursos.html na raiz do site
        resourcesLink.href = basePath + 'recursos.html';
    }

    const aboutLink = document.getElementById('about-link');
    if (aboutLink) aboutLink.href = basePath + 'sobre.html';

    // Ajusta os links do menu secundário se estiver em uma página de aula
    const currentPath = window.location.pathname;
    if (currentPath.includes('/aulas/aula')) {
        // Extrai o número da aula do caminho (ex: aula1)
        const aulaMatch = currentPath.match(/aula(\d+)/);
        if (aulaMatch && aulaMatch[1]) {
            const aulaNum = aulaMatch[1];

            // Atualiza o número da aula no menu secundário
            const aulaNumElement = document.getElementById('current-aula-num');
            if (aulaNumElement) {
                aulaNumElement.textContent = aulaNum;
            }

            // Define os links do menu secundário
            const currentLessonLink = document.getElementById('current-lesson-link');
            if (currentLessonLink) currentLessonLink.href = basePath + 'aulas/aula' + aulaNum + '.html';

            const visionsLink = document.getElementById('visions-link');
            if (visionsLink) visionsLink.href = basePath + 'aulas/aula' + aulaNum + '/visoes.html';

            const panoramaLink = document.getElementById('panorama-link');
            if (panoramaLink) panoramaLink.href = basePath + 'aulas/aula' + aulaNum + '/panorama.html';

            const convergenceLink = document.getElementById('convergence-link');
            if (convergenceLink) convergenceLink.href = basePath + 'aulas/aula' + aulaNum + '/convergencia.html';

            // Mostra o menu secundário
            const secondaryNav = document.getElementById('secondary-nav');
            if (secondaryNav) secondaryNav.style.display = 'block';
        }
    }
}

/**
 * Inicializa todas as funções de navegação
 */
function initializeNavigation() {
    // 1. Preencher o menu dropdown de aulas
    generateAulasMenu();

    // 2. Configurar o toggle do menu mobile
    setupMobileNav();

    // 3. Destacar o link ativo
    highlightActiveLinks();

    // 4. Configurar o menu secundário
    setupSecondaryNav();

    // 5. Configurar o dropdown
    setupDropdown();
}

/**
 * Gera o menu dropdown de aulas com base na configuração
 */
function generateAulasMenu() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (!dropdownMenu) return;

    // Limpa o conteúdo atual
    dropdownMenu.innerHTML = '';

    // Verifica se aulasConfig está definido
    if (typeof aulasConfig === 'undefined') {
        console.warn('aulasConfig não está definido. Carregando configuração padrão.');

        // Configuração padrão de aulas (fallback)
        window.aulasConfig = {
            aulas: [
                { id: 1, title: "Aula 1: O Chamado do Vidente", available: true },
                { id: 2, title: "Aula 2: A Corte Celestial", available: true },
                { id: 3, title: "Aula 3: Prelúdio do Juízo", available: false },
                { id: 4, title: "Aula 4: O Clamor dos Justos", available: false },
                { id: 5, title: "Aula 5: Os Selados do Senhor", available: false },
                { id: 6, title: "Aula 6: Advertências Cósmicas", available: false },
                { id: 7, title: "Aula 7: A Ira Divina Derramada", available: false }
            ]
        };
    }

    // Determina o caminho base
    const currentPath = window.location.pathname;
    let basePath = './';

    if (currentPath.includes('/aulas/aula')) {
        basePath = '../../';
    } else if (currentPath.includes('/aulas/')) {
        basePath = '../';
    }

    // Cria os itens do menu
    aulasConfig.aulas.forEach(aula => {
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.href = aula.available ? basePath + 'aulas/aula' + aula.id + '.html' : '#';
        a.className = 'dropdown-item';

        // Cria um elemento span para o número da aula com estilo circular
        const aulaNumSpan = document.createElement('span');
        aulaNumSpan.className = aula.available ? 'aula-num available' : 'aula-num coming-soon';
        aulaNumSpan.textContent = aula.id;

        // Cria um elemento span para o título
        const titleSpan = document.createElement('span');
        titleSpan.className = 'aula-title';
        titleSpan.textContent = aula.title.replace(/^Aula \d+: /, '');

        // Adiciona o número e o título ao link
        a.appendChild(aulaNumSpan);
        a.appendChild(titleSpan);

        if (!aula.available) {
            const badge = document.createElement('span');
            badge.className = 'badge';
            badge.textContent = 'Em breve';
            a.appendChild(badge);

            a.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Esta aula estará disponível em breve!');
            });
        }

        li.appendChild(a);
        dropdownMenu.appendChild(li);
    });
}

/**
 * Configura a navegação para dispositivos móveis
 */
function setupMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (!navToggle || !navMenu) {
        console.error('Elementos de navegação mobile não encontrados');
        return;
    }

    // Toggle do menu mobile
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Fechar menu ao clicar em link no modo mobile
    const navLinks = document.querySelectorAll('.nav-menu a:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
}

/**
 * Destaca os links ativos com base na URL atual
 */
function highlightActiveLinks() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Extrai o nome do arquivo do href
        const hrefFile = href.split('/').pop();

        // Extrai o nome do arquivo do currentPath
        const currentFile = currentPath.split('/').pop();

        if (currentFile === hrefFile) {
            link.classList.add('active');
        } else if (currentPath.includes('aula') && link.classList.contains('dropdown-toggle')) {
            // Ativa o dropdown se estiver em uma página de aula
            link.classList.add('active');
        }
    });

    // Para menu secundário
    if (document.getElementById('secondary-nav')) {
        const secondaryLinks = document.querySelectorAll('.secondary-link');
        secondaryLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentPath.includes(href.split('/').pop())) {
                link.classList.add('active');
            }
        });
    }
}

/**
 * Configura o menu secundário
 */
function setupSecondaryNav() {
    const secondaryNav = document.getElementById('secondary-nav');
    if (!secondaryNav) {
        console.warn('Menu secundário não encontrado');
        return;
    }

    const currentPath = window.location.pathname;
    const isAulaPage = currentPath.includes('/aulas/');

    if (isAulaPage) {
        secondaryNav.style.display = 'block';

        // Extrai o número da aula para atualizar o texto
        const aulaMatch = currentPath.match(/aula(\d+)/);
        if (aulaMatch && aulaMatch[1]) {
            const aulaNumElement = document.getElementById('current-aula-num');
            if (aulaNumElement) {
                aulaNumElement.textContent = aulaMatch[1];
            }
        }
    } else {
        secondaryNav.style.display = 'none';
    }

    // Ajusta a aparência do menu secundário em dispositivos móveis
    handleSecondaryNavResponsiveness();

    // Atualiza ao redimensionar a janela
    window.addEventListener('resize', handleSecondaryNavResponsiveness);
}

/**
 * Ajusta o menu secundário para responsividade
 */
function handleSecondaryNavResponsiveness() {
    const secondaryMenu = document.querySelector('.secondary-menu');
    if (!secondaryMenu) return;

    // Ajusta a rolagem horizontal em telas menores
    if (window.innerWidth <= 768) {
        // Certifica-se de que o overflow está configurado para rolagem horizontal
        secondaryMenu.style.overflowX = 'auto';
        secondaryMenu.style.whiteSpace = 'nowrap';

        // Verifica se há um item ativo e rola para ele
        const activeItem = secondaryMenu.querySelector('.active');
        if (activeItem) {
            setTimeout(() => {
                const menuWidth = secondaryMenu.offsetWidth;
                const itemLeft = activeItem.offsetLeft;
                const itemWidth = activeItem.offsetWidth;

                // Centraliza o item ativo na viewport do menu
                secondaryMenu.scrollLeft = itemLeft - (menuWidth / 2) + (itemWidth / 2);
            }, 100);
        }
    } else {
        secondaryMenu.style.overflowX = '';
        secondaryMenu.style.whiteSpace = '';
    }
}

/**
 * Configura o comportamento do dropdown
 */
function setupDropdown() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');

    if (!dropdown || !dropdownToggle) return;

    // No desktop, hover mostra o dropdown
    if (window.innerWidth > 768) {
        dropdown.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });

        dropdown.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    }
    // No mobile, clique alterna o dropdown
    else {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    }

    // Verificar cliques em itens do dropdown
    const dropdownItems = dropdown.querySelectorAll('.dropdown-menu a');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                dropdown.classList.remove('active');
            }
        });
    });

    // Ajustar em redimensionamento
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            dropdown.classList.remove('active');
        }
    });
}

// Observador de mutação para garantir que o componente seja inicializado quando adicionado dinamicamente
if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Verifica se o componente de navegação foi adicionado ao DOM
                if (document.getElementById('nav-menu') &&
                    !document.getElementById('nav-menu').hasAttribute('data-initialized')) {
                    initializeNavigation();
                    document.getElementById('nav-menu').setAttribute('data-initialized', 'true');
                }
            }
        });
    });

    // Configurar o observador para monitorar mudanças no DOM
    observer.observe(document.body, { childList: true, subtree: true });
}

// Garante que os links são atualizados ao mudar de página com histórico do navegador
window.addEventListener('popstate', function() {
    if (document.getElementById('nav-menu')) {
        highlightActiveLinks();
        setupSecondaryNav();
    }
});
