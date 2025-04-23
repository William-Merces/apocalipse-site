/**
 * load-components.js
 * Script responsável pelo carregamento dinâmico de componentes HTML
 *
 * Este arquivo:
 * - Carrega componentes HTML via fetch
 * - Gerencia erros de carregamento
 * - Insere os componentes nos locais apropriados da página
 */

// Inicia o carregamento quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    /**
     * Carrega um componente HTML e o insere no DOM
     *
     * @param {string} componentPath - Caminho do arquivo do componente
     * @param {string} targetSelector - Seletor CSS do elemento onde o componente será inserido
     * @returns {Promise<void>}
     *
     * Esta função:
     * 1. Faz uma requisição fetch para o arquivo do componente
     * 2. Verifica se a requisição foi bem-sucedida
     * 3. Insere o HTML no elemento alvo
     * 4. Trata erros apropriadamente
     */
    async function loadComponent(componentPath, targetSelector) {
        try {
            // Faz a requisição do componente
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Falha ao carregar o componente: ${response.status}`);
            }

            // Obtém o HTML e insere no elemento alvo
            const html = await response.text();
            document.querySelector(targetSelector).innerHTML = html;
        } catch (error) {
            // Trata erros mostrando uma mensagem amigável
            console.error(`Erro ao carregar componente ${componentPath}:`, error);
            document.querySelector(targetSelector).innerHTML = `
                <div class="error-loading">
                    Erro ao carregar o componente
                </div>
            `;
        }
    }

    /**
     * Lista de componentes a serem carregados
     * Cada componente tem:
     * - path: Caminho do arquivo HTML do componente
     * - target: Seletor CSS do elemento onde será inserido
     */
    const components = [
        {
            path: 'components/video-course-section.html',
            target: '#curso-video-section'
        },
        {
            path: 'components/academic-resources.html',
            target: '#academic-resources-section'
        },
        {
            path: 'components/institute-materials.html',
            target: '#institute-materials-section'
        },
        {
            path: 'components/liahona-articles.html',
            target: '#liahona-articles-section'
        },
        {
            path: 'components/apocalypse-resources.html',
            target: '#conference-resources-section'
        },
        {
            path: 'components/interactive-tools.html',
            target: '#interactive-tools-section'
        }
    ];

    // Inicia o carregamento de todos os componentes
    components.forEach(component => {
        loadComponent(component.path, component.target);
    });
});

/**
 * NOTA SOBRE INTEGRAÇÃO ALTERNATIVA
 *
 * Se o carregamento dinâmico não for desejado, os componentes podem ser
 * integrados diretamente no HTML principal. Para fazer isso:
 *
 * 1. Localize os placeholders no HTML principal:
 *    <!-- INCLUIR AQUI O CONTEÚDO DO ARTIFACT "nome-do-componente" -->
 *
 * 2. Substitua cada placeholder pelo conteúdo completo do respectivo
 *    arquivo de componente.
 *
 * 3. Remova este arquivo JavaScript do projeto, pois não será mais necessário.
 *
 * Exemplo:
 * <!-- INCLUIR AQUI O CONTEÚDO DO ARTIFACT "video-course-section" -->
 * deve ser substituído pelo conteúdo completo de video-course-section.html
 */
