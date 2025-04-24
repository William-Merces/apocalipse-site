/**
 * aulas-config.js
 * Arquivo de configuração central das aulas do curso Apocalipse
 *
 * Este arquivo contém:
 * - Estrutura completa das aulas do curso
 * - Informações sobre disponibilidade das aulas
 * - Detalhes de cada seção (visões, panorama, convergência)
 * - Métodos utilitários para gerenciar as aulas
 */

/**
 * Configuração global das aulas
 * Objeto exposto globalmente como window.aulasConfig
 *
 * Estrutura de cada aula:
 * - id: Identificador único da aula
 * - title: Título completo da aula
 * - description: Descrição detalhada do conteúdo
 * - available: Status de disponibilidade
 * - sections: Subseções da aula (visões, panorama, convergência)
 */
const aulasConfig = {
    // Array principal com todas as aulas do curso
    aulas: [
        {
            id: 1,
            title: "O Chamado do Vidente",
            available: true
        },
        {
            id: 2,
            title: "A Corte Celestial",
            available: true
        },
        {
            id: 3,
            title: "Prelúdio do Juízo",
            available: true
        },
        {
            id: 4,
            title: "O Clamor dos Justos",
            available: true
        },
        {
            id: 5,
            title: "Os Selados do Senhor",
            available: false
        },
        {
            id: 6,
            title: "Advertências Cósmicas",
            available: false
        },
        {
            id: 7,
            title: "A Ira Divina Derramada",
            available: false
        }
    ],

    /**
     * Obtém uma aula específica pelo seu ID
     * @param {number} id - ID da aula desejada
     * @returns {Object|undefined} Objeto da aula ou undefined se não encontrada
     */
    getAulaById: function(id) {
        return this.aulas.find(aula => aula.id === parseInt(id));
    },

    /**
     * Retorna todas as aulas que estão marcadas como disponíveis
     * @returns {Array} Array com todas as aulas disponíveis
     */
    getAvailableAulas: function() {
        return this.aulas.filter(aula => aula.available);
    },

    /**
     * Verifica se uma aula específica está disponível
     * @param {number} id - ID da aula a verificar
     * @returns {boolean} true se disponível, false caso contrário
     */
    isAulaAvailable: function(id) {
        const aula = this.getAulaById(id);
        return aula ? aula.available : false;
    },

    /**
     * Encontra a próxima aula disponível após a aula atual
     * @param {number} currentId - ID da aula atual
     * @returns {Object|null} Próxima aula disponível ou null se não houver
     */
    getNextAvailableAula: function(currentId) {
        const availableAulas = this.getAvailableAulas();
        const currentIndex = availableAulas.findIndex(aula => aula.id === parseInt(currentId));

        if (currentIndex >= 0 && currentIndex < availableAulas.length - 1) {
            return availableAulas[currentIndex + 1];
        }

        return null;
    },

    /**
     * Encontra a aula disponível anterior à aula atual
     * @param {number} currentId - ID da aula atual
     * @returns {Object|null} Aula anterior disponível ou null se não houver
     */
    getPreviousAvailableAula: function(currentId) {
        const availableAulas = this.getAvailableAulas();
        const currentIndex = availableAulas.findIndex(aula => aula.id === parseInt(currentId));

        if (currentIndex > 0) {
            return availableAulas[currentIndex - 1];
        }

        return null;
    }
};

// Expõe a configuração globalmente
window.aulasConfig = aulasConfig;

// Permite uso do módulo em ambientes Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = aulasConfig;
}
