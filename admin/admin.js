// admin.js
document.addEventListener('DOMContentLoaded', function() {
    const aulasContainer = document.getElementById('aulas-container');
    const aulas = aulasConfig.aulas;

    aulas.forEach(aula => {
        const aulaElement = document.createElement('div');
        aulaElement.className = 'aula-status';

        // Criar elementos separadamente para evitar problemas com caracteres especiais
        const aulaInfo = document.createElement('div');
        aulaInfo.className = 'aula-info';
        aulaInfo.innerHTML = `
            <h3>Aula ${aula.numero}: ${aula.titulo}</h3>
            <p>Status: <span class="${aula.disponivel ? 'status-disponivel' : 'status-em-desenvolvimento'}">
                ${aula.disponivel ? 'Disponível' : 'Em Desenvolvimento'}
            </span></p>
        `;

        const button = document.createElement('button');
        button.className = 'btn-status';
        button.textContent = aula.disponivel ? 'Desativar' : 'Ativar';
        button.onclick = function() {
            atualizarStatusAula(aula.numero, !aula.disponivel);
            location.reload();
        };

        aulaElement.appendChild(aulaInfo);
        aulaElement.appendChild(button);
        aulasContainer.appendChild(aulaElement);
    });
});