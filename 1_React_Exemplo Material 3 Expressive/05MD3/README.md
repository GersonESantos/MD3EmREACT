# Exemplo de Aplicação React com Temas Dinâmicos

Este é um projeto de exemplo que demonstra uma aplicação React simples com uma página de login e um sistema de temas dinâmicos. Os usuários podem alternar entre os temas "Claro", "Escuro" e "Expressivo", e a preferência de tema é salva no `localStorage` do navegador.

## ✨ Funcionalidades

-   **Página de Login:** Um formulário de login estilizado.
-   **Seleção de Tema Dinâmico:**
    -   **Tema Claro ☀️:** Um tema limpo e tradicional.
    -   **Tema Escuro 🌙:** Um tema otimizado para ambientes com pouca luz.
    -   **Tema Expressivo ✨:** Um tema vibrante e lúdico com tipografia e cores distintas.
-   **Persistência de Tema:** A escolha do tema é salva no `localStorage`, para que o tema selecionado persista entre as sessões.
-   **Estilização com CSS Puro:** Demonstra o uso de variáveis CSS para gerenciamento de temas e estilização responsiva.

## 🛠️ Tecnologias Utilizadas

-   React (com Hooks: `useState`, `useEffect`)
-   CSS3 (com Variáveis CSS para temas)
-   HTML5
-   JavaScript (ES6+)

## 🚀 Começando

Siga estas instruções para obter uma cópia do projeto em execução na sua máquina local para fins de desenvolvimento e teste.

### Pré-requisitos

Você precisará ter o Node.js (que inclui o npm) instalado em sua máquina.

### Instalação

1.  Clone o repositório (ou baixe os arquivos para uma pasta no seu computador):
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <NOME_DA_PASTA_DO_PROJETO>
    ```

2.  Instale as dependências do projeto. Se você estiver usando npm:
    ```bash
    npm install
    ```
    Ou se você estiver usando yarn:
    ```bash
    yarn install
    ```

### Executando o Servidor de Desenvolvimento

Para iniciar o aplicativo em modo de desenvolvimento, execute:

```bash
npm run dev
```
Ou se você estiver usando yarn:
```bash
yarn dev
```

Isso geralmente abrirá o aplicativo em `http://localhost:5173` (ou outra porta, verifique o output do terminal) no seu navegador padrão. O aplicativo será recarregado automaticamente se você fizer alterações nos arquivos.

## 📜 Scripts Disponíveis

No diretório do projeto, você pode executar:

-   `npm run dev` ou `yarn dev`: Inicia o aplicativo em modo de desenvolvimento.
-   `npm run build` ou `yarn build`: Compila o aplicativo para produção na pasta `dist`.
-   `npm run lint` ou `yarn lint`: Executa o linter (se configurado).
-   `npm run preview` ou `yarn preview`: Serve a build de produção localmente para teste.

## 🎨 Sistema de Temas

O sistema de temas é implementado usando classes CSS no elemento `<html>` e variáveis CSS.
-   O tema atual é armazenado no estado do React e no `localStorage`.
-   Ao selecionar um tema no menu suspenso, a classe correspondente (`light-theme`, `dark-theme`, `expressive-theme`) é aplicada ao `<html>`, e as variáveis CSS definidas para esse tema entram em vigor.
-   O arquivo `src/App.css` contém as definições de estilo para os componentes base e as sobrescritas específicas para cada tema.

## 📄 Licença

Este projeto é de código aberto. Sinta-se à vontade para usá-lo como referência.