/**
 * main.js
 * Arquivo JavaScript principal do site Apocalipse
 *
 * Este arquivo é responsável por:
 * - Carregar o componente de navegação
 * - Gerenciar o botão "Voltar ao topo"
 * - Configurar eventos e interações básicas da página
 */

// Carrega o componente de navegação
async function loadNavigationComponent() {
    try {
        const navigationContainer = document.getElementById('navigation-container');
        if (!navigationContainer) {
            console.error('Container de navegação não encontrado');
            return;
        }

        // Determina o caminho base para o componente
        const currentPath = window.location.pathname;
        let basePath = '';

        if (currentPath.includes('/aulas/')) {
            basePath = '../../';
        } else if (currentPath.includes('/admin/')) {
            basePath = '../';
        }

        // Carrega o componente de navegação
        const response = await fetch(basePath + 'components/navigation.html');
        const html = await response.text();
        navigationContainer.innerHTML = html;

        // Inicializa a navegação após carregar o componente
        if (typeof initializeNavigation === 'function') {
            initializeNavigation();
        }
    } catch (error) {
        console.error('Erro ao carregar o componente de navegação:', error);
    }
}

// Inicializa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Carrega o componente de navegação
    loadNavigationComponent();

    // Configura o botão "Voltar ao topo"
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        // Mostra/esconde o botão baseado na posição da rolagem
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Rola suavemente para o topo quando clicado
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
