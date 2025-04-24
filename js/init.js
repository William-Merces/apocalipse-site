/**
 * init.js
 * Script de inicialização para garantir o carregamento correto dos componentes
 */

// Garante que a configuração das aulas é carregada primeiro
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, iniciando configuração...');

    // Verifica se aulasConfig já foi carregado
    if (typeof window.aulasConfig === 'undefined') {
        console.warn('aulasConfig ainda não carregado. Tentando carregar manualmente...');

        // Tenta carregar o script de configuração das aulas
        const aulasConfigScript = document.createElement('script');
        aulasConfigScript.src = getBasePath() + 'js/aulas-config.js';
        aulasConfigScript.onload = function() {
            console.log('aulasConfig carregado com sucesso!');
            // Dispara evento customizado quando aulasConfig estiver pronto
            document.dispatchEvent(new CustomEvent('aulasConfigLoaded'));
            loadNavigationComponent();
        };

        aulasConfigScript.onerror = function() {
            console.error('Falha ao carregar aulasConfig manualmente.');
        };

        document.head.appendChild(aulasConfigScript);
    } else {
        console.log('aulasConfig já carregado. Inicializando componentes...');
        // Dispara evento customizado quando aulasConfig já estiver disponível
        document.dispatchEvent(new CustomEvent('aulasConfigLoaded'));
        loadNavigationComponent();
    }

    // Adiciona um verificador de integridade para garantir que o dropdown funcione
    setTimeout(function() {
        const dropdown = document.querySelector('.dropdown');
        const dropdownMenu = document.querySelector('.dropdown-menu');

        if (dropdown && dropdownMenu && !dropdownMenu.hasAttribute('data-generated')) {
            console.log('Dropdown não inicializado após timeout. Tentando novamente...');

            if (typeof generateMenuItems === 'function') {
                generateMenuItems();
            }

            if (typeof setupDropdown === 'function') {
                setupDropdown();
            }
        }
    }, 1000);
});

/**
 * Obtém o caminho base com base na localização atual
 */
function getBasePath() {
    const currentPath = window.location.pathname;
    console.log('Determinando caminho base para:', currentPath);

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

// Verifica se tudo está corretamente inicializado após o carregamento completo da página
window.addEventListener('load', function() {
    console.log('Página totalmente carregada, verificando inicialização...');

    // Verificar se o dropdown está configurado corretamente
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdown && dropdownToggle && dropdownMenu) {
        if (!dropdownMenu.hasAttribute('data-generated')) {
            console.warn('Menu dropdown não foi gerado após carregamento da página. Tentando gerar itens...');

            if (typeof generateMenuItems === 'function') {
                generateMenuItems();
            }
        }

        // Garantir que os eventos de clique estejam configurados
        if (!dropdown.hasAttribute('data-initialized')) {
            console.warn('Dropdown não inicializado. Configurando eventos...');

            if (typeof setupDropdown === 'function') {
                setupDropdown();
                dropdown.setAttribute('data-initialized', 'true');
            }
        }
    } else {
        console.error('Elementos do dropdown não encontrados após carregamento completo da página.');
    }
});
