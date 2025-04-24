/**
 * navigation.js
 * Script responsável pela navegação do site Apocalipse
 *
 * Este arquivo gerencia:
 * - Carregamento dinâmico do componente de navegação
 * - Ajuste de links baseado na estrutura de diretórios
 * - Menu dropdown de aulas
 * - Navegação responsiva para todos os dispositivos
 * - Menu secundário
 * - Destaques de links ativos
 */

// Flags globais para controle
window.navInitialized = false;
window.navComponentLoading = false;

// Inicializa a navegação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Primeiro carrega o componente de navegação
    loadNavigationComponent();
});

/**
 * Inicializa todas as funcionalidades de navegação
 */
function initializeNavigation() {
    console.log('Inicializando navegação...');
    setupDropdown();
    setupMobileMenu();
    highlightActiveLinks();
    adjustNavigationLinks();
    setupSecondaryNav();
}

/**
 * Determina o caminho base para os arquivos
 */
function getNavigationBasePath() {
    const currentPath = window.location.pathname;
    console.log('Determinando caminho base para navegação:', currentPath);

    // Normaliza o caminho para usar forward slashes
    const normalizedPath = currentPath.replace(/\\/g, '/');

    // Verifica os diferentes padrões de caminho
    if (normalizedPath.includes('/aulas/aula')) {
        console.log('Detectado: página de aula específica');
        return '../../';
    } else if (normalizedPath.includes('/admin/')) {
        console.log('Detectado: página admin');
        return '../';
    } else if (normalizedPath.includes('/aulas/')) {
        console.log('Detectado: subdiretório de aulas');
        return '../';
    } else if (normalizedPath.includes('/recursos')) {
        console.log('Detectado: página recursos');
        return './';
    } else if (normalizedPath.endsWith('/index.html') || normalizedPath.endsWith('/')) {
        console.log('Detectado: página inicial');
        return './';
    }

    console.log('Caminho padrão, usando raiz');
    return './';
}

/**
 * Carrega o componente de navegação se ele não estiver presente
 */
function loadNavigationComponent() {
    // Evita execuções repetidas
    if (window.navComponentLoading) {
        console.log('Navegação já está carregando...');
        return;
    }

    const navigationContainer = document.getElementById('navigation-container');
    if (!navigationContainer) {
        console.error('Container de navegação não encontrado!');
        return;
    }

    if (navigationContainer.innerHTML.trim() === '') {
        console.log('Carregando componente de navegação...');
        // Sinaliza que o carregamento está em andamento
        window.navComponentLoading = true;

        // Requisição para carregar o componente de navegação
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    console.log('Navegação carregada com sucesso!');
                    navigationContainer.innerHTML = this.responseText;

                    // Reset da flag de carregamento
                    window.navComponentLoading = false;

                    // IMPORTANTE: Execute as funções de setup AQUI, após o conteúdo ser inserido
                    if (!window.navInitialized) {
                        console.log('Inicializando navegação...');
                        window.navInitialized = true;

                        // Modifica a estrutura da navegação para mobile se necessário
                        modifyNavigationForMobile();

                        // Configura todas as funcionalidades na ordem correta
                        adjustNavigationLinks(); // Primeiro ajusta os links
                        setupDropdown();
                        highlightActiveLinks();
                        setupSecondaryNav();
                        generateMenuItems();

                        // Marca o componente como inicializado
                        navigationContainer.setAttribute('data-initialized', 'true');
                        console.log('Navegação inicializada com sucesso!');
                    }
                } else {
                    console.error('Erro ao carregar navegação:', this.status);
                    window.navComponentLoading = false;
                }
            }
        };

        // Determina o caminho base para carregar o componente
        const basePath = getNavigationBasePath();
        const navigationPath = basePath + 'components/navigation.html';

        console.log('Carregando navegação de:', navigationPath);
        xhr.open('GET', navigationPath, true);
        xhr.send();
    } else {
        console.log('Navegação já está carregada, configurando...');
        // O componente já está carregado, configure-o diretamente
        if (!window.navInitialized) {
            window.navInitialized = true;

            // Modifica a estrutura da navegação para mobile se necessário
            modifyNavigationForMobile();

            // Configura todas as funcionalidades na ordem correta
            adjustNavigationLinks(); // Primeiro ajusta os links
            setupDropdown();
            highlightActiveLinks();
            setupSecondaryNav();
            generateMenuItems();

            // Marca como inicializado
            navigationContainer.setAttribute('data-initialized', 'true');
        }
    }
}

/**
 * Modifica a estrutura da navegação para ter aparência consistente em mobile e desktop
 * Mantém os links "Início", "Aulas" e "Recursos" sempre visíveis
 */
function modifyNavigationForMobile() {
    // Remove o botão de toggle original
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
        navToggle.remove();
    }

    // Garante que o menu principal sempre seja exibido (removendo classes que o ocultam em mobile)
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        // Adiciona estilos CSS inline para garantir que o menu seja sempre visível
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .nav-menu {
                    display: flex !important;
                    flex-direction: row !important;
                    position: static !important;
                    box-shadow: none !important;
                    justify-content: center !important;
                    width: 100% !important;
                }

                .nav-menu li {
                    padding: 0 !important;
                }

                .nav-link {
                    padding: 10px !important;
                    font-size: 14px !important;
                    text-align: center !important;
                    border: none !important;
                }

                .dropdown-menu {
                    position: absolute !important;
                    top: 100% !important;
                    left: 0 !important;
                    right: 0 !important;
                    width: 100% !important;
                    max-height: 70vh !important;
                    overflow-y: auto !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Configura o comportamento do dropdown
 */
function setupDropdown() {
    console.log('Configurando dropdown...');
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (!dropdown || !dropdownToggle || !dropdownMenu) {
        console.error('Elementos do dropdown não encontrados');
        return;
    }

    // Função para abrir o dropdown
    function openDropdown() {
        dropdown.classList.add('active');
        dropdownToggle.setAttribute('aria-expanded', 'true');
        dropdownMenu.style.opacity = '1';
        dropdownMenu.style.visibility = 'visible';
        dropdownMenu.style.transform = 'translateY(0)';
    }

    // Função para fechar o dropdown
    function closeDropdown() {
        dropdown.classList.remove('active');
        dropdownToggle.setAttribute('aria-expanded', 'false');
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.visibility = 'hidden';
        dropdownMenu.style.transform = 'translateY(-10px)';
    }

    // Handler para o clique no toggle
    dropdownToggle.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        console.log('Clique no toggle do dropdown');

        if (dropdown.classList.contains('active')) {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    // Fecha o dropdown quando clicar fora
    document.addEventListener('click', function(event) {
        if (!dropdown.contains(event.target)) {
            closeDropdown();
        }
    });

    // Fecha o dropdown com a tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeDropdown();
        }
    });

    // Gera os itens do menu se ainda não foram gerados
    if (!dropdownMenu.hasAttribute('data-generated')) {
        generateMenuItems();
    }
}

/**
 * Gera os itens do menu dropdown de aulas
 */
function generateMenuItems() {
    console.log('Gerando itens do menu...');
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (!dropdownMenu) {
        console.error('Menu dropdown não encontrado!');
        return;
    }

    // Verifica se a configuração de aulas existe
    if (typeof window.aulasConfig === 'undefined') {
        console.error('Configuração de aulas não encontrada!');
        return;
    }

    // Evita gerar itens duplicados
    if (dropdownMenu.hasAttribute('data-generated')) {
        console.log('Itens já foram gerados anteriormente');
        return;
    }

    console.log('Configuração de aulas encontrada:', window.aulasConfig);

    // Limpa o menu existente
    dropdownMenu.innerHTML = '';

    // Determina o caminho base
    const currentPath = window.location.pathname;
    let basePath = '';

    if (currentPath.includes('/aulas/')) {
        basePath = '../../';
    } else if (currentPath.includes('/admin/')) {
        basePath = '../';
    } else if (currentPath.includes('/aulas')) {
        basePath = '../';
    }

    console.log('Gerando itens com basePath:', basePath);

    // Gera os itens do menu
    window.aulasConfig.aulas.forEach(aula => {
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.href = aula.available ? `${basePath}aulas/aula${aula.id}.html` : '#';
        a.className = 'dropdown-item' + (!aula.available ? ' coming-soon' : '');

        const numSpan = document.createElement('span');
        numSpan.className = 'aula-num';
        numSpan.textContent = aula.id;

        const titleSpan = document.createElement('span');
        titleSpan.className = 'aula-title';
        titleSpan.textContent = aula.title;

        a.appendChild(numSpan);
        a.appendChild(titleSpan);

        if (!aula.available) {
            const badgeSpan = document.createElement('span');
            badgeSpan.className = 'badge-em-breve';
            badgeSpan.textContent = 'Em breve';
            a.appendChild(badgeSpan);

            a.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Esta aula estará disponível em breve!');
            });
        }

        li.appendChild(a);
        dropdownMenu.appendChild(li);
    });

    // Marca como gerado para evitar duplicação
    dropdownMenu.setAttribute('data-generated', 'true');
    console.log('Itens do menu gerados com sucesso!');
}

function setupMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
        });
    }
}

/**
 * Destaca os links ativos com base na URL atual
 */
function highlightActiveLinks() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    if (navLinks.length === 0) {
        return;
    }

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPath.includes(href) && href !== '#') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Ajusta os links da navegação com base no caminho atual
 */
function adjustNavigationLinks() {
    console.log('Ajustando links de navegação...');
    const currentPath = window.location.pathname;
    let basePath = '';

    // Determina o caminho base
    if (currentPath.includes('/aulas/')) {
        basePath = '../../';
    } else if (currentPath.includes('/admin/')) {
        basePath = '../';
    } else if (currentPath.includes('/aulas')) {
        basePath = '../';
    }

    // Ajusta os links principais
    const homeLink = document.getElementById('home-link');
    const resourcesLink = document.getElementById('resources-link');

    if (homeLink) {
        homeLink.href = basePath + 'index.html';
    }

    if (resourcesLink) {
        resourcesLink.href = basePath + 'recursos.html';
    }
}

/**
 * Configura o menu secundário e seus links
 */
function setupSecondaryNav() {
    console.log('Configurando navegação secundária...');
    const secondaryNav = document.getElementById('secondary-nav');
    if (!secondaryNav) {
        return;
    }

    const currentPath = window.location.pathname;
    if (currentPath.includes('/aulas/')) {
        secondaryNav.style.display = 'block';

        // Determina o número da aula atual
        const aulaMatch = currentPath.match(/aula(\d+)/);
        if (aulaMatch && aulaMatch[1]) {
            const aulaNum = document.getElementById('current-aula-num');
            if (aulaNum) {
                aulaNum.textContent = aulaMatch[1];
            }

            // Configura os links dos blocos
            const basePath = '../../aulas/';
            const currentAulaNum = parseInt(aulaMatch[1]);

            const visionsLink = document.getElementById('visions-link');
            const panoramaLink = document.getElementById('panorama-link');
            const convergenceLink = document.getElementById('convergence-link');

            if (visionsLink) {
                visionsLink.href = `${basePath}aula${currentAulaNum}/visoes.html`;
            }
            if (panoramaLink) {
                panoramaLink.href = `${basePath}aula${currentAulaNum}/panorama.html`;
            }
            if (convergenceLink) {
                convergenceLink.href = `${basePath}aula${currentAulaNum}/convergencia.html`;
            }

            // Destaca o link ativo do bloco atual
            const currentBlock = currentPath.split('/').pop().replace('.html', '');
            const secondaryLinks = document.querySelectorAll('.secondary-link');
            secondaryLinks.forEach(link => {
                if (link.href.includes(currentBlock)) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    } else {
        secondaryNav.style.display = 'none';
    }
}

// Garante que os links são atualizados ao mudar de página com histórico do navegador
window.addEventListener('popstate', function() {
    loadNavigationComponent(); // Adiciona aqui também
});

// Adiciona um listener para garantir que o dropdown seja configurado após a navegação ser carregada
window.addEventListener('load', function() {
    if (!window.navInitialized) {
        loadNavigationComponent();
    }
});

// Para evitar loops de inicialização, usamos um observer limitado
if (typeof MutationObserver !== 'undefined' && !window.navObserverInitialized) {
    window.navObserverInitialized = true;

    const observer = new MutationObserver(function(mutations) {
        if (!window.navInitialized) {
            const navContainer = document.getElementById('navigation-container');
            if (navContainer && navContainer.innerHTML.trim() !== '' && !navContainer.hasAttribute('data-initialized')) {
                window.navInitialized = true;

                modifyNavigationForMobile();
                adjustNavigationLinks(); // Adiciona aqui também
                setupDropdown();
                highlightActiveLinks();
                setupSecondaryNav();
                generateMenuItems();

                navContainer.setAttribute('data-initialized', 'true');
                observer.disconnect();
            }
        } else {
            observer.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
