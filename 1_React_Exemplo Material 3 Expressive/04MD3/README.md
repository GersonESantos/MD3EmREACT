# Aplicação React Simples com Seletor de Temas

Este projeto é um exemplo minimalista de uma aplicação React que demonstra como implementar um seletor de temas (Claro, Escuro e Expressivo) utilizando `useState` e `useEffect` para gerenciamento de estado e CSS Custom Properties (variáveis CSS) para a estilização.

## Estrutura do Projeto

Os arquivos principais para esta funcionalidade são:

-   `src/App.jsx`: O componente principal da aplicação que contém a lógica do seletor de temas e a renderização da interface.
-   `src/App.css`: A folha de estilos que define a aparência dos temas e dos componentes.

## `src/App.jsx` - Lógica do Componente

O arquivo `App.jsx` é responsável por:

1.  **Gerenciamento do Estado do Tema:**
    *   Utiliza o hook `useState` para criar uma variável de estado chamada `theme`.
    *   A inicialização do estado `theme` tenta buscar um tema previamente salvo no `localStorage` do navegador. Se nenhum tema for encontrado, o padrão é "light".
        ```javascript
        const [theme, setTheme] = useState(() => {
          const savedTheme = localStorage.getItem('theme');
          return savedTheme || 'light';
        });
        ```

2.  **Aplicação do Tema e Persistência:**
    *   Utiliza o hook `useEffect` para executar efeitos colaterais sempre que o estado `theme` mudar.
    *   Dentro do `useEffect`:
        *   Primeiro, remove quaisquer classes de tema (`light-theme`, `dark-theme`, `expressive-theme`) que possam estar presentes no elemento `<html>` (`document.documentElement`). Isso garante que apenas a classe do tema atual seja aplicada.
        *   Em seguida, adiciona a classe CSS correspondente ao tema atual (ex: `light-theme`) ao elemento `<html>`. Isso permite que o `App.css` aplique os estilos corretos.
        *   Por fim, salva a seleção atual do tema no `localStorage` com a chave `'theme'`. Isso garante que, ao recarregar a página ou retornar em uma sessão futura, o tema escolhido pelo usuário seja mantido.
        ```javascript
        useEffect(() => {
          document.documentElement.classList.remove('light-theme', 'dark-theme', 'expressive-theme');
          document.documentElement.classList.add(`${theme}-theme`);
          localStorage.setItem('theme', theme);
        }, [theme]); // O efeito é re-executado quando 'theme' muda
        ```

3.  **Manipulação da Mudança de Tema:**
    *   A função `handleThemeChange` é chamada quando o usuário seleciona uma nova opção no elemento `<select>`.
    *   Ela atualiza o estado `theme` com o valor da opção selecionada, o que, por sua vez, dispara o `useEffect` para aplicar as mudanças.
        ```javascript
        const handleThemeChange = (event) => {
          setTheme(event.target.value);
        };
        ```

4.  **Renderização da Interface (JSX):**
    *   Renderiza um `div` principal com a classe `app-container`.
    *   Dentro dele, um `header` contém:
        *   Um título `<h1>` com a classe `login-title`.
        *   Um `div` com a classe `theme-selector-container` que agrupa o `label` e o `<select>` para a escolha do tema.
        *   O `<select>` tem seu valor (`value`) vinculado ao estado `theme` e o evento `onChange` vinculado à função `handleThemeChange`.

## `src/App.css` - Estilização e Temas

O arquivo `App.css` é responsável pela aparência da aplicação e pela definição dos diferentes temas:

1.  **Importação de Fontes:**
    *   Utiliza `@import url(...)` para carregar as fontes `Inter` (para texto geral) e `Pacifico` (para o título no tema "Expressivo") do Google Fonts.

2.  **Variáveis CSS (Custom Properties):**
    *   No seletor `:root`, são definidas variáveis CSS globais que servem como base para o tema claro e como fallback. Exemplos: `--font-family-sans`, `--bg-color`, `--text-color`.

3.  **Estilos Base:**
    *   Estilos para o `body` são definidos, utilizando as variáveis CSS para `font-family`, `background-color`, e `color`.
    *   Inclui uma transição suave para `background-color` e `color` para tornar a mudança de tema mais agradável.

4.  **Definições de Tema:**
    *   Cada tema é definido por uma classe CSS que será aplicada ao elemento `<html>`:
        *   `.light-theme`: Define (ou redefine) as variáveis CSS para cores e fontes apropriadas para um tema claro.
        *   `.dark-theme`: Define as variáveis CSS para um tema escuro, com cores de fundo escuras e texto claro.
        *   `.expressive-theme`: Define as variáveis CSS para um tema mais vibrante e estilizado, utilizando a fonte `Pacifico` para o título e uma paleta de cores distinta (ex: fundo lavanda).
    *   Quando o JavaScript adiciona uma dessas classes ao `<html>`, as variáveis CSS correspondentes são ativadas, alterando a aparência de todos os elementos que as utilizam.

5.  **Estilos dos Componentes:**
    *   Classes como `.app-container`, `.login-title`, `.theme-selector-container`, `.theme-label`, e `.theme-select` são estilizadas.
    *   Crucialmente, essas classes utilizam as variáveis CSS (ex: `color: var(--title-color);`, `background-color: var(--select-bg-color);`). Isso faz com que sua aparência se adapte automaticamente quando o tema é alterado, pois os valores das variáveis mudam.
    *   Existem também sobrescritas específicas para o tema expressivo, como aumentar o tamanho da fonte do `.login-title` ou mudar o fundo do `.app-container` para criar mais contraste.

## Como Funciona a Troca de Tema

1.  O usuário seleciona um tema no dropdown.
2.  O evento `onChange` do `<select>` chama `handleThemeChange` no `App.jsx`.
3.  `handleThemeChange` atualiza o estado `theme` com o novo valor.
4.  A mudança no estado `theme` dispara o `useEffect`.
5.  O `useEffect` atualiza a classe no elemento `<html>` (ex: para `dark-theme`) e salva o tema no `localStorage`.
6.  O `App.css` aplica os estilos correspondentes à nova classe no `<html>`, pois as variáveis CSS são redefinidas, e todos os elementos que usam essas variáveis são re-renderizados com a nova aparência.

Este sistema oferece uma maneira flexível e eficiente de gerenciar temas em uma aplicação React, separando a lógica de estado da estilização.