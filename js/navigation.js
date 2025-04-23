/**
 * navigation.js
 * Script responsável pela navegação do site Apocalipse
 *
 * Este arquivo gerencia:
 * - Carregamento dinâmico do componente de navegação
 * - Ajuste de links baseado na estrutura de diretórios
 * - Menu dropdown de aulas
 * - Navegação mobile
 * - Menu secundário
 * - Destaques de links ativos
 */

// Inicializa a navegação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se precisamos carregar o componente dinamicamente
    if (document.getElementById('navigation-container')) {
        loadNavigationComponent();
    } else {
        // Se o componente já estiver no DOM, apenas inicializa as funções
        initializeNavigation();
    }
});

/**
 * Carrega o componente de navegação dinamicamente
 *
 * Esta função:
 * 1. Verifica se o container existe
 * 2. Determina o caminho base correto baseado na URL atual
 * 3. Carrega o HTML do componente
 * 4. Ajusta os links para o contexto atual
 */
function loadNavigationComponent() {
    const container = document.getElementById('navigation-container');
    if (!container) return;

    // Determina o caminho base analisando a URL atual
    const currentPath = window.location.pathname;
    let basePath = './';

    // Ajusta o caminho base dependendo da profundidade do diretório atual
    if (currentPath.includes('/aulas/aula')) {
        // Página dentro de uma aula específica (ex: /aulas/aula1/visoes.html)
        basePath = '../../';
    } else if (currentPath.includes('/aulas/')) {
        // Página de aula (ex: /aulas/aula1.html)
        basePath = '../';
    }

    // Carrega o componente de navegação via fetch
    fetch(basePath + 'components/navigation.html')
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html;

            // Ajusta os links para o contexto atual
            adjustNavigationLinks(basePath);

            // Inicializa todas as funcionalidades de navegação
            initializeNavigation();
        })
        .catch(error => {
            console.error('Erro ao carregar o componente de navegação:', error);
        });
}

/**
 * Ajusta os links de navegação para o caminho base correto
 *
 * @param {string} basePath - O caminho base relativo à localização atual
 *
 * Esta função:
 * 1. Ajusta links principais do menu
 * 2. Configura links do menu secundário para aulas
 * 3. Atualiza informações específicas da aula atual
 */
function adjustNavigationLinks(basePath) {
    // Ajusta os links principais do menu
    const homeLink = document.getElementById('home-link');
    if (homeLink) homeLink.href = basePath + 'index.html';

    const introLink = document.getElementById('intro-link');
    if (introLink) introLink.href = basePath + 'introducao.html';

    const resourcesLink = document.getElementById('resources-link');
    if (resourcesLink) {
        resourcesLink.href = basePath + 'recursos.html';
    }

    const aboutLink = document.getElementById('about-link');
    if (aboutLink) aboutLink.href = basePath + 'sobre.html';

    // Configura links específicos se estiver em uma página de aula
    const currentPath = window.location.pathname;
    if (currentPath.includes('/aulas/aula')) {
        // Extrai o número da aula da URL atual
        const aulaMatch = currentPath.match(/aula(\d+)/);
        if (aulaMatch && aulaMatch[1]) {
            const aulaNum = aulaMatch[1];

            // Atualiza o número da aula no menu secundário
            const aulaNumElement = document.getElementById('current-aula-num');
            if (aulaNumElement) {
                aulaNumElement.textContent = aulaNum;
            }

            // Configura todos os links do menu secundário
            const currentLessonLink = document.getElementById('current-lesson-link');
            if (currentLessonLink) currentLessonLink.href = basePath + 'aulas/aula' + aulaNum + '.html';

            const visionsLink = document.getElementById('visions-link');
            if (visionsLink) visionsLink.href = basePath + 'aulas/aula' + aulaNum + '/visoes.html';

            const panoramaLink = document.getElementById('panorama-link');
            if (panoramaLink) panoramaLink.href = basePath + 'aulas/aula' + aulaNum + '/panorama.html';

            const convergenceLink = document.getElementById('convergence-link');
            if (convergenceLink) convergenceLink.href = basePath + 'aulas/aula' + aulaNum + '/convergencia.html';

            // Exibe o menu secundário
            const secondaryNav = document.getElementById('secondary-nav');
            if (secondaryNav) secondaryNav.style.display = 'block';
        }
    }
}

/**
 * Inicializa todas as funcionalidades de navegação
 *
 * Esta função é o ponto central que chama todas as outras
 * funções necessárias para configurar a navegação completa
 */
function initializeNavigation() {
    // 1. Gera o menu dropdown de aulas
    generateAulasMenu();

    // 2. Configura o menu mobile
    setupMobileNav();

    // 3. Destaca os links ativos
    highlightActiveLinks();

    // 4. Configura o menu secundário
    setupSecondaryNav();

    // 5. Configura os dropdowns
    setupDropdown();
}

/**
 * Gera o menu dropdown de aulas dinamicamente
 *
 * Esta função:
 * 1. Verifica a configuração das aulas
 * 2. Cria os links para cada aula
 * 3. Adiciona indicadores de "Em breve" para aulas não disponíveis
 * 4. Configura eventos de clique apropriados
 */
function generateAulasMenu() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (!dropdownMenu) return;

    // Limpa o menu atual
    dropdownMenu.innerHTML = '';

    // Verifica se a configuração das aulas existe
    if (typeof aulasConfig === 'undefined') {
        console.warn('aulasConfig não está definido. Carregando configuração padrão.');

        // Configuração padrão de fallback
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

    // Determina o caminho base correto
    const currentPath = window.location.pathname;
    let basePath = './';

    if (currentPath.includes('/aulas/aula')) {
        basePath = '../../';
    } else if (currentPath.includes('/aulas/')) {
        basePath = '../';
    }

    // Cria os itens do menu de aulas
    aulasConfig.aulas.forEach(aula => {
        const li = document.createElement('li');
        const a = document.createElement('a');

        // Define o link da aula ou # se não disponível
        a.href = aula.available ? basePath + 'aulas/aula' + aula.id + '.html' : '#';
        a.className = 'dropdown-item';

        // Cria o círculo com o número da aula
        const aulaNumSpan = document.createElement('span');
        aulaNumSpan.className = aula.available ? 'aula-num available' : 'aula-num coming-soon';
        aulaNumSpan.textContent = aula.id;

        // Cria o span com o título da aula
        const titleSpan = document.createElement('span');
        titleSpan.className = 'aula-title';
        titleSpan.textContent = aula.title.replace(/^Aula \d+: /, '');

        // Monta a estrutura do item
        a.appendChild(aulaNumSpan);
        a.appendChild(titleSpan);

        // Adiciona badge "Em breve" se necessário
        if (!aula.available) {
            const badge = document.createElement('span');
            badge.className = 'badge';
            badge.textContent = 'Em breve';
            a.appendChild(badge);

            // Adiciona evento de clique para aulas não disponíveis
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
 *
 * Esta função:
 * 1. Configura o botão de toggle do menu
 * 2. Adiciona eventos para fechar o menu ao clicar fora
 * 3. Fecha o menu ao clicar em links (em modo mobile)
 */
function setupMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (!navToggle || !navMenu) {
        console.error('Elementos de navegação mobile não encontrados');
        return;
    }

    // Alterna a visibilidade do menu ao clicar no botão
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Fecha o menu se o usuário clicar fora dele
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Fecha o menu após clicar em um link (apenas no modo mobile)
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
 *
 * Esta função:
 * 1. Identifica a página atual pela URL
 * 2. Destaca o link correspondente no menu principal
 * 3. Destaca links no menu secundário (se existir)
 * 4. Trata casos especiais como páginas de aula
 */
function highlightActiveLinks() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Compara apenas o nome do arquivo, ignorando o caminho
        const hrefFile = href.split('/').pop();
        const currentFile = currentPath.split('/').pop();

        if (currentFile === hrefFile) {
            link.classList.add('active');
        } else if (currentPath.includes('aula') && link.classList.contains('dropdown-toggle')) {
            // Caso especial: destaca o dropdown de aulas quando em uma página de aula
            link.classList.add('active');
        }
    });

    // Destaca links no menu secundário, se existir
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
 *
 * Esta função:
 * 1. Verifica se está em uma página de aula
 * 2. Mostra/esconde o menu secundário apropriadamente
 * 3. Atualiza o número da aula atual
 * 4. Configura a responsividade do menu
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

        // Atualiza o número da aula no menu
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

    // Configura a responsividade do menu secundário
    handleSecondaryNavResponsiveness();

    // Atualiza a responsividade quando a janela é redimensionada
    window.addEventListener('resize', handleSecondaryNavResponsiveness);
}

/**
 * Ajusta o menu secundário para responsividade
 *
 * Esta função:
 * 1. Configura rolagem horizontal em telas pequenas
 * 2. Centraliza automaticamente o item ativo
 * 3. Ajusta estilos baseado no tamanho da tela
 */
function handleSecondaryNavResponsiveness() {
    const secondaryMenu = document.querySelector('.secondary-menu');
    if (!secondaryMenu) return;

    // Configurações especiais para telas pequenas
    if (window.innerWidth <= 768) {
        // Habilita rolagem horizontal
        secondaryMenu.style.overflowX = 'auto';
        secondaryMenu.style.whiteSpace = 'nowrap';

        // Centraliza o item ativo na viewport do menu
        const activeItem = secondaryMenu.querySelector('.active');
        if (activeItem) {
            setTimeout(() => {
                const menuWidth = secondaryMenu.offsetWidth;
                const itemLeft = activeItem.offsetLeft;
                const itemWidth = activeItem.offsetWidth;

                // Calcula posição para centralizar
                secondaryMenu.scrollLeft = itemLeft - (menuWidth / 2) + (itemWidth / 2);
            }, 100);
        }
    } else {
        // Remove estilos especiais em telas maiores
        secondaryMenu.style.overflowX = '';
        secondaryMenu.style.whiteSpace = '';
    }
}

/**
 * Configura o comportamento do dropdown
 *
 * Esta função:
 * 1. Implementa comportamento hover em desktop
 * 2. Implementa comportamento de clique em mobile
 * 3. Ajusta interações baseado no tamanho da tela
 */
function setupDropdown() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');

    if (!dropdown || !dropdownToggle) return;

    // Comportamento hover para desktop
    if (window.innerWidth > 768) {
        dropdown.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });

        dropdown.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    }
    // Comportamento de clique para mobile
    else {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    }
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
