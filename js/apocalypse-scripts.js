/**
 * apocalypse-scripts.js
 * Scripts específicos para a página de recursos do Apocalipse
 *
 * Este arquivo gerencia:
 * - Carregamento dinâmico de discursos adicionais
 * - Carregamento dinâmico de artigos
 * - Animações de seções ao rolar
 * - Interatividade das ferramentas de estudo
 */

// Inicializa todas as funcionalidades quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    /**
     * Configuração do botão "Ver mais discursos"
     * Adiciona discursos históricos adicionais quando clicado
     */
    const verMaisBtn = document.querySelector('.ver-mais-btn');
    if (verMaisBtn) {
        verMaisBtn.addEventListener('click', function() {
            // Template HTML dos discursos adicionais
            const maisDiscursos = `
                <div class="discourse-item">
                    <h4>Presidente Ezra Taft Benson – "Preparem-se para o Grande Dia do Senhor" (Abril 1982)</h4>
                    <p>Fala sobre os sinais dos tempos e a necessidade de estar espiritualmente preparado para os eventos profetizados.</p>
                    <a href="https://www.churchofjesuschrist.org/study/general-conference/1982/04/prepare-yourself-for-the-great-day-of-the-lord?lang=por" class="resource-link" target="_blank">ACESSAR DISCURSO</a>
                </div>

                <div class="discourse-item">
                    <h4>Élder Bruce R. McConkie – "A Vinda do Senhor" (Abril 1979)</h4>
                    <p>Um dos discursos mais detalhados sobre a Segunda Vinda, comentando sobre o cavaleiro do Apocalipse e o triunfo do Cordeiro.</p>
                    <a href="https://www.churchofjesuschrist.org/study/general-conference/1979/04/the-coming-of-the-lord?lang=por" class="resource-link" target="_blank">ACESSAR DISCURSO</a>
                </div>

                <div class="discourse-item">
                    <h4>Élder Neal A. Maxwell – "Estas Coisas Te Darão Experiência" (Abril 1982)</h4>
                    <p>Fala sobre provações e o papel delas no plano de Deus, relacionando com visões do Apocalipse.</p>
                    <a href="https://www.churchofjesuschrist.org/study/general-conference/1982/04/these-things-shall-give-thee-experience?lang=por" class="resource-link" target="_blank">ACESSAR DISCURSO</a>
                </div>

                <div class="discourse-item">
                    <h4>Presidente Joseph Fielding Smith – "O Juízo Final" (abril de 1966)</h4>
                    <p>Explica detalhadamente o juízo descrito em Apocalipse 20 e outras escrituras, incluindo a segunda ressurreição.</p>
                    <a href="https://www.churchofjesuschrist.org/study/general-conference/1966/04/the-final-judgment?lang=por" class="resource-link" target="_blank">ACESSAR DISCURSO</a>
                </div>
            `;

            // Adiciona os novos discursos e esconde o botão
            const discourseList = document.querySelector('.discourse-list');
            if (discourseList) {
                discourseList.innerHTML += maisDiscursos;
                verMaisBtn.style.display = 'none';
            }
        });
    }

    /**
     * Configuração do botão "Mais artigos"
     * Adiciona artigos históricos adicionais quando clicado
     */
    const maisArtigosBtn = document.querySelector('.view-more-btn');
    if (maisArtigosBtn) {
        maisArtigosBtn.addEventListener('click', function() {
            // Template HTML dos artigos adicionais
            const maisArtigos = `
                <div class="article-card">
                    <div class="article-image">
                        <img src="/api/placeholder/280/160" alt="Guia de Estudo" />
                    </div>
                    <div class="article-content">
                        <h4>"Guia de Estudo: Símbolos Apocalípticos"</h4>
                        <p>Uma análise detalhada dos principais símbolos do Apocalipse e como interpretá-los através da doutrina restaurada.</p>
                        <div class="article-meta">
                            <span class="magazine">Liahona</span>
                            <span class="date">Outubro 2018</span>
                        </div>
                        <a href="#" class="article-link" target="_blank">LER ARTIGO</a>
                    </div>
                </div>

                <div class="article-card">
                    <div class="article-image">
                        <img src="/api/placeholder/280/160" alt="Desvendando o Apocalipse" />
                    </div>
                    <div class="article-content">
                        <h4>"Desvendando o Apocalipse com Joseph Smith"</h4>
                        <p>Como as revelações modernas transformam nossa compreensão do livro de Apocalipse.</p>
                        <div class="article-meta">
                            <span class="magazine">Ensign</span>
                            <span class="date">Julho 2022</span>
                        </div>
                        <a href="#" class="article-link" target="_blank">LER ARTIGO</a>
                    </div>
                </div>
            `;

            // Adiciona os novos artigos e esconde o botão
            const articlesGrid = document.querySelector('.articles-grid');
            if (articlesGrid) {
                articlesGrid.innerHTML += maisArtigos;
                maisArtigosBtn.style.display = 'none';
            }
        });
    }

    /**
     * Função que anima seções quando entram na viewport
     * Adiciona classe fade-in quando a seção está visível
     */
    function animateSections() {
        const sections = document.querySelectorAll('.resource-section');

        sections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight * 0.85; // Trigger em 85% da altura da tela

            if (sectionPosition < screenPosition) {
                section.classList.add('fade-in');
            }
        });
    }

    // Configura animações iniciais
    document.querySelectorAll('.resource-section').forEach(section => {
        section.classList.add('animate-section');
    });

    // Monitora rolagem para animações
    window.addEventListener('scroll', animateSections);
    animateSections(); // Verifica animações no carregamento inicial

    /**
     * Configuração dos botões das ferramentas interativas
     * Atualmente mostra apenas um alerta, será expandido no futuro
     */
    document.querySelectorAll('.tool-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const toolName = this.textContent.trim();
            alert(`A ferramenta "${toolName}" estará disponível em breve!`);
        });
    });
});

/**
 * Estilos CSS para animações
 * Define as transições e transformações para as animações de fade
 */
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    /* Estado inicial dos elementos animados */
    .animate-section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    /* Estado final após a animação */
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(animationStyles);
