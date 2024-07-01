https://niknows.github.io/hans_code_linter/

# HANS Code Linter

HANS Code Linter é uma ferramenta de linting para JavaScript que ajuda a identificar e corrigir erros de estilo e boas práticas. Com uma interface moderna, permite análise de código, feedback visual, detalhamento de erros e exportação de relatórios.

## Recursos

- **Detecção de Erros de Estilo**: Identifica problemas comuns como nomes de variáveis que não seguem o padrão camelCase, nomes de classes que não estão em PascalCase, linhas que excedem o comprimento recomendado, entre outros.
- **Interface Intuitiva**: Com um design moderno e responsivo, HANS oferece uma experiência de usuário agradável e eficiente.
- **Detalhamento de Erros**: Cada erro detectado é exibido com uma descrição clara e uma seta que permite expandir para ver a linha de código específica onde o erro ocorreu.
- **Exportação de Relatórios**: Possibilidade de exportar os resultados da análise em um relatório de texto.
- **Feedback Visual**: Animações suaves e feedback visual imediato para uma melhor usabilidade.

## Como Usar

1. **Clone o Repositório**:
    ```bash
    git clone https://github.com/seu-usuario/hans-code-linter.git
    ```
2. **Abra o Arquivo `index.html`**: Utilize um navegador web para abrir o arquivo `index.html`.
3. **Cole Seu Código**: Cole o código JavaScript na área de texto fornecida.
4. **Clique em "Lint Code"**: Pressione o botão para iniciar a análise do código.
5. **Visualize os Resultados**: Veja os erros detectados e clique nas setas para ver mais detalhes.
6. **Exporte o Relatório**: Se necessário, clique em "Export Report" para salvar os resultados da análise em um arquivo de texto.

## Exemplo de Código

```javascript
var myVariable = 10; // Comentário 
let AnotherVariable = 20; // Nome da variável em PascalCase
const some_variable = 30; // Nome da variável em snake_case

class myclass { // Nome da classe não está em PascalCase
    constructor() {
        this.value = 10;
    }
}

function myFunction() {
    var result = myVariable + AnotherVariable + some_variable; // Linha longa com mais de 80 caracteres
    var unusedVariable = 100; // Variável não utilizada
    return result;    
}

console.log(myFunction()); // Trailing whitespace 
// Comentário sem texto
