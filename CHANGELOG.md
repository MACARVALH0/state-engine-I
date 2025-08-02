## [v0.0.4] - 2025-08-02

### ✨ Novidades
- **Criação dos primeiros sistemas** da engine:
  - `RenderSystem` e `PhysicsSystem` adicionados à pasta `systems/`.
- **Novo renderer Canvas**: implementação da classe `CanvasRenderer`.
- **Adição dos primeiros componentes**:
  - `Health`, `Sprite` e `Transform`.
- **Adição do helper `ImageCache`** para gerenciamento de imagens.
- **Nova função `composeBehavior`** para facilitar a composição de comportamentos reutilizáveis.
- Arquivos de *event handlers* movidos para uma nova pasta `event-handlers/`.

### 🛠 Melhorias
- Classe `Scene` agora herda de uma composição que inclui `Observer` e `Publisher`.
- Refatorações em `Visible` e `Positional` para agirem como *behaviors* consistentes.
- Atributo `visible` da `Scene` removido (obsoleto).
- `Publisher` foi convertido em mixin para uso em múltiplas classes.
- Ajustes gerais em `Entity`, `Game`, `State` e `compose.js`.

### 🐛 Correções
- Correção no nome do arquivo `Positonal.js` (renomeado corretamente para `Positional.js`).
- Remoção de arquivo utilitário obsoleto: `utils.js`.



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