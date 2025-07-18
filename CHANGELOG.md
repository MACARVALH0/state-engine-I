## [v0.0.3] - 2025-07-17

### ✨ Novidades
- Criação da classe `Keyboard` para gerenciar o estado das teclas.
- Definição de listeners globais para eventos de teclado (`keydown` e `keyup`) dentro da classe `Keyboard`.
- Redirecionador de eventos para handlers específicos.
- Adição do `eventManager` em entidades e melhor organização dos eventos.

### 🛠 Melhorias
- Refatoração das classes `Game`, `State`, `Scene` e `Observer`.
- Modularização com funções como `composeEntity` e `composeGeneric`.
- Remoção de arquivos obsoletos e ajustes em variáveis do teclado virtual.

### 🐛 Correções
- Correção na lógica para ativar listeners de teclado somente quando necessário.