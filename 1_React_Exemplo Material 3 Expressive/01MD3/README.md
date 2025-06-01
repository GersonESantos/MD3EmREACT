# MD3EmREACT

### 1. Exemplo Minimalista Expressivo (`1_React_Exemplo Material 3 Expressive\01MD3\md3expr`)

*   **Foco:** Apresentar um único elemento de texto ("Login") com um estilo visualmente impactante e minimalista.
*   **Estilo:** Inspirado em um design "Criatividade em Foco!", utiliza a fonte `Pacifico` para o texto "Login", um fundo `#FDF5E6`, cor de texto `#6A0DAD` e uma sombra sutil no texto. A fonte base para o corpo é `Inter`.
*   **Objetivo:** Demonstrar como aplicar um estilo expressivo e direto a um componente React simples, com foco na tipografia e cor para criar uma identidade visual forte com o mínimo de elementos.

*   **CSS (`App.css`) - Pontos Principais:**
    *   **Importação de Fontes (`@import url(...)`):**
        *   Inicia importando duas fontes do Google Fonts:
            *   `Pacifico`: Fonte cursiva, distinta e com personalidade, usada especificamente para o título "Login", conferindo o toque expressivo principal.
            *   `Inter`: Fonte sans-serif limpa e moderna, utilizada como base para o restante do corpo da página.
    *   **Estilização do `body`:**
        *   **Centralização de Conteúdo:** Propriedades como `display: flex`, `justify-content: center`, `align-items: center`, e `min-height: 100vh` garantem que o elemento `#root` (conteúdo principal) seja perfeitamente centralizado na tela.
        *   **Aparência:**
            *   `background-color: #FDF5E6;`: Define um fundo bege claro, suave e acolhedor.
            *   `font-family: 'Inter', sans-serif;`: Estabelece 'Inter' como a fonte padrão para textos gerais.
        *   **Melhorias Gerais:** `margin: 0;` remove margens padrão, `box-sizing: border-box;` otimiza o modelo de caixa, e `padding: 1rem;` adiciona um respiro nas bordas.
    *   **Estilização do `#root`:**
        *   Elemento onde o aplicativo React é renderizado.
        *   Também utiliza `display: flex` com `justify-content: center` e `align-items: center` para centralizar seu filho direto (o `<h1>` com a classe `.expressive-login-title`).
    *   **Estilização do `.expressive-login-title`:**
        *   Classe aplicada ao `<h1>Login</h1>`.
        *   `font-family: 'Pacifico', cursive;`: Aplica a fonte expressiva.
        *   `font-size: 4rem;`: Define um tamanho de fonte grande para destaque.
        *   `color: #6A0DAD;`: Utiliza um tom de roxo vibrante.
        *   `text-shadow: 2px 2px 8px rgba(106, 13, 173, 0.15);`: Adiciona uma sombra sutil para profundidade.
        *   `text-align: center;`: Centraliza o texto dentro do `<h1>`.
        *   `margin: 0;`: Remove margens padrão do `<h1>` para centralização precisa.
        *   `line-height: 1.1;`: Ajusta o espaçamento entre linhas, ideal para fontes display como 'Pacifico'.
    *   **Resumo do CSS:** O CSS é uma tradução direta de estilos inspirados em um exemplo HTML, focado em criar um título "Login" único, centralizado e visualmente marcante, usando a fonte `Pacifico` como principal elemento de design.
