/**
 * main.js
 * Arquivo JavaScript principal do site Apocalipse
 *
 * Este arquivo é responsável por:
 * - Gerar o menu de navegação dinamicamente
 * - Gerenciar o botão "Voltar ao topo"
 * - Configurar eventos e interações básicas da página
 */

// Confirma que o arquivo foi carregado corretamente
console.log('main.js carregado');

/**
 * Função generateMenu
 * Gera dinamicamente o menu de navegação do site
 *
 * Esta função:
 * 1. Busca o elemento do menu no DOM
 * 2. Define a estrutura do menu (links e dropdowns)
 * 3. Gera o HTML necessário
 * 4. Adiciona eventos para itens "Em breve"
 */
function generateMenu() {
    console.log('Gerando menu...');
    const navMenu = document.getElementById('nav-menu');
    if (!navMenu) {
        console.error('Elemento nav-menu não encontrado');
        return;
    }

    console.log('Elemento nav-menu encontrado');
    console.log('aulasConfig:', aulasConfig);

    // Define a estrutura do menu com todos os itens e subitens
    const menuItems = [
        {
            text: "Início",
            href: "index.html"
        },
        {
            text: "Introdução",
            href: "introducao.html"
        },
        {
            text: "Aulas", // Dropdown com todas as aulas do curso
            isDropdown: true,
            items: aulasConfig.aulas.map(aula => ({
                text: `Aula ${aula.numero}: ${aula.titulo}`,
                href: aula.link,
                comingSoon: !aula.disponivel // Marca aulas não disponíveis
            }))
        },
        {
            text: "Recursos",
            href: "recursos.html"
        },
        {
            text: "Sobre",
            href: "sobre.html"
        }
    ];

    // Gera o HTML do menu percorrendo cada item
    let menuHTML = '';
    menuItems.forEach(item => {
        if (item.isDropdown) {
            // Cria estrutura do dropdown para itens com subitens
            menuHTML += `
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle">${item.text} <i class="fas fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">`;
            item.items.forEach(subItem => {
                // Adiciona cada subitem com classe especial se estiver "Em breve"
                menuHTML += `
                    <li>
                        <a href="${subItem.href}" ${subItem.comingSoon ? 'class="coming-soon"' : ''}>
                            ${subItem.text}
                            ${subItem.comingSoon ? '<span class="badge">Em breve</span>' : ''}
                        </a>
                    </li>`;
            });
            menuHTML += '</ul></li>';
        } else {
            // Cria link simples para itens sem subitens
            menuHTML += `<li><a href="${item.href}">${item.text}</a></li>`;
        }
    });

    // Insere o HTML gerado no elemento do menu
    navMenu.innerHTML = menuHTML;
    console.log('Menu gerado com sucesso');

    // Configura eventos para links de aulas em desenvolvimento
    const comingSoonLinks = document.querySelectorAll('.coming-soon');
    comingSoonLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Esta aula ainda está em desenvolvimento e será disponibilizada em breve!');
        });
    });
}

// Inicializa o menu quando a página estiver carregada
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, gerando menu...');
    generateMenu();
});

/**
 * Funcionalidade do botão "Voltar ao topo"
 *
 * - Aparece quando o usuário rola a página para baixo
 * - Permite voltar ao topo da página suavemente
 */

// Variável global para o botão
let backToTopBtn = document.getElementById('back-to-top');

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    backToTopBtn = document.getElementById('back-to-top');
    console.log('backToTopBtn:', backToTopBtn);
});

// Configuração do botão "Voltar ao topo"
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        // Mostra/esconde o botão baseado na posição da rolagem
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) { // Aparece após rolar 300px
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Rola suavemente para o topo quando clicado
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Rolagem suave
            });
        });
    }
});

// Comportamentos do menu são gerenciados pelo navigation.js
