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
window.aulasConfig = {
    // Array principal com todas as aulas do curso
    aulas: [
        {
            id: 1,
            title: "Aula 1: O Chamado do Vidente",
            description: "Introdução à visão apocalíptica de João e seu chamado como revelador",
            available: true,
            sections: {
                visoes: {
                    title: "Visões de João",
                    description: "A visão inicial de Cristo e Suas mensagens às sete igrejas"
                },
                panorama: {
                    title: "Panorama Eterno",
                    description: "Inteligências e escolhas pré-mortais"
                },
                convergencia: {
                    title: "Convergência Profética",
                    description: "Como as visões de Abraão e Joseph Smith iluminam o plano divino"
                }
            }
        },
        {
            id: 2,
            title: "Aula 2: A Corte Celestial",
            description: "Explorando a visão de João do trono de Deus, os 24 anciãos e os quatro seres viventes",
            available: true,
            sections: {
                visoes: {
                    title: "Visões de João",
                    description: "O trono, os 24 anciãos e quatro seres"
                },
                panorama: {
                    title: "Panorama Eterno",
                    description: "O Grande Conselho e o conflito nos céus"
                },
                convergencia: {
                    title: "Convergência Profética",
                    description: "Como as visões de Isaías e Moisés iluminam a corte celestial"
                }
            }
        },
        {
            id: 3,
            title: "Aula 3: Prelúdio do Juízo",
            description: "O livro selado e a preparação para os juízos divinos",
            available: true,
            sections: {
                visoes: {
                    title: "Visões de João",
                    description: "O livro selado e o Cordeiro que é digno"
                },
                panorama: {
                    title: "Panorama Eterno",
                    description: "Justiça, misericórdia e livre-arbítrio"
                },
                convergencia: {
                    title: "Convergência Profética",
                    description: "Como Ezequiel e Daniel anteciparam o julgamento divino"
                }
            }
        },
        {
            id: 4,
            title: "Aula 4: O Clamor dos Justos",
            description: "Os mártires, os 144.000 selados e a grande multidão",
            available: true,
            sections: {
                visoes: {
                    title: "Visões de João",
                    description: "Os selados do Senhor e o clamor dos justos"
                },
                panorama: {
                    title: "Panorama Eterno",
                    description: "A identidade divina e o propósito celestial"
                },
                convergencia: {
                    title: "Convergência Profética",
                    description: "As visões de tribulação e redenção nos profetas antigos"
                }
            }
        },
        {
            id: 5,
            title: "Aula 5: Os Selados do Senhor",
            description: "Selamentos, proteção divina e a vitória dos fiéis",
            available: false,
            sections: {
                visoes: {
                    title: "Visões de João",
                    description: "Os 144.000 e a multidão com vestes brancas"
                },
                panorama: {
                    title: "Panorama Eterno",
                    description: "A promessa da exaltação e seus requisitos"
                },
                convergencia: {
                    title: "Convergência Profética",
                    description: "Como Malaquias e Néfi previram o selamento celestial"
                }
            }
        },
        {
            id: 6,
            title: "Aula 6: Advertências Cósmicas",
            description: "As trombetas, os três ais e as pragas finais",
            available: false,
            sections: {
                visoes: {
                    title: "Visões de João",
                    description: "As sete trombetas e os sinais cósmicos"
                },
                panorama: {
                    title: "Panorama Eterno",
                    description: "Provações, avisos divinos e oportunidades de arrependimento"
                },
                convergencia: {
                    title: "Convergência Profética",
                    description: "Como Joel e Amós previram os prodígios nos céus"
                }
            }
        },
        {
            id: 7,
            title: "Aula 7: A Ira Divina Derramada",
            description: "As taças da ira, a queda de Babilônia e a vitória final",
            available: false,
            sections: {
                visoes: {
                    title: "Visões de João",
                    description: "As sete taças e a destruição de Babilônia"
                },
                panorama: {
                    title: "Panorama Eterno",
                    description: "Justiça divina e o fim do mal"
                },
                convergencia: {
                    title: "Convergência Profética",
                    description: "Como Isaías e Jeremias profetizaram sobre Babilônia"
                }
            }
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

// Permite uso do módulo em ambientes Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = aulasConfig;
}
