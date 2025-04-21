// Script para carregar os componentes HTML
document.addEventListener('DOMContentLoaded', function() {
  // Função para carregar o conteúdo do componente via fetch e inserir no local indicado
  async function loadComponent(componentPath, targetSelector) {
    try {
      const response = await fetch(componentPath);
      if (!response.ok) {
        throw new Error(`Falha ao carregar o componente: ${response.status}`);
      }

      const html = await response.text();
      document.querySelector(targetSelector).innerHTML = html;
    } catch (error) {
      console.error(`Erro ao carregar componente ${componentPath}:`, error);
      document.querySelector(targetSelector).innerHTML = `<div class="error-loading">Erro ao carregar o componente</div>`;
    }
  }

  // Definição dos componentes a serem carregados
  const components = [
    { path: 'components/video-course-section.html', target: '#curso-video-section' },
    { path: 'components/academic-resources.html', target: '#academic-resources-section' },
    { path: 'components/institute-materials.html', target: '#institute-materials-section' },
    { path: 'components/liahona-articles.html', target: '#liahona-articles-section' },
    { path: 'components/apocalypse-resources.html', target: '#conference-resources-section' },
    { path: 'components/interactive-tools.html', target: '#interactive-tools-section' }
  ];

  // Carregar todos os componentes
  components.forEach(component => {
    loadComponent(component.path, component.target);
  });
});

// Alternativa: Se preferir não usar o carregamento dinâmico, você pode integrar diretamente os códigos HTML
/*
  Para integrar diretamente, substitua os placeholders no arquivo HTML principal com o código completo
  de cada componente. Por exemplo:

  <!-- INCLUIR AQUI O CONTEÚDO DO ARTIFACT "video-course-section" -->

  Deve ser substituído pelo conteúdo completo do arquivo video-course-section.html
*/
