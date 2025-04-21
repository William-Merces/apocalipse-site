// main.js
console.log('main.js carregado');

// Função para gerar o menu
function generateMenu() {
    console.log('Gerando menu...');
    const navMenu = document.getElementById('nav-menu');
    if (!navMenu) {
        console.error('Elemento nav-menu não encontrado');
        return;
    }

    console.log('Elemento nav-menu encontrado');
    console.log('aulasConfig:', aulasConfig);

    // Gerar itens do menu
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
            text: "Aulas",
            isDropdown: true,
            items: aulasConfig.aulas.map(aula => ({
                text: `Aula ${aula.numero}: ${aula.titulo}`,
                href: aula.link,
                comingSoon: !aula.disponivel
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

    // Gerar HTML do menu
    let menuHTML = '';
    menuItems.forEach(item => {
        if (item.isDropdown) {
            menuHTML += `
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle">${item.text} <i class="fas fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">`;
            item.items.forEach(subItem => {
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
            menuHTML += `<li><a href="${item.href}">${item.text}</a></li>`;
        }
    });

    // Inserir HTML no menu
    navMenu.innerHTML = menuHTML;
    console.log('Menu gerado com sucesso');

    // Adicionar eventos para aulas em desenvolvimento
    const comingSoonLinks = document.querySelectorAll('.coming-soon');
    comingSoonLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Esta aula ainda está em desenvolvimento e será disponibilizada em breve!');
        });
    });
}

// Gerar menu quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, gerando menu...');
    generateMenu();
});

// Variáveis globais
let backToTopBtn = document.getElementById('back-to-top');

// Esperar que o DOM esteja completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Agora é seguro obter os elementos
    backToTopBtn = document.getElementById('back-to-top');
    
    // Verificar se os elementos foram encontrados
    console.log('backToTopBtn:', backToTopBtn);
});

// Botão voltar ao topo
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Todos os comportamentos relacionados ao menu serão gerenciados pelo navigation.js
